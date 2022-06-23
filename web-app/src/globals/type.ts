
export interface Ingredient {
    id: number;
    name: string;
    isRemoved: boolean;
    price?: number;
}
export interface Menu {
    name: string;
    ingredients: Ingredient[];
    supplements: Ingredient[];
    price?: number;
    createdAt: string;
    table?: number;
}

interface Company {
    user: number;
    table: number;
    establishment: number;
}

export interface Order {
    _id: string;
    company: Company;
    menus: Menu[];
    totalPrice: number;
    status: "new"|"inprogress"|"completed"|"cancelled";
    createdAt: string;
}

