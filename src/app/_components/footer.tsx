import Container from "@/app/_components/container";

export function Footer() {
    return (
        <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800">
            <Container>
                <div className="py-28 flex flex-col lg:flex-row items-center">
                    <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
                        Stay Connected.
                    </h3>
                    <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-16 lg:w-1/2">
                        <a
                            href="/about"
                            className="rounded-md mx-3 bg-black hover:opacity-70 text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-opacity mb-6 lg:mb-0 w-full lg:w-auto text-center min-w-[160px]"
                        >
                            About CodeScripted
                        </a>
                        <a
                            href="/contact"
                            className="rounded-md mx-3 bg-black hover:opacity-70 text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-opacity mb-6 lg:mb-0 w-full lg:w-auto text-center min-w-[160px]"
                        >
                            Get in Touch
                        </a>
                        <a
                            target="_blank"
                            href="https://twitter.com/abdifatah_artan"
                            className="rounded-md mx-3 bg-black hover:opacity-70 text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-opacity mb-6 lg:mb-0 w-full lg:w-auto text-center min-w-[160px]"
                        >
                            Follow on Twitter
                        </a>
                        <a
                            target="_blank"
                            href="https://www.linkedin.com/in/abdifatah-artan"
                            className="rounded-md mx-3 bg-blue-600 hover:opacity-70 text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-opacity mb-6 lg:mb-0 w-full lg:w-auto text-center min-w-[160px]"
                        >
                            Connect on LinkedIn
                        </a>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;