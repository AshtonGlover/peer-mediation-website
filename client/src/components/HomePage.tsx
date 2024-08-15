import { useState } from "react";
import FirestoreDemo from "./AboutUs";
import "../styles/HomePage.css";
import Chat from "./Chat";

enum Section {
  FIRESTORE_DEMO = "FIRESTORE_DEMO",
  CHAT = "CHAT"
}

export default function MapsGearup() {
  const [section, setSection] = useState<Section>(Section.FIRESTORE_DEMO);

  const setChatButton = () => {
    if (section === Section.FIRESTORE_DEMO) {
      setSection(Section.CHAT);
    } else {
      setSection(Section.FIRESTORE_DEMO);
    }
  };

  if (section === Section.FIRESTORE_DEMO) {
    return (
      <div className="home-page">
        <h1 aria-label="Page Title">About Us</h1>
        
          {section === Section.FIRESTORE_DEMO ? <FirestoreDemo /> : <Chat isAdmin = {false} uid = {null}/>}

          <div className="chat-button">
            {section === Section.FIRESTORE_DEMO ? 
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
