"use client";

import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import {useState, ChangeEvent, FormEvent, useEffect} from "react";
import SuccessAlert from "@/app/_components/success-alert";
import emailjs from '@emailjs/browser';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    // Initialize EmailJS with your public key
    useEffect(() => {
        emailjs.init("dP5mcZbOuQkQ7P0_Q");
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            // Send email using EmailJS - passing formData directly
            const result = await emailjs.send(
                "service_peaud2y",
                "template_gntfoc2",
                {
                    name: formData.name,
                    email: formData.email,
                    message: formData.message
                }
            );

            console.log('Success:', result.text);
            setShowSuccess(true);
            setFormData({
                name: "",
                email: "",
                message: "",
            });
        } catch (err: any) {
            console.error('Error sending email:', err);
            setError(err.text || "Failed to send message. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main>
            <Container>
                <Header/>
                <div className="py-12 md:py-24">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                            <p className="text-lg max-w-2xl mx-auto">
                                Have a question, feedback, or an idea for a topic you'd like us to cover? We'd love to hear from you! Just fill out the form below and we'll get back to you as soon as we can.
                            </p>
                        </div>

                        <div className="rounded-xl overflow-hidden">
                            <div className="p-6 md:p-8 lg:p-10">
                                {error && (
                                    <div className="mb-6 p-4 border-l-4 border-red-400 text-red-700 rounded">
                                        <div className="flex">
                                            <div className="flex-shrink-0">
                                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-sm font-medium">{error}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium">
                                                Name
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="text-black block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                                                    placeholder="Your name"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium">
                                                Email
                                            </label>
                                            <div className="mt-1">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="text-black block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                                                    placeholder="Your email"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium">
                                            Message
                                        </label>
                                        <div className="mt-1">
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                className="text-black block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black"
                                                placeholder="What's on your mind?"
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full inline-flex justify-center items-center px-6 py-3 border border-black text-white bg-black rounded-md hover:bg-white hover:text-black transition-colors duration-200"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Sending...
                                                </>
                                            ) : (
                                                'Send Message'
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Success Alert */}
            <SuccessAlert show={showSuccess} onClose={() => setShowSuccess(false)}/>
        </main>
    );
}