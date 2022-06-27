import React from "react";
import { Center, Text, VStack } from "native-base";
import QRCodeScanner from "react-native-qrcode-scanner";
// import { RNCamera } from "react-native-camera";
import { TouchableOpacity } from "react-native";


const ScanQRCode: React.FC<any> = ({ saveData }) => {
  function onSuccess (e:any) {
    const r = JSON.parse(e.data);
    saveData(r);
    console.log(r);
    // Linking.openURL(e.data).then(t => {
    //   console.log("success ", t);
    // }).catch(err =>
    //   console.error('An error occured', err)
    // );
  }

  return (
    <VStack space={4} flex={1}>

      <Center my={4} px={4}>
        <Text fontSize={18}>
          Un qr code se trouve juste devant vous à votre table scannez le pour commander.
        </Text>
      </Center>
      <QRCodeScanner
        // flashMode={RNCamera.Constants.FlashMode.torch}
        reactivate={true}
        reactivateTimeout={5000}
        onRead={onSuccess}
        containerStyle={{ height: 200 }}
        // topContent={
        //   <Text fontSize={18} px={4} mb={4}>
        //     Un qr code se trouve juste devant vous à votre table scannez le pour commander.
        //   </Text>
        // }
        bottomContent={
          <TouchableOpacity style={{ padding: 16 }}>
            <Text fontSize={21} opacity={0}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    </VStack>
  );
}

export default ScanQRCode;
