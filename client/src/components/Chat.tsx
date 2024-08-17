import React from 'react';
import "../styles/Chat.css"
import { useState, useEffect, useRef } from 'react';
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

    const scroll = () => {
        let scrollBox = document.getElementById("text-scroll");
                        
        if (scrollBox) {
            scrollBox.scrollTop = scrollBox.scrollHeight;
        }
    };

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
                <div className="text-scroll" id="text-scroll">
                    {messages.map((message, index) => {
                        let backgroundColor;

                        if (message.includes("Peer Mediator")) {
                            backgroundColor = '#007bff';
                        } else {
                            backgroundColor = '#38cba0';
                        }

                        scroll();

                        return (
                            <div key={index} className="message" style={{ backgroundColor: backgroundColor }}>
                                {message}
                            </div>
                        );
                    })}
                </div>
            <div className="form-group">
                <label htmlFor="message">Message: </label>
                <input
                    placeholder='Type message here'
                    type="text"
                    id="message"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            document.getElementById('send-button')?.click()
                        }
                    }}
                />
                <button
                    id='send-button'
                    onClick={() => {
                        const newMessage = (document.getElementById("message") as HTMLInputElement).value;
                        if (newMessage === "") {
                            return
                        }
                        handleSendMessage(newMessage);
                        var temp = document.getElementById("message") as HTMLInputElement;
                        temp.value = "";
                        scroll();
                    }}
                >Send</button>
            </div>
        </div>
    );
};

export default Chat;