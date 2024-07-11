import { Box, FormControl, Grid, MenuItem, Select, Typography } from "@mui/material";
import { SelectChangeEvent } from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import React, { useEffect } from "react";
import "../css/BotChatPage.css";
import "../css/BotEditPage.css";
import "../css/DetailPage.css";

export function ApiSelect
    ({
        title,
        name,
        defaultSelect
    }: {
        title: string,
        name: string,
        defaultSelect: string
    }) {
    const [value, setValue] = React.useState(defaultSelect);

    useEffect(() => {
        if (defaultSelect) {
            setValue(defaultSelect);
        }
    }, [defaultSelect]);

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
    };

    return (
        <Grid container>
            <Grid item xs={2}>
                <Typography
                    className='edit-label'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    sx={{ color: 'primary.main' }}
                >
                    <p>{title}</p>
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <FormControl fullWidth>
                    <Select
                        value={value}
                        name={name}
                        onChange={handleChange}
                        style={{ borderRadius: '20px' }}
                        required
                    >
                        <MenuItem value={"gpt-3.5-turbo"}>gpt-3.5-turbo</MenuItem>
                        <MenuItem value={"claude-instant-1.2"}>claude-instant-1.2</MenuItem>
                        <MenuItem value={"llama3-70b-8192"}>llama3-70b-8192</MenuItem>
                        <MenuItem value={"moonshot-v1-8k"}>moonshot-v1-8k</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    );
}

export function SliderSelect
    ({
        title,
        name,
        defaultValue,
        min,
        max,
        step,
    }: {
        title: string,
        name: string,
        defaultValue: number,
        min: number,
        max: number,
        step: number
    }) {
    const [value, setValue] = React.useState(defaultValue);

    useEffect(() => {
        if (defaultValue) {
            setValue(defaultValue);
        }
    }, [defaultValue]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number);
    }
    
    return (
        <Grid container>
            <Grid item xs={2}>
                <Typography
                    className='edit-label'
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    sx={{ color: 'primary.main' }}
                >
                    <p>{title}</p>
                </Typography>
            </Grid>
            <Grid item xs={3}>
                <Box display="flex" alignItems="center" height="100%">
                    <Slider
                        name={name}
                        aria-label="Always visible"
                        value={value}
                        onChange={handleChange}
                        step={step}
                        min={min}
                        max={max}
                        valueLabelDisplay="on"
                    />
                </Box>
            </Grid>
        </Grid>
    );
}

export function TypeSelect
    ({
        value,
        defaultValue,
        setValue
    }: {
        value: string,
        defaultValue: string,
        setValue: React.Dispatch<React.SetStateAction<string>>
    }) {

    useEffect(() => {
        if (defaultValue) {
            setValue(defaultValue);
        }
    }, [defaultValue]);

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value as string);
    };

    return (
        <FormControl fullWidth>
            <Select
                value={value}
                defaultValue={defaultValue}
                onChange={handleChange}
                style={{ borderRadius: '20px' }}
                required
            >
                <MenuItem value={"string"}>string</MenuItem>
                <MenuItem value={"integer"}>integer</MenuItem>
                <MenuItem value={"number"}>number</MenuItem>
                <MenuItem value={"boolean"}>boolean</MenuItem>
                <MenuItem value={"object"}>object</MenuItem>
                <MenuItem value={"array"}>array</MenuItem>
            </Select>
        </FormControl>
    );
}