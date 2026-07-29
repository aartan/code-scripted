// app/about/page.tsx
import { Suspense } from 'react';
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import AboutPageContent from "./AboutPageContent";
import Loading from './loading';

export const metadata = {
    title: "About CodeScripted",
    description: "Learn more about CodeScripted, a blog dedicated to software development and technology.",
};

// A function that artificially delays content loading
async function DelayedAboutContent() {
    // Add a small artificial delay to ensure loading state is visible
    await new Promise(resolve => setTimeout(resolve, 1000));
    return <AboutPageContent />;
}

export default function AboutPage() {
    return (
        <main>
            <Container>
                <Header />
                <Suspense fallback={<Loading />}>
                    <DelayedAboutContent />
                </Suspense>
            </Container>
        </main>
    );
}