
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfile from "./UserProfile";
import Order from "./Order";
import Payment from "./Payment";
import Setting from "./Setting";
import EditProfile from "./EditProfile";


const Stack = createNativeStackNavigator();


const ForgotLayout: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="UserProfile"
    >
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
};

export default ForgotLayout;
