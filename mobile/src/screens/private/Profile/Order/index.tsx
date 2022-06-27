import React, { useEffect, useState } from "react";
import { Box, Button, Center, HStack, Image, Modal, ScrollView, Text, useDisclose, VStack } from "native-base";
import Header from "@app/components/Header";
import { useDispatch, useSelector } from "react-redux";
import { HistoryProps } from "@app/globals/types";
import { TouchableOpacity } from "react-native";
import { convertNumberToPrice, formatDate } from "@app/globals/functions";
import AccountActions from "@app/reducers/account";
import { cancelOrderRequest, getHistoryOrdersRequest } from "@app/globals/fetch";
import HistoryActions from "@app/reducers/history";


const ORDER_STATUS = {
  new: "En attente",
  inprogress: "En cours",
  completed: "Terminé",
  canceled: "Annulé",
};

const Order: React.FC<any> = ({ navigation }) => {
  const dispatch = useDispatch();
  const orders: HistoryProps[] = useSelector((state: any) => state.history.orders);
  const [selectedOrder, setSelectedOrder] = useState<HistoryProps|null>(null);
  const { isOpen, onClose, onOpen } = useDisclose();
  
  useEffect(() => {
    dispatch(AccountActions.setLoading(true));
    getHistoryOrdersRequest().then(o => {
      dispatch(AccountActions.setLoading(false));
      dispatch(HistoryActions.setOrders(o));
    });
  }, []);

  function onWantToRemoveOrder(order: HistoryProps) {
    setSelectedOrder(order);
    onOpen();
  }

  async function onCancel() {
    if(selectedOrder) {
      dispatch(AccountActions.setLoading(true));
      const response = await cancelOrderRequest(selectedOrder._id);
      console.log(response);
      if(response.hasOwnProperty("order")) {
        dispatch(HistoryActions.cancelOrder(response.order));
      }        
      dispatch(AccountActions.setLoading(false));
    }
    onClose();
  }


  return (
    <VStack space={4} mt={4} px={4} flex={1}>
      <Header navigation={navigation} />

      <ScrollView flex={1} mx={4} mt={8}>
        <VStack space={4}>
          {orders.length == 0 && (
            <Center>
              <Text>Aucun commande</Text>
            </Center>
          )}
          {orders.map((order, key) => (
            <TouchableOpacity
              key={key}
              onPress={() => navigation.navigate("OrderDetails", { order })}
              onLongPress={() => order.status == "new" ? onWantToRemoveOrder(order) : null}
            > 
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize={16} fontWeight={700} ml={4}>{formatDate(order.createdAt)}</Text>
                <VStack space={2}>
                  <Box rounded="16" px={4} py={1} bg={"status."+order.status}>
                    <Text fontSize={12} fontWeight={700} color="white">{ORDER_STATUS[order.status]}</Text>
                  </Box>
                  <Text fontSize={13} flex={1} textAlign="right">{convertNumberToPrice(order.totalPrice)}</Text>
                </VStack>
              </HStack>
              
            </TouchableOpacity>
          ))}
        </VStack>
      </ScrollView>

      <Modal isOpen={isOpen}>
        <VStack bg="white" px={8} mx={8} rounded={8} py={10} space={12}>
          <Text>Voulez-vous vraiment annuler cette commande ?</Text>
          <HStack justifyContent="space-evenly" space={8}>
            <Button onPress={onClose} flex={1}>
              <Text color="white">Non</Text>
            </Button>
            <Button onPress={onCancel} flex={1} colorScheme="blueGray">
              <Text color="white">Oui</Text>
            </Button>
          </HStack>
        </VStack>
      </Modal>

    </VStack>
  );
};

export default Order;
