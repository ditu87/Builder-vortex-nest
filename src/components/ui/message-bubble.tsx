import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
  isLoading?: boolean;
}

export function MessageBubble({
  message,
  isUser,
  timestamp,
  isLoading,
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex gap-3 max-w-4xl mx-auto animate-fade-up",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* Avatar */}
      <Avatar
        className={cn(
          "w-8 h-8 shrink-0",
          isUser ? "bg-chat-user" : "bg-chat-assistant",
        )}
      >
        <AvatarFallback
          className={cn(
            "text-xs font-medium",
            isUser
              ? "bg-chat-user text-chat-user-foreground"
              : "bg-chat-assistant text-chat-assistant-foreground",
          )}
        >
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>

      {/* Message Content */}
      <div
        className={cn(
          "flex flex-col gap-1 max-w-[75%]",
          isUser ? "items-end" : "items-start",
        )}
      >
        {/* Message Bubble */}
        <div
          className={cn(
            "relative px-4 py-3 rounded-2xl text-sm leading-relaxed",
            isUser
              ? "bg-chat-user text-chat-user-foreground rounded-br-md"
              : "bg-chat-assistant text-chat-assistant-foreground rounded-bl-md border border-border/50",
          )}
        >
          {isLoading ? (
            <div className="flex gap-1 items-center py-1">
              <div className="flex gap-1">
                <div
                  className="w-2 h-2 bg-current rounded-full opacity-60"
                  style={{
                    animation: "pulse-dot 1.4s ease-in-out infinite both",
                    animationDelay: "0s",
                  }}
                />
                <div
                  className="w-2 h-2 bg-current rounded-full opacity-60"
                  style={{
                    animation: "pulse-dot 1.4s ease-in-out infinite both",
                    animationDelay: "0.2s",
                  }}
                />
                <div
                  className="w-2 h-2 bg-current rounded-full opacity-60"
                  style={{
                    animation: "pulse-dot 1.4s ease-in-out infinite both",
                    animationDelay: "0.4s",
                  }}
                />
              </div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap break-words">{message}</p>
          )}
        </div>

        {/* Timestamp */}
        {timestamp && !isLoading && (
          <span className="text-xs text-muted-foreground px-1">
            {timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>
    </div>
  );
}
