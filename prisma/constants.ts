export const CATEGORIES = [
  { name: "Pizzas" },
  { name: "Breakfast" },
  { name: "Snacks" },
  { name: "Cocktails" },
  { name: "Drinks" },
];

export const INGREDIENTS = [
  {
    name: "Cheese Crust",
    price: 2.24,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png",
  },
  {
    name: "Creamy Mozzarella",
    price: 0.99,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png",
  },
  {
    name: "Cheddar and Parmesan Cheeses",
    price: 0.99,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796",
  },
  {
    name: "Spicy Jalapeno Pepper",
    price: 0.74,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/11ee95b6bfdf98fb88a113db92d7b3df.png",
  },
  {
    name: "Tender Chicken",
    price: 0.99,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A",
  },
  {
    name: "Mushrooms",
    price: 0.74,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324",
  },
  {
    name: "Bacon",
    price: 0.99,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA637AAB68F",
  },
  {
    name: "Ham",
    price: 0.99,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61",
  },
  {
    name: "Spicy Pepperoni",
    price: 0.99,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3",
  },
  {
    name: "Spicy Chorizo",
    price: 0.99,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027",
  },
  {
    name: "Pickled Cucumbers",
    price: 0.74,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B",
  },
  {
    name: "Fresh Tomatoes",
    price: 0.74,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67",
  },
  {
    name: "Red Onion",
    price: 0.74,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C",
  },
  {
    name: "Juicy Pineapple",
    price: 0.74,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0",
  },
  {
    name: "Italian Herbs",
    price: 0.49,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/370dac9ed21e4bffaf9bc2618d258734.png",
  },
  {
    name: "Sweet Pepper",
    price: 0.74,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA63F774C1B",
  },
  {
    name: "Feta Cheese Cubes",
    price: 0.99,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349",
  },
  {
    name: "Meatballs",
    price: 0.99,
    imageUrl:
      "https://cdn.dodostatic.net/static/Img/Ingredients/b2f3a5d5afe44516a93cfc0d2ee60088.png",
  },
].map((object, index) => ({ id: index + 1, ...object }));

export const PRODUCTS = [
  {
    name: "Roll with ham",
    imageUrl: "/breakfast/roll_with_hem.avif",
    categoryId: 2,
  },
  {
    name: "Super Meat Roll",
    imageUrl: "/breakfast/super_meat_roll.avif",
    categoryId: 2,
  },
  {
    name: "Classic roll",
    imageUrl: "/breakfast/classic_roll.avif",
    categoryId: 2,
  },
  {
    name: "Spicy roll",
    imageUrl: "/breakfast/spicy_roll.avif",
    categoryId: 2,
  },
  {
    name: "Mushroom Starter",
    imageUrl: "/breakfast/mushroom_starter.avif",
    categoryId: 2,
  },
  {
    name: "Cheese Starter",
    imageUrl: "/breakfast/cheese_starter.avif",
    categoryId: 2,
  },
  {
    name: "Beef sandwich",
    imageUrl: "/breakfast/beef_sandwich.avif",
    categoryId: 2,
  },
  {
    name: "Ham and cheese sandwich",
    imageUrl: "/breakfast/ham_and_cheese_sandwich.avif",
    categoryId: 2,
  },
  {
    name: "Omelette with bacon",
    imageUrl: "/breakfast/omelette_with_bacon.avif",
    categoryId: 2,
  },
  {
    name: "Cheese omelette",
    imageUrl: "/breakfast/cheese_omelette.avif",
    categoryId: 2,
  },
  {
    name: "Cheesecakes with condensed milk",
    imageUrl: "/snacks/cheesecakes_with_condensed_milk.avif",
    categoryId: 3,
  },
  {
    name: "Caesar salad",
    imageUrl: "/snacks/caesar_salad.avif",
    categoryId: 3,
  },
  {
    name: "Potatoes from the oven",
    imageUrl: "/snacks/potatoes_from_the_oven.avif",
    categoryId: 3,
  },
  {
    name: "Chicken pieces",
    imageUrl: "/snacks/chicken_pieces.avif",
    categoryId: 3,
  },
  {
    name: "BBQ Chicken Wings",
    imageUrl: "/snacks/bbq_chicken_wings.avif",
    categoryId: 3,
  },
  {
    name: "Lunchbox with chicken wings",
    imageUrl: "/snacks/lunchbox_with_chicken_wings.avif",
    categoryId: 3,
  },
  {
    name: "Cappuccino",
    imageUrl: "/cocktails/cappuccino.png",
    categoryId: 4,
  },
  {
    name: "Latte",
    imageUrl: "/cocktails/latte.png",
    categoryId: 4,
  },
  {
    name: "Americano",
    imageUrl: "/cocktails/americano.png",
    categoryId: 4,
  },
  {
    name: "Cold Tea",
    imageUrl: "/cocktails/cold_tea.png",
    categoryId: 4,
  },
  {
    name: "Orange juice",
    imageUrl: "/drinks/juice.png",
    categoryId: 5,
  },
  {
    name: "Soda",
    imageUrl: "/drinks/soda.png",
    categoryId: 5,
  },
];
