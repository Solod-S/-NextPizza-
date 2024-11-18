"use client";

import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { Api } from "../services/api-client";
import { useSet } from "react-use";

interface ReturnedProps {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIngredients: Set<string>;
  onAddId: (id: string) => void;
}

export const useFilterIngredients = (values: string[] = []): ReturnedProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedIngredients, { toggle }] = useSet(new Set<string>(values));
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoading(true);
        const result = await Api.ingredients.getAll();
        setIngredients(result);
      } catch (error) {
        console.log(`Error getting ingredients`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchIngredients();
  }, []);

  const setSelectedIngredients = (items: string[]) => {
    items.forEach(item => {
      // if (selectedIngredients.has(item)) {
      //   selectedIngredients.delete(item);
      // } else {
      //   selectedIngredients.add(item);
      // }
      selectedIngredients.add(item);
    });
  };

  return {
    ingredients,
    loading,
    onAddId: toggle,
    selectedIngredients,
  };
};
