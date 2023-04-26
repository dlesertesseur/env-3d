import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { MapControls } from "@react-three/drei";
import { Button, Group, Stack, Text } from "@mantine/core";
import { buildLOD } from "./builder";
import { asignTypes } from "../api/process";

const MapControl = ({ layout }) => {
  const sceneRef = useRef();
  useEffect(() => {
    if (layout && sceneRef.current) {
      asignTypes(layout);

      console.log(" MapControl useEffect -> ");
      buildLOD(sceneRef.current, layout);
    }
  }, [layout]);

  return (
    <Stack sx={{ height: "100%" }} spacing={0}>
      <Group sx={{ padding: 5, background: "#e5e5e5" }}>
        <Button>
          <Text>Map control</Text>
        </Button>
      </Group>

      <Canvas camera={{ position: [0, 100, 0] }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <MapControls
          enableDamping={false}
          movementSpeed={3}
          rollSpeed={0.01}
          dragToLook={true}
          reverseOrbit={true}
          maxPolarAngle={0}
          enableRotate={false}
        />
        <group ref={sceneRef}></group>
        <axesHelper/>
      </Canvas>
    </Stack>
  );
};

export default MapControl;
