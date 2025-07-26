import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/message/send",
        { name, email, subject, message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(res.data?.message || "Message sent!");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      const errorMsg =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact container" style={{ padding: "2rem 1rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Contact Us</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "space-between",
        }}
      >
        {/* Contact Info */}
        <div style={{ flex: "1", minWidth: "260px" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h4>📍 Address</h4>
            <p>IIIT Bhagalpur, Bihar, INDIA</p>
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <h4>📞 Call Us</h4>
            <p>+91-9580161166</p>
          </div>
          <div>
            <h4>📧 Mail Us</h4>
            <p>saurabhsingh100605@gmail.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSendMessage}
          style={{
            flex: "2",
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{
                flex: 1,
                padding: "0.75rem",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: 1,
                padding: "0.75rem",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            style={{
              padding: "0.75rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
          <textarea
            rows={5}
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            style={{
              padding: "0.75rem",
              border: "1px solid #ccc",
              borderRadius: "5px",
              resize: "vertical",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "0.75rem",
              background: "#007bff",
              color: "#fff",
              fontWeight: "bold",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      {/* Google Map */}
      <div style={{ marginTop: "3rem" }}>
        <iframe
          title="IIIT Bhagalpur Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.073383287013!2d87.037561!3d25.2592143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f0481fd7d50f6d%3A0xbe75d3ff73e0373e!2sIndian%20Institute%20of%20Information%20Technology%20Bhagalpur!5e0!3m2!1sen!2sin!4v1711460489702!5m2!1sen!2sin"
          style={{ width: "100%", height: "400px", border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
};

export default Contact;
