import { Checkbox, Typography } from "@mui/material";
import React, { ChangeEvent } from "react";
import '../css/BotEditPage.css';

function CheckTitle({check, onCheck, title} : 
    {check: boolean, onCheck: (event: ChangeEvent<HTMLInputElement>) => void, title: string}) {
  return (
        <div className='edit-title-container'>
            <Checkbox
                checked={check}
                onChange={onCheck}
            />
            <Typography 
                className='edit-label' 
                style={{ display: 'flex', alignItems: 'center' }}
                sx={{color: 'primary.main'}}
            >
                {title}
            </Typography>
        </div>
    );
}

export default CheckTitle;