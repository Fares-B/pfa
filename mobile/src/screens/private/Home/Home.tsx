

import { convertNumberToPrice } from "@app/globals/functions";
import { faOutdent } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Button, HStack, Image, Modal, Pressable, ScrollView, Text, useDisclose, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import ScanQRCode from "./ScanQRCode";
import { useDispatch, useSelector } from "react-redux";
import AccountActions from "@app/reducers/account";
import { getMenusRequest } from "@app/globals/fetch";
import { RestoProps } from "@app/globals/types";
import CartActions from "@app/reducers/cart";


const Home: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch();
  const resto = useSelector((state: any) => state.account.establishment);
  const [menus, setMenus] = useState<RestoProps>({
    resto: resto,
    supplements: [],
    menus: [],
  });
  const {isOpen, onClose, onOpen} = useDisclose();
  
  useEffect(() => {
    retreiveData();
  }, []);

  useEffect(() => {
    (async function() {
      if (resto !== null) {
        dispatch(AccountActions.setLoading(true));
        try {
          const data = await getMenusRequest(resto.user)
          if(data.hasOwnProperty("menus") && data.hasOwnProperty("supplements")) {
            setMenus(current => ({
              ...current,
              menus: data.menus,
              supplements: data.supplements,
            }));
          }
        } catch (error) {
          console.log("error", error);          
        }
        dispatch(AccountActions.setLoading(false));
      }
    })();
  }, [resto]);

  async function saveData(data: any) {
    await AsyncStorage.setItem("resto", JSON.stringify(data));
    dispatch(AccountActions.setEstablishment(data));
  }

  async function retreiveData() {
    if(resto === null) {
      const data: any = await AsyncStorage.getItem("resto");
      if(data !== null) {
        const r = JSON.parse(data);
        dispatch(AccountActions.setEstablishment(r));
      }
    }
  }

  async function onExit() {
    onClose();
    await AsyncStorage.removeItem("resto");
    dispatch(AccountActions.setEstablishment(null));
    dispatch(CartActions.setCart(null));
  }

  if(resto == null) {
    return (
     <ScanQRCode saveData={saveData} />
    );
  }

  return (
    <VStack space={4} mt={4} px={4} flex={1}>
      <HStack justifyContent="space-between" alignItems="center">
        <HStack space={3} alignItems="center" flex={1}>
          <Pressable onPress={onOpen}>
            <FontAwesomeIcon icon={faOutdent} />
          </Pressable>
          <Text flex={1} fontSize={18} bold>{resto.name}</Text>
        </HStack>
        <Text>Table n°{resto.table}</Text>
      </HStack>

      <ScrollView>
        <Text fontSize={22} fontWeight={700}>Menu</Text>
        <VStack space={4} mt={4}>
          {menus.menus.map((menu, key) => (
            <TouchableOpacity key={key} onPress={() => navigation.navigate("MenuDetails", { resto, menu, supplements: menus.supplements })}>
              <HStack space={4}>
                <VStack flex={1} justifyContent="space-between">
                  <Text fontSize={16} fontWeight={600}>{menu.name}</Text>
                  <Text fontSize={16} fontWeight={600}>{convertNumberToPrice(menu.price)}</Text>
                </VStack>
                <Image src={"https://loremflickr.com/320/320/food?lock=" + menu.id} alt={menu.name} size={60} />
                {/* <Box bg="mygray" size={60} rounded={2} /> */}
              </HStack>
            </TouchableOpacity>
          ))}
        </VStack>
      </ScrollView>

      <Modal isOpen={isOpen}>
        <VStack bg="white" px={8} mx={8} rounded={8} py={10} space={12}>
          <Text>Voulez-vous vraiment sortir du menu du resto <Text bold>{resto.name}</Text> ?</Text>
          <HStack justifyContent="space-evenly" space={8}>
            <Button onPress={onClose} flex={1}>
              <Text color="white">Non</Text>
            </Button>
            <Button onPress={onExit} flex={1} colorScheme="blueGray">
              <Text color="white">Oui</Text>
            </Button>
          </HStack>
        </VStack>
      </Modal>

    </VStack>
  );
};

export default Home;
