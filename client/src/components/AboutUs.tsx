import "../styles/AboutUs.css";
import { Canvas } from '@react-three/fiber';
import GLTFModel from './ThreeObjects/GLTFModel'

/**
 * React component to render the about us text. Allows for easy switching between this and the chat
 * section. 
 */
export default function AboutUs() {

  return (
    <div aria-label="about-us" className="about-us">
      <p aria-label="about-us-text" className = "about-us-text"> 
        This is the official website for the Clover High School Peer Mediation club. 
        The purpose of peer mediation is to assist students in resolving any conflicts that they 
        are facing effectively. We seek to provide students with a place where they feel comfortable
        talking about their concerns with other students. There is an interest in peer mediation 
        because students at Clover High School need to be able to navigate their conflicts in a 
        way that will not hurt them, the person they are concerned about, or the school. 
        Peer mediation provides a way to avoid bad habits when resolving conflicts and 
        allows students to talk to those will understand them the most, peers.
      </p>

      <div className="model-container">
        <Canvas>
          <perspectiveCamera position={[0, 5, 10]} fov={100} near={0.1} far={1000} />
          <ambientLight intensity={0.5} />
          <spotLight 
            position={[10, 10, 10]} 
            angle={0.3} 
            penumbra={0.5} 
            intensity={100} 
            distance={50} 
            castShadow 
          />
          <spotLight 
            position={[-10, 10, 10]} 
            angle={0.3} 
            penumbra={0.5} 
            intensity={100} 
            distance={50} 
            castShadow 
          />
          <spotLight 
            position={[10, -10, 10]} 
            angle={0.3} 
            penumbra={0.5} 
            intensity={100} 
            distance={50} 
            castShadow 
          />
          <spotLight 
            position={[10, 10, -10]} 
            angle={0.3} 
            penumbra={0.5} 
            intensity={100} 
            distance={50} 
            castShadow 
          />
          <spotLight 
            position={[0, -6, 0]}
            angle={1} 
            penumbra={0.5} 
            intensity={300} 
            distance={500} 
            castShadow 
          />
          <GLTFModel url="/flower.gltf"/>
        </Canvas>
      </div>
    </div>
  );
}
