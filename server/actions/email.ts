"use server"

import nodemailer from "nodemailer"

// Define the contact form data type
export type ContactFormData = {
  firstName: string
  lastName: string
  email: string
  trackingNumber?: string
  message: string
}

// Create a transporter with SMTP configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.example.com",
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASSWORD || "",
  },
})

export async function sendContactEmail(formData: ContactFormData) {
  try {
    // Validate form data
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      return { success: false, message: "Please fill in all required fields" }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return { success: false, message: "Please enter a valid email address" }
    }

    // Prepare email content
    const mailOptions = {
      from: process.env.SMTP_FROM || "noreply@aowlogistics.com",
      to: process.env.CONTACT_EMAIL || "support@aowlogistics.com",
      subject: "New Contact Form Submission",
      text: `
        Name: ${formData.firstName} ${formData.lastName}
        Email: ${formData.email}
        ${formData.trackingNumber ? `Tracking Number: ${formData.trackingNumber}` : ""}
        
        Message:
        ${formData.message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        ${formData.trackingNumber ? `<p><strong>Tracking Number:</strong> ${formData.trackingNumber}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${formData.message.replace(/\n/g, "<br>")}</p>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    // Send confirmation email to the user
    const confirmationMailOptions = {
      from: process.env.SMTP_FROM || "noreply@aowlogistics.com",
      to: formData.email,
      subject: "Thank you for contacting AOW Logistics",
      text: `
        Dear ${formData.firstName} ${formData.lastName},
        
        Thank you for contacting AOW Logistics. We have received your message and will get back to you as soon as possible.
        
        Your message:
        ${formData.message}
        
        Best regards,
        AOW Logistics Support Team
      `,
      html: `
        <h2>Thank you for contacting AOW Logistics</h2>
        <p>Dear ${formData.firstName} ${formData.lastName},</p>
        <p>Thank you for contacting AOW Logistics. We have received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p>${formData.message.replace(/\n/g, "<br>")}</p>
        <p>Best regards,<br>AOW Logistics Support Team</p>
      `,
    }

    await transporter.sendMail(confirmationMailOptions)

    return { success: true, message: "Your message has been sent successfully!" }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, message: "Failed to send email. Please try again later." }
  }
}

