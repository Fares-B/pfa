import { GestureResponderEvent } from "react-native";

export interface LinkProps {
    children: any;
    onNavigateTo: (props:GestureResponderEvent|undefined) => void;
};
