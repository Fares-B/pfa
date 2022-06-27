export interface Ingredient {
    id: number;
    name: string;
    price: number;
    isRemoved?: boolean;
};

export interface Menu {
    id: number;
    name: string;
    price: number;
    ingredients: Ingredient[];
    supplements: Ingredient[];
};