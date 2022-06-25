import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/Button";
import Card from "../../../components/Card";
import Center from "../../../components/Center";
import Grid from "../../../components/Grid";
import HStack from "../../../components/HStack";
import Title from "../../../components/Title";
import VStack from "../../../components/VStack";
import { profileRequest } from "../../../globals/fetch";

type TableType = {
  id: number;
  number: number;
};

interface EstablishmentProps {
  establishment: number;
  tables: TableType[];
  user: number;
  name: string;
  address: string;
};


export default function Profile(): React.ReactElement {
  const [establishment, setEstablishment] = React.useState<EstablishmentProps>({
    establishment: 0,
    tables: [],
    user: 0,
    name: "",
    address: ""
  });

  useEffect(() => {
    profileRequest().then(data => {
      setEstablishment(data);
    });
  }, []);

  function generateQRCode(table:TableType) {
    const url = `http://localhost:5000/establishment/qrcode/generate?establishment=${establishment.establishment}&table=${table.number}&user=${establishment.user}&name=${establishment.name}`;
    window.open(url, "_blank")?.focus();
  }

  return (
    <VStack space={50}>
      <HStack w="100%" justifyContent="space-between" alignItems="center" >
        <Title title="Profil" />
        <HStack mr={15}>
          <a
            href="/login"
            style={{ textDecoration: "none" }}
            onClick={() => localStorage.removeItem("token")}
          >Déconnexion</a>
        </HStack>
      </HStack>
      <HStack justifyContent="space-between" alignItems="center" flex={1}>
        <VStack space={10}>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{establishment.name}</div>
          <div style={{ fontSize: 16, fontWeight: 500, color: "gray" }}>{establishment.address}</div>
        </VStack>
      </HStack>
      {establishment.tables.length == 0 && (
        <Center>
          <p>Pas de table, veuillez demander à votre administrateur de rajouter des tables.</p>
        </Center>
      )}
     <Grid cols={5} space={60}>
      {establishment.tables.map((table, key) => (
        <Card key={key} w="100%">
          <VStack space={20} w="100%" justifyContent="center" alignItems="center">
            <div style={{ fontSize: 58, fontWeight: 600 }}>
              {table.number}
            </div>
            <Button label="Générer QR code" onClick={() => generateQRCode(table)} />
          </VStack>
        </Card>
      ))}
     </Grid>
    </VStack>
  );
}
