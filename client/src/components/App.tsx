import { initializeApp } from "firebase/app";
import "../styles/App.css";
import HomePage from "./HomePage";
import AuthRoute from "./auth/AuthRoute";
import { useEffect, useState } from "react";

function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyBN_RP2_N3TDMyTBml6ysgMLZXJP2Xa49Y",
      authDomain: "peermediation-db.firebaseapp.com",
      projectId: "peermediation-db",
      storageBucket: "peermediation-db.appspot.com",
      messagingSenderId: "698055007167",
      appId: "1:698055007167:web:e4cb05405eeb34b409df0a"
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
