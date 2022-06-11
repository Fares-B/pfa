import Header from "@app/components/Header";
import { Text, VStack } from "native-base";
import React from "react";

const Payment: React.FC<any> = ({ navigation }) => {

  return (
    <VStack flex={1} px={4} mt={4}>
      <Header navigation={navigation} />
      <Text>Payment</Text>
    </VStack>
  );
};

export default Payment;
