import React from "react";
import { convertNumberToPrice } from "@app/globals/functions";
import { MenuProps } from "@app/globals/types";
import { HStack, Text, VStack } from "native-base";
import { IngredientProps } from "./type";

export const Ingredients: React.FC<IngredientProps> = ({ ingredients = [], isSupplement = false }) => {
  const ingredientsFiltered = isSupplement ? ingredients : ingredients.filter(i => i.isRemoved == true);

  if (ingredientsFiltered.length === 0) return null;

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

export const TotalFromMenu: React.FC<MenuProps> = ({ supplements, price }) => {
  let total = price;
  for (const item of supplements) {
    total += item.price;
  }
  return <Text fontSize={13} textAlign="right">{total == price ? "" : convertNumberToPrice(total)}</Text>
}