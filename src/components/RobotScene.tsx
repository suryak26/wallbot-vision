import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls, OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Model() {
  const ref = useRef<THREE.Group>(null);
  const scannerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.5;
      ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.15 - 0.5;
      ref.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
      ref.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.5) * 0.05;
    }
    if (scannerRef.current) {
      scannerRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 2) * 0.2 + 0.5;
    }
  });

  return (
    <group ref={ref} position={[0, -0.5, 0]}>
      {/* Robot Chassis */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.2, 0.4, 1.2]} />
        <meshStandardMaterial color="#00f2ff" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Tech Core */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.8, 0.6, 0.8]} />
        <meshStandardMaterial color="#7000ff" emmissive="#7000ff" emissiveIntensity={2} />
      </mesh>

      {/* Scanner Beam */}
      <mesh ref={scannerRef} position={[0, 0.8, 0.7]}>
        <boxGeometry args={[0.1, 0.05, 0.3]} />
        <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={5} />
      </mesh>

      {/* Legs (Procedural) */}
      {[[-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]].map((pos, i) => (
        <group key={i} position={[pos[0], 0.2, pos[1]]}>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.4]} />
            <meshStandardMaterial color="#222" metalness={0.8} />
          </mesh>
          <mesh position={[0, -0.2, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#00f2ff" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export const RobotScene = () => {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative">
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <Canvas dpr={[1, 2]} shadows camera={{ position: [0, 0, 5], fov: 45 }}>
          <color attach="background" args={['#08080a']} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />
          
          <PresentationControls
            speed={1.5}
            global
            zoom={0.7}
            polar={[-0.1, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Stage environment="city" intensity={0.6} contactShadow={{ opacity: 0.7, blur: 2 }}>
              <Model />
            </Stage>
          </PresentationControls>
          
          <Environment preset="night" />
        </Canvas>
      </Suspense>
      
      {/* Decorative UI elements around the 3D model */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 right-10 border-r-2 border-t-2 border-primary/40 w-12 h-12" />
        <div className="absolute bottom-10 left-10 border-l-2 border-b-2 border-primary/40 w-12 h-12" />
        
        <div className="absolute bottom-20 right-10 text-right opacity-40 uppercase tracking-[0.2em] text-[10px]">
          <p>Structural.Analysis.v8</p>
          <p>YOLOv8.Enabled.System</p>
        </div>
      </div>
    </div>
  );
};
