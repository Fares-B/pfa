import React from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Center from "../../../components/Center";
import HStack from "../../../components/HStack";
import Title from "../../../components/Title";
import VStack from "../../../components/VStack";
import { Card } from "./style";

interface Props {};

// const ingredients = [
//   { id: 1, name: "Chicken", isRemoved: true },
//   { id: 2, name: "Beef", isRemoved: false },
//   { id: 3, name: "Pork", isRemoved: true },
//   { id: 4, name: "Lamb", isRemoved: false },
//   { id: 5, name: "Fish", isRemoved: false },
//   { id: 6, name: "Egg", isRemoved: false },
//   { id: 7, name: "Milk", isRemoved: false },
//   { id: 8, name: "Cheese", isRemoved: false },
//   { id: 9, name: "Sauce", isRemoved: false },
//   { id: 10, name: "Tomato", isRemoved: false },
// ];

// const supplements = [
//   { id: 8, name: "Cheese", isRemoved: false },
//   { id: 6, name: "Egg", isRemoved: false },
// ];

const menus_mock = [
  { id: 1, name: "Margarita",
    ingredients: [{ id: 1, name: "Chicken", isRemoved: true }, { id: 3, name: "Pork", isRemoved: true }],
    supplements: [{ id: 6, name: "Egg", isRemoved: false }],
  },
  {
    id: 2, name: "Carbonara",
    ingredients: [{ id: 8, name: "Cheese", isRemoved: true }],
    supplements: [],
  },
  {
    id: 3, name: "Couscous",
    ingredients: [],
    supplements: [{ id: 9, name: "Milk", isRemoved: false }, { id: 10, name: "Tomato", isRemoved: false }],
  },
];

export default function InProgress(props: Props): React.ReactElement {
  const [menus, setMenus] = React.useState(menus_mock);
  
  
  return (
    <VStack>
      <HStack justifyContent="space-between" alignItems="center" >
        <Title title="Commandes en cours" />
        <Link to={`/kitchen`} style={{ textDecoration: "none" }}>
          Kitchen
        </Link>
      </HStack>
     <HStack space={20}>
      {menus.map((menu) => (
        <Card key={menu.id}>
          <VStack space={20}>
            <div>{menu.name}</div>
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
              <Button label="Terminer" onClick={() => console.log(menu.id, menu.name)} />
            </Center>
          </VStack>
        </Card>
      ))}
     </HStack>
    </VStack>
  );
}
