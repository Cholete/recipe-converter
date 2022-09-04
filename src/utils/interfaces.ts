export interface Iingredient {
  amount: string;
  unit: string;
  name: string;
  id: string;
}

export interface Istate {
  ingredients: Iingredient[];
  multiplier: string;
}
