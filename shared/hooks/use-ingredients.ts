import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { Api } from "../services/api-client";

export const useIngredients = () => {
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

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

  return {
    ingredients,
    loading,
  };
};
