import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";

// Model component with static rotation
function Model({ url, scale = 1.5 }) {
  const gltf = useGLTF(url);

  useEffect(() => {
    if (gltf && gltf.scene) {
      console.log(`✅ Model loaded successfully: ${url}`);
    } else {
      console.warn(`⚠️ Model not loaded or missing scene: ${url}`);
    }
  }, [gltf, url]);

  if (!gltf || !gltf.scene) {
    return null;
  }

  return (
    <primitive
      object={gltf.scene}
      scale={scale}
      position={[0, -0.5, 0]}
      rotation={[0,- Math.PI / 2, 0]} // Static Y-axis rotation (45 degrees)
    />
  );
}

export default function DrawerPreview({ colorVariants, selectedColor, onColorSelect }) {
  const modelUrl = `/models/ChestofDrawers/001.${selectedColor + 1}.glb`;

  useEffect(() => {
    console.log("🧩 Loading GLB model URL:", modelUrl);
  }, [modelUrl]);

  return (
    <div className="flex-1 flex flex-col items-center">
      {/* 3D Model Viewer */}
      <div className="w-full max-w-[600px] h-[250px] sm:h-[400px] bg-black rounded-lg overflow-hidden shadow-xl">
        <Canvas camera={{ position: [0, 3, 3], fov: 45 }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Suspense
            fallback={
              <Html center>
                <p className="text-white">Loading model...</p>
              </Html>
            }
          >
            <Model key={modelUrl} url={modelUrl} scale={1.5} />
          </Suspense>
          <OrbitControls enableZoom enablePan enableRotate />
        </Canvas>
      </div>

      {/* Color Variant Buttons */}
      <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 mt-6 sm:mt-8">
        {colorVariants.map((img, idx) => (
          <button
            key={img}
            onClick={() => onColorSelect(idx)}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-4 ${
              selectedColor === idx ? "border-[#F4C16B]" : "border-transparent"
            }`}
          >
            <img src={img} alt={`Variant ${idx + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

// Preload all models for performance
useGLTF.preload("/models/ChestofDrawers/001.1.glb");
useGLTF.preload("/models/ChestofDrawers/001.2.glb");
useGLTF.preload("/models/ChestofDrawers/001.3.glb");
useGLTF.preload("/models/ChestofDrawers/001.4.glb");
useGLTF.preload("/models/ChestofDrawers/001.5.glb");
