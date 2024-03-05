import { TextField } from "@mui/material";
import React from "react";
import "../css/BasicInput.css";

// 基本输入框，通用
const BasicInput = ({placeholder,name}:{placeholder:string, name:string})=> {
    return (
        <TextField
            name={name}
            placeholder={placeholder}
            InputProps={{className: 'basic-input'}}
            style={{width: '100%'}}
            multiline
            maxRows={5}
        />
    );
};

export default BasicInput;

// 可能你暂时不太懂name有什么用，是这样的，当你在form里面使用TextField组件的时候，
// 你可以通过name来获取这个输入框的值
// 因为我们做输入框最终也是为了提交东西到后端的，所以我们需要获取输入框的值

// const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     const target = event.target as typeof event.target & {
//         name: { value: string };
//         email: { value: string };
//     };
//     const name = target.name.value; 
//     const email = target.email.value; 

//     console.log(name, email);
// };

// return (
//     <form onSubmit={handleSubmit}>
//         <TextField name="name" label="Name" variant="outlined" />
//         <TextField name="email" label="Email" variant="outlined" />
//         <Button type="submit" variant="contained" color="primary">
//             Submit
//         </Button>
//     </form>
// );
