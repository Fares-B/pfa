import React, { useState } from "react";
import { Button, Center, HStack, Pressable, Text, VStack } from "native-base";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import { TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faOutdent } from "@fortawesome/free-solid-svg-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ScanQRCode: React.FC<any> = ({ setNewResto }) => {
  const [resto, setResto] = useState<any>(null);

  async function saveData(text: string) {
    await AsyncStorage.setItem("resto", text);
  }

  function onSuccess (e:any) {
    
    setNewResto(JSON.parse(e.data))
    saveData(e.data);
    // Linking.openURL(e.data).then(t => {
    //   console.log("success ", t);
    // }).catch(err =>
    //   console.error('An error occured', err)
    // );
  }

  return (
    <VStack space={4} flex={1}>

      <HStack justifyContent="space-between" alignItems="center" pt={4} px={4}>
        <HStack space={3} alignItems="center" flex={1}>
          <Pressable>
            <FontAwesomeIcon icon={faOutdent} style={{ opacity: resto !== null ? 1 : 0}} />
          </Pressable>
          <Text fontSize={18} bold flex={1}>{resto !== null ? resto?.name : ""}</Text>
        </HStack>
        <Text>{resto !== null ? "Table n°" + resto?.table : ""}</Text>
      </HStack>
      <QRCodeScanner
        // flashMode={RNCamera.Constants.FlashMode.torch}
        reactivate={true}
        reactivateTimeout={5000}
        onRead={onSuccess}
        containerStyle={{ height: 200 }}
        topContent={
          <Text flex={1} fontSize={18}>
            Un qr code se trouve juste devant vous à votre table scannez le pour commander.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={{ padding: 16 }}>
            <Text fontSize={21}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
      {/* <Center bg="mygray" h="1/3">
        <Text fontSize={18} fontWeight={700}>diaporama exemple</Text>
      </Center>
      <VStack flex={1} space={8} justifyContent="center">
        <Center px={"15%"}>
          <Text>Un qr code se trouve juste devant vous à votre table scannez le pour commander.</Text>
        </Center>
        <Center>
          <Button bg="myprimary" w="1/2" onPress={() => console.log("open scan qr code")}>
            Scan QR code
          </Button>
        </Center>
      </VStack> */}
    </VStack>
  );
}

export default ScanQRCode;
