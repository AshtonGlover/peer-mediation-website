import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { addLoginCookie, removeLoginCookie } from "../../utils/cookie";
import "../../styles/LoginLogout.css"

export interface ILoginPageProps {
  loggedIn: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FunctionComponent<ILoginPageProps> = (props) => {
  const auth = getAuth();

  const signInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, new GoogleAuthProvider());
      const userEmail = response.user.email || "";

      // Check if the email ends with the allowed domain
      if (userEmail.split("@")[1] === process.env.USER_EMAIL || userEmail === process.env.ADMIN_EMAIL) {
        console.log(response.user.uid);
        // add unique user id as a cookie to the browser.
        addLoginCookie(response.user.uid);
        props.setLogin(true);
      } else {
        // User is not allowed, sign them out and show a message
        await auth.signOut();
        console.log("User not allowed. Signed out.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const adminClicked = () => {
      props.setAdmin(true)
      props.setLogin(true)
  };

  return (
    <div className="login-box">
      <h1>CHS Peer Mediation: Login Page</h1>
      
      <div className="image">
        <img src="https://cmsv2-assets.apptegy.net/uploads/21138/logo/23952/Clover_HS_Logo.png"></img>
      </div>
      
      <div className="button-container">
        <button
          className="google-login-button"
          onClick={() => signInWithGoogle()}
          disabled={props.loggedIn}
        >
          Sign in with Google
        </button>
        
        <button
          className="admin-login-button"
          onClick={() => adminClicked()}
          disabled={props.loggedIn}
        >
          Sign in as Admin
        </button>
      </div>
    </div>
  );
};

const Logout: React.FunctionComponent<ILoginPageProps> = (props) => {
  const signOut = () => {
    removeLoginCookie();
    props.setLogin(false);
    if (props.isAdmin) {
      props.setAdmin(false)
    }
  };

  return (
    <div className="logout-box">
      <button className="SignOut" onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
};

const LoginLogout: React.FunctionComponent<ILoginPageProps> = (props) => {
  return <>{!props.loggedIn ? <Login {...props} /> : <Logout {...props} />}</>;
};

export default LoginLogout;
