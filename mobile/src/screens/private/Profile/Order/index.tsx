import React from "react";
import { Center, Text, VStack } from "native-base";
import Header from "@app/components/Header";

const Order: React.FC<any> = ({ navigation }) => {
  return (
    <VStack flex={1} px={4} pt={4}>
      <Header navigation={navigation} />
      <Center flex={1}>
        <Text fontSize={18}>Soon</Text>
      </Center>
    </VStack>
  );
};

export default Order;
