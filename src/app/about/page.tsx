import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import AboutPageContent from "./AboutPageContent";

export const metadata = {
    title: "About CodeScripted",
    description: "Learn more about CodeScripted, a blog dedicated to software development and technology.",
};

export default function AboutPage() {
    return (
        <main>
            <Container>
                <Header />
                <AboutPageContent />
            </Container>
        </main>
    );
}