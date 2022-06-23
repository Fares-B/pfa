import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Public from "@app/screens/public";


const Stack = createNativeStackNavigator();

interface PublicLayoutProps {
  setToken: (token: string|null) => void;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ setToken }) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login">{props => <Public.Login setToken={setToken} {...props} />}</Stack.Screen>
      <Stack.Screen name="Signup">{props => <Public.Signup setToken={setToken} {...props} />}</Stack.Screen>
      <Stack.Screen name="Forgot" component={Public.Forgot} />
    </Stack.Navigator>
  );
};

export default PublicLayout;
