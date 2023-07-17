import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    container: {
        flexGrow: 1,
        width: '305px',
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
    inputInput: {
        width: '300px',
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing(2),
    },
}));

const renderInput = (inputProps) => {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

renderInput.propTypes = {
    classes: PropTypes.object.isRequired,
    InputProps: PropTypes.object,
};

const renderSuggestion = (suggestionProps) => {
    const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.name) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion._id}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion.name}
        </MenuItem>
    );
}

renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]).isRequired,
    index: PropTypes.number.isRequired,
    itemProps: PropTypes.object.isRequired,
    selectedItem: PropTypes.string.isRequired,
    suggestion: PropTypes.shape({
        label: PropTypes.string.isRequired,
    }).isRequired,
};

const getSuggestions = (value, users, { showEmpty = false } = {}) => {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;
    return inputLength === 0 && !showEmpty
    ? []
    : users.filter(suggestion => {
            const keep =
                count < 5 && suggestion.name.slice(0, inputLength).toLowerCase()  === inputValue;

            if (keep) {
                count += 1;
            }
            return keep;
        });
}

const SelectUsers = (props) => {
    const classes = useStyles();
    const [inputValue, setInputValue] = React.useState('');
    const [selectedItem, setSelectedItem] = React.useState([]);

    const handleKeyDown = (event) => {
        if (selectedItem.length && !inputValue.length && event.key === 'Backspace') {
            setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
        }
    }

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleChange = (item) => {
        let newSelectedItem = [...selectedItem];
        if (newSelectedItem.indexOf(item) === -1) {
            newSelectedItem = [...newSelectedItem, item];
        }
        setInputValue('');
        setSelectedItem(newSelectedItem);
        props.updateUsers(newSelectedItem);
    }

    const handleDelete = item => () => {
        const newSelectedItem = [...selectedItem];
        newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
        setSelectedItem(newSelectedItem);
    };

    return (
        <Downshift
            id="downshift-multiple"
            inputValue={inputValue}
            onChange={handleChange}
            selectedItem={selectedItem}
            itemToString={() => {}}
        >
            {({
                getInputProps,
                getItemProps,
                getLabelProps,
                isOpen,
                inputValue: inputValue2,
                selectedItem: selectedItem2,
                highlightedIndex,
            }) => {
                const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
                    onKeyDown: handleKeyDown,
                    placeholder: 'Select users',
                });

                return (
                    <div className={classes.container}>
                        {renderInput({
                            fullWidth: true,
                            classes,
                            label: 'Users',
                            InputLabelProps: getLabelProps(),
                            InputProps: {
                                startAdornment: selectedItem.map(item => (
                                    <Chip
                                        key={item._id}
                                        tabIndex={-1}
                                        label={item.name}
                                        className={classes.chip}
                                        onDelete={handleDelete(item)}
                                    />
                                )),
                                onBlur,
                                onChange: event => {
                                    handleInputChange(event);
                                    onChange(event);
                                },
                                onFocus,
                            },
                            inputProps,
                        })}

                        {isOpen ? (
                            <Paper className={classes.paper} square>
                                {getSuggestions(inputValue2, props.users).map((suggestion, index) =>
                                    renderSuggestion({
                                        suggestion,
                                        index,
                                        itemProps: getItemProps({ item: suggestion }),
                                        highlightedIndex,
                                        selectedItem: selectedItem2,
                                    }),
                                )}
                            </Paper>
                        ) : null}
                    </div>
                );
            }}
        </Downshift>
    );
}

export default SelectUsers;