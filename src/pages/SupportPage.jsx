import { useEffect, useRef, useState } from "react";
import { TbSend } from "react-icons/tb";
import { sendMessage } from "../services/backend/ChatBot";

export default function SupportPage({ apartmentId = null }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    //const [error, setError] = useState(false);

    const newMessageRef = useRef(null);

    const currentTime = (new Date()).toLocaleTimeString([], {
        hour:"2-digit",
        minute:"2-digit"
    });

    const handleSendMessage = async () => {
        const messageUser = {
            role: "user",
            text: input,
            time:currentTime
        };

        setMessages((prev) => [...prev, messageUser]);

        const message = input;
        setInput("");
        setLoading(true);

        try {
            const data = await sendMessage(message, apartmentId);

            const messageChatBot = {
            role: "chatBot",
            text: data.answer,
            time:currentTime
            };

            setMessages((prev) => [...prev, messageChatBot]);
        } catch (error) {
            setMessages((prev) => [
            ...prev,
            { role: "chatBot", text: "Eroare" },
            ]);
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        newMessageRef.currentMessage?.scrollInView({behavior:"smooth"});
    }, [messages])


    return(
        <div className="support-container">
            <div className="support-wrapper">
                <div className="support-header">
                    <h1>PropertyBook Assistant</h1>
                </div>

                <div className="support-description">
                    <p>Hello! 👋 I'm the PropertyBook AI Assistant. I'm here to help you with any questions about booking properties, listing your property, 
                        payments, or using our platform. How can I help you today?</p>
                </div>

                
                <div className="support-questions">
                    <div className="question">
                        <p>How do I rent a property?</p>
                    </div>

                    <div className="question">
                        <p>How do I list a property?</p>
                    </div>

                    <div className="question">
                        <p>What payment methods do you accept?</p>
                    </div>

                    <div className="question">
                        <p>How do I connect my MetaMask wallet?</p>
                    </div>

                    <div className="question">
                        <p>Can I modify my booking?</p>
                    </div>

                    <div className="question">
                        <p>How do I add a review?</p>
                    </div>

                </div>


                <div className="chat-container">
                    <div className="chat-messages">
                        {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${message.role}`}
                        >
                            <div className="response">
                                {message.text}<br/><span>{message.time}</span>
                            
                            </div>
                           

                        </div>
                        ))}
                        <div ref={newMessageRef}/>
                    </div>

                    <div className="chat-input">
                        <input
                            value={input}
                            placeholder="Ask me anything..."
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        />

                        <button
                           onClick={handleSendMessage}
                            disabled={loading}
                        >
                        <TbSend />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}



/*
import { useEffect, useRef, useState } from "react";
import { TbSend } from "react-icons/tb";
import { sendMessage } from "../services/backend/ChatBot";

export default function SupportPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const newMessageRef = useRef(null);

    const currentTime = (new Date()).toLocaleTimeString([], {
        hour:"2-digit",
        minute:"2-digit"
    });

    const handleSendMessage = async () => {
        const messageUser = {
            role: "user",
            text: input,
            time:currentTime
        };

        setMessages((prev) => [...prev, messageUser]);

        const message = input;
        setInput("");
        setLoading(true);

        try {
            const data = await sendMessage(message);

            const messageChatBot = {
            role: "chatBot",
            text: data.message,
            time:currentTime
            };

            setMessages((prev) => [...prev, messageChatBot]);
        } catch (error) {
            setMessages((prev) => [
            ...prev,
            { role: "chatBot", text: "Eroare" },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        newMessageRef.currentMessage?.scrollInView({behavior:"smooth"});
    }, [messages])


    return(
        <div className="support-container">
            <div className="support-wrapper">
                <div className="support-header">
                    <h1>PropertyBook Assistant</h1>
                </div>

                <div className="support-description">
                    <p>Hello! 👋 I'm the PropertyBook AI Assistant. I'm here to help you with any questions about booking properties, listing your property, 
                        payments, or using our platform. How can I help you today?</p>
                </div>

                
                <div className="support-questions">
                    <div className="question">
                        <p>How do I rent a property?</p>
                    </div>

                    <div className="question">
                        <p>How do I list a property?</p>
                    </div>

                    <div className="question">
                        <p>What payment methods do you accept?</p>
                    </div>

                    <div className="question">
                        <p>How do I connect my MetaMask wallet?</p>
                    </div>

                    <div className="question">
                        <p>Can I modify my booking?</p>
                    </div>

                    <div className="question">
                        <p>How do I add a review?</p>
                    </div>

                </div>


                <div className="chat-container">
                    <div className="chat-messages">
                        {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${message.role}`}
                        >
                            <div className="response">
                                {message.text}<br/><span>{message.time}</span>
                            
                            </div>
                           

                        </div>
                        ))}
                        <div ref={newMessageRef}/>
                    </div>

                    <div className="chat-input">
                        <input
                            value={input}
                            placeholder="Ask me anything..."
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                        />

                        <button
                           onClick={handleSendMessage}
                            disabled={loading}
                        >
                        <TbSend />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

*/