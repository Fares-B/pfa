import React, { useEffect, useState } from "react";
import { Button, Center, HStack, Modal, Pressable, ScrollView, Stack, Text, useDisclose, VStack } from "native-base";
import { IngredientProps, Menu } from "./type";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClose, faOutdent } from "@fortawesome/free-solid-svg-icons";
import { convertNumberToPrice } from "@app/globals/functions";
import { TouchableOpacity } from "react-native";

const Rissoto: Menu = {
  name: "Rissoto",
  price: 900,
  ingredients: [
    { 
      name: "Safran",
      price: 275,
      isRemoved: true
    },
    { 
      name: "Sauce test",
      price: 100,
      isRemoved: false
    },
  ],
  supplements: [
    {
      name: "Fromage",
      price: 125,
    },
    {
      name: "Persil",
      price: 50,
    },
  ]
};
const Rissoto2 = { ...Rissoto, price: 1100 };

const Ingredients: React.FC<IngredientProps> = ({ ingredients = [], isSupplement = false }) => {
  const ingredientsFiltered = isSupplement? ingredients : ingredients.filter(i => i.isRemoved == true);
  
  if(ingredientsFiltered.length === 0) return null;

  return (
    <VStack space={1}>
      <Text color="mygray">{isSupplement ? "+ supplement" : "- retirer"}</Text>
      {ingredientsFiltered.map((ing, key) => (
        <HStack pl={4} w="full" justifyContent="space-between" key={key}>
          <Text fontSize={13}>{ing.name}</Text>
          {isSupplement && (
            <Text fontSize={13}>{convertNumberToPrice(ing.price)}</Text>
          )}
        </HStack>
      ))}
    </VStack>
  );
}

const TotalFromMenu: React.FC<Menu> = ({ supplements, price }) => {
  let total = price;
  for (const item of supplements) {
    total += item.price;
  }
  return <Text fontSize={13} textAlign="right">{convertNumberToPrice(total)}</Text>
}

const Cart: React.FC = () => {
  const [items, setItems] = useState<Menu[]>([Rissoto, Rissoto2, Rissoto2]);
  const [total, setTotal] = useState<number>(0);
  const { isOpen, onClose, onOpen } = useDisclose();
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

  if(items.length === 0) {
    return (
      <Center flex={1}>
        <Text>Panier vide</Text>
      </Center>
    );
  }

  return (
    <VStack space={4} mt={4} px={4} flex={1}>
      <HStack justifyContent="space-between" alignItems="center">
        <HStack space={3} alignItems="center">
          <FontAwesomeIcon icon={faOutdent} style={{ opacity: 0 }} />
          <Text fontSize={18} bold>Le bon resto</Text>
        </HStack>
        <Text>Table n°2</Text>
      </HStack>

      <ScrollView flex={1} mx={4} mt={8}>
        <VStack space={4}>
          {items.map((item, key) => (
            <VStack key={key} space={2}>
              <HStack justifyContent="space-between" alignItems="center">
                <Text fontSize={16} fontWeight={600}>{item.name}</Text>
                <Text fontSize={13}>{convertNumberToPrice(item.price)}</Text>
              </HStack>

              <Ingredients ingredients={item.supplements} isSupplement={true} />
              <Ingredients ingredients={item.ingredients} />
              <TotalFromMenu {...item} />
            </VStack>
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
        <Button bg="myprimary" w="2/3" onPress={() => console.log("command buy for total : ", total)}>
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
    </VStack>
  );
};

export default Cart;
