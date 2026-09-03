import { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaRobot } from "react-icons/fa";
import {
  hospitalInfo,
  services,
  departments,
} from "../data/hospitalData";
import "./Chat.css";

function Chat() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: `Hello! 👋 Welcome to ${hospitalInfo.name}. I am HealthAI, your healthcare information assistant. How can I help you today?`,
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const getBotResponse = (userInput) => {
    const message = userInput.toLowerCase().trim();

    // Greetings
    if (
      message.includes("hello") ||
      message.includes("hi") ||
      message.includes("good morning") ||
      message.includes("good afternoon") ||
      message.includes("good evening")
    ) {
      return `Hello! 👋 Welcome to ${hospitalInfo.name}. How can I assist you today?`;
    }

    // How are you
    if (
      message.includes("how are you") ||
      message.includes("how do you do")
    ) {
      return "I'm doing great, thank you! 😊 I'm here to help you find information about our hospital, services, departments, contact details, and opening hours.";
    }

    // Who are you
    if (
      message.includes("who are you") ||
      message.includes("what are you")
    ) {
      return "I am HealthAI, a conversational healthcare information assistant designed to help users access information about hospital services and facilities.";
    }

    // What can you do
    if (
      message.includes("what can you do") ||
      message.includes("help me") ||
      message.includes("how can you help")
    ) {
      return "I can provide information about hospital services, departments, contact information, location, and opening hours. Try asking me a question! 😊";
    }

    // Hospital information
    if (
      message.includes("about hospital") ||
      message.includes("about the hospital") ||
      message.includes("tell me about")
    ) {
      return hospitalInfo.description;
    }

    // Services
    if (
      message.includes("service") ||
      message.includes("what do you offer") ||
      message.includes("what do you provide")
    ) {
      return `Our healthcare services include: ${services
        .map((service) => service.title)
        .join(", ")}.`;
    }

    // Emergency
    if (
      message.includes("emergency") ||
      message.includes("urgent")
    ) {
      const emergencyService = services.find((service) =>
        service.title.toLowerCase().includes("emergency")
      );

      if (emergencyService) {
        return `${emergencyService.title}: ${emergencyService.description}`;
      }

      return "For medical emergencies, please contact the hospital or visit the nearest emergency department immediately.";
    }

    // Laboratory
    if (
      message.includes("laboratory") ||
      message.includes("lab test") ||
      message.includes("test")
    ) {
      const laboratoryService = services.find((service) =>
        service.title.toLowerCase().includes("laboratory")
      );

      if (laboratoryService) {
        return `${laboratoryService.title}: ${laboratoryService.description}`;
      }
    }

    // Pharmacy
    if (
      message.includes("pharmacy") ||
      message.includes("medicine") ||
      message.includes("medication")
    ) {
      const pharmacyService = services.find((service) =>
        service.title.toLowerCase().includes("pharmacy")
      );

      if (pharmacyService) {
        return `${pharmacyService.title}: ${pharmacyService.description}`;
      }
    }

    // Departments
    if (
      message.includes("department") ||
      message.includes("where can i")
    ) {
      return `Our departments include: ${departments
        .map((department) => department.name)
        .join(", ")}.`;
    }

    // Contact
    if (
      message.includes("phone") ||
      message.includes("contact") ||
      message.includes("email") ||
      message.includes("call")
    ) {
      return `You can contact us on ${hospitalInfo.phone} or email us at ${hospitalInfo.email}.`;
    }

    // Location
    if (
      message.includes("location") ||
      message.includes("address") ||
      message.includes("where are you") ||
      message.includes("where is the hospital")
    ) {
      return `Our hospital is located at ${hospitalInfo.address}.`;
    }

    // Opening hours
    if (
      message.includes("open") ||
      message.includes("opening") ||
      message.includes("hours") ||
      message.includes("close")
    ) {
      return `Our opening hours are: ${hospitalInfo.openingHours}.`;
    }

    // Thank you
    if (
      message.includes("thank") ||
      message.includes("thanks")
    ) {
      return "You're very welcome! 😊 I'm always here to help with hospital information.";
    }

    // Goodbye
    if (
      message.includes("bye") ||
      message.includes("goodbye") ||
      message.includes("see you")
    ) {
      return "Goodbye! 👋 Thank you for using HealthAI. Stay safe and take care!";
    }

    // Default response
    return "I'm sorry, I don't fully understand that question yet. 😊 You can ask me about hospital services, departments, emergency care, laboratory services, pharmacy, location, contact information, or opening hours.";
  };

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const question = input;

    const userMessage = {
      sender: "user",
      text: question,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        sender: "bot",
        text: getBotResponse(question),
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        botResponse,
      ]);

      setIsTyping(false);
    }, 800);
  };

  const handleQuickQuestion = (question) => {
    const userMessage = {
      sender: "user",
      text: question,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setIsTyping(true);

    setTimeout(() => {
      const botResponse = {
        sender: "bot",
        text: getBotResponse(question),
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        botResponse,
      ]);

      setIsTyping(false);
    }, 800);
  };

  return (
    <main className="chat-page">
      <section className="chat-header">
        <div className="chat-title">
          <FaRobot className="chat-robot-icon" />

          <div>
            <h1>HealthAI Assistant</h1>
            <p>Your Healthcare Information Assistant</p>
          </div>
        </div>
      </section>

      <section className="chat-container">
        {/* Quick Questions */}
        <div className="quick-questions">
          <p>Try asking:</p>

          <div className="quick-question-buttons">
            <button
              onClick={() =>
                handleQuickQuestion("What services do you offer?")
              }
            >
              Our Services
            </button>

            <button
              onClick={() =>
                handleQuickQuestion("What departments are available?")
              }
            >
              Departments
            </button>

            <button
              onClick={() =>
                handleQuickQuestion(
                  "How can I contact the hospital?"
                )
              }
            >
              Contact Information
            </button>

            <button
              onClick={() =>
                handleQuickQuestion("What are your opening hours?")
              }
            >
              Opening Hours
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="messages-container">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender}`}
            >
              {message.text}
            </div>
          ))}

          {isTyping && (
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}

          <div ref={messagesEndRef}></div>
        </div>

        {/* Input */}
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Ask a question about the hospital..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSendMessage();
              }
            }}
          />

          <button onClick={handleSendMessage}>
            <FaPaperPlane />
          </button>
        </div>
      </section>
    </main>
  );
}

export default Chat;