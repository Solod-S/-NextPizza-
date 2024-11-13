export const PIZZAS = [
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
].map((object, index) => ({ id: index, ...object }));

export const PRODUCTS = [
  {
    name: "Roll with ham",
    imageUrl:
      "https://media.dodostatic.net/image/r:584x584/11EE7970259D888E98B6407EE6B994D9.avif",
    categoryId: 1,
  },
  {
    name: "Cheesecakes with condensed milk",
    imageUrl:
      "https://media.dodostatic.net/image/r:584x584/11EF90613992FBC69C3DD4772681C783.avif",
    categoryId: 2,
  },
  {
    name: "Caesar salad",
    imageUrl:
      "https://media.dodostatic.net/image/r:584x584/11EF8D3BC9E84FB7B5CFB7F47C6FB334.avif",
    categoryId: 3,
  },
].map((object, i) => ({ id: i, ...object }));

// export const PIZZAS = [
//   {
//     name: "Pepperoni fresh",
//     imageUrl:
//       "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
//     active: true,
//   },
//   {
//     name: "Cheese",
//     imageUrl:
//       "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
//     active: true,
//   },
//   {
//     name: "Chorizo ​​fresh",
//     imageUrl:
//       "https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp",
//     active: true,
//   },
// ];
