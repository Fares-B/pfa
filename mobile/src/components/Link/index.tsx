import React from "react";
import { Link as NBLink, Text } from "native-base";
import { LinkProps } from "./type";


const Link: React.FC<LinkProps> = ({ onNavigateTo, children }) => {
  return (
   <NBLink onPress={onNavigateTo} isUnderlined={false}>
    <Text color="myprimary" fontSize={16}>{children}</Text>
   </NBLink>
  );
};

export default Link;
