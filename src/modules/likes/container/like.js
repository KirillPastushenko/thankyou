import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { setLike, setLikeIdle } from "../actions";
import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import "./like.css";
class Like extends PureComponent {
  state = {
    liked: false,
    count: 0
  };
  componentDidMount() {
    let liked = false;
    let count = 0;
    const { userId, likedBy, likesCount } = this.props;
    if (likedBy && likedBy.length > 0) {
      likedBy.map(liker => {
        if (liker.id === userId) {
          liked = true;
        }
      });
      if (likesCount) count = likesCount;
      this.setState({ liked, count });
    }
  }
  handleClick = e => {
    const { listId, itemId, setLike } = this.props;
    const { liked, count } = this.state;

    setLike({ listId, itemId, setLike: !liked });
    this.setState({ liked: !liked, count: liked ? count - 1 : count + 1 });
  };

  render() {
    const { userId, likesCount, likedBy, itemId, listId } = this.props;
    const { liked, count } = this.state;
    return (
      <Fragment>
        <span className="like" onClick={this.handleClick}>
          {liked && (
            <Fragment>
              <FaThumbsUp className="like-icon red" />
              <span>
                Вам {count > 1 && "и еще " + (count - 1)} это нравится
              </span>
            </Fragment>
          )}
          {!liked && (
            <Fragment>
              <FaRegThumbsUp className="like-icon" />
              {count > 0 && count}
              <span>Нравится</span>
            </Fragment>
          )}
        </span>
      </Fragment>
    );
  }
}

export default connect(
  state => ({}),
  { setLike, setLikeIdle }
)(Like);
