interface Ingredient {
    name: string;
    price: number;
    isRemoved?: boolean;
};

export interface IngredientProps {
    ingredients: Ingredient[];
    isSupplement?: boolean;
}