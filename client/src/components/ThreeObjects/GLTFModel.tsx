import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { useRef, useEffect } from "react";
import * as THREE from 'three';

const GLTFModel: React.FC<{ url: string }> = ({ url }) => {
    const { scene } = useGLTF(url);
    const modelRef = useRef<THREE.Group>(null);
  
    useEffect(() => {
      if (modelRef.current) {
        modelRef.current.rotation.x = -Math.PI / 2;
        modelRef.current.position.set(0, -4, -2);
      }
    }, [scene]);
  
    useFrame(({ clock }) => {
      if (modelRef.current) {
        const time = clock.getElapsedTime(); 
        modelRef.current.rotation.z = time; 
      }
    });
  
    return <primitive ref={modelRef} object={scene} />;
};

export default GLTFModel