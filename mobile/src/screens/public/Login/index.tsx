import React, { useState } from "react";
import { Platform } from "react-native";
import { Button, KeyboardAvoidingView, Text, VStack } from "native-base";
import C from "@app/components";
import { Errors, ErrorsMessages } from "./type";

const ERRORS_MESSAGES: ErrorsMessages = {
  login: "Email ou mot de passe incorrect",
};

const Login: React.FC<any> = ({ navigation }) => {
  const [form, setForm] = useState({ email: "", password: ""});
  const [errors, setErrors] = useState<Errors>({ login: false });

  function addRemoveErrors(type: string, value:boolean) {
    setErrors(current => ({ ...current, [type]: value }));    
  }

  function onChangeValue(type: string, value: string) {
    addRemoveErrors("login", false);

    setForm(current => ({ ...current, [type]: value }));
  }

  function onSubmit() {
    addRemoveErrors("login", true);
    console.log(form);
  }


  return (
    <KeyboardAvoidingView flex={1} behavior={Platform.OS === "ios" ? "padding" : "height"} pt={10}>
      <VStack space={4} flex={1} alignItems="center">
        <VStack space={1} w="75%" h={10}>
          {Object.keys(errors).map(e => errors[e] == false ? null : (
            <Text color="mydanger" key={e}>{ERRORS_MESSAGES[e]}</Text>
          ))}
        </VStack>
        <C.FloatingInput title="Adresse email" type="email" value={form.email} onChangeText={text => onChangeValue("email", text)} />
        <C.FloatingInput title="Mot de passe" type="password" value={form.password} onChangeText={text => onChangeValue("password", text)} />
        <Button
          mt={5}
          bg="myprimary"
          w="75%"
          _text={{ fontSize: 16 }}
          py={4}
          onPress={onSubmit}
          children="Se connecter"
        />
        <VStack w="75%" space={4}>
          <C.Link onNavigateTo={() => navigation.navigate("Forgot")}>Mot de passe oublié ?</C.Link>
          <C.Link onNavigateTo={() => navigation.navigate("Signup")}>Pas encore de compte ?</C.Link>
        </VStack>
      </VStack>
    </KeyboardAvoidingView>
  );
}

export default Login;
