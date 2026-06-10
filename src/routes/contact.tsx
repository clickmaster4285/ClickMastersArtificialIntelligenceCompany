import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ClickMasters" },
      {
        name: "description",
        content:
          "Get in touch with ClickMasters. We'd love to hear about your project.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight"
        >
          ClickMasters
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back home
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 md:px-12 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pt-12 md:pt-20 mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6 flex items-center gap-3">
            <span className="w-8 h-px bg-muted-foreground" />
            Get in touch
          </p>
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[0.95]">
            Let&apos;s build{" "}
            <span
              className="italic font-normal"
              style={{
                fontFamily: "var(--font-serif, serif)",
                background:
                  "linear-gradient(135deg, oklch(0.78 0.22 290), oklch(0.82 0.2 30))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              what&apos;s next
            </span>
            .
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            Tell us about your project, your timeline, and what success looks
            like. We reply within 24 hours.
          </p>
        </motion.div>

        {/* Form / Success */}
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="border border-border/40 rounded-3xl p-10 md:p-14 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Send className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">
              Message sent
            </h2>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto">
              Thanks for reaching out. We&apos;ll be in touch within 24 hours to
              discuss your project.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 mt-8 text-sm font-medium border-b border-foreground pb-1 hover:opacity-80 transition-opacity"
            >
              Back to home <span>→</span>
            </Link>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label
                  htmlFor="name"
                  className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border/60 focus:border-foreground pb-3 text-base outline-none transition-colors placeholder:text-muted-foreground/50"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="space-y-3">
                <label
                  htmlFor="email"
                  className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-border/60 focus:border-foreground pb-3 text-base outline-none transition-colors placeholder:text-muted-foreground/50"
                  placeholder="jane@company.com"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label
                htmlFor="company"
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                Company <span className="text-muted-foreground/40">(optional)</span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={form.company}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-border/60 focus:border-foreground pb-3 text-base outline-none transition-colors placeholder:text-muted-foreground/50"
                placeholder="Acme Inc."
              />
            </div>

            <div className="space-y-3">
              <label
                htmlFor="message"
                className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-border/60 focus:border-foreground pb-3 text-base outline-none transition-colors resize-none placeholder:text-muted-foreground/50"
                placeholder="Tell us about your project..."
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="inline-flex items-center gap-3 bg-foreground text-background rounded-full px-8 py-4 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Send message
                <span>→</span>
              </button>
            </div>

            <p className="text-xs text-muted-foreground pt-4">
              Prefer email?{" "}
              <a
                href="mailto:sales@clickmastersdigitalmarketing.com"
                className="underline underline-offset-4 hover:text-foreground transition-colors"
              >
                sales@clickmastersdigitalmarketing.com
              </a>
            </p>
          </motion.form>
        )}
      </div>
    </main>
  );
}
