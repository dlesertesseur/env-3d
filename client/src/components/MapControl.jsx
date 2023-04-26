import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { MapControls } from "@react-three/drei";
import { Button, Group, Stack, Text } from "@mantine/core";
import { buildLOD } from "./builder";

const MapControl = ({ layout }) => {
  const groupRef = useRef();

  useEffect(() => {
    const pixelMeterRelation = 1;
    if (groupRef.current && layout) {
      console.log("groupRef.current ->", groupRef.current);

      //Probar <instancedMesh>

      //Probar
      //   <Detailed distances={[0, 10, 20]}>
      //   <mesh geometry={high} />
      //   <mesh geometry={mid} />
      //   <mesh geometry={low} />
      // <Detailed/>
      
      buildLOD(groupRef.current, layout, pixelMeterRelation);
    }
  }, [groupRef, layout]);

  return (
    <Stack sx={{ height: "100%" }} spacing={0}>
      <Group sx={{ padding: 5, background: "#e5e5e5" }}>
        <Button>
          <Text>Map control</Text>
        </Button>
      </Group>

      <Canvas camera={{ position: [0, 10, 0] }}>
        <MapControls
          enableDamping={false}
          movementSpeed={3}
          rollSpeed={0.01}
          dragToLook={true}
          reverseOrbit={true}
          maxPolarAngle={0}
          enableRotate={false}
        />
        <scene ref={groupRef}>
          <gridHelper />
        </scene>
      </Canvas>
    </Stack>
  );
};

export default MapControl;
