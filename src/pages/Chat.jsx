import API_BASE_URL from "../config/api";
import { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaRobot } from "react-icons/fa";
import "./Chat.css";

function Chat() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! 👋 I am HealthAI, your healthcare information assistant. How can I help you today?",
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

  const sendMessageToBackend = async (question) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: question,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to get a response from HealthAI."
        );
      }

      return data.reply;
    } catch (error) {
      console.error("Chat error:", error);

      return "Sorry, I am unable to respond at the moment. Please try again.";
    }
  };

  const sendMessage = async (question) => {
    if (!question.trim()) return;

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

    const botReply = await sendMessageToBackend(question);

    const botMessage = {
      sender: "bot",
      text: botReply,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      botMessage,
    ]);

    setIsTyping(false);
  };

  const handleSendMessage = () => {
    sendMessage(input);
  };

  const handleQuickQuestion = (question) => {
    sendMessage(question);
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
                handleQuickQuestion(
                  "What services do you offer?"
                )
              }
            >
              Our Services
            </button>

            <button
              onClick={() =>
                handleQuickQuestion(
                  "What departments are available?"
                )
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
                handleQuickQuestion(
                  "What are your opening hours?"
                )
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
            onChange={(event) =>
              setInput(event.target.value)
            }
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