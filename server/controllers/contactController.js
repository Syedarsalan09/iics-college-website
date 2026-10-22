import ContactMessage from "../models/ContactMessage.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function createContactMessage(req, res) {
  const { name, email, subject, message } = req.body ?? {};

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !emailPattern.test(email.trim()) ||
    !subject.trim() ||
    !message.trim() ||
    name.trim().length > 100 ||
    email.trim().length > 254 ||
    subject.trim().length > 150 ||
    message.trim().length > 2000
  ) {
    return res.status(400).json({
      message: "Please provide valid contact message details",
    });
  }

  try {
    await ContactMessage.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    });

    return res.status(201).json({
      message: "Your message was received",
    });
  } catch (error) {
    console.error("Contact message could not be saved:", error.message);
    return res.status(500).json({
      message: "Unable to send your message. Please try again.",
    });
  }
}

export async function getContactMessages(req, res) {
  try {
    const messages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(100);

    return res.json(messages);
  } catch (error) {
    console.error("Contact messages could not be retrieved:", error.message);
    return res.status(500).json({
      message: "Unable to retrieve contact messages",
    });
  }
}

export async function updateContactMessageStatus(req, res) {
  const { status } = req.body ?? {};
  const validStatuses = ["New", "Read", "Archived"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({
      message: "A valid contact message status is required",
    });
  }

  try {
    const contactMessage = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!contactMessage) {
      return res.status(404).json({
        message: "Contact message not found",
      });
    }

    return res.json(contactMessage);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid contact message ID",
      });
    }

    console.error("Contact message status could not be updated:", error.message);
    return res.status(500).json({
      message: "Unable to update contact message",
    });
  }
}
