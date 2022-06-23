import React, { useEffect, useState } from "react";
import { Center, Modal, NativeBaseProvider, Spinner, Stack, View } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import PrivateLayout from "./Private";
import PublicLayout from "./Public";
import theme from "@app/assets/nativeBaseTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Layout: React.FC = () => {
  const [token, setToken] = useState<string|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    AsyncStorage.getItem("token").then(t => {
      setToken(t);
      setIsLoading(false);
    });
  }, []);

  // async function updatetoken(token: string|null) {
  //   setIsLoading(true);
  //   if(token) AsyncStorage.setItem("token", token, () => {
  //     setToken(token);
  //     setIsLoading(false)
  //   });
  //   else AsyncStorage.removeItem("token", () => setIsLoading(false));
  // }

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack flex={1} bg="white" safeAreaTop={true}>
          {token ? <PrivateLayout setToken={setToken} /> : <PublicLayout setToken={setToken} />}
        </Stack>
        <Modal isOpen={isLoading}>
          <Center>
            <Spinner size={48} />
          </Center>
        </Modal>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default Layout;
