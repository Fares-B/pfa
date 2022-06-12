

import { convertNumberToPrice } from "@app/globals/functions";
import { faOutdent } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Box, Button, HStack, Modal, Pressable, ScrollView, Text, useDisclose, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import ScanQRCode from "./ScanQRCode";
import { Resto } from "./type";


const menus = [
  {
    name: "Rissoto",
    price: 900,
    ingredients: [
      { 
        name: "Safran",
        price: 275,
        isRemoved: false
      },
      { 
        name: "Sauce test",
        price: 100,
        isRemoved: false
      },
    ],
    supplements: [],
  },
  { name: "Rissoto Vert", img: "", price: 1000 },
  { name: "Pizza Marguarita", img: "", price: 1100 },
]

const Home: React.FC<any> = ({ navigation }) => {
  const [resto, setResto] = useState<Resto|null>(null);
  const {isOpen, onClose, onOpen} = useDisclose();
  
  useEffect(() => {
    retreiveData();
  }, []);

  useEffect(() => {
    if(resto !== null) {
      console.log("fetch data menu's");
    }
  }, [resto]);

  async function retreiveData() {
    const data: any = await AsyncStorage.getItem("resto");
    setResto(JSON.parse(data));
  }

  async function onExit() {
    await AsyncStorage.removeItem("resto");
    setResto(null);
    onClose();
  }

  if(resto == null) {
    return (
     <ScanQRCode setNewResto={setResto} />
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
          {menus.map((menu, key) => (
            <TouchableOpacity key={key} onPress={() => navigation.navigate("MenuDetails", { resto, menu })}>
              <HStack space={4}>
                <VStack flex={1} justifyContent="space-between">
                  <Text fontSize={16} fontWeight={600}>{menu.name}</Text>
                  <Text fontSize={16} fontWeight={600}>{convertNumberToPrice(menu.price)}</Text>
                </VStack>
                <Box bg="mygray" size={60} rounded={2} />
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
