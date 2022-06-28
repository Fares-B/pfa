import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import socketIOClient from "socket.io-client";

import { privateRoutes } from "@app/screens/private";
import { useDispatch, useSelector } from "react-redux";
import HistoryActions from "@app/reducers/history";
import { DEFAULT_URL, getProfileRequest } from "@app/globals/fetch";
import AccountActions from "@app/reducers/account";
import { Box, Text, Toast } from "native-base";

const Tab = createBottomTabNavigator();

const PrivateLayout: React.FC<any> = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.account.user);
  
  useEffect(() => {
    dispatch(AccountActions.getUserProfileRequest());
    getProfileRequest().then((data) => {
      console.log(data);
      dispatch(AccountActions.getUserProfileSuccess(data));
    });
  }, []);
  // @ts-ignore
  useEffect(() => {
    const socket = socketIOClient(DEFAULT_URL);
    socket.on(`${user._id}_order-status-updated`, (newOrder) => {
      dispatch(HistoryActions.updateOrder(newOrder));
      Toast.show({
        placement: "top",
        render: () => (
          <Box bg="myprimary" px="3" py="2" rounded="sm" mb={5}>
            <Text color="white" fontWeight={700}>{"Votre commande est prête"}</Text>
          </Box>
        )
      });
    });
    return () => socket.disconnect();
  }, [user]);

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      initialRouteName="HomeLayout"
    >
      {privateRoutes.map(route => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.components}
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesomeIcon icon={route.icon} color={focused ? "#2988E0" : "black"} size={24} />
            )
          }}
        />
      ))}
    </Tab.Navigator>
  );
}

export default PrivateLayout;
