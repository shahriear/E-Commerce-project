import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    toast.success('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-400 px-3 text-[16px] md:text-[16px] py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-400 px-3 text-[16px] md:text-[16px] py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="border border-gray-400 px-3 py-2 text-[16px] md:text-[16px] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={5}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white text-[15px] md:text-[16px] px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
