import React, { useRef, useState } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

function AddForm(props) {
    const [clear, setClear] = useState(false);

    let inputField = useRef();

    const CssTextField = withStyles({
        root: {
            '& label': {
                color: '#000',
                fontFamily: `"Chakra Petch", sans-serif`,
                fontWeight: 600
            },
            '& label.Mui-focused': {
                color: '#000',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: '#517C2A',
            },
            '& .MuiInput-root': {
                fontFamily: `"Chakra Petch", sans-serif`,
                fontWeight: 600
            }
        }
    })(TextField);


    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1)
        },
    }));

    const classes = useStyles();

    const handleSubmitThis = (e) => {
        e.preventDefault();
        if (inputField.value.length > 0) {
            props.handlesubmit(inputField.value);
            setClear(!clear)
        }
    }
    return (
        <div className="AddForm">
            <form className={classes.root} noValidate onSubmit={handleSubmitThis} autoComplete="off">
                <CssTextField
                    className={classes.margin}
                    label="Add your own"
                    variant="standard"
                    id="custom-css-outlined-input"
                    fullWidth={true}
                    inputRef={(c) => { inputField = c }}
                    clear={clear.toString()}
                />
                <AddRoundedIcon onClick={handleSubmitThis} />
            </form>
        </div>
    );
}

export default AddForm;
