import { faOutdent } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Button, HStack, Modal, Pressable, Text, useDisclose, VStack } from "native-base";
import React, { useState } from "react";
import ScanQRCode from "./ScanQRCode";
import { Resto } from "./type";

const Home: React.FC = () => {
  const [resto, setResto] = useState<Resto|null>(null);
  const {isOpen, onClose, onOpen} = useDisclose();
  
  function onExit(): void {
    onClose();
    console.log("exit resto");
  }

  if(resto == null) {
    return (
     <ScanQRCode />
    );
  }

  return (
    <VStack space={4} mt={4} px={4} flex={1}>
      <HStack justifyContent="space-between" alignItems="center">
        <HStack space={3} alignItems="center">
          <Pressable onPress={onOpen}>
            <FontAwesomeIcon icon={faOutdent} />
          </Pressable>
          <Text fontSize={18} bold>Le bon resto</Text>
        </HStack>
        <Text>Table n°2</Text>
      </HStack>

      <Modal isOpen={isOpen}>
        <VStack bg="white" px={8} mx={8} rounded={8} py={10} space={12}>
          <Text>Voulez-vous vraiment sortir du menu du resto <Text bold>Le bon resto</Text> ?</Text>
          <HStack justifyContent="space-evenly" space={8}>
            <Button onPress={onClose} flex={1}>Non</Button>
            <Button onPress={onExit} flex={1} colorScheme="blueGray">Oui</Button>
          </HStack>
        </VStack>
      </Modal>

    </VStack>
  );
};

export default Home;
