import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTask, setStatus, assignTask, editTask, deleteTask } from '../../api/tasks';
import Button from '@material-ui/core/Button';
import Comments from '../Comments/Comments';
import { Redirect } from "react-router-dom";
import './TaskView.scss';

class TaskView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            taskId: '',
            task: {},
            fetchedData: false,
            deleted: false,
            confirmDelete: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        this.getTask();
        this.setState({
            taskId: this.props.match.params.taskId
        })
    }

    assignToMe = async () => {
        const task = await assignTask(this.state.taskId, {
            id: this.props.userInfo._id,
            name: this.props.userInfo.name,
            surname: this.props.userInfo.surname
        })
        this.setState({
            task: task.data
        })
    }

    widthdrawFromTask = async () => {
        const task = await assignTask(this.state.taskId, {
            id: 0,
            name: 'none',
            surname: 'none'
        })
        this.setState({
            task: task.data
        })
    }

    setStatus = async (status) => {
        const task = await setStatus(this.state.taskId, status)
        this.setState({
            task: task.data
        })
    }

    priorityToString = (priority) => {
        switch (priority) {
            case 3:
                return 'Low'
            case 2:
                return 'Medium'
            case 1:
                return 'High'
            default:
                break;
        }
    }

    displayStatus = (status) => {
        switch (status) {
            case 'TO_DO':
                return "To do"
            case 'IN_PROGRESS':
                return "In progress"
            case 'DONE':
                return "Done"
            default:
                break;
        }
    }

    handleChange(event) {
        const task = this.state.task;
        task.description = event.target.value;
        this.setState({ task: task });
    }

    editTask = async () => {
        const task = editTask(this.state.taskId, this.state.task.description);
        task.then(() => {
            this.getTask();
        })
    }

    getTask = async () => {
        const task = await getTask(this.props.match.params.taskId)
        this.setState({
            task: task.data,
            fetchedData: true,
        })
    }

    confirmDelete = () => {
        this.setState({
            confirmDelete: true
        })
    }

    deleteTask = async () => {
        await deleteTask(this.state.taskId)
        this.setState({
            deleted: true
        })
    }

    render() {
        return (
            this.state.fetchedData ?
                <div className="task-view-container">
                    {this.state.confirmDelete ?
                        <div className="modal">
                            <div className="modal-content">
                                <p>Some text in the Modal..</p>
                            </div>
                        </div>
                        :
                        null
                    }
                    <div className="task-view-column">
                        <div className="buttons-task">

                            <span className="button-container"> 
                            {this.state.confirmDelete ? 
                            <Button variant="contained" color="secondary" onClick={this.deleteTask}>Confirm</Button>
                            : 
                            <Button variant="contained" color="primary" onClick={this.confirmDelete}>Delete</Button>
                            }
                             </span>
                            {this.state.task.status !== 'DONE' ?
                                this.state.task.asignee.id !== this.props.userInfo._id ?
                                    <span className="button-container"> <Button variant="contained" color="primary" onClick={this.assignToMe}>Assign to me</Button> </span>
                                    :
                                    <span className="button-container"> <Button variant="contained" color="primary" onClick={this.widthdrawFromTask}>Withdraw</Button> </span>
                                : null}
                            {this.state.task.status !== 'TO_DO' ?
                                <span className="button-container"> <Button variant="contained" color="primary" onClick={() => this.setStatus('TO_DO')}>To do</Button> </span>
                                : null}
                            {this.state.task.status !== 'IN_PROGRESS' ?
                                <span className="button-container"> <Button variant="contained" color="primary" onClick={() => this.setStatus('IN_PROGRESS')}>In progress</Button> </span>
                                : null}
                            {this.state.task.status !== 'DONE' ?
                                <span className="button-container"> <Button variant="contained" color="primary" onClick={() => this.setStatus('DONE')}>Done</Button> </span>
                                : null}
                        </div>
                        <div className="task-details">
                            <div className="details">
                                Details
                    </div>
                            Name: {this.state.task.name} <br />
                            Creator: {this.state.task.creator.name + ' ' + this.state.task.creator.surname} <br />
                            Asignee: {
                                // eslint-disable-next-line 
                                this.state.task.asignee.id == 0 ?
                                    null :
                                    this.state.task.asignee.name + ' ' + this.state.task.asignee.surname
                            } <br />
                            Priority: {this.priorityToString(this.state.task.priority)} <br />
                            Status: {this.displayStatus(this.state.task.status)} <br />

                            <br />
                            Description: <br />
                            <textarea
                                cols="50"
                                rows="3"
                                style={{ resize: 'none', marginBottom: '15px' }}
                                value={this.state.task.description}
                                onChange={this.handleChange}
                            ></textarea>
                            <span className="button-container"> <Button variant="contained" color="primary" onClick={this.editTask}>Save</Button> </span>
                        </div>
                    </div>
                    <div>
                        <Comments taskId={this.state.taskId} />
                    </div>
                    {this.state.deleted ?
                        <Redirect to={"/project/" + this.props.match.params.projectId} />
                        :
                        null
                    }
                </div>
                :
                <div>Something failed</div>
        );
    }
}

const mapStateToProps = state => {
    return {
        userInfo: state.userInfo,
    };
};

export default connect(mapStateToProps)(TaskView);