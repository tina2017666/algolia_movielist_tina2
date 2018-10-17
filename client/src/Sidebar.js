import { Component } from "inferno";
import { ListGroup, ListGroupItem, Badge, Button } from "inferno-bootstrap";
import axios from "axios";
import "./Sidebar.css";
var o = [
  "Drama",
  "Comedy",
  "Action",
  "Thriller",
  "Documentary",
  "Romance",
  "Horror",
  "Foreign",
  "Music",
  "Crime"
];

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      filter: [],
      genre: new Array(10).fill(0),
      star: new Array(6).fill(0),
      data: [],
      is_clicked: new Array(6).fill(false),
      filtered_data: [],
      is_filtered: new Array(10).fill(false),
      original_genre: []
      //before_genre: []
    };
  }
  componentDidMount = () => {
    axios.get("api/1/movies").then(res => {
      console.log(res.data);
      for (let i of res.data) {
        const ar = i.genre;
        const gr = this.state.genre;
        const str = this.state.star;
        const rating = i.rating;
        while (rating >= 0) {
          str[rating] = str[rating] + 1;
          rating--;
        }

        for (let j of ar) {
          const idx = o.indexOf(j);
          if (idx !== -1) {
            gr[idx] = gr[idx] + 1;
          }
        }
        this.setState({
          genre: gr,
          data: res.data,
          star: str,
          original_genre: gr,
          before_genre: gr
        });
      }
    });
  };
  componentDidUpdate = prevProps => {
    // searched
    if (prevProps.search !== this.props.search) {
      if (this.props.search !== "") {
        for (let i of this.props.searchData) {
          const ar = i.genre;
          const gr = new Array(10).fill(0);
          const str = new Array(6).fill(0);
          const rating = i.rating;
          while (rating >= 0) {
            str[rating] = str[rating] + 1;
            rating--;
          }

          for (let j of ar) {
            const idx = o.indexOf(j);
            if (idx !== -1) {
              gr[idx] = gr[idx] + 1;
            }
          }
          this.setState({
            genre: gr,
            star: str
          });
        }
      } else {
        const str = new Array(6).fill(0);
        for (let i of this.props.searchData) {
          const rating = i.rating;
          while (rating >= 0) {
            str[rating] = str[rating] + 1;
            rating--;
          }
        }
        this.setState({
          genre: this.state.before_genre,

          star: str
        });
      }
    }
  };
  handleGenre = (item, index) => {
    const { filter, data, genre, is_filtered, star } = this.state;

    let arr = [...filter];
    let dta = [...data];
    let genre1 = [...genre];
    let is_filtered1 = [...is_filtered];
    is_filtered1[index] = !is_filtered[index];
    let count = 0;
    this.setState({ is_filtered: is_filtered1 });
    let dta1 = [];
    let str = new Array(6).fill(0);

    const helper = (arr, filter) => {
      for (let i = 0; i < filter.length; i++) {
        if (!arr.includes(filter[i])) {
          return false;
        }
      }
      return true;
    };
    const changeGenre = (dta, count, helper, genre1, arr, dta1) => {
      for (let i = 0; i < dta.length; i++) {
        let objGenre = dta[i].genre;
        if (helper(objGenre, arr)) {
          count++;
          dta1.push(dta[i]);
        }
      }
      for (let z of arr) {
        const id = o.indexOf(z);
        genre1[id] = count;
      }
    };
    const changeStar = (data, str) => {
      for (let i of data) {
        const rating = i.rating;
        while (rating >= 0) {
          str[rating] = str[rating] + 1;
          rating--;
        }
      }
      return str;
    };

    if (!filter.includes(item)) {
      arr = [...arr, item];
      changeGenre(dta, count, helper, genre1, arr, dta1);
      console.log(dta1);
      str = changeStar(dta1, str);
      console.log(str);
      //this.props.passFiltered(dta1);
      if (this.props.isSearched && this.props.search === "") {
        this.props.passNotsearch(dta1);
      } else {
        this.props.passFiltered(dta1);
      }
      this.setState({
        genre: genre1,
        filter: arr,
        filtered_data: dta1,
        before_genre: genre1,
        star: str
      });
    } else {
      const index = filter.indexOf(item);
      arr.splice(index, 1);
      if (arr.length !== 0) {
        changeGenre(dta, count, helper, genre1, arr, dta1);
        str = changeStar(dta1, str);
        //this.props.passFiltered(dta1);
        if (this.props.isSearched && this.props.search === "") {
          this.props.passNotsearch(dta1);
        } else {
          this.props.passFiltered(dta1);
        }
        this.setState({
          genre: genre1,
          filter: arr,
          filtered_data: dta1,
          star: str
        });
      } else {
        if (this.props.isSearched && this.props.search === "") {
          this.props.passNotsearch(data);
        } else {
          this.props.passFiltered(data);
        }
        str = changeStar(data, str);

        this.setState({
          genre: this.state.original_genre,
          filter: arr,
          before_genre: genre1,
          star: str
        });
      }
    }
  };

  getRating = num => {
    let is_clicked1 = [...this.state.is_clicked];

    for (let i = 0; i < is_clicked1.length; i++) {
      if (i == num) {
        is_clicked1[i] = !is_clicked1[i];
      } else {
        is_clicked1[i] = false;
      }
    }
    this.setState({ is_clicked: is_clicked1 });
    console.log(is_clicked1[num]);
    if (is_clicked1[num]) {
      const l = this.state.filtered_data.length;
      let genre1 = new Array(10).fill(0);
      let data;
      let data1 = [];
      if (l !== 0) {
        data = [...this.state.filtered_data];
      } else {
        data = [...this.state.data];
      }
      data.forEach(item => {
        if (item.rating >= num) {
          const arr = item.genre;
          data1.push(item);
          arr.forEach(ele => {
            const id = o.indexOf(ele);
            genre1[id] = genre1[id] + 1;
          });
        }
      });
      this.props.passFiltered(data1);
      this.setState({ genre: genre1 });
    } else {
      // console.log(this.state.filtered_data);
      // console.log(this.state.genre);
      if (this.state.filtered_data.length !== 0) {
        this.props.passFiltered(this.state.filtered_data);
      } else {
        this.props.passFiltered(this.state.data);
      }

      this.setState({ genre: this.state.before_genre });
    }
  };
  render() {
    const star4 = new Array(4).fill(
      <i class="fas fa-star" style="color:pink" />
    );
    const star3 = new Array(3).fill(
      <i class="fas fa-star" style="color:pink" />
    );
    const star2 = new Array(2).fill(
      <i class="fas fa-star" style="color:pink" />
    );
    const star1 = new Array(1).fill(
      <i class="fas fa-star" style="color:pink" />
    );
    const { genre, star, is_filtered, is_clicked } = this.state;

    return (
      <div>
        Genre
        <ListGroup>
          {o.map((item, index) => {
            return (
              <ListGroupItem>
                {is_filtered[index] ? (
                  <Button
                    color="secondary"
                    className="hover"
                    onClick={() => {
                      this.handleGenre(item, index);
                    }}
                  >
                    {item}
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    className="hover"
                    onClick={() => {
                      this.handleGenre(item, index);
                    }}
                  >
                    {item}
                  </Button>
                )}

                <Badge pill>{genre[index]}</Badge>
              </ListGroupItem>
            );
          })}
        </ListGroup>
        <div>
          Rating
          <p>
            {star4}
            <i class="far fa-star" style="color:pink" />
            {is_clicked[4] ? (
              <span
                onClick={() => {
                  this.getRating(4);
                }}
                className="underline"
                style="color:red"
              >
                &up
              </span>
            ) : (
              <span
                onClick={() => {
                  this.getRating(4);
                }}
                className="underline"
              >
                &up
              </span>
            )}

            <Badge pill color="warning">
              {star[4]}
            </Badge>
          </p>
          <p>
            {star3}
            <i class="far fa-star" style="color:pink" />
            <i class="far fa-star" style="color:pink" />

            {is_clicked[3] ? (
              <span
                onClick={() => {
                  this.getRating(3);
                }}
                className="underline"
                style="color:red"
              >
                &up
              </span>
            ) : (
              <span
                onClick={() => {
                  this.getRating(3);
                }}
                className="underline"
              >
                &up
              </span>
            )}

            <Badge pill color="warning">
              {star[3]}
            </Badge>
          </p>
          <p>
            {star2}
            <i class="far fa-star" style="color:pink" />
            <i class="far fa-star" style="color:pink" />
            <i class="far fa-star" style="color:pink" />
            {is_clicked[2] ? (
              <span
                onClick={() => {
                  this.getRating(2);
                }}
                className="underline"
                style="color:red"
              >
                &up
              </span>
            ) : (
              <span
                onClick={() => {
                  this.getRating(2);
                }}
                className="underline"
              >
                &up
              </span>
            )}

            <Badge pill color="warning">
              {star[2]}
            </Badge>
          </p>
          <p>
            {star1}
            <i class="far fa-star" style="color:pink" />
            <i class="far fa-star" style="color:pink" />
            <i class="far fa-star" style="color:pink" />
            <i class="far fa-star" style="color:pink" />
            {is_clicked[1] ? (
              <span
                onClick={() => {
                  this.getRating(1);
                }}
                className="underline"
                style="color:red"
              >
                &up
              </span>
            ) : (
              <span
                onClick={() => {
                  this.getRating(1);
                }}
                className="underline"
              >
                &up
              </span>
            )}

            <Badge pill color="warning">
              {star[1]}
            </Badge>
          </p>
        </div>
      </div>
    );
  }
}
export default Sidebar;
