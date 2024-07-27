import React from 'react';
import "../styles/Chat.css"
import { useState, useEffect } from 'react';
import {addWord, getWords} from "../utils/api"
import { getLoginCookie } from '../utils/cookie';

export interface adminData {
    isAdmin: boolean;
    uid: string | null;
    //if uid is not null, that means that that is the users cookie we want to access chat history from
    //from the admin side, click a button with cookie "fasjkdfksdjf" then that is the uid we should be 
    //querying the backend with
}

const Chat: React.FunctionComponent<adminData> = (props) => {
    const [messages, setMessages] = useState<string[]>([]);

    const USER_ID = getLoginCookie() || "";

    useEffect(() => {
        getWords().then((data) => {
            setMessages(data.words)
        });
    }, []);


    const handleSendMessage = async (newMessage: string) => {
        if (props.isAdmin) {
            newMessage += ": " + "ADMIN"
        } else {
            newMessage += ": " + USER_ID
        }
        setMessages([...messages, newMessage]);
        await addWord(newMessage);
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
                }}>Send 🛩️</button>
            </div>
        </div>
    );
};

export default Chat;