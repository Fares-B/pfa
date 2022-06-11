import React, { useState } from "react";
import { Platform } from "react-native";
import { Button, HStack, KeyboardAvoidingView, Pressable, Text, VStack } from "native-base";
import C from "@app/components";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Errors, ErrorsMessages } from "./type";

const ERRORS_MESSAGES: ErrorsMessages = {
  emailDoestExist: "Impossible de réinitialiser le mot de passe pour l'instant",
};

const ForgotPassword: React.FC<any> = ({ navigation }) => {
  const [form, setForm] = useState({ email: "" });
  const [errors, setErrors] = useState<Errors>({ emailDoestExist: false });

  function onChangeValue(type: string, value: string) {
    setForm(current => ({ ...current, [type]: value }));
  }

  function addRemoveErrors(type: string, value:boolean) {
    setErrors(current => ({ ...current, [type]: value }));    
  }

  function onSubmit() {
    console.log(form);
    if (true) {
      navigation.navigate("ConfirmCode", { email: form.email });
    }
  }

  
  return (
    <KeyboardAvoidingView flex={1} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Pressable pl={8} pt={4} onPress={() => navigation.goBack()} mb={10}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </Pressable>
      <VStack space={4} flex={1} alignItems="center">
        <VStack space={1} w="75%" h={10}>
          {Object.keys(errors).map(e => errors[e] == false ? null : (
            <Text color="mydanger" key={e}>{ERRORS_MESSAGES[e]}</Text>
          ))}
        </VStack>
        <C.FloatingInput title="Adresse email" type="email" value={form.email} onChangeText={text => onChangeValue("email", text)} />
        <Button
          mt={5}
          bg="myprimary"
          w="75%"
          _text={{ fontSize: 16 }}
          py={4}
          onPress={onSubmit}
          children="Demande de réinitialisation"
        />
        <VStack w="75%" space={4}>
          <C.Link onNavigateTo={() => navigation.navigate("Login")}>Se connecter ?</C.Link>
        </VStack>
      </VStack>
    </KeyboardAvoidingView>
  );
}

export default ForgotPassword;
