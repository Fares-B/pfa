import React from "react";
import { Actionsheet, Center, HStack, Pressable, Text, useDisclose, VStack } from "native-base";
import Header from "@app/components/Header";
import Link from "@app/components/Link";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faImage, faUser } from "@fortawesome/free-regular-svg-icons";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import AccountActions from "@app/reducers/account";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Setting: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.account.user);
  const { isOpen, onOpen, onClose } = useDisclose();

  function pickPicture() {
    console.log("pick picture")
    onClose();
  }

  function takePicture() {
    console.log("take picture")
    onClose();
  }

  async function onLogout() {
    await AsyncStorage.removeItem("token");
    dispatch(AccountActions.setToken(null));
  }

  return (
    <VStack flex={1} px={4} mt={4} space={8}>
      <Header navigation={navigation} />
      
      <VStack space={4} pl={4}>
        <Text fontSize={16} fontWeight={700}>Modifier le compte</Text>
        <HStack justifyContent="space-between">
          <VStack space={4} flex={1}>
            <Pressable onPress={() => navigation.navigate("EditProfile", { change: "firstName", value: user.firstName })}>
              <VStack space={1}>
                <Text color="mygray">Prénom</Text>
                <Text>{user.firstName}</Text>
              </VStack>
            </Pressable>

            <Pressable onPress={() => navigation.navigate("EditProfile", { change: "lastName", value: user.lastName })}>
              <VStack space={1}>
                <Text color="mygray">Nom</Text>
                <Text>{user.lastName}</Text>
              </VStack>
            </Pressable>
          </VStack>
          <Center flex={1}>
            <Pressable onPress={onOpen}>
              {user.avatar ? null : (
                  <FontAwesomeIcon icon={faUser} size={60} />
                )}
            </Pressable>
          </Center>
        </HStack>

        <VStack space={1}>
          <Text color="mygray">Email</Text>
          <Text color="mygray">{user.email}</Text>
        </VStack>

        <Pressable onPress={() => navigation.navigate("EditProfile", { change: "password", value: "" })}>
          <VStack space={1}>
            <Text color="mygray">Mot de passe</Text>
            <Text>{"******"}</Text>
          </VStack>
        </Pressable>
      </VStack>
      
      <VStack space={4} pl={4}>
        <Text fontSize={16} fontWeight={700}>Autres options</Text>
        <Link onNavigateTo={onLogout}>
          Déconnexion
        </Link>
      </VStack>

      <Actionsheet isOpen={isOpen} onClose={onClose} size="full">
        <Actionsheet.Content>
          <Actionsheet.Item onPress={takePicture} justifyContent="center" startIcon={<FontAwesomeIcon size={20} icon={faCamera} />}>
            Prendre une photo
          </Actionsheet.Item>
          <Actionsheet.Item onPress={pickPicture} justifyContent="center" startIcon={<FontAwesomeIcon size={20} icon={faImage} />}>
            Sélectionner une photo
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </VStack>
  );
};

export default Setting;
