import {TextField} from "@mui/material";
import React from "react";
import "../css/PromptTextField.css"
const PromptTextField = ()=> {
    return (
        <TextField
            placeholder="Enter your message here..."
            InputProps={{className: 'prompt-text-field-input'}}
            multiline
            maxRows={5}
        />
    );
};
export default PromptTextField;
