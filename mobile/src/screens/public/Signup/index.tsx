import React, { useState } from "react";
import { Platform } from "react-native";
import { Button, KeyboardAvoidingView, Text, VStack } from "native-base";
import C from "@app/components";
import { Errors, ErrorsMessages } from "./type";

const ERRORS_MESSAGES: ErrorsMessages = {
  passwordNotSame: "Le mot de passe n'est pas identique",
};

const Signup: React.FC<any> = ({ navigation }) => {
  const [form, setForm] = useState({ email: "", password: "", confirmPassword: ""});
  const [errors, setErrors] = useState<Errors>({ passwordNotSame: false});

  function onChangeValue(type: string, value: string) {
    setForm(current => ({ ...current, [type]: value }));
  }

  function addRemoveErrors(type: string, value:boolean) {
    setErrors(current => ({ ...current, [type]: value }));    
  }

  function onSubmit() {
    addRemoveErrors("passwordNotSame", form.password !== form.confirmPassword);
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
        <C.FloatingInput title="Confirmer le mot de passe" type="password" value={form.confirmPassword} onChangeText={text => onChangeValue("confirmPassword", text)} />
        <Button
          mt={5}
          bg="myprimary"
          w="75%"
          _text={{ fontSize: 16 }}
          py={4}
          onPress={onSubmit}
          children="S'inscrire"
        />
        <VStack w="75%" space={4}>
          <C.Link onNavigateTo={() => navigation.navigate("Login")}>Déjà un compte ?</C.Link>
        </VStack>
      </VStack>
    </KeyboardAvoidingView>
  );
}

export default Signup;
