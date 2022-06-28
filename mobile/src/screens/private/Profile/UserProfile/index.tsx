import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faCreditCard, faGear, faHistory } from "@fortawesome/free-solid-svg-icons";
import { HStack, Pressable, Text, VStack } from "native-base";
import { useSelector } from "react-redux";
import { capitalize } from "@app/globals/functions";

const routes = [
  { title: "Commandes", name: "Order", icon: faHistory },
  { title: "Moyen de paiement", name: "Payment", icon: faCreditCard },
  { title: "Paramètres", name: "Setting", icon: faGear },
];

interface User {
  firstname: string;
  lastname: string;
  email: string;
  avatar: string|null;
};

const UserProfile: React.FC<any> = ({ navigation }) => {
  const user = useSelector((state: any) => state.account.user);
console.log("user profile", user);
  return (
    <VStack flex={1} space={24} px={4} pt={8}>
      <VStack alignItems="center" space={4}>
        {user.avatar ? null : (
          <FontAwesomeIcon icon={faUser} size={60} />
        )}
        <Text fontSize={18} fontWeight={600}>{user && `${capitalize(user.firstName)} ${capitalize(user.lastName)}`}</Text>
      </VStack>
      <VStack space={6}>
        {routes.map(item => (
          <Pressable onPress={() => navigation.navigate(item.name, { user })} key={item.name}>
            <HStack space={5}>
              <FontAwesomeIcon icon={item.icon} size={20} />
              <Text fontWeight={700}>{item.title}</Text>
            </HStack>
          </Pressable>
        ))}
      </VStack>
    </VStack>
  );
};

export default UserProfile;
