import React from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const SelectUser = props => {
  const handleChange = event => {
    if (event.target.value !== "0") {
      props.handleChange(event.target.value);
    }
  }

  if (props.users)
    return (
      <Select
        value={props.userId}
        onChange={handleChange}
      >
        <MenuItem key="key" value="0">Noone</MenuItem>
        {props.users.map((user, index) => {
          return <MenuItem key={index} value={user.id}>{user.name}</MenuItem>
        })}
      </Select>
    )
}


export default SelectUser;