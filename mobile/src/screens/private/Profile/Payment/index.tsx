import Header from "@app/components/Header";
import { Center, Text, VStack } from "native-base";
import React from "react";

const Payment: React.FC<any> = ({ navigation }) => {

  return (
    <VStack flex={1} px={4} mt={4}>
      <Header navigation={navigation} />
      <Center flex={1}>
        <Text fontSize={18}>Soon</Text>
      </Center>
    </VStack>
  );
};

export default Payment;
