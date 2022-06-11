import { faEye, faEyeSlash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Box, HStack, Input, Pressable, Text, VStack } from "native-base";
import React, { useState } from "react";
import { FloatingInputProps } from "./type";



const FloatingInput: React.FC<FloatingInputProps> = ({ isDanger = false, title = null, type = "text", value = "", onChangeText }) => {
  const [show, setShow] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  let inputProps: any = {
    py: 4,
    borderWidth: 0,
    rounded: 0,
    w: { base: "75%", md: "25%" },
    _focus: { bg: "transparent" },
    placeholder: title || "",
    onBlur: () => setIsFocus(false),
    onFocus: () => setIsFocus(true),
    value,
    onChangeText,
  };
  const iconProps = {
    color: isDanger ? "#D60606" : isFocus ? "#2988E0" : "black",
    size: 20,
  };
  if(type == "numeric") {
    inputProps.keyboardType = "numeric";
  }

  function getInput() {
    if (type === "email") {
      return <Input {...inputProps} keyboardType="email-address" InputLeftElement={<FontAwesomeIcon icon={faUser} {...iconProps} />} placeholder="Email" />
    }
    if (type === "password") {
      return (
        <Input
          type={show ? "text" : "password"}
          {...inputProps}
          InputRightElement={<Pressable onPress={() => setShow(!show)} >
            <FontAwesomeIcon {...iconProps} icon={show ? faEye : faEyeSlash} />
          </Pressable>}
        />
      );
    }
    return <Input {...inputProps} />;
  }

  return (
    <VStack space={2}>
      {title && (
        <Text color="mygray">{title}</Text>
      )}
      <HStack w="full">
        <Box h="full" w={1} bg={isDanger ? "mydanger" : isFocus ? "myprimary" : "black"} marginRight={3} />
        {getInput()}
      </HStack>
    </VStack>
  );
};

export default FloatingInput;
