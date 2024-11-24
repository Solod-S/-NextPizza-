import { Ingredient, Product, ProductItem } from "@prisma/client";

export type ProductWithRelations = Product & {
  items: ProductItem[];
  ingredients: Ingredient[];
};
// доработанный тип под наши нужды (есть items и ingredients)
