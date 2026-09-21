// app/about/page.tsx
import { Suspense } from "react";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import AboutPageContent from "./AboutPageContent";
import Loading from "./loading";

export const metadata = {
  title: "About CodeScripted",
  description:
    "Learn more about CodeScripted, a blog dedicated to software development and technology.",
};

export default function AboutPage() {
  return (
    <main>
      <Container>
        <Header />
        <Suspense fallback={<Loading />}>
          <AboutPageContent />
        </Suspense>
      </Container>
    </main>
  );
}
