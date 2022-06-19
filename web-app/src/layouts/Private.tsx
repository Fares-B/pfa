import React from "react";
import routes from "../screens/routes";
import { Routes, Route } from "react-router-dom";
import HStack from "../components/HStack";
import SideBar from "../components/SideBar";

interface Props {
  ok?: boolean;
}

export default function Private(props: Props): React.ReactElement {
  function PrivateRoutes() {
    return (
      <Routes>
        {routes.map((route, index) => {
          if (route.layout !== "private") return null;
          const Screen = route.element;
          return (
            <Route
              key={index}
              path={route.path}
              element={<Screen />}
            />
          );
        })}
      </Routes>
    );
  }

  return (
    <HStack space={5}>

      <SideBar routes={routes.filter(r => r.layout == "private" && r.hide !== true)} />

      <div style={{ flexGrow: 1 }}>
        <PrivateRoutes />
      </div>

    </HStack>
  );
}
