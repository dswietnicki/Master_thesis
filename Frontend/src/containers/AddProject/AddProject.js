import React from "react";
import "./AddProject.scss";
import { connect } from "react-redux";
import SelectUsers from "../../components/SelectUsers/SelectUsers";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  }
}));

const AddProject = props => {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [error, setError] = React.useState(false);
  const [expand, setExpand] = React.useState(false);

  const updateUsers = users => {
    console.log(users)
    setUsers(users);
  };

  const sendValues = () => {
    if (name.length === 0 || description.length === 0) {
      setError(true);
    }
    const creator = {
      id: props.userInfo._id,
      name: props.userInfo.name,
      surname: props.userInfo.surname
    };
    const newProject = {
      name: name,
      description: description,
      users: [creator, ...users],
      creator: creator
    };
    props.addProject(newProject);
    setExpand(false);
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
          <Typography className={classes.heading}>Add new project</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="panel-details">
            <div className="project-form">
              <div className="project-form-column">
                <input
                  className="name-input"
                  placeholder="Project name"
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
              <div className="project-form-column">
                <SelectUsers updateUsers={updateUsers} users={props.users}/>
              </div>
            </div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={sendValues}
            >
              Add new project
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

export default connect(mapStateToProps)(AddProject);
