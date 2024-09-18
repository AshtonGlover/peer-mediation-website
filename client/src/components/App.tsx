import { initializeApp } from "firebase/app";
import "../styles/App.css";
import HomePage from "./HomePage";
import AuthRoute from "./auth/AuthRoute";
import { useEffect, useState } from "react";

function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyCYoUkLZ05dMApIpQnJ-vZKjqzRQqSJRmE",
      authDomain: "peer-mediation-db.firebaseapp.com",
      projectId: "peer-mediation-db",
      storageBucket: "peer-mediation-db.appspot.com",
      messagingSenderId: "331558478532",
      appId: "1:331558478532:web:e4736c2d849576f17d1f91"
    };
    initializeApp(firebaseConfig);
    setFirebaseInitialized(true);
  }, []);

  if (!firebaseInitialized) {
    return (
      <div>
        <div aria-label="loading page" className="loading-container">
          <div aria-label="loading" className="loading"></div>
          <div aria-label="loading label" className="loading-label">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="App" aria-label="App">
      <AuthRoute gatedContent={<HomePage />} />
    </div>
  );
}

export default App;
