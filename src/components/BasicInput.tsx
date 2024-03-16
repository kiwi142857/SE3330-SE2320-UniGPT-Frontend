import { TextField } from "@mui/material";
import React from "react";
import "../css/BasicInput.css";

// 基本输入框，通用
type BasicInputProps = {
    placeholder: string;
    name: string;
    required?: boolean;
};

const BasicInput: React.FC<BasicInputProps> = ({placeholder, name, required = false}) => {
    return (
        <TextField
            required={required}
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

// 以及required的用处，这个是用来标记这个输入框是否是必填的。使用form的提交时，
// 如果这个输入框是必填的，那么提交的时候会检查这个输入框是否有值，如果没有值，就会提示并且无法提交
// 现在默认情况下为false，也就是说如果你不传required这个参数，那么这个输入框就不是必填的

// 关于如何使用form，示例代码如下，还可以参考BotEditPage.tsx的做法

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
//         <TextField name="name" label="Name" variant="outlined" required/>
//         <TextField name="email" label="Email" variant="outlined" required/>
//         <Button type="submit" variant="contained" color="primary">
//             Submit
//         </Button>
//     </form>
// );
