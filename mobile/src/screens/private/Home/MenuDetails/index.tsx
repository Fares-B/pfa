import { convertNumberToPrice } from "@app/globals/functions";
import { faAdd, faArrowLeft, faClose, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Box, Button, Center, HStack, Pressable, ScrollView, Text, Toast, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import CartActions from "@app/reducers/cart";
import { Ingredient, Menu } from "./type";


const MenuDetails: React.FC<any> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isHistory: boolean = route.params.isHistory||false;
  const menu: Menu = route.params.menu;
  const supplements: Ingredient[] = route.params.supplements;
  const resto = route.params.resto;
  const [item, setItem] = useState<Menu>(menu);
  const [total, setTotal] = useState<number>(menu.price);

  useEffect(() => {
    let total = item.price;
    for (const supp of item.supplements) {
      total += supp.price;
    }
    setTotal(total);
  }, [item]);

  function ingredientExist(list: Ingredient[], ingredient: Ingredient) {
    return list.filter(i => i.id === ingredient.id).length !== 0;
  }

  function onChangeIngredientBase(ing: Ingredient): void {
    setItem(current => {
      const ingredients = [...item.ingredients];
      for (const ingredient of ingredients) {
        if(ingredient.name == ing.name) {
          ingredient.isRemoved = !ingredient.isRemoved;
        }
      }
      return { ...current, ingredients };
    });
  }

  function addSupplement(ing: Ingredient): void {
    setItem(current => {
      const supplement = [...item.supplements];
      let newSupplement: Ingredient[] = [];
      if(ingredientExist(supplement, ing)) {
        newSupplement= supplement.filter(i => i.id !== ing.id);
      } else {
        newSupplement = [...supplement, ing];
      }
      return { ...current, supplements: newSupplement };
    });
  }

  function onSubmit(): void {
    Toast.show({
      placement: "top",
      render: () => (
        <Box bg={"myprimary"} px="3" py="2" rounded="sm" mb={5}>
          <Text color="white" fontWeight={700}>{"Menu ajouté au panier"}</Text>
        </Box>
      )
    });
    dispatch(CartActions.addMenu({...item, timestamp: new Date().getTime()}));
  }

  const Ingredient: React.FC<{ ingredient: Ingredient }> = ({ ingredient }) => {
    const exist = ingredientExist(item.supplements, ingredient);
    return (
      <TouchableOpacity onPress={() => addSupplement(ingredient)}>
        <HStack pl={4} w="full" justifyContent="space-between">
          <HStack space={4}>
            <FontAwesomeIcon icon={exist ? faMinus : faAdd} />
            <Text fontSize={13} color={exist ? "success.500" : "black"}>{ingredient.name}</Text>
          </HStack>
          <Text fontSize={13}>{convertNumberToPrice(ingredient.price)}</Text>
        </HStack>
      </TouchableOpacity>
    );
  }

  return (
    <VStack space={4} my={4} px={4} flex={1}>
      <HStack justifyContent="space-between" alignItems="center">
        <HStack space={3} alignItems="center" flex={1}>
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </Pressable>
          <Text flex={1} fontSize={18} bold>{resto.name}</Text>
        </HStack>
        <Text>Table n°{resto.table}</Text>
      </HStack>

      <ScrollView mt={4}>
        <HStack justifyContent="space-between">
          <Text fontSize={22} fontWeight={700}>{menu.name}</Text>
          <Text fontSize={22} fontWeight={700}>{convertNumberToPrice(menu.price)}</Text>
        </HStack>
        <VStack space={2} mt={8}>
          <Text color="mygray">Liste des ingrédients</Text>
          {item.ingredients.map((ing, key) => (
            <TouchableOpacity key={key} onPress={() => onChangeIngredientBase(ing)}>
              <HStack pl={4} w="full" space={4}>
                <FontAwesomeIcon icon={faClose} style={{ opacity: ing.isRemoved ? 1 : 0}} color="red" />
                <Text fontSize={13} color={ing.isRemoved ? "mydanger" : "black"}>{ing.name}</Text>
              </HStack>
            </TouchableOpacity>
          ))}
        </VStack>
        <VStack space={2} mt={8}>
          <Text color="mygray">Supplement</Text>
          {supplements.map((ing, key) => (
            <Ingredient key={key} ingredient={ing} />
          ))}
        </VStack>

        <HStack mt={6} justifyContent="space-between" space={6} alignItems="center">
          <Text textAlign="right" flex={1} fontWeight={700} fontSize={18}>Total</Text>
          <Text fontSize={18}>{convertNumberToPrice(total)}</Text>
        </HStack>
      </ScrollView>

      <Center>
        <Button w="2/3" onPress={onSubmit} bg="myprimary">
          <Text color="white" fontWeight={700} fontSize={16}>
            Ajouter au panier
          </Text>
        </Button>
      </Center>

    </VStack>
  );
};

export default MenuDetails;
