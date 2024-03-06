import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArticleIcon from '@mui/icons-material/Article';
import { Container, Fab, List } from "@mui/material";
import { Box } from "@mui/system";
import React from 'react';
import BasicInput from '../components/BasicInput';
import Navigator from '../components/Navigator';
import OneChat from "../components/OneChat";

import '../css/App.css'
import '../css/BotChatPage.css'

// bot聊天页
const BotChatPage: React.FC = () => {
    return (
        <>
            <Navigator />
            <div className="main-container bot-chat-container">
                <Container>
                    <List>
                        <OneChat id="1" name="Creeper" avatar=""
                                 content={'Make up a 5-sentence story about "Sharky", a tooth-brushing shark superhero. Make each sentence a bullet point.'}/>
                        <OneChat id="2" name="ChatGPT" avatar="" content={
                            '- In the depths of the ocean, there existed a remarkable creature known as Sharky, a shark with a passion for dental hygiene and a secret identity as a superhero. \n' +
                            '- With a sleek, silver costume adorned with a toothbrush emblem, Sharky patrolled the seas, ensuring all marine life kept their teeth sparkling clean. \n' +
                            '- Armed with a special toothpaste that could banish even the most stubborn plaque, Sharky swiftly dealt with any dental neglect among his fellow sea creatures. \n' +
                            '- His reputation as a tooth-brushing shark superhero spread far and wide, earning him admiration and respect from creatures great and small. \n' +
                            '- And so, with each swoosh of his toothbrush and flash of his smile, Sharky continued his noble mission to promote dental health throughout the ocean, one tooth at a time.'}/>
                        <OneChat id="3" name="Creeper" avatar="" content={
                            'Make another story'
                        }/>
                        <OneChat id="4" name="ChatGPT" avatar="" content={
                            '- In the azure depths of the vast ocean, there existed a unique figure whose legend stretched far and wide—Sharky, the tooth-brushing shark superhero, whose passion for dental hygiene surpassed that of any other creature beneath the waves.\n' +
                            '- Born with a keen sense of duty and armed with a gleaming toothbrush and a supply of the finest seaweed-infused toothpaste, Sharky embarked on his noble mission to safeguard the dental health of all marine life.\n' +
                            '- With graceful strokes and a determined spirit, Sharky traversed the ocean depths, tirelessly seeking out those in need of his expert dental care.\n' +
                            '- As word of Sharky\'s heroic deeds spread, he became a symbol of hope and inspiration to creatures of all sizes, his legacy etched into the annals of oceanic folklore as the greatest tooth-brushing shark superhero the world had ever known.'
                        }/>
                    </List>
                </Container>
            </div>
            <div>
                <Box
                    style={{
                        display: 'flex',
                        position: 'fixed',
                        bottom: 0,
                        flexDirection:'row',
                        justifyContent:'center',
                        alignItems: 'center',
                        width: '100%',
                        backgroundColor: 'white',
                    }}
                >
                    <Fab variant="extended" size="large" style={{ color:'white' }}>
                        <ArticleIcon fontSize='large'/>
                    </Fab>
                    <div style={{width: '604px', margin: '20px'}}>
                        <BasicInput placeholder="Enter your message here..." name="message"/>
                    </div>
                    <Fab variant="extended" size="large" style={{ color:'white' }}>
                        <ArrowCircleUpIcon fontSize='large'/>
                    </Fab>
                </Box>
            </div>
        </>
    );
}

export default BotChatPage;
