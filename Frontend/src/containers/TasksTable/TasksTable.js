import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  tableRow: {
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#e6e6e6"
    }
  },
  tableCell: {
    padding: "7px 16px 7px 16px"
  }
}));

const TasksTable = props => {
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
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableCell} align="left">
              Name
            </TableCell>
            <TableCell className={classes.tableCell} align="left">
              Asignee
            </TableCell>
            <TableCell className={classes.tableCell} align="left">
              Status
            </TableCell>
            <TableCell className={classes.tableCell} align="left">
              Creator
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tasks.map(task => (
            <TableRow
              key={task._id}
              className={classes.tableRow}
              onClick={() => props.openTask(task._id)}
            >
              <TableCell className={classes.tableCell} align="left">
                {task.name}
              </TableCell>
              {// eslint-disable-next-line
              task.asignee.id == 0 ? (
                <TableCell className={classes.tableCell} alig="left">
                  {" "}
                </TableCell>
              ) : (
                <TableCell className={classes.tableCell} align="left">
                  {task.asignee.name + ' ' + task.asignee.surname}
                </TableCell>
              )}
              <TableCell className={classes.tableCell} align="left">
                {displayStatus(task.status)}
              </TableCell>
              <TableCell className={classes.tableCell} align="left">
                {task.creator.name + " " + task.creator.surname}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default TasksTable;
