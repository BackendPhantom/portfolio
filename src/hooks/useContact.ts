import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import api from "../lib/api";

export const MAX_MESSAGE_LENGTH = 500;

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type ContactStatus = "idle" | "sending" | "success" | "error";

export interface ContactSocial {
  name: string;
  icon: string;
  url: string;
  label: string;
  color: string;
}

export function useContact() {
  const { user } = useUser();
  const contactEmail = user?.email || "sulaiman@example.com";

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [metrics, setMetrics] = useState({ uptime: "99.9%", latency: 24 });
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isFormValid =
    !!formData.name.trim() &&
    isValidEmail(formData.email) &&
    !!formData.message.trim();

  // Simulate live server metrics
  useEffect(() => {
    const randomUptime = (99 + Math.random()).toFixed(2) + "%";
    const interval = setInterval(() => {
      const randomLatency = Math.floor(Math.random() * (85 - 20 + 1)) + 20;
      setMetrics({ uptime: randomUptime, latency: randomLatency });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setStatus("sending");

    const payload = {
      ...formData,
      sentAt: new Date().toISOString(),
    };

    try {
      // BE always returns a structured envelope:
      // success: { success: true, message: "..." }
      // error:   { success: false, status_code: N, message: "...", errors?: {...} }
      const { data } = await api.post<{
        success: boolean;
        message?: string;
        errors?: Record<string, string[]>;
      }>("/contact/", payload);

      setStatusMessage(
        data?.message ?? "Message sent! I'll get back to you soon."
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setStatus("idle");
        setStatusMessage("");
      }, 5000);
    } catch (err: unknown) {
      let message = "Something went wrong. Please try again.";

      if (err && typeof err === "object" && "response" in err) {
        // Axios error — pull the structured BE envelope
        const axiosErr = err as {
          response?: {
            data?: { message?: string; errors?: Record<string, string[]> };
          };
        };
        const data = axiosErr.response?.data;
        message = data?.message ?? message;

        if (data?.errors && typeof data.errors === "object") {
          const fieldErrors = Object.entries(data.errors)
            .map(([field, msgs]) => `${field}: ${msgs[0]}`)
            .join(" · ");
          if (fieldErrors) message = fieldErrors;
        }
      } else if (err instanceof Error) {
        message = err.message;
      }

      setStatusMessage(message);
      setStatus("error");
      setTimeout(() => {
        setStatus("idle");
        setStatusMessage("");
      }, 5000);
    }
  };

  const socials: ContactSocial[] = [
    user?.github_url
      ? {
          name: "GitHub",
          icon: "code",
          url: user.github_url,
          label: "GitHub",
          color: "from-purple-500 to-pink-500",
        }
      : null,
    user?.linkedin_url
      ? {
          name: "LinkedIn",
          icon: "work",
          url: user.linkedin_url,
          label: "LinkedIn",
          color: "from-blue-500 to-cyan-500",
        }
      : null,
    {
      name: "Email",
      icon: "email",
      url: `mailto:${contactEmail}`,
      label: "E-mail",
      color: "from-green-500 to-emerald-500",
    },
  ].filter(Boolean) as ContactSocial[];

  return {
    formData,
    setFormData,
    status,
    statusMessage,
    metrics,
    hoveredSocial,
    setHoveredSocial,
    focusedField,
    setFocusedField,
    isFormValid,
    isValidEmail,
    handleSubmit,
    socials,
    MAX_MESSAGE_LENGTH,
  };
}
