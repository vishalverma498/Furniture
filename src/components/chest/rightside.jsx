import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Html,
  Environment,
  Line,
  ContactShadows,
} from "@react-three/drei";
import { EXRLoader } from "three-stdlib";
import * as THREE from "three";
import {
  Sun,
  Moon,
  Square,
  Eye,
  EyeOff,
  Info,
} from "lucide-react";

// Load .exr skydome lighting (skylight only, no background)
function EXREnvironment({ path }) {
  const texture = useLoader(EXRLoader, path);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  return <Environment background={false} map={texture} />;
}

// Dimension box with labels
function DimensionBox({ box }) {
  if (!box) return null;

  const min = box.min;
  const max = box.max;

  const corners = [
    new THREE.Vector3(min.x, min.y, min.z),
    new THREE.Vector3(max.x, min.y, min.z),
    new THREE.Vector3(max.x, max.y, min.z),
    new THREE.Vector3(min.x, max.y, min.z),
    new THREE.Vector3(min.x, min.y, max.z),
    new THREE.Vector3(max.x, min.y, max.z),
    new THREE.Vector3(max.x, max.y, max.z),
    new THREE.Vector3(min.x, max.y, max.z),
  ];

  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 0],
    [4, 5], [5, 6], [6, 7], [7, 4],
    [0, 4], [1, 5], [2, 6], [3, 7],
  ];

  const width = (max.x - min.x).toFixed(2);
  const height = (max.y - min.y).toFixed(2);
  const depth = (max.z - min.z).toFixed(2);

  return (
    <>
      {edges.map(([start, end], i) => (
        <Line
          key={i}
          points={[corners[start], corners[end]]}
          color="black"
          lineWidth={1}
          dashed
          dashSize={0.1}
          gapSize={0.1}
        />
      ))}

      <Html
        position={[(min.x + max.x) / 2, min.y, min.z - 0.05]}
        style={{
          color: "black",
          backgroundColor: "rgba(255,255,255,0.8)",
          padding: "2px 6px",
          borderRadius: "4px",
          fontSize: "12px",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
        center
      >
        Width: {width} m
      </Html>

      <Html
        position={[min.x - 0.05, (min.y + max.y) / 2, min.z]}
        style={{
          color: "black",
          backgroundColor: "rgba(255,255,255,0.8)",
          padding: "2px 6px",
          borderRadius: "4px",
          fontSize: "12px",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
        center
      >
        Height: {height} m
      </Html>

      <Html
        position={[max.x + 0.05, min.y, (min.z + max.z) / 2]}
        style={{
          color: "black",
          backgroundColor: "rgba(255,255,255,0.8)",
          padding: "2px 6px",
          borderRadius: "4px",
          fontSize: "12px",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
        }}
        center
      >
        Depth: {depth} m
      </Html>
    </>
  );
}

// 3D Model Loader
function Model({ url, scale = 1.5, visible = true, onLoad }) {
  const gltf = useGLTF(url);

  useEffect(() => {
    if (gltf?.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      if (onLoad) {
        const box = new THREE.Box3().setFromObject(gltf.scene);
        onLoad(box);
      }
    }
  }, [gltf, onLoad]);

  if (!gltf?.scene || !visible) return null;

  return (
    <primitive
      object={gltf.scene}
      scale={scale}
      position={[0, -0.5, 0]}
      rotation={[0, -Math.PI / 2, 0]}
    />
  );
}

export default function DrawerPreview({ colorVariants, selectedColor, onColorSelect }) {
  const modelUrl = `/models/ChestofDrawers/001.${selectedColor + 1}.glb`;
  const exrPath = "/exr/brown_photostudio_01_2k.exr";

  const [bgWhite, setBgWhite] = useState(true);
  const [showShadow, setShowShadow] = useState(true);
  const [showModel, setShowModel] = useState(true);
  const [box, setBox] = useState(null);
  const [showDimensions, setShowDimensions] = useState(false);

  return (
    <div className="flex-1 flex flex-col items-center">
      <div
        className={`relative w-full max-w-[900px] h-[450px] sm:h-[450px] ${
          bgWhite ? "bg-white" : "bg-black"
        } rounded-lg overflow-hidden shadow-xl`}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, 3], fov: 45 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={showShadow ? 0.7 : 0}
            castShadow={showShadow}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-near={0.5}
            shadow-camera-far={20}
            shadow-camera-left={-5}
            shadow-camera-right={5}
            shadow-camera-top={5}
            shadow-camera-bottom={-5}
          />

          {showShadow && (
            <ContactShadows
              position={[0, -0.49, 0]}
              opacity={0.9}
              width={2}
              height={2}
              blur={2.5}
              far={5}
              resolution={1024}
              color="#000000"
            />
          )}

          <Suspense fallback={null}>
            <EXREnvironment path={exrPath} />
          </Suspense>

          <Suspense
            fallback={
              <Html center>
                <p className="text-white">Loading model...</p>
              </Html>
            }
          >
            <Model
              key={modelUrl}
              url={modelUrl}
              scale={1.5}
              visible={showModel}
              onLoad={setBox}
            />
          </Suspense>

          {showDimensions && <DimensionBox box={box} />}

          <OrbitControls enableZoom enablePan enableRotate />
        </Canvas>

        {/* Dark-Themed Icon Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-3 bg-black bg-opacity-10 rounded-lg p-2 shadow-md z-10 text-black">
          <button
            onClick={() => setBgWhite(!bgWhite)}
            title="Toggle Background"
            className="hover:scale-110 transition"
          >
            {bgWhite ? <Sun size={20} /> : <Sun size={20} />}
          </button>

          <button
            onClick={() => setShowShadow(!showShadow)}
            title="Toggle Shadow"
            className="hover:scale-110 transition"
          >
            <Square size={20} />
          </button>

          <button
            onClick={() => setShowModel(!showModel)}
            title="Toggle Model Visibility"
            className="hover:scale-110 transition"
          >
            {showModel ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>

          <button
            onClick={() => setShowDimensions(!showDimensions)}
            title="Toggle Dimensions"
            className="hover:scale-110 transition"
          >
            <Info size={20} />
          </button>
        </div>
      </div>

      {/* Color Variant Buttons */}
      <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6 mt-6 sm:mt-8 w-full max-w-[600px]">
        {colorVariants.map((img, idx) => (
          <button
            key={img}
            onClick={() => onColorSelect(idx)}
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-4 p-0 m-0 ${
              selectedColor === idx
                ? "border-[#F4C16B]"
                : "border-transparent"
            }`}
            type="button"
          >
            <img
              src={img}
              alt={`Variant ${idx + 1}`}
              className="w-full h-full object-cover block"
              draggable={false}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// Preload GLTF models
useGLTF.preload("/models/ChestofDrawers/001.1.glb");
useGLTF.preload("/models/ChestofDrawers/001.2.glb");
useGLTF.preload("/models/ChestofDrawers/001.3.glb");
useGLTF.preload("/models/ChestofDrawers/001.4.glb");
useGLTF.preload("/models/ChestofDrawers/001.5.glb");
