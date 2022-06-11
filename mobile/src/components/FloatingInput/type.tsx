
export interface FloatingInputProps {
    title: string;
    isDanger?: boolean;
    type: "email"|"password"|"text"|"numeric";
    value: string;
    onChangeText: (text: string) => void;
};
