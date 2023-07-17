import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getComments, addComment } from '../../api/comments';
import Button from '@material-ui/core/Button';
import Comment from '../../containers/Comment/Comment';
import './Comments.scss';

class Comments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      taskId: '',
      comments: [],
      textarea: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    this.getComments();
    this.setState({
      taskId: this.props.taskId,
      fetchedData: true,
    })
  }

  handleChange(event) {
    this.setState({ textarea: event.target.value });
  }

  getComments = async () => {
    const comments = await getComments(this.props.taskId);
    this.setState({
      comments: comments.data
    })
  }

  addComment = async () => {
    const user = {
      id: this.props.userInfo._id,
      name: this.props.userInfo.name,
      surname: this.props.userInfo.surname
    }

    const comment = {
      text: this.state.textarea,
      taskId: this.props.taskId,
      author: user,
    }

    await addComment(comment);
    this.setState({
      textarea: ''
    })
    this.getComments();
  }

  render() {
    return (
      <div>
        <div className='addComment'>
          <textarea
            cols="50"
            rows="3"
            style={{ resize: 'none', marginBottom: '15px' }}
            value={this.state.textarea}
            onChange={this.handleChange}
          ></textarea>
          <Button variant="contained" color="default" onClick={this.addComment}>Add Comment</Button>
        </div>
        <div className='commentsSection'>
          {this.state.comments.length > 0 ?
            this.state.comments.map((comment, index) => {
              return <Comment key={index} comment={comment} />
            })
            :
            null
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo,
  };
};

export default connect(mapStateToProps)(Comments);