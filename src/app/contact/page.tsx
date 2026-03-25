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
                <div className="py-16 flex justify-center">
                    <div className="w-full max-w-lg">
                        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="text-black w-full bg-black text-white py-3 px-4 rounded-md hover:bg-white hover:text-black border border-black transition-colors duration-200"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="py-16"></div>
            </Container>

            {/* Success Alert */}
            <SuccessAlert show={showSuccess} onClose={() => setShowSuccess(false)}/>
        </main>
    );
}