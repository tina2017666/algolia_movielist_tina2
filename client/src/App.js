import { Component } from "inferno";
import axios from "axios";
import Movie from "./Movie";
import Sidebar from "./Sidebar";
import "./Sidebar.css";
import { Container, ListGroup, Button, Row, Col } from "inferno-bootstrap";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie: [],
      page: 0,
      searchData: [],
      isSearched: false,
      isAsc: true
    };
  }
  componentDidMount = () => {
    console.log("calling componentDidMount");
    axios.get("api/1/movies").then(res => {
      console.log(res.data);
      this.setState({ movie: res.data });
    });
  };

  getPrev = () => {
    const p = this.state.page;
    if (p > 0) {
      this.setState({
        page: p - 1
      });
    }
  };
  getNext = () => {
    const { page, movie } = this.state;
    const max = movie.length / 10;
    if (this.state.page < max) {
      this.setState({ page: page + 1 });
    }
  };
  getPage = num => {
    this.setState({ page: num });
  };

  handleSort = () => {
    const { isAsc, isSearched, searchData, movie } = this.state;
    let data;
    const sortAsc = data => {
      data.sort((a, b) => {
        var a1 = a.title.toLowerCase();
        var b1 = b.title.toLowerCase();
        if (a1 < b1) {
          return -1;
        } else if (a1 > b1) {
          return 1;
        } else {
          return 0;
        }
      });
    };
    const sortDsc = data => {
      data.sort((a, b) => {
        var a1 = a.title.toLowerCase();
        var b1 = b.title.toLowerCase();
        if (a1 < b1) {
          return 1;
        } else if (a1 > b1) {
          return -1;
        } else {
          return 0;
        }
      });
    };
    if (isSearched) {
      data = [...searchData];
      if (isAsc) {
        sortAsc(data);
      } else {
        sortDsc(data);
      }

      this.setState({ searchData: data, isAsc: !isAsc });
    } else {
      data = [...movie];
      if (isAsc) {
        sortAsc(data);
      } else {
        sortDsc(data);
      }
      this.setState({ movie: data, isAsc: !isAsc });
    }
  };
  handleSearch = e => {
    const { movie } = this.state;
    const value = e.target.value;
    if (value === "") {
      this.setState({
        searchData: movie,
        isSearched: true,
        search: value
      });
    } else {
      const res = movie.filter(item => {
        return item.title
          .trim()
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      this.setState({ searchData: res, isSearched: true, search: value });
    }
  };
  getFiltered = data => {
    this.setState({ movie: data });
  };
  getNotsearch = data => {
    this.setState({ searchData: data });
  };
  render() {
    //console.log(this.state.movie);
    const { movie, isSearched, search, searchData, page } = this.state;

    console.log(document.getElementById("p1"));
    let data;
    if (isSearched) {
      data = searchData.slice(page * 5, page * 5 + 10);
    } else {
      data = movie.slice(page * 5, page * 5 + 5);
    }
    console.log(data);
    return (
      <Container>
        <Row>
          <Col xs="4">
            <Sidebar
              passFiltered={this.getFiltered}
              passNotsearch={this.getNotsearch}
              searchData={searchData}
              movie={movie}
              search={search}
              isSearched={isSearched}
            />
          </Col>
          <Col xs="8">
            <div>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  onInput={this.handleSearch}
                  value={search}
                  placeholder="Search"
                  style={{ paddingLeft: "30px" }}
                />
                <i
                  class="fas fa-search"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "0px",
                    padding: "8px"
                  }}
                />
                <div className="underline">
                  <span style={{ fontSize: "20px" }} onClick={this.handleSort}>
                    a---z
                  </span>
                </div>
              </div>

              <ListGroup onClick={this.random}>
                {data.map((item, index) => {
                  return (
                    <Movie
                      title={item.title}
                      year={item.year}
                      arr={item.genre}
                      url={item.image}
                      rating={item.rating}
                    />
                  );
                })}
              </ListGroup>

              <Button outline color="primary" onClick={this.getPrev}>
                {"<<"}
              </Button>

              <Button
                outline
                color="primary"
                onClick={() => {
                  this.getPage(1);
                }}
              >
                1
              </Button>

              <Button
                outline
                color="primary"
                onClick={() => {
                  this.getPage(2);
                }}
              >
                2
              </Button>
              <Button
                outline
                color="primary"
                onClick={() => {
                  this.getPage(3);
                }}
              >
                3
              </Button>
              <Button
                outline
                color="primary"
                onClick={() => {
                  this.getPage(4);
                }}
              >
                4
              </Button>
              <Button
                outline
                color="primary"
                onClick={() => {
                  this.getPage(5);
                }}
              >
                5
              </Button>
              <Button outline color="primary" onClick={this.getNext}>
                >>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
