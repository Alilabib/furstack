import React, { PureComponent } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import CommentItem from "./CommentItem";
import classnames from "classnames";

const queryString = require("query-string");

export default class Comments extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      body: target.value,
    });
  };
  handleAddComment = () => {
    const { addComment } = this.props;
    const { body } = this.state;
    // const user = item?.User;
    addComment(body);
    this.setState({
      body: "",
    });
  };
  render() {
    const { comments = [], isSelected } = this.props;
    const { body } = this.state;
    return (
      <div>
        {/* <Scrollbars autoHide> */}
        {comments.map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))}
        {/* </Scrollbars> */}
        {isSelected && isSelected.user ? (
          <div>
            <input type="text" value={body} placeholder="Your Comment" onChange={this.handleChange} />
            <button className="btn btn-lg-danger" type="submit" size="large" onClick={this.handleAddComment}>
              Comment
            </button>
          </div>
        ) : (
          <div>no comment</div>
        )}
      </div>
    );
  }
}
