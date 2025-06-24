import { MessageBubble } from "@/components/ui/message-bubble";
import { ChatInput } from "@/components/chat-input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2, Bot, Sparkles } from "lucide-react";
import { useChat } from "@/hooks/use-chat";
import { cn } from "@/lib/utils";

export function ChatInterface() {
  const { messages, isLoading, sendMessage, clearMessages, messagesEndRef } =
    useChat();

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
        <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                AI Assistant
              </h1>
              <p className="text-sm text-muted-foreground">
                Powered by n8n workflow
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={clearMessages}
            className="text-muted-foreground hover:text-foreground"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear Chat
          </Button>
        </div>
      </header>

      {/* Messages Area */}
      <ScrollArea className="flex-1">
        <div className="max-w-full">
          {/* Welcome Section */}
          {messages.length === 1 && (
            <div className="max-w-4xl mx-auto px-4 py-8">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Bot className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Welcome to AI Assistant
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    I'm here to help you with any questions or tasks. Just start
                    typing below to begin our conversation.
                  </p>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {[
                    "What can you help me with?",
                    "Tell me about yourself",
                    "How does this work?",
                  ].map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      onClick={() => sendMessage(suggestion)}
                      className="text-sm hover:bg-primary/5"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="space-y-4 px-4 py-6">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message.message}
                isUser={message.isUser}
                timestamp={message.timestamp}
                isLoading={message.isLoading}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </ScrollArea>

      {/* Input Area */}
      <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />

      {/* Status Indicator */}
      {isLoading && (
        <div className="absolute top-20 right-4 bg-primary/10 text-primary text-xs px-3 py-1 rounded-full animate-pulse">
          AI is thinking...
        </div>
      )}
    </div>
  );
}
