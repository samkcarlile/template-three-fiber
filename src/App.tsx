import { OrbitControls } from '@react-three/drei/core/OrbitControls';
import { Canvas } from '@react-three/fiber';
import { Leva, useControls } from 'leva';
import { Color } from 'three';
import './App.css';
import { SpinningCube } from './components/SpinningCube';
import { useEffect, useState } from 'react';

function App() {
  const controls = useControls('Camera', {
    orbit: { label: 'Orbit', value: false },
    orbitSpeed: { label: 'Speed', value: 1, min: 0.5, max: 10 },
  });

  const [levaCollapsed, setLevaCollapsed] = useState(true);
  useEffect(() => {
    setTimeout(() => setLevaCollapsed(false), 100);
  }, []);

  return (
    <>
      <Leva
        collapsed={{ collapsed: levaCollapsed, onChange: setLevaCollapsed }}
      />
      <div id="canvas-container">
        <Canvas
          camera={{ zoom: 0.6 }}
          onCreated={({ scene }) => {
            scene.background = new Color('black');
          }}
        >
          <SpinningCube />
          <OrbitControls
            autoRotate={controls.orbit}
            autoRotateSpeed={controls.orbitSpeed}
          />
          <AxisGridHelper />
        </Canvas>
      </div>
    </>
  );
}

export default App;

function AxisGridHelper() {
  return (
    <>
      <gridHelper />
      <gridHelper rotation-x={Math.PI / 2} />
    </>
  );
}
