import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Button, Group, Stack, Text } from "@mantine/core";

const Editor = () => {
  return (
    <Stack sx={{ height: "100%" }} spacing={0}>
      <Group sx={{ padding: 5, background:"#e5e5e5" }}>
        <Button>
          <Text>CADORNA</Text>
        </Button>
      </Group>

      <Canvas camera={{ position: [1, 2, 3] }}>
        <OrbitControls />
        <axesHelper args={[5]} />
        <gridHelper />
      </Canvas>
    </Stack>
  );
};

export default Editor;
