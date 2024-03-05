import { Button } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import BasicInput from '../components/BasicInput';
import Navigator from '../components/Navigator';
import '../css/BotEditPage.css';

// bot创建/修改页
const BotEditPage: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string>('/assets/bot-default.png');

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const target = event.target as typeof event.target & {
            name: { value: string };
            email: { value: string };
        };
        const name = target.name.value; 
        const email = target.email.value; 

        // 在这里处理 name 和 email
        console.log(`name:${name}, email:${email}`);
    };

    return [
        <Navigator/>,
        <div className='bot-edit-container'>
             <form onSubmit={handleSubmit}>
                <div className='edit-basic-container'>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        style={{display: 'none'}} 
                        id="imageUpload" 
                    />
                    <label htmlFor="imageUpload">
                        <img 
                            src={selectedImage} 
                            alt="Selected" 
                            className='edit-avator'
                        />
                    </label>
                    <BasicInput 
                        placeholder='Bot Name' 
                        name='name'
                    />
                    <BasicInput 
                        placeholder='Email' 
                        name='email'
                    />
                </div>
                
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </div>
    ];
}

export default BotEditPage;