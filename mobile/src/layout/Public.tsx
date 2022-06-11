import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Public from "@app/screens/public";


const Stack = createNativeStackNavigator();


const PublicLayout: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Public.Login} />
      <Stack.Screen name="Signup" component={Public.Signup} />
      <Stack.Screen name="Forgot" component={Public.Forgot} />
    </Stack.Navigator>
  );
};

export default PublicLayout;
