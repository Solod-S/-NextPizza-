"use client";

import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { Api } from "../services/api-client";
import { useSet } from "react-use";

interface ReturnedProps {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIds: Set<string>;
  onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnedProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedIds, { toggle }] = useSet(new Set<string>([]));
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

  return { ingredients, loading, onAddId: toggle, selectedIds };
};
