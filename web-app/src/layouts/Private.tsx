import React, { useEffect, useState } from "react";
import routes from "../screens/routes";
import { Routes, Route } from "react-router-dom";
import HStack from "../components/HStack";
import SideBar from "../components/SideBar";
import { Menu, Order } from "../globals/type";

interface Props {
  token: string;
}

export default function Private({ token }: Props): React.ReactElement {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch(process.env.BACKEND_BASE_URL || "http://localhost:5000" + "/establishment/menus", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
    })
    .then(res => res.json())
    .then(data => setOrders(data))
    .catch(err => console.log(err));
  }, []);

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
              element={<Screen orders={orders} setOrders={setOrders} token={token} />}
            />
          );
        })}
      </Routes>
    );
  }

  return (
    <HStack space={5} h="100%">

      {window.location.hash !== "#/kitchen" && (
        <SideBar routes={routes.filter(r => r.layout == "private" && r.hide !== true)} />
      )}

      <div style={{ flexGrow: 1, height: "100%" }}>
        <PrivateRoutes />
      </div>

    </HStack>
  );
}
