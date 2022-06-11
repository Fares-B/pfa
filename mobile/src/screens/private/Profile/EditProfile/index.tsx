import React, { useState } from "react";
import { Platform } from "react-native";
import { Box, Button, KeyboardAvoidingView, Text, Toast, VStack } from "native-base";
import C from "@app/components";
import Header from "@app/components/Header";

const ERRORS_MESSAGES = {
  passwordNotSame: "Le mot de passe n'est pas identique",
  errorWhenApply: "Erreur lors de la modification",
};

const TITLES: {[key: string]: string} = {
  firstname: "Prénom",
  lastname: "Nom",
}

const NewPassword: React.FC<any> = ({ navigation, route }) => {
  const { change } = route.params;
  const [value, setValue] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState({ passwordNotSame: false });

  function addRemoveErrors(type: string, value:boolean) {
    setErrors(current => ({ ...current, [type]: value }));    
  }

  function onChangeValuePassword(type: string, v: string) {
    addRemoveErrors("passwordNotSame", false);
    if(type == "password") setValue(v);
    else setConfirmPassword(v);
  }

  function onSubmit() {
    const callback = (isSuccess: boolean, message: string|null|undefined) => {
      if(isSuccess) navigation.goBack();
      Toast.show({
        placement: "top",
        render: () => (
          <Box bg={isSuccess ? "myprimary" : "mydanger"} px="3" py="2" rounded="sm" mb={5}>
            <Text color="white" fontWeight={700}>{isSuccess ? "Modification effectuée": message}</Text>
          </Box>
        )
      })
    }
    switch (change) {
      case "password":
        const isNotSame = value !== confirmPassword;
        addRemoveErrors("passwordNotSame", isNotSame);
        console.log("change password with", value);
        callback(!isNotSame, ERRORS_MESSAGES.passwordNotSame);
        break;
      case "firstname":
        console.log("change firstname with", value);
        callback(true, ERRORS_MESSAGES.errorWhenApply);
        break;
      case "lastname":
        callback(false, ERRORS_MESSAGES.errorWhenApply);
        break;
      default:
        console.log("error cannot do this operation");
        break;
    }
  }


  return (
    <KeyboardAvoidingView flex={1} behavior={Platform.OS === "ios" ? "padding" : "height"} px={4} mt={4}>

      <Header navigation={navigation} />

      <VStack alignItems="center" mt={8}>
        {change === "password" ? (             
          <VStack space={4} w="full" alignItems="center">
            <C.FloatingInput isDanger={errors.passwordNotSame} title="Nouveau mot de passe" type="password" value={value} onChangeText={text => onChangeValuePassword("password", text)} />
            <C.FloatingInput isDanger={errors.passwordNotSame} title="Confirmer le nouveau mot de passe" type="password" value={confirmPassword} onChangeText={text => onChangeValuePassword("confirmPassword", text)} />
          </VStack>
        ) : (
          <C.FloatingInput title={TITLES[change]} type="text" value={value} onChangeText={setValue} />
        )}
        <VStack space={4} w="full" alignItems="center">
          <Button
            mt={5}
            bg="myprimary"
            w="75%"
            _text={{ fontSize: 16 }}
            py={4}
            onPress={onSubmit}
            children="Enregistrer"
          />
        </VStack>
      </VStack>
    </KeyboardAvoidingView>
  );
}

export default NewPassword;
