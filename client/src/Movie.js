import { Component } from "inferno";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Row,
  Col
} from "inferno-bootstrap";
class Movie extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const arr = this.props.arr;
    const star = new Array(this.props.rating).fill(0);
    console.log(star);
    return (
      <Card>
        <Row>
          <Col xs="3">
            <CardImg
              style={{ width: "100%" }}
              left
              src={this.props.url}
              alt={this.props.url}
            />
          </Col>
          <Col xs="9">
            <CardBody style={{}}>
              <CardTitle>{this.props.title}</CardTitle>
              <CardText>
                {this.props.year}
                <div>
                  {star.map(() => {
                    return <i class="fas fa-star" style={{ color: "pink" }} />;
                  })}
                </div>
                <div>
                  {arr.map(item => {
                    return (
                      <td>
                        {item}
                        &nbsp;
                      </td>
                    );
                  })}
                </div>
              </CardText>
            </CardBody>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default Movie;
