import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import MenuDetails from "./MenuDetails";



const Stack = createNativeStackNavigator();


const HomeLayout: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MenuDetails" component={MenuDetails} />
    </Stack.Navigator>
  );
};

export default HomeLayout;
