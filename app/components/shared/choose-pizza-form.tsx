"use client";
import { cn, roundMoney } from "@/shared/lib/utils";
import React, { useEffect, useState } from "react";
import { useSet } from "react-use";
import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import {
  mapPizzaType,
  PizzaSize,
  pizzaSizes,
  PizzaType,
  pizzaTypes,
} from "@/shared/constants/pizza";
import { GroupVariants } from "./group-variants";
import { IngredientItem } from "./ingredient-item";

interface Props {
  imageUrl: string;
  name: string;
  className?: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  onClickAddCart: VoidFunction;
}

export const ChoosePizzaForm: React.FC<Props> = ({
  imageUrl,
  name,
  className,
  ingredients,
  items,
  onClickAddCart,
}) => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  let textDetails = `${size} sm, ${mapPizzaType[type]} pizza`;
  if (selectedIngredients.size > 0)
    textDetails += `, ingredients (${selectedIngredients.size})`;

  const pizzaPrice =
    items.find(item => item.pizzaType === type && item.size === size)?.price ||
    0;

  const totalIngredientsPrice = ingredients
    .filter(item => selectedIngredients.has(item.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  const totalPrice = roundMoney(pizzaPrice + totalIngredientsPrice);
  const handleOnClick = () => {
    onClickAddCart?.();
    console.log({ size, type, ingredients: selectedIngredients });
  };

  // исключаем по типу теста (traditional и thin)
  const availablePizza = items.filter(item => item.pizzaType === type);
  // делаем статус дисейблед тому чего нету
  const availablePizzaSizes = pizzaSizes.map(item => ({
    name: item.name,
    value: item.value,
    disabled: !availablePizza.some(
      pizza => Number(pizza.size) === Number(item.value)
    ),
  }));
  useEffect(() => {
    const currentSizeIsDisabled = availablePizzaSizes?.find(
      item => Number(item.value) === size && !item.disabled
    );
    const availableSize = availablePizzaSizes?.find(item => !item.disabled);
    if (availableSize && !currentSizeIsDisabled) {
      setSize(Number(availableSize.value) as PizzaSize);
    }
  }, [availablePizzaSizes, type]);
  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />
      <div className="w-[490] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400"> {textDetails} </p>
        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availablePizzaSizes}
            value={String(size)}
            onClick={value => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={value => setType(Number(value) as PizzaType)}
          />
        </div>
        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map(ingredient => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>
        <Button
          onClick={handleOnClick}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Add to cart for {totalPrice} $
        </Button>
      </div>
    </div>
  );
};
