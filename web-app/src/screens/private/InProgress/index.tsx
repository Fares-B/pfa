import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Center from "../../../components/Center";
import Grid from "../../../components/Grid";
import HStack from "../../../components/HStack";
import Title from "../../../components/Title";
import VStack from "../../../components/VStack";
import { updateStatusRequest } from "../../../globals/fetch";

import { Order } from "../../../globals/type";

interface Props {
  orders: Order[];
  setOrders: any;
  token: string;
};


export default function InProgress({ orders, setOrders }: Props): React.ReactElement {
  
  const onNextStatus = (id: string): void => {
    updateStatusRequest(id).then(data => {
      console.log("DATA UPDATED", data);
      const newOrders = orders.filter(o => o._id !== id);
      setOrders(newOrders);
    });
  }

  return (
    <VStack>
      <HStack w="100%" justifyContent="space-between" alignItems="center" >
        <Title title="Commandes en cours" />
        <Link to={`/kitchen`} target="_blank" style={{ textDecoration: "none", marginRight: 20 }}>
          Cuisine
        </Link>
      </HStack>
      {orders.length == 0 && (
        <Center>
          <p>Aucune commande</p>
        </Center>
      )}
     <Grid cols={4} space={60}>
      {orders.map(order => {
        const createdAt = new Date(order.createdAt);
        const minutes = createdAt.getMinutes();
        const hours = createdAt.getHours();
        const time = `${hours < 10 ? "0" : ""}${hours}h${minutes < 10 ? "0" : ""}${minutes}`;

        return order.menus.map((menu, index) => (
          <Card key={order._id + ":" + index} w="100%">
            <VStack space={20} w="100%">
              <Center w="100%">
                <div style={{ fontSize: 24, fontWeight: 700 }}>N°{order.company.table}</div>
              </Center>
              <HStack justifyContent="space-between" w="100%">
                <div>{menu.name}</div>
                <div>{time}</div>
              </HStack>
              <VStack space={0} mt={10}>
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
              <Center>
                <Button label="Terminer" onClick={() => onNextStatus(order._id)} />
              </Center>
            </VStack>
          </Card>
        ))
      })}
     </Grid>
    </VStack>
  );
}
