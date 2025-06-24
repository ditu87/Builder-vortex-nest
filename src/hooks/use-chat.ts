import { useState, useCallback, useRef, useEffect } from "react";
import {
  ChatMessage,
  sendChatMessage,
  generateMessageId,
} from "@/lib/chat-api";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      message: "Hello! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim() || isLoading) return;

      const userMessage: ChatMessage = {
        id: generateMessageId(),
        message: message.trim(),
        isUser: true,
        timestamp: new Date(),
      };

      const loadingMessage: ChatMessage = {
        id: generateMessageId(),
        message: "",
        isUser: false,
        timestamp: new Date(),
        isLoading: true,
      };

      // Add user message and loading indicator
      setMessages((prev) => [...prev, userMessage, loadingMessage]);
      setIsLoading(true);

      try {
        const response = await sendChatMessage(message.trim());

        // Remove loading message and add response
        setMessages((prev) => {
          const withoutLoading = prev.filter((msg) => !msg.isLoading);

          if (response.success && response.message) {
            return [
              ...withoutLoading,
              {
                id: generateMessageId(),
                message: response.message,
                isUser: false,
                timestamp: new Date(),
              },
            ];
          } else {
            return [
              ...withoutLoading,
              {
                id: generateMessageId(),
                message:
                  response.error ||
                  "Sorry, I couldn't process your message. Please try again.",
                isUser: false,
                timestamp: new Date(),
              },
            ];
          }
        });
      } catch (error) {
        // Remove loading message and show error
        setMessages((prev) => {
          const withoutLoading = prev.filter((msg) => !msg.isLoading);
          return [
            ...withoutLoading,
            {
              id: generateMessageId(),
              message:
                "Sorry, something went wrong. Please check your connection and try again.",
              isUser: false,
              timestamp: new Date(),
            },
          ];
        });
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading],
  );

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: "welcome",
        message: "Hello! I'm your AI assistant. How can I help you today?",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
    messagesEndRef,
  };
}
