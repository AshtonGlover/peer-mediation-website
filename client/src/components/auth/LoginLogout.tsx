import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useRef } from "react";
import { addLoginCookie, removeLoginCookie } from "../../utils/cookie";
import "../../styles/LoginLogout.css";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls } from "@react-three/drei";
import { useLoader } from "react-three-fiber";
import { TextureLoader } from "three";
import { isMobile } from "react-device-detect";
import * as THREE from 'three';

export interface ILoginPageProps {
  loggedIn: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isAdmin: boolean;
  setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FunctionComponent<ILoginPageProps> = (props) => {
  const auth = getAuth();
  const texture = useLoader(TextureLoader, '/CHSLogo.png');

  const signInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, new GoogleAuthProvider());
      const userEmail = response.user.email || "";

      if (userEmail.endsWith("clover.k12.sc.us") || userEmail.endsWith("ver@brown.edu")) {
        console.log(response.user.uid);
        addLoginCookie(response.user.uid);
        props.setLogin(true);
      } else {
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

const RotatingCube = () => {
  const cubeRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.01;
      cubeRef.current.rotation.y += 0.005;
    }
  });

  return (
    <mesh ref={cubeRef} position={[0, -0.2, 0]} castShadow receiveShadow>
      <boxGeometry args={[3.3, 3.3, 3.3]} attach="geometry" />
      <meshStandardMaterial attach="material" color="#EEEEFF" map={texture} />
    </mesh>
  );
};

  return (
    <div aria-label="login box" className="login-box">
      <h1>CHS Peer Mediation: Login Page</h1>

      <div className="logo-box">
        {!isMobile ? (
          <Canvas shadows>
            <OrbitControls />
            <ambientLight intensity={1} />

            {/* <spotLight
              position={[5, 10, 5]}
              angle={0.8}        
              penumbra={1}      
              intensity={200} 
              castShadow             
            />

            <spotLight
              position={[-5, 10, -5]}
              angle={0.8}        
              penumbra={1}      
              intensity={100} 
              castShadow           
            />

            <spotLight
              position={[5, -10, 5]}
              angle={0.8}        
              penumbra={1}      
              intensity={100}   
              castShadow         
            /> */}

            {/* <mesh position={[0, 0, 0]} castShadow receiveShadow rotation={[Math.PI / 4, Math.PI / 4, 0]}>
              <boxGeometry args={[3.3, 3.3, 3.3]} attach="geometry" />
              <meshPhongMaterial 
                attach="material" 
                color="#EEEEFF"  
                map={texture}/>
            </mesh> */}
            <RotatingCube/>
          </Canvas>
        ) : (
          <div aria-label="image" className="image">
            <img 
              aria-label="Clover High School Image" 
              src="/CHSLogo.png">
            </img>
          </div>
        )}
      </div>
      
      <div aria-label="button container" className="button-container">
        <button
          aria-label="sign in with google"
          className="google-login-button"
          onClick={() => signInWithGoogle()}
          disabled={props.loggedIn}
        >
          Sign in with Google
        </button>
        
        <button
          aria-label="admin login button"
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
    <div aria-label="logout box" className="logout-box">
      <button aria-label="sign out" className="SignOut" onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
};

const LoginLogout: React.FunctionComponent<ILoginPageProps> = (props) => {
  return <>{!props.loggedIn ? <Login {...props} /> : <Logout {...props} />}</>;
};

export default LoginLogout;