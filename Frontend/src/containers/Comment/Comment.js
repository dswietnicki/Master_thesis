import React, { Component } from 'react';
import './Comment.scss';

class Comment extends Component {
  render() {
    return (
      <div className="comment">
        <div className="commentHeader">
          <span>{this.props.comment.author.name} {this.props.comment.author.surname}</span>
          <span>{this.props.comment.date}</span>
        </div>
        <div className="divider" />
        {this.props.comment.text}
      </div>
    );
  }
}

export default Comment;
