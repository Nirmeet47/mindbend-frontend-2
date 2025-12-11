import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture, Text, useCursor } from '@react-three/drei';
import * as THREE from 'three';
import { PLANE_WIDTH, PLANE_HEIGHT, X_AXIS_BEND_STRENGTH } from '@/components/events/constants';
import { useRouter } from 'next/navigation';
import { useTransition } from './TransitionContext';

// --- Custom Shaders ---

const vertexShader = `
  varying vec2 vUv;
  varying float vDist;
  varying vec3 vWorldPos;
  
  uniform float uTime;
  uniform float uBendFactor;
  uniform float uHover; // 0.0 to 1.0
  
  void main() {
    vUv = uv;
    
    // Get world position of the vertex
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    
    // Calculate distance from center (0.0) along X axis
    float distFromCenter = worldPosition.x;
    vDist = distFromCenter;
    
    // Parabolic bending with Hover interaction (flatten slightly on hover?)
    float bend = uBendFactor * (1.0 - uHover * 0.5);
    worldPosition.z -= pow(abs(distFromCenter), 2.0) * bend;
    
    // Hover pop effect (move forward slightly)
    worldPosition.z += uHover * 0.5;
    
    vWorldPos = worldPosition.xyz;
    
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uScannerX;
  uniform float uHover;
  
  varying vec2 vUv;
  varying float vDist;
  varying vec3 vWorldPos;

  float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    
    // Grayscale base
    float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    vec3 grayColor = vec3(gray);

    float scannerWidth = 0.1;
    float distToScanner = vWorldPos.x - uScannerX;
    
    // Shredder Effect
    if (vWorldPos.x < uScannerX) {
        float noise = rand(vUv * 10.0 + uTime * 2.0);
        
        // Progressive Vanish
        // Calculate how far we are past the scanner
        float distPastScanner = uScannerX - vWorldPos.x;
        
        // Increase shred threshold based on distance
        // at 0 distance: threshold 0.4 (40% vanished)
        // at 4 distance: threshold 1.0 (100% vanished)
        float vanishFactor = 0.4 + (distPastScanner * 0.3);
        
        if (noise < vanishFactor) discard; 
        
        texColor.rgb = mix(texColor.rgb, vec3(0.0, 1.0, 1.0), 0.5);
        // Fade opacity of remaining bits
        texColor.a *= max(0.0, 1.0 - distPastScanner * 0.5); 
    }
    
    // Scanner Glow
    float glow = 0.0;
    if (abs(distToScanner) < scannerWidth) {
       glow = 1.0 - (abs(distToScanner) / scannerWidth);
       glow = pow(glow, 3.0);
    }
    
    // Distance Fading
    float absDist = abs(vDist);
    float grayMix = smoothstep(1.5, 4.5, absDist);
    grayMix = mix(grayMix, 0.0, uHover); 
    
    float flatten = smoothstep(1.0, 6.0, absDist);
    float brightness = 1.0 - (flatten * 0.7);
    
    vec3 finalColor = mix(texColor.rgb, grayColor, grayMix);
    finalColor += vec3(0.5, 1.0, 1.0) * glow * 2.0; // Cyan Glow
    finalColor += vec3(0.1) * uHover; 
    finalColor *= brightness;
    
    gl_FragColor = vec4(finalColor, texColor.a);
  }
`;

