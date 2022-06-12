import React from "react";
import { Button, Center, Text, VStack } from "native-base";


const ScanQRCode: React.FC = () => {
  return (
    <VStack space={4} flex={1}>
      <Center bg="mygray" h="1/3">
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
      </VStack>
    </VStack>
  );
}

export default ScanQRCode;
