import React from "react";
import "./AddTask.scss";
import { connect } from "react-redux";
import SelectUser from "../../components/SelectUser/SelectUser";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  }
}));

const AddTask = props => {
  const classes = useStyles();
  const [userId, setUserId] = React.useState('0');
  const [user, setUser] = React.useState({id: 0, name: 'null'});
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [priority, setPriority] = React.useState(3);
  const [error, setError] = React.useState(false);
  const [expand, setExpand] = React.useState(false);

  const sendValues = () => {
    if (name.length === 0 || description.length === 0) {
      setError(true);
    }
    const creator = {
      id: props.userInfo._id,
      name: props.userInfo.name,
      surname: props.userInfo.surname
    };

    const newTask = {
      name: name,
      description: description,
      asignee: user,
      priority: priority,
      creator: creator,
      status: 'TO_DO'
    };
    props.addTask(newTask);
    setExpand(false);
  };

  const handlePriorityChange = event => {
    setPriority(event.target.value);
  };

  const handleUserChange = userId => {
    setUserId(userId);
    const user = props.users.find(user => user.id === userId)
    if(user) {
      setUser(user);
    } else {
      setUser({id: 0, name: 'null'})
    }
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel expanded={expand}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          onClick={() => setExpand(!expand)}
        >
          <Typography className={classes.heading}>Add new task</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="panel-details">
            <div className="project-form">
              <div className="project-form-column">
                <input
                  className="name-input"
                  placeholder="Task name"
                  onChange={event => setName(event.target.value)}
                />
                <textarea
                  rows="10"
                  cols="50"
                  placeholder="Description"
                  onChange={event => setDescription(event.target.value)}
                />
                <div style={{ visibility: error ? "visible" : "hidden" }}>
                  Name and description must be filled
                </div>
              </div>
              <div className="project-form-column-second">
                <div className="task-asignee">
                  Assignee <br />
                  {props.users ?
                    <SelectUser users={props.users} userId={userId} handleChange={handleUserChange} />
                    : null}
                </div>
                <div>

                  Priority <br />
                  <Select
                    value={priority}
                    onChange={handlePriorityChange}
                  >
                    <MenuItem value={3}>Low</MenuItem>
                    <MenuItem value={2}>Medium</MenuItem>
                    <MenuItem value={1}>High</MenuItem>
                  </Select>
                </div>
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={sendValues}
            >
              Add new task
            </Button>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    userInfo: state.userInfo
  };
};

export default connect(mapStateToProps)(AddTask);
