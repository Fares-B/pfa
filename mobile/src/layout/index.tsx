import React, { useEffect } from "react";
import { Center, Modal, NativeBaseProvider, Spinner, Stack, View } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import PrivateLayout from "./Private";
import PublicLayout from "./Public";
import theme from "@app/assets/nativeBaseTheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from 'react-redux';
import AccountActions from "@app/reducers/account";


const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.account.token);
  const loading = useSelector((state: any) => state.account.action.loading);

  useEffect(() => {
    AsyncStorage.getItem("token").then(t => {
      dispatch(AccountActions.setToken(t));
    });
  }, []);


  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack flex={1} bg="white" safeAreaTop={true}>
          {token ? <PrivateLayout /> : <PublicLayout />}
        </Stack>
        <Modal isOpen={loading}>
          <Center>
            <Spinner size={48} />
          </Center>
        </Modal>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default Layout;
