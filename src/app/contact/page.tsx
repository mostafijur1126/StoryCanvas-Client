"use client";

import { useState } from "react";
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import {
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const faqs = [
  {
    question: "How do I list an event?",
    answer:
      'Click "Register" and select "Organizer" to access your personalized event dashboard.',
  },
  {
    question: "Are there any ticketing fees?",
    answer:
      "Listing is free; we charge a small service fee on paid tickets to keep the platform secure.",
  },
  {
    question: "How can I cancel my booking?",
    answer:
      'Visit "My Events" in your profile to manage refunds and cancellations up to 24 hours before.',
  },
  {
    question: "Do you offer corporate plans?",
    answer:
      "Yes! Contact our sales team for custom solutions tailored to your business needs.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // ---------- API INTEGRATION ----------
    // Replace with your actual endpoint:
    // const res = await fetch('/api/contact', { method: 'POST', ... });
    console.log("Form submitted:", formData);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    alert("Message sent! (demo)");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Hero */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
          Get in Touch
        </h1>
        <p className="mt-3 text-base sm:text-lg text-foreground/70 leading-relaxed">
          We're here to help you create unforgettable experiences. Reach out
          with any questions or just to say hi.
        </p>
      </div>

      {/* Contact Form + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form (3/5) */}
        <div className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="bg-background/60 backdrop-blur-sm border border-border/60 rounded-xl p-6 md:p-8 shadow-sm"
          >
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground/70 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Alex Rivera"
                  required
                  className="w-full px-4 py-2.5 bg-background border border-border/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground/70 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@example.com"
                  required
                  className="w-full px-4 py-2.5 bg-background border border-border/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground/70 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Event Inquiry"
                  required
                  className="w-full px-4 py-2.5 bg-background border border-border/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground/70 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you today?"
                  required
                  className="w-full px-4 py-2.5 bg-background border border-border/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition resize-y"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>

        {/* Info block (2/5) – now matches design */}
        <div className="lg:col-span-2">
          <div className="bg-background/60 backdrop-blur-sm border border-border/60 rounded-xl p-6 shadow-sm h-full flex flex-col justify-between">
            <div className="space-y-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-foreground/50">
                  Email
                </p>
                <a
                  href="mailto:hello@eventhive.com"
                  className="text-foreground/90 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  hello@eventhive.com
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-foreground/50">
                  Phone
                </p>
                <a
                  href="tel:+1555000HIVE"
                  className="text-foreground/90 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  +1 (555) 000-Hive
                </a>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-foreground/50">
                  Global HQ
                </p>
                <p className="text-foreground/90">
                  77 Tech Plaza, San Francisco, CA
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-foreground/50">
                  Follow us:
                </p>
                <div className="flex gap-3 mt-2">
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="p-2 rounded-full bg-muted/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-foreground/60 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <FaLinkedinIn className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    aria-label="Twitter"
                    className="p-2 rounded-full bg-muted/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-foreground/60 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <FaTwitter className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="p-2 rounded-full bg-muted/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-foreground/60 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <FaFacebookF className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    aria-label="YouTube"
                    className="p-2 rounded-full bg-muted/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-foreground/60 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <FaYoutube className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="p-2 rounded-full bg-muted/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-foreground/60 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    <FaInstagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map Section */}
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="bg-background/60 backdrop-blur-sm border border-border/60 rounded-xl overflow-hidden shadow-sm">
          <div className="aspect-video w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019833517703!2d-122.41941548468119!3d37.77492927975923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809a0b9f2e43%3A0x88ca9f7bb2c7d93a!2s77%20Tech%20Plaza%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1645000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="EventHive HQ Map"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-foreground mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-background/60 backdrop-blur-sm border border-border/60 rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/20 transition-colors"
                aria-expanded={openFAQ === index}
              >
                <span className="font-medium text-foreground/90">
                  {faq.question}
                </span>
                {openFAQ === index ? (
                  <FiChevronUp className="w-5 h-5 text-foreground/50 flex-shrink-0 ml-4" />
                ) : (
                  <FiChevronDown className="w-5 h-5 text-foreground/50 flex-shrink-0 ml-4" />
                )}
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openFAQ === index ? "max-h-40 pb-4" : "max-h-0"
                }`}
                aria-hidden={openFAQ !== index}
              >
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
