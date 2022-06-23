// import { View } from "native-base";
import React, { useState } from "react";
import Button from "../../../components/Button";
import Title from "../../../components/Title";
import VStack from "../../../components/VStack";
import { loginRequest } from "../../../globals/fetch";

interface Props {};

interface FormProps {
  email: string;
  password: string;
};

export default function Login(props: Props): React.ReactElement {
  const [form, setForm] = useState<FormProps>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string|null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function onChange(e:any): void {
    const { name, value, key } = e.target;
    setForm(current => ({ ...current, [name]: value }));
    if (key === 'Enter') onSubmit();
  }

  function onSubmit(): void {
    setError(null);
    setIsLoading(true);
    loginRequest(form)
      .then(({ username = null, token = null }) => {
        if(username == "Invalid credentials") setError("Email ou mot de passe incorrect");
        else if(token) {
          localStorage.setItem("token", token);
          window.location.replace("/");
        };
        setIsLoading(false);
      });
  }

  function Loading(loading: boolean = false) {
    return (
      <div style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, backgroundColor: "" }}>

      </div>
    );
  }
  return (
      <div>
        <Title title="Login" />
        <VStack space={10} pl={50}>
          <div style={{ color: "red" }}>{error}</div>
          <VStack space={5}>
            <div>Email : </div>
            <input type="email" value={form.email} name="email" onChange={onChange} />
          </VStack>
          <VStack space={5}>
            <div>Mot de passe : </div>
            <input type="password" value={form.password} name="password" onChange={onChange} />
          </VStack>
          <VStack space={5}>
            <Button label="CONNEXION" onClick={onSubmit} />
          </VStack>
        </VStack>
      </div>
  );
}
