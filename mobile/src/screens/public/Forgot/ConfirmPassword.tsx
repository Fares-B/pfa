import React, { useState } from "react";
import { Platform } from "react-native";
import { Button, KeyboardAvoidingView, Pressable, Text, VStack } from "native-base";
import C from "@app/components";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Errors, ErrorsMessages } from "./type";

const ERRORS_MESSAGES: ErrorsMessages = {
  codeNotGood: "Code incorrect",
};

const ConfirmCode: React.FC<any> = ({ navigation, route }) => {
  const [form, setForm] = useState({ code: "" });
  const [errors, setErrors] = useState<Errors>({ codeNotGood: false});

  function addRemoveErrors(type: string, value:boolean) {
    setErrors(current => ({ ...current, [type]: value }));    
  }

  function onChangeValue(type: string, value: string) {
    addRemoveErrors("codeNotGood", false);
    setForm(current => ({ ...current, [type]: value }));
  }

  function onSubmit() {
    if(form.code == "1234") {
      navigation.navigate("NewPassword", { email: route.params.email });
    } else {
      addRemoveErrors("codeNotGood", true);
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
        <VStack space={1} w="75%">
          <Text color="mygray">Adresse email</Text>
          <Text>{route.params.email}</Text>
          <Text italic mt={2}>Vous venez de recevoir un code à l’adresse email indiqué ci-dessus</Text>
        </VStack>
        <C.FloatingInput title="Code de vérification" type="numeric" value={form.code} onChangeText={text => onChangeValue("code", text)} />
        <Button
          mt={5}
          bg="myprimary"
          w="75%"
          _text={{ fontSize: 16 }}
          py={4}
          onPress={onSubmit}
          children="Suivant"
        />
      </VStack>
    </KeyboardAvoidingView>
  );
}

export default ConfirmCode;
