import { useState } from "react";
import FirestoreDemo from "./FirestoreDemo";
import "../styles/HomePage.css"

enum Section {
  FIRESTORE_DEMO = "FIRESTORE_DEMO",
  MAP_DEMO = "MAP_DEMO",
}

export default function MapsGearup() {
  const [section, setSection] = useState<Section>(Section.FIRESTORE_DEMO);

  return (
    <div className="home-page">
      <h1 aria-label="Page Title">About Us</h1>
      <button onClick={() => setSection(Section.FIRESTORE_DEMO)}>
        Section 1: Firestore Demo
      </button>
      {/* <button onClick={() => setSection(Section.MAP_DEMO)}>
        Section 2: Mapbox Demo
      </button> */}
      {section === Section.FIRESTORE_DEMO ? <FirestoreDemo /> : null}
      {/* {section === Section.MAP_DEMO ? <Mapbox /> : null} */}
    </div>
  );
}
