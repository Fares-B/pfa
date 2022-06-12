export interface Ingredient {
    name: string;
    price: number;
    isRemoved?: boolean;
};

export interface Menu {
    name: string;
    price: number;
    ingredients: Ingredient[];
    supplements: Ingredient[];

};