interface CarouselItemProps {
  index: number;
  image: string;
  title: string;
  subtitle: string;
  description?: string;
  eventId?: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ image, title, subtitle, description, eventId }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(image);
  const [hovered, setHovered] = useState(false);
  const hoverValue = useRef(0);
  const router = useRouter();
  const { setActiveItem, setIsTransitioning } = useTransition();
  const { camera, gl } = useThree();

  useCursor(hovered);

  const handleClick = () => {
    if (!meshRef.current) return;

    // 1. Calculate screen position
    const vector = new THREE.Vector3();
    meshRef.current.getWorldPosition(vector);

    // Project to 2D screen space
    vector.project(camera);

    // Convert to CSS coordinates
    // vector.x is -1 to 1, vector.y is -1 to 1
    const x = (vector.x * .5 + .5) * gl.domElement.clientWidth;
    const y = (-(vector.y * .5) + .5) * gl.domElement.clientHeight;

    // Approximate width/height based on distance and plane size
    // For a more accurate rect, we should project the corners of the plane
    const corners = [
      new THREE.Vector3(-PLANE_WIDTH / 2, PLANE_HEIGHT / 2, 0),
      new THREE.Vector3(PLANE_WIDTH / 2, PLANE_HEIGHT / 2, 0),
      new THREE.Vector3(PLANE_WIDTH / 2, -PLANE_HEIGHT / 2, 0),
      new THREE.Vector3(-PLANE_WIDTH / 2, -PLANE_HEIGHT / 2, 0),
    ];

    const screenCorners = corners.map(corner => {
      // Clone to avoid modifying original corners if reused (though here created fresh)
      const v = corner.clone();
      v.applyMatrix4(meshRef.current!.matrixWorld);
      v.project(camera);
      return {
        x: (v.x * .5 + .5) * gl.domElement.clientWidth,
        y: (-(v.y * .5) + .5) * gl.domElement.clientHeight
      };
    });

    const minX = Math.min(...screenCorners.map(c => c.x));
    const maxX = Math.max(...screenCorners.map(c => c.x));
    const minY = Math.min(...screenCorners.map(c => c.y));
    const maxY = Math.max(...screenCorners.map(c => c.y));

    // Create a DOMRect
    const rect = {
      top: minY,
      left: minX,
      width: maxX - minX,
      height: maxY - minY,
      bottom: maxY,
      right: maxX,
      x: minX,
      y: minY,
      toJSON: () => { }
    } as DOMRect;

    // 2. Set Context
    setActiveItem({
      id: eventId || title,
      image,
      title,
      subtitle,
      rect
    });
    setIsTransitioning(true);

    // 3. Navigate
    const slug = eventId || title.toLowerCase().replace(/\s+/g, '-');
    // Small delay to let the overlay appear
    setTimeout(() => {
      router.push(`/events/managerial/${slug}`);
    }, 50);
  };

  // Memoize uniforms
  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uBendFactor: { value: X_AXIS_BEND_STRENGTH },
      uScannerX: { value: -2.5 },
      uHover: { value: 0 },
    }),
    [texture]
  );

  const titleGroupRef = useRef<THREE.Group>(null);
  const descGroupRef = useRef<THREE.Group>(null);
  const scannerX = -2.5; // Must match shader uniform

  useFrame((state, delta) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();

      const targetHover = hovered ? 1.0 : 0.0;
      hoverValue.current = THREE.MathUtils.lerp(hoverValue.current, targetHover, delta * 10);
      material.uniforms.uHover.value = hoverValue.current;

      // Text Opacity Logic for TITLE ONLY
      const worldPos = new THREE.Vector3();
      meshRef.current.getWorldPosition(worldPos);
      const dist = worldPos.x - scannerX;

      // Title fades out as it enters scanner range
      // Range: Starts fading at x = -1.0 relative to scanner (before hitting it)
      // Fully invisible at x = 0.0 (center hits scanner)
      const titleOpacity = THREE.MathUtils.clamp((dist - 0.0) / 1.5, 0, 1);

      if (titleGroupRef.current) {
        titleGroupRef.current.children.forEach((child: any) => {
          // Drei Text uses fillOpacity/outlineOpacity on the component, 
          // but here we are accessing the underlying object.
          // Usually it's a Mesh with a custom ShaderMaterial or BasicMaterial derived.
          // Or simpler: set visible based on opacity threshold or strict sync.
          // Accessing .material.opacity works if transparent=true.
          if (child.material) {
            child.material.transparent = true;
            child.material.opacity = titleOpacity;
            // Also outline opacity if exposed on material? 
            // Troika-text materials have uniform 'uOutlineOpacity'?
            // Let's rely on standard opacity for now.
          }
          // Fallback for sync
          child.visible = titleOpacity > 0.05;
        });
      }

      // Description Logic: Fade in ONLY after passing scanner (Left side)
      // dist = worldPos.x - scannerX
      // If dist > 0 (Right side), opacity should be 0.
      // If dist < 0 (Left side), opacity increases.
      const descOpacity = THREE.MathUtils.clamp((0.0 - dist) / 1.5, 0, 1);

      if (descGroupRef.current) {
        descGroupRef.current.visible = true;
        descGroupRef.current.children.forEach((child: any) => {
          if (child.material) {
            child.material.transparent = true;
            child.material.opacity = descOpacity;
          }
          child.visible = descOpacity > 0.05;
        });
      }

      // Description is statically behind, revealed by shader discard
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
      >
        <planeGeometry args={[PLANE_WIDTH, PLANE_HEIGHT, 64, 64]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          side={THREE.DoubleSide}
          transparent={true}
        />
      </mesh>

      {/* Title Overlay (Standard) */}
      <group position={[0, 0, 0.2]} ref={titleGroupRef}>
        <Text
          fontSize={0.8}
          anchorX="center"
          anchorY="bottom"
          position={[0, 0.1, 0]}
          color="white"
          characters="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
          outlineWidth={0.05}
          outlineColor="black"
        >
          {title}
          <meshBasicMaterial toneMapped={false} />
        </Text>
        <Text
          fontSize={0.4}
          anchorX="center"
          anchorY="top"
          position={[0, -0.1, 0]}
          color="#f0f0f0"
          outlineWidth={0.02}
          outlineColor="black"
        >
          {subtitle}
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </group>

      {/* Description Reveal (Behind the card) */}
      <group position={[0, 0, -0.5]} ref={descGroupRef}>
        <Text
          fontSize={0.28} // Adjusted for 5.5 width
          maxWidth={PLANE_WIDTH * 0.85}
          anchorX="center"
          anchorY="middle"
          textAlign="center"
          color="white"
          outlineWidth={0.05}
          outlineColor="black"
        >
          {description}
          <meshBasicMaterial toneMapped={false} />
        </Text>
      </group>
    </group>
  );
};

export default CarouselItem;