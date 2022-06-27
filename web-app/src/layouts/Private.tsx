import React, { useEffect, useState } from "react";
import routes from "../screens/routes";
import { Routes, Route } from "react-router-dom";
import HStack from "../components/HStack";
import SideBar from "../components/SideBar";
import { Order } from "../globals/type";
import { allOrdersRequest, profileRequest } from "../globals/fetch";
import socketIOClient from "socket.io-client";

interface Props {
  token: string;
}
const END_POINT = process.env.WS_BACKEND_URL || "http://localhost:5000";

export default function Private({ token }: Props): React.ReactElement {
  const [orders, setOrders] = useState<Order[]>([]);
  const [establishment, setEstablishment] = useState<any|null>(null);
  useEffect(() => {
    allOrdersRequest().then(data => {
      setOrders(data);
    });
    profileRequest().then((data) => {
      setEstablishment(data);
    });
  }, []);

  // @ts-ignore
  useEffect(() => {
    if(!establishment || !establishment.hasOwnProperty("establishment")) return;
    const socket = socketIOClient(END_POINT);
    socket.emit("test", "Hello from client");
    socket.on(`establishment-${establishment.establishment}_order-added`, (newOrder: Order) => {
      setOrders(current => [...current, newOrder]);
    });
    socket.on(`test`, (message: string) => {
      console.log("message from socket io", message);
    });
    return () => socket.disconnect();
  }, [establishment]);

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
        <SideBar
          establishment={establishment}
          routes={routes.filter(r => r.layout === "private" && r.hide !== true)}
        />
      )}

      <div style={{ flexGrow: 1, height: "100%" }}>
        <PrivateRoutes />
      </div>

    </HStack>
  );
}
