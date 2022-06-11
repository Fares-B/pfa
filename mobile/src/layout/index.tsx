import React from "react";
import { NativeBaseProvider, Stack, View } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import PrivateLayout from "./Private";
import PublicLayout from "./Public";
import theme from "@app/assets/nativeBaseTheme";

interface Props {
  token: boolean;
};

const ContainerLayout: React.FC<Props> = ({ token = false }) => {
  if(token) return <PrivateLayout />;
  return <PublicLayout />;
};


const Layout: React.FC = () => {
  const token: boolean = true;

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack flex={1} bg="white" safeAreaTop={true}>
          <ContainerLayout token={token} />
        </Stack>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default Layout;
