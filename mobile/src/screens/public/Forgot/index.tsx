import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ForgotPassword from "./ForgotPassword";
import ConfirmCode from "./ConfirmPassword";
import NewPassword from "./NewPassword";


const Stack = createNativeStackNavigator();


const ForgotLayout: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ForgotPassword"
    >
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ConfirmCode" component={ConfirmCode} />
      <Stack.Screen name="NewPassword" component={NewPassword} />
    </Stack.Navigator>
  );
};

export default ForgotLayout;