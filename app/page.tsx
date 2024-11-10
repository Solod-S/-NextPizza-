import {
  TopBar,
  Container,
  Title,
  FIlters,
  ProductsGroupList,
} from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="mt-8 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтры */}
          <div className="w-[250px]">
            <FIlters />
          </div>
          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList
                title={"Pizzas"}
                categoryId={1}
                items={[
                  {
                    id: 1,
                    name: "Pepperoni",
                    price: 10,
                    items: [{ price: 10 }],
                    imageUrl:
                      "https://www.tgip.in/wp-content/uploads/2022/10/pepperoni.jpg",
                  },
                  {
                    id: 2,
                    name: "Pepperoni",
                    price: 10,
                    items: [{ price: 10 }],
                    imageUrl:
                      "https://www.tgip.in/wp-content/uploads/2022/10/pepperoni.jpg",
                  },
                  {
                    id: 3,
                    name: "Pepperoni",
                    price: 10,
                    items: [{ price: 10 }],
                    imageUrl:
                      "https://www.tgip.in/wp-content/uploads/2022/10/pepperoni.jpg",
                  },
                ]}
              />
              <ProductsGroupList
                title={"Drinks"}
                categoryId={6}
                items={[
                  {
                    id: 1,
                    name: "Pepsi",
                    price: 2,
                    items: [{ price: 2 }],
                    imageUrl:
                      "https://aquamarket.ua/96581-large_default/pepsi-cola-033-l-pepsi-kola-klassicheskaya-voda-sladkaya-zh-b.jpg",
                  },
                  {
                    id: 2,
                    name: "Pepperoni",
                    price: 2,
                    items: [{ price: 2 }],
                    imageUrl:
                      "https://aquamarket.ua/96581-large_default/pepsi-cola-033-l-pepsi-kola-klassicheskaya-voda-sladkaya-zh-b.jpg",
                  },
                  {
                    id: 3,
                    name: "Pepperoni",
                    price: 2,
                    items: [{ price: 2 }],
                    imageUrl:
                      "https://aquamarket.ua/96581-large_default/pepsi-cola-033-l-pepsi-kola-klassicheskaya-voda-sladkaya-zh-b.jpg",
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
