import {TextField} from "@mui/material";
import React from "react";
import "../css/PromptTextField.css"
const PromptTextField = ()=> {
    return (
        <div
            className="prompt-text-field"
        >
            <TextField
                InputProps={{ className:'prompt-text-field-input' }}
                placeholder="Enter your message here..."
                multiline
                maxRows={5}
            />
        </div>
    );
};
export default PromptTextField;
