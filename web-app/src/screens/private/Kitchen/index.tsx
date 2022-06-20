import React from "react";
import Card from "../../../components/Card";
import Grid from "../../../components/Grid";
import HStack from "../../../components/HStack";
import Title from "../../../components/Title";
import VStack from "../../../components/VStack";
import { Menu, Order } from "../../../globals/type";

interface Props {
  orders: Order[];
}

export default function Kitchen({ orders }: Props): React.ReactElement {

  return (
    <VStack h="100%" p={15}>
      <HStack alignItems="center" >
        <Title title="Cuisine" />
      </HStack>
      <Grid cols={4} space={60} h="100%">
        {orders.map(order => {
          return order.menus.map((menu, index) => (
            <Card key={order._id + ":" + index} w="100%" h="100%">
              <VStack space={20}>
                <div>{menu.name}</div>
                <VStack space={0} mt={10} h="30%">
                  <div>Ingrédient à retirer</div>
                  <div>
                    {menu.ingredients.filter(ingredient => ingredient.isRemoved).map(ingredients => ingredients.name).join(", ")}
                  </div>
                </VStack>
                <VStack space={0} mt={10}>
                  <div>Supplément à ajouter</div>
                  <div>
                    {menu.supplements.map(supplements => supplements.name).join(", ")}
                  </div>
                </VStack>
              </VStack>
            </Card>
          ))
        })}
      </Grid>
    </VStack>
  );
}
