import React, { useEffect, useState } from "react";
import MapControl from "./MapControl";
import { AppShell, Header, Drawer, Button, Group, LoadingOverlay } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getLayout } from "../api/api.layout";

const AppLayout = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [layout, setLayout] = useState(null);

  const getAsyncData = async () => {
    const data = await getLayout();
    setLayout(data);
  };

  useEffect(() => {
    getAsyncData();
  }, []);

  return (
    <>
      <AppShell
        padding={0}
        //   navbar={
        //     <Navbar width={{ base: 300 }} p="xs">
        //       {/* Navbar content */}
        //     </Navbar>
        //   }
        header={
          <Header height={60} p="xs">
            <Group position="center">
              <Button onClick={open}>Open Drawer</Button>
            </Group>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        {layout ? (
          <MapControl layout={layout}/>
        ) : (
          <LoadingOverlay visible={true} overlayBlur={2} />
        )}

        {/* <Editor/> */}
        <Drawer
          opened={opened}
          onClose={close}
          title="Authentication"
          overlayProps={{ opacity: 0.5, blur: 4 }}
        >
          {/* Drawer content */}
        </Drawer>
      </AppShell>
    </>
  );
};

export default AppLayout;
