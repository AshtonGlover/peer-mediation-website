import React from 'react';
import "../styles/Chat.css"
import { useState, useEffect } from 'react';
import {addWord, getWords, addCookie} from "../utils/api"
import { getLoginCookie } from '../utils/cookie';
import AdminDashboard from './auth/AdminDashboard'

export interface adminData {
    isAdmin: boolean;
    uid: string | null;
}

const Chat: React.FunctionComponent<adminData> = (props) => {
    const [messages, setMessages] = useState<string[]>([]);

    const USER_ID = (props.uid === null) ? getLoginCookie() || "" : props.uid;

    useEffect(() => {
        getWords(USER_ID).then((data) => {
            setMessages(data.words)
        });
    }, []);


    const handleSendMessage = async (newMessage: string) => {
        if (props.isAdmin) {
            newMessage = "Peer Mediator: " + newMessage;
        } else {
            newMessage = "Student User: " + newMessage;
        }
        setMessages([...messages, newMessage]);

        if (props.uid === null) {
            await addCookie(USER_ID);
        } 
        await addWord(USER_ID, newMessage);
    };

    return (
        <div className="chat-page">
            <h1>Chat Page</h1>
            <div className="text-scroll">
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        {message}
                    </div>
                ))}
            </div>
            <div className="form-group">
                <label htmlFor="message">Message: </label>
                <input
                    type="text"
                    id="message"
                />
                <button onClick={() => {
                    const newMessage = (
                        document.getElementById("message") as HTMLInputElement
                    ).value;
                    handleSendMessage(newMessage);
                    var temp = document.getElementById("message") as HTMLInputElement;
                    temp.value = "";
                }}>Send</button>
            </div>
        </div>
    );
};

export default Chat;