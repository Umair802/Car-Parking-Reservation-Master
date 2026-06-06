"use client";
import api from "@/config/api";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, message } = form;
    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/contact", form);

      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error(
        err.response.data.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-orange-50 py-20">
      <ToastContainer />
      <div className="mx-auto px-4 container">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 font-extrabold text-orange-600 text-4xl">
            Get in Touch
          </h2>
          <p className="text-gray-600 text-lg">
            Have a question or want to work with us? Fill out the form below and
            we'll get back to you within 24 hours.
          </p>
        </div>

        {/* Form and Info */}
        <div className="flex lg:flex-row flex-col gap-12">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex-1 space-y-6 bg-white shadow-md p-6 rounded-xl"
          >
            <div>
              <label className="block mb-1 font-semibold text-gray-800">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="p-3 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 w-full"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-800">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 w-full"
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold text-gray-800">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us how we can help you..."
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 w-full"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 px-6 py-3 rounded-md font-bold text-white transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col flex-1 gap-6">
            <div className="bg-white shadow p-6 rounded-lg">
              <h4 className="mb-1 font-bold text-orange-600 text-lg">Email</h4>
              <p className="text-gray-600">support@Park Buddy.com</p>
            </div>
            <div className="bg-white shadow p-6 rounded-lg">
              <h4 className="mb-1 font-bold text-orange-600 text-lg">Phone</h4>
              <p className="text-gray-600">+1 (234) 567-8901</p>
            </div>
            <div className="bg-white shadow p-6 rounded-lg">
              <h4 className="mb-1 font-bold text-orange-600 text-lg">
                Address
              </h4>
              <p className="text-gray-600">
                123 Parking Lane
                <br />
                Smart City, Techland 45678
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
