import { TopBar, Container, Title, FIlters } from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="All pizzas" size="lg" className="font-extrabold" />
      </Container>
      <TopBar />
      <Container className="mt-8 pb-14">
        <div className="flex gap-[60px]">
          {/* Фильтры */}
          <div className="w-[250px]">
            <FIlters />
          </div>
          {/* Товары */}
          <div className="flex-1">
            <div className="flex flex-col gap-16"></div>
          </div>
        </div>
      </Container>
    </>
  );
}
