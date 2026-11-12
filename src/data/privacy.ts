/**
 * Privacy notice. Written from what the site actually does (audited 2026-11-12):
 * the Contact form (sent through Resend), bookings on Calendly, hosting on Vercel,
 * one session-only browser setting, and no analytics, advertising or cookies.
 * If any of that changes (analytics, a newsletter, a new form), update this first.
 * Segun should review it; it is not legal advice.
 */
export const privacy = {
  title: "Privacy Notice | Segun Michael",
  description: "How this website handles the details you share: what is collected, why, who else is involved, and the choices you have.",
  heading: "Privacy notice",
  updated: "12 November 2026",
  intro:
    "This website belongs to Segun Michael. It collects as little as possible: only what you choose to send, and only to reply to you. This notice explains what that means in practice.",
  sections: [
    {
      heading: "What you send through the Contact form",
      body: [
        "When you send an inquiry, the form collects your name, your email address, the area of interest you choose, your message and, if you arrived from a renovation assessment link, a note saying so.",
        "These details are used for one purpose: to read your inquiry and reply to you. They are not added to a mailing list, sold, or shared for marketing.",
        "Your inquiry is delivered to Segun's inbox by email through Resend, an email delivery service, which handles it on our behalf.",
      ],
    },
    {
      heading: "Booking a Listening Session",
      body: [
        "Sessions are booked on Calendly. When you choose a time you leave this website, and Calendly collects the booking details and answers you give under its own privacy policy. Segun receives those details so he can prepare for your conversation.",
        "The Contact form is not for sensitive personal matters. If you have a question about the Listening Hub, please keep personal details out of the form.",
      ],
      link: { label: "Calendly's privacy policy", href: "https://calendly.com/privacy" },
    },
    {
      heading: "What this website does not do",
      body: [
        "It uses no analytics, no advertising and no tracking cookies, and it does not follow you across other websites.",
        "It stores one setting in your browser for the length of your visit, so the opening screen is not shown twice. It holds no personal information and is cleared when you close the tab.",
      ],
    },
    {
      heading: "Hosting",
      body: [
        "The website is hosted by Vercel. Like any web host, Vercel processes technical information such as your IP address and browser type to deliver pages and keep the service secure.",
      ],
      link: { label: "Vercel's privacy policy", href: "https://vercel.com/legal/privacy-policy" },
    },
    {
      heading: "How long inquiries are kept",
      body: ["Inquiries are kept for as long as they are needed to respond to you and to follow up on what you asked about. You can ask for yours to be deleted at any time."],
    },
    {
      heading: "Your choices",
      body: [
        "You can ask to see the details you have sent, to correct them, or to have them deleted. Send your request through the Contact page and it will be handled promptly.",
      ],
      link: { label: "Contact", href: "/contact" },
    },
    {
      heading: "Changes to this notice",
      body: ["If the way this website handles your details changes, this notice will be updated, and the date below will change with it."],
    },
  ],
};
