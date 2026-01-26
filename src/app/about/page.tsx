import Image from "next/image";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";

export const metadata = {
  title: "About CodeScripted",
  description: "Learn more about CodeScripted, a blog dedicated to software development and technology.",
};

export default function AboutPage() {
  return (
    <main className="flex-grow"> {/* Ensure main fills available space */}
      <Container >
        <Header />
          <section className="card mb-8 mt-32">
            <p className="text-lg leading-relaxed mb-8 animate-fade-in-up">
              Welcome to CodeScripted! This blog is dedicated to exploring the latest trends, tools, and techniques in 
              software development and technology. Whether you're a seasoned developer or just starting out, you'll find 
              valuable insights and tutorials that will help you level up your coding skills.
            </p>
            <p className="text-lg leading-relaxed mb-8 animate-fade-in-up">
              Here at CodeScripted, we believe in the power of code to solve real-world problems and create amazing 
              applications. My mission is to provide high-quality, practical content that developers can use in their 
              day-to-day work.
            </p>
          </section>
          <section className="card">
            <div className="flex flex-col md:flex-row items-center mb-16 mt-16 animate-fade-in-up">
              <div className="w-full md:w-1/3 mb-6 md:mb-0 md:mr-8 animate-scale-in">
                <Image
                  src="/assets/blog/authors/me.jpeg"
                  alt="Author Image"
                  width={300}
                  height={300}
                  className="rounded-full"
                />
              </div>
              <div className="w-full md:w-2/3">
                <p className="text-lg leading-relaxed mb-6 animate-fade-in-left">
                  My name is Abdifatah, and I’m a software engineer who enjoys solving problems using code and building things that make a difference. 
                  Throughout my career, I've had the privilege of working with some outstanding teams and these experiences have allowed me to sharpen my expertise in web development.
                </p>
                <p className="text-lg leading-relaxed mb-6 animate-fade-in-left">
                  I've spent a lot of time in the trenches, tackling complex problems and crafting solutions that make a real difference. Through 
                  CodeScripted, I'm excited to share what I've learned, offer insights, and dive deep into the technologies and practices that 
                  drive our industry forward.
                </p>
                <p className="text-lg leading-relaxed animate-fade-in-left">
                  Thank you for visiting, and I hope you find the content both informative and inspiring. Feel free to reach out if you have any 
                  questions, suggestions, or just want to connect!
                </p>
              </div>
            </div>
          </section>
      </Container>
    </main>
  );
}
