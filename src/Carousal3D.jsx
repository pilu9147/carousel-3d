
import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useThree, useLoader } from 'react-three-fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';
import model1 from './modals/model1.glb';
import model2 from './modals/model2.glb';
import model3 from './modals/model3.glb';
import { ambientLight, DirectionalLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Html, useProgress } from '@react-three/drei';

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function CameraControls() {
  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    controlsRef.current = new OrbitControls(camera, gl.domElement);
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
    return () => {
      controlsRef.current.dispose();
    };
  }, [camera, gl]);

  return null;
}

function Carousel3D({ modelIndex }) {
  const carouselRef = useRef();
  const [loadedModel, setLoadedModel] = useState(null);
  const models = [model1, model2, model3];

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(models[modelIndex], (gltf) => {
      const loadedModel = gltf.scene;
      loadedModel.scale.set(1.5, 1.5, 1.5);
      setLoadedModel(loadedModel);
    });
  }, [modelIndex]);

  const scrollHandler = (e) => {
    if (loadedModel) {
      const rotationSpeed = 1;
      loadedModel.rotation.y += e.deltaY * rotationSpeed;
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', scrollHandler);
    return () => {
      window.removeEventListener('wheel', scrollHandler);
    };
  }, [loadedModel]);

  const animate = () => {
    if (loadedModel) {
      loadedModel.rotation.y += 0.002;
    }
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    animate();
  }, [loadedModel]);

  return (
    <Canvas style={{ height: '90vh', width: '100vw' }}>
      <Suspense fallback={<Loader />}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={0.8} />
        <group ref={carouselRef}>
          {loadedModel && (
            <mesh>
              <primitive object={loadedModel} />
            </mesh>
          )}
        </group>
        <CameraControls />
      </Suspense>
    </Canvas>
  );
}

export default Carousel3D;
