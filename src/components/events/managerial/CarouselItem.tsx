import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, Text } from '@react-three/drei';
import * as THREE from 'three';
import { PLANE_WIDTH, PLANE_HEIGHT, X_AXIS_BEND_STRENGTH } from '@/components/events/constants';

// --- Custom Shaders ---

const vertexShader = `
  varying vec2 vUv;
  varying float vDist;
  varying vec3 vWorldPos;
  
  uniform float uTime;
  uniform float uBendFactor;
  
  void main() {
    vUv = uv;
    
    // Get world position of the vertex
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    
    // Calculate distance from center (0.0) along X axis
    float distFromCenter = worldPosition.x;
    vDist = distFromCenter;
    vWorldPos = worldPosition.xyz;
    
    // Parabolic bending: 
    // We modify the view space or world space Z based on X distance.
    // The further from center X, the more negative Z (away from camera).
    
    // Note: To make it look correct, we modify worldPosition before projection
    worldPosition.z -= pow(abs(distFromCenter), 2.0) * uBendFactor;
    
    // Optional: Rotate slightly to face inward (cylindrical effect)
    // float rotation = -distFromCenter * 0.1;
    // float s = sin(rotation);
    // float c = cos(rotation);
    // mat2 rot = mat2(c, -s, s, c);
    // worldPosition.xz = rot * worldPosition.xz; // This creates a more complex cylinder
    
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  varying float vDist;

  void main() {
    vec4 texColor = texture2D(uTexture, vUv);
    
    // Grayscale calculation (luminance)
    float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
    vec3 grayColor = vec3(gray);
    
    // Calculate distance factor for transitions
    // 0.0 is center. 
    float absDist = abs(vDist);
    
    // We want:
    // 0 to ~2.0: Full Color
    // 2.0 to ~5.0: Fade to Gray
    float grayMix = smoothstep(1.5, 4.5, absDist);
    
    // We also want to darken it as it goes further away
    float darken = smoothstep(1.0, 6.0, absDist);
    float brightness = 1.0 - (darken * 0.7); // Fade to 30% brightness at edges
    
    vec3 finalColor = mix(texColor.rgb, grayColor, grayMix);
    finalColor *= brightness;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

interface CarouselItemProps {
  index: number;
  image: string;
  title: string;
  subtitle: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ image, title, subtitle }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(image);

  // Memoize uniforms
  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uBendFactor: { value: X_AXIS_BEND_STRENGTH },
    }),
    [texture]
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <planeGeometry args={[PLANE_WIDTH, PLANE_HEIGHT, 64, 64]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 
        Text Overlay 
        We render this separate from the curved plane. 
        We use a trick: standard materials don't curve with the custom shader of the plane.
        So we place it slightly in front.
        For a truly curved text, we'd need to bend the text geometry too, but standard billboard text works well for this effect
        as long as we fade it out when it moves to the side.
      */}
      <group position={[0, 0, 0.2]}>
        <Text
          fontSize={0.6}
          anchorX="center"
          anchorY="middle"
          color="white"
          letterSpacing={-0.02}
        >
          {title}
          <meshBasicMaterial toneMapped={false} />
        </Text>
        {/* Only show title for now to keep it clean like reference */}
      </group>
    </group>
  );
};

export default CarouselItem;