import { useState } from "react";
import AboutUs from "./AboutUs";
import "../styles/HomePage.css";
import Chat from "./Chat";

enum Section {
  ABOUT_US = "ABOUT_US",
  CHAT = "CHAT"
}

export default function MapsGearup() {
  const [section, setSection] = useState<Section>(Section.ABOUT_US);

  const setChatButton = () => {
    if (section === Section.ABOUT_US) {
      setSection(Section.CHAT);
    } else {
      setSection(Section.ABOUT_US);
    }
  };

  if (section === Section.ABOUT_US) {
    return (
      <div className="home-page">
        <h1 aria-label="Page Title">About Us</h1>
        
          {section === Section.ABOUT_US ? <AboutUs /> : <Chat isAdmin = {false} uid = {null}/>}

          <div className="chat-button">
            {section === Section.ABOUT_US ? 
            <button onClick={() => setChatButton()}> Chat </button>:
            <button onClick={() => setChatButton()}> Back </button>}
          </div>
      </div>
    );
  } else {
    return (
      <div className="home-page">
        <Chat isAdmin = {false} uid = {null}/>
        <button onClick={() => setChatButton()}> Back </button>
      </div>
    );
  }
}
