import React, { useState } from "react";
import { Platform } from "react-native";
import { Button, KeyboardAvoidingView, Pressable, Text, VStack } from "native-base";
import C from "@app/components";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Errors, ErrorsMessages } from "./type";

const ERRORS_MESSAGES: ErrorsMessages = {
  passwordNotSame: "Le mot de passe n'est pas identique",
};

const NewPassword: React.FC<any> = ({ navigation, route }) => {
  const [form, setForm] = useState({ password: "", confirmPassword: ""});
  const [errors, setErrors] = useState<Errors>({});

  function addRemoveErrors(type: string, value:boolean) {
    setErrors(current => ({ ...current, [type]: value }));    
  }

  function onChangeValue(type: string, value: string) {
    addRemoveErrors("passwordNotSame", false);
    setForm(current => ({ ...current, [type]: value }));
  }

  function onSubmit() {
    addRemoveErrors("passwordNotSame", form.password !== form.confirmPassword);
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
        <C.FloatingInput title="Nouveau mot de passe" type="password" value={form.password} onChangeText={text => onChangeValue("password", text)} />
        <C.FloatingInput title="Confirmer le nouveau mot de passe" type="password" value={form.confirmPassword} onChangeText={text => onChangeValue("confirmPassword", text)} />
        <Button
          mt={5}
          bg="myprimary"
          w="75%"
          _text={{ fontSize: 16 }}
          py={4}
          onPress={onSubmit}
          children="Réinitialiser"
        />
      </VStack>
    </KeyboardAvoidingView>
  );
}

export default NewPassword;
