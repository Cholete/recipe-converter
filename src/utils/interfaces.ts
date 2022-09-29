export interface IerrorMessages {
  name: string;
  amount: string;
}

export interface Iingredient {
  amount: string;
  unit: string;
  name: string;
  errorMessages: IerrorMessages;
  id: string;
}

export interface Istate {
  ingredients: Iingredient[];
  multiplier: string;
}
