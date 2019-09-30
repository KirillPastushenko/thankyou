import React, { Component, Fragment } from "react";
import Avatar from "../../../../components/avatar";
class ThankYouItem extends Component {
  state = {};
  render() {
    const { children } = this.props;
    return (
      <Fragment>
        <div className="thx-news-item th10693">
          <div className="flex-spb-c">
            <div className="badge flex-l-c">
              <Avatar userId={children.fromUserId} title={children.from}/>
            </div>

            <div className="badge flex-l-c ">
              <Avatar userId={children.toUserId} title={children.to}/>
            </div>
          </div>
          <div className="comment">{children.text}</div>
          <div className="comment like">
            <span className="date">{children.date}</span>&nbsp;&nbsp;&nbsp;{" "}
            {/* <span>
              <i
                className="icon-thumbs-up"
                id="like10693"
                data-likenum="0"
                data-setlike="false"
                data-id="10693"
              ></i>
              <span className="">like this</span>
            </span> */}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ThankYouItem;
