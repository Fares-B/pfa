import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { privateRoutes } from "@app/screens/private";


const Tab = createBottomTabNavigator();



const PrivateLayout: React.FC<any> = ({ setToken }) => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      initialRouteName="HomeLayout"
    >
      {privateRoutes.map(route => {
        const Screen: any = route.components;
        return (
          <Tab.Screen
            key={route.name}
            name={route.name}
            component={() => <Screen setToken={setToken} />}
            options={{ tabBarIcon: ({ focused }) => (
              <FontAwesomeIcon icon={route.icon} color={focused ? "#2988E0" : "black"} size={24} />
            ) }}
          />
        )
      })}
    </Tab.Navigator>
  );
};


export default PrivateLayout;
