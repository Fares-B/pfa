interface Ingredient {
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

export interface IngredientProps {
    ingredients: Ingredient[];
    isSupplement?: boolean;
}
  
  // interface ItemCart {
  //   menu: Menu;
  // } 