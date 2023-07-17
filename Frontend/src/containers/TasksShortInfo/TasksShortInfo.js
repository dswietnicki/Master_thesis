import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import './TasksShortInfo.scss';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 350,
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 150
  },
  tableRow: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#e6e6e6"
    }
  }
}));

const TasksShortInfo = props => {
  const classes = useStyles();

  const displayStatus = status => {
    switch (status) {
      case "TO_DO":
        return "To do";
      case "IN_PROGRESS":
        return "In progress";
      case "DONE":
        return "Done";
      default:
        return "Error";
    }
  };

  return (
    <div className="short-task-container">
      <div className="short-task-column">
        To do
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.tasks.map(task => (
                task.status === "TO_DO" ?
                <TableRow
                  key={task._id}
                  className={classes.tableRow}
                  onClick={() => props.openTask(task._id)}
                >
                  <TableCell align="left">{task.name}</TableCell>
                  <TableCell align="left">
                    {displayStatus(task.status)}
                  </TableCell>
                </TableRow>
                : null
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
      <div className="short-task-column">
        In progress
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.tasks.map(task => (
                task.status === "IN_PROGRESS" ?
                <TableRow
                  key={task._id}
                  className={classes.tableRow}
                  onClick={() => props.openTask(task._id)}
                >
                  <TableCell align="left">{task.name}</TableCell>
                  <TableCell align="left">
                    {displayStatus(task.status)}
                  </TableCell>
                </TableRow>
                : null
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
      <div className="short-task-column">
        Done
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.tasks.map(task => (
                task.status === "DONE" ?
                <TableRow
                  key={task._id}
                  className={classes.tableRow}
                  onClick={() => props.openTask(task._id)}
                >
                  <TableCell align="left">{task.name}</TableCell>
                  <TableCell align="left">
                    {displayStatus(task.status)}
                  </TableCell>
                </TableRow>
                : null
              ))}
            </TableBody>
          </Table>
        </Paper>
      </div>
    </div>
  );
};

export default TasksShortInfo;
