"use client";

import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { useState, ChangeEvent, FormEvent } from "react";
import SuccessAlert from "@/app/_components/success-alert";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to an API)
    setShowSuccess(true);
  };

  return (
    <main>
      <Container>
        <Header />
        <div className="py-16">
          <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-black focus:border-black sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-white hover:text-black border border-black transition-colors duration-200"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </Container>

      {/* Success Alert */}
      <SuccessAlert show={showSuccess} onClose={() => setShowSuccess(false)} />
    </main>
  );
}