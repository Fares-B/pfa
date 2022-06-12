import { convertNumberToPrice } from "@app/globals/functions";
import { faA, faAdd, faArrowLeft, faClose, faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Button, Center, HStack, Pressable, ScrollView, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Ingredient, Menu } from "./type";


const ingredients = [
  {name: "pépite", price: 50 },
  {name: "chocolat", price: 200 },
  {name: "pistache", price: 175 },
];


const MenuDetails: React.FC<any> = ({ navigation, route }) => {
  const menu: Menu = route.params.menu;
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
    return list.filter(i => i.name === ingredient.name).length !== 0;
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
        newSupplement= supplement.filter(i => i.name !== ing.name);
      } else {
        newSupplement = [...supplement, ing];
      }
      return { ...current, supplements: newSupplement };
    });
  }

  const Ingredient: React.FC<any> = ({ ingredient }) => {
    const exist = ingredientExist(item.supplements, ingredient);
    return (
      <TouchableOpacity onPress={() => addSupplement(ingredient)}>
        <HStack pl={4} w="full" justifyContent="space-between">
          <HStack space={4}>
            <FontAwesomeIcon icon={exist ? faRemove : faAdd} />
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
          <Text fontSize={22} fontWeight={700} flex={5}>{menu.name}</Text>
          <Text fontSize={22} fontWeight={700} flex={1}>{convertNumberToPrice(menu.price)}</Text>
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
          {ingredients.map((ing, key) => (
            <Ingredient key={key} ingredient={ing} />
          ))}
        </VStack>

        <HStack mt={6} justifyContent="space-between" space={6} alignItems="center">
          <Text textAlign="right" flex={1} fontWeight={700} fontSize={18}>Total</Text>
          <Text fontSize={18}>{convertNumberToPrice(total)}</Text>
        </HStack>
      </ScrollView>

      <Center>
        <Button w="2/3" onPress={() => console.log("add this to cart", menu)}>
          <Text color="white" fontWeight={700} fontSize={16}>
            Ajouter au panier
          </Text>
        </Button>
      </Center>

    </VStack>
  );
};

export default MenuDetails;
