import {
  TopBar,
  Container,
  Title,
  FIlters,
  ProductsGroupList,
} from "@/app/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { Suspense } from "react";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: { products: { include: { items: true, ingredients: true } } },
  });

  // console.log(`categories`, categories);

  return (
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="lg" className="font-extrabold" />
      </Container>
      <TopBar
        categories={categories.filter(category => category.products.length > 0)}
      />
      <Container className="mt-8 pb-14">
        <div className="flex gap-[80px]">
          {/* Фильтры */}
          <div className="w-[250px]">
            <Suspense>
              <FIlters />
            </Suspense>
          </div>
          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories &&
                categories.length > 0 &&
                categories.map(
                  category =>
                    category.products.length > 0 && (
                      <ProductsGroupList
                        key={category.id}
                        title={category.name}
                        categoryId={category.id}
                        items={category.products}
                      />
                    )
                )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
