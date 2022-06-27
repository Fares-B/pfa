import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type PropsScreen = NativeStackScreenProps<any>;

export interface IngredientProps {
    name: string;
    price: number;
    isRemoved?: boolean;
};

export interface MenuProps {
    _id?: string;
    timestamp?: number;
    id: number;
    name: string;
    price: number;
    ingredients: IngredientProps[];
    supplements: IngredientProps[];
};

export interface RestoProps {
    menus: MenuProps[];
    resto: any;
    supplements: IngredientProps[];
};

interface CompanyProps {
    name?: string;
    address?: string;
    user: number;
    establishment: number;
    table: number;
};

export interface HistoryProps {
    _id: string;
    user: string;
    menus: MenuProps[];
    company: CompanyProps;
    totalPrice: number;
    status: "new"|"inprogress"|"completed"|"canceled";
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
};
