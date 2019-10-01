import React, { Component, Fragment } from "react";
import Avatar from "../../../../components/avatar";
import { Like } from "../../../likes";
import { thankYouListId } from "../../../../constants/config";
class ThankYouItem extends Component {
  state = {};
  render() {
    const { children, userId } = this.props;
    return (
      <Fragment>
        <div className="thx-news-item th10693">
          <div className="flex-spb-c">
            <div className="badge flex-l-c">
              <Avatar userId={children.fromUserId} title={children.from} />
            </div>

            <div className="badge flex-l-c ">
              <Avatar userId={children.toUserId} title={children.to} />
            </div>
          </div>
          {children.text && (
            <div
              className="comment"
              dangerouslySetInnerHTML={{ __html: children.text }}
            />
          )}
          <div className="comment like">
            <span className="date">{children.date}</span>&nbsp;&nbsp;&nbsp;{" "}
            {userId && (
              <Like
                listId={thankYouListId}
                itemId={children.id}
                likedBy={children.likedBy}
                likesCount={children.likesCount}
                userId={userId}
              />
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ThankYouItem;
