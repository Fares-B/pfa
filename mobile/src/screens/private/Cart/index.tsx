import React, { useEffect, useState } from "react";
import { Box, Button, Center, HStack, Image, Modal, Pressable, ScrollView, Stack, Text, Toast, useDisclose, VStack } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClose, faOutdent } from "@fortawesome/free-solid-svg-icons";
import { convertNumberToPrice } from "@app/globals/functions";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { MenuProps } from "@app/globals/types";
import CartActions from "@app/reducers/cart";
import AccountActions from "@app/reducers/account";
import HistoryActions from "@app/reducers/history";
import { postMenuRequest } from "@app/globals/fetch";
import { Ingredients, TotalFromMenu } from "@app/components/MenuFood";



const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const resto = useSelector((state: any) => state.account.establishment);
  const items: MenuProps[] = useSelector((state: any) => state.cart.menus);
  const [total, setTotal] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<MenuProps|null>(null);
  const { isOpen, onClose, onOpen } = useDisclose();
  const { isOpen: isOpenRemove, onClose: onCloseRemove, onOpen: onOpenRemove } = useDisclose();
  const [paymentMethod, setPaymentMethod] = useState<string>("fares@tac.fr");

  useEffect(() => {
    let tt = 0;
    for (const item of items) {
      tt += item.price;
      for (const supp of item.supplements) {
        tt += supp.price;
      }
    }
    setTotal(tt);
  });

  function onWantToRemoveItem(item: MenuProps) {
    setSelectedItem(item);
    onOpenRemove();
  }

  function onRemoveItem(): void {
    if(selectedItem) {    
      dispatch(CartActions.removeMenu(selectedItem.timestamp));
    }
    setSelectedItem(null);
    onCloseRemove();
  }

  async function onSubmit() {
    dispatch(AccountActions.setLoading(true));
    const order = await postMenuRequest({
      menus: items,
      ...resto,
    });
    dispatch(HistoryActions.addOrder(order));
    dispatch(AccountActions.setLoading(false));
    dispatch(CartActions.resetState());
    Toast.show({
      placement: "top",
      render: () => (
        <Box bg="myprimary" px="3" py="2" rounded="sm" mb={5}>
          <Text color="white" fontWeight={700}>{"Commande accepté"}</Text>
        </Box>
      )
    });

  }

  if(items.length === 0) {
    return (
      <Center flex={1}>
        <Text>Panier vide</Text>
      </Center>
    );
  }

  return (
    <VStack space={4} mt={4} px={4} flex={1}>
      {resto && (
        <HStack justifyContent="space-between" alignItems="center">
          <HStack space={3} alignItems="center" flex={1}>
            <FontAwesomeIcon icon={faOutdent} style={{opacity: 0}}/>
            <Text flex={1} fontSize={18} bold>{resto.name}</Text>
          </HStack>
          <Text>Table n°{resto.table}</Text>
        </HStack>
      )}

      <ScrollView flex={1} mx={4} mt={8}>
        <VStack space={4}>
          {items.map((item, key) => (
            <TouchableOpacity key={key} onLongPress={() => onWantToRemoveItem(item)}>
              <VStack space={2}>
                <HStack justifyContent="space-between" alignItems="flex-end">
                  <Image src={"https://loremflickr.com/320/320/food?lock=" + item.id} alt={item.name} size={60} />
                  <Text fontSize={16} fontWeight={700} ml={4}>{item.name}</Text>
                  <Text fontSize={13} flex={1} textAlign="right">{convertNumberToPrice(item.price)}</Text>
                </HStack>

                <Ingredients ingredients={item.supplements} isSupplement={true} />
                <Ingredients ingredients={item.ingredients} />
                <TotalFromMenu {...item} />
              </VStack>
            </TouchableOpacity>
          ))}
          <HStack justifyContent="space-between" space={6} alignItems="center">
            <Text textAlign="right" flex={1} fontWeight={700} fontSize={18}>Total</Text>
            <Text fontSize={18}>{convertNumberToPrice(total)}</Text>
          </HStack>
          <TouchableOpacity onPress={onOpen}>
            <VStack space={2}>
              <Text fontWeight={600}>Moyen de paiement</Text>
              <Text fontSize={18} fontWeight={600}>{paymentMethod}</Text>
            </VStack>
          </TouchableOpacity>
        </VStack>
      </ScrollView>
      <Center>
        <Button bg="myprimary" w="2/3" onPress={onSubmit}>
          <Text fontWeight={700} fontSize={20} color="white">Commander</Text>
        </Button>
      </Center>

      <Modal isOpen={isOpen}>
        <Stack bg="white" p={8} space={4}>
          <Pressable onPress={onClose} justifyContent="flex-end" position="absolute" right={15} top={3}>
            <FontAwesomeIcon icon={faClose} color="#929191" size={25} />
          </Pressable>
          <Text fontSize={16} fontWeight={700}>Choisir un moyent de paiement</Text>

          <VStack space={4}>
            <Text fontWeight={700}>Paypal</Text>
            <TouchableOpacity onPress={() => {onClose(); setPaymentMethod("fares@tac.fr")}} >
              <Text>fares@tac.fr</Text>
            </TouchableOpacity>
          </VStack>

          <VStack space={4}>
            <Text fontWeight={700}>Carte</Text>
            <TouchableOpacity onPress={() => {onClose(); setPaymentMethod("423925*******")}} >
              <Text>423925*******</Text>
            </TouchableOpacity>
          </VStack>
        </Stack>
      </Modal>

      <Modal isOpen={isOpenRemove}>
        <VStack bg="white" px={8} mx={8} rounded={8} py={10} space={12}>
          <Text>Voulez-vous vraiment supprimer ce menu de votre panier ?</Text>
          <HStack justifyContent="space-evenly" space={8}>
            <Button onPress={onCloseRemove} flex={1}>
              <Text color="white">Non</Text>
            </Button>
            <Button onPress={onRemoveItem} flex={1} colorScheme="blueGray">
              <Text color="white">Oui</Text>
            </Button>
          </HStack>
        </VStack>
      </Modal>
    </VStack>
  );
};

export default Cart;
