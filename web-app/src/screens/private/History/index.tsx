import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Center from "../../../components/Center";
import Grid from "../../../components/Grid";
import HStack from "../../../components/HStack";
import Title from "../../../components/Title";
import VStack from "../../../components/VStack";
import { Order } from "../../../globals/type";

interface Props {
  token: string;
}

export default function History({ token }: Props): React.ReactElement {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    console.log("fetch")
    const url = process.env.BACKEND_BASE_URL || "http://localhost:5000" + "/establishment/menus/history";
    console.log(url);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setOrders(data)
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <VStack>
      <HStack w="100%" justifyContent="space-between" alignItems="center" >
        <Title title="Historique" />
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
          const time = `${createdAt.getHours()}h${minutes < 10 ? "0" : ""}${minutes}`;

          return order.menus.map((menu, index) => (
            <Card key={order._id + ":" + index} w="100%">
              <VStack space={20} w="100%">
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
              </VStack>
            </Card>
          ))
        })}
      </Grid>
    </VStack>
  );
}
