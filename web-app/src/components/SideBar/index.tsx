import React from "react";
import { SideBarProps } from "./type";
import VStack from "../VStack";
import { Link } from "react-router-dom";
import Center from "../Center";


const SideBar = ({ routes, establishment }: SideBarProps): React.ReactElement => {
  return (
    <VStack space={50} pl={10} pr={10} w="200px">
      
      <Center w="100%" mt={20}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#a9a9a9" }}>{establishment ? establishment.name : ""}</div>
      </Center>

      <VStack space={30}>
        {routes.map((route, index) => {
          return (
            <Link style={{ textDecoration: "none" }} to={route.path} key={index}>
              {route.title}
            </Link>
          );
        })}
      </VStack>
    </VStack>
  );
}

export default SideBar;
