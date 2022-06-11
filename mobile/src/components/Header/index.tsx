import React from "react";
import { Box, Center, HStack, Pressable, Text } from "native-base";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


const Header: React.FC<any> = ({ navigation, children = null }) => {
  return (
   <HStack justifyContent="space-between">

    <Pressable onPress={() => navigation.goBack()}>
      <FontAwesomeIcon icon={faArrowLeft} color="#2988E0" size={22} />
    </Pressable>

    {children && (
      <Center flex={1}>
        <Text fontSize={18} fontWeight={700} color="myprimary">{children}</Text>
      </Center>
    )}

    <Box size={22} />

   </HStack>
  );
};

export default Header;
