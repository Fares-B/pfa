import React from "react";
import { HStack, Image, ScrollView, Text, VStack } from "native-base";
import Header from "@app/components/Header";
import { convertNumberToPrice } from "@app/globals/functions";
import { Ingredients, TotalFromMenu } from "@app/components/MenuFood";
import { HistoryProps } from "@app/globals/types";


const ORDER_STATUS = {
  new: "En attente",
  inprogress: "En cours",
  completed: "Terminé",
  canceled: "Annulé",
};


const OrderDetails: React.FC<any> = ({ navigation, route }) => {
  const order: HistoryProps = route.params.order;

  return (
    <VStack space={4} mt={4} px={4} flex={1}>
      <Header navigation={navigation} />

      <ScrollView flex={1} mx={4} mt={8}>
        <VStack space={4}>
          {order.menus.map((item, key) => (
            <VStack space={2} key={key}>
              <HStack justifyContent="space-between" alignItems="flex-end">
                <Image src={"https://loremflickr.com/320/320/food?lock=" + item.id} alt={item.name} size={60} />
                <Text fontSize={16} fontWeight={700} ml={4}>{item.name}</Text>
                <Text fontSize={13} flex={1} textAlign="right">{convertNumberToPrice(item.price)}</Text>
              </HStack>

              <Ingredients ingredients={item.supplements} isSupplement={true} />
              <Ingredients ingredients={item.ingredients} />
              <TotalFromMenu {...item} />
            </VStack>
          ))}
          <HStack justifyContent="space-between" space={6} alignItems="center">
            <Text textAlign="right" flex={1} fontWeight={700} fontSize={18}>Total</Text>
            <Text fontSize={18}>{convertNumberToPrice(order.totalPrice)}</Text>
          </HStack>
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default OrderDetails;
