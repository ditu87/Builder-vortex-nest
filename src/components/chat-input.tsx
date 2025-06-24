import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function ChatInput({
  onSendMessage,
  isLoading,
  disabled,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message);
      setMessage("");
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [message]);

  return (
    <div className="relative bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/40">
      <div className="max-w-4xl mx-auto p-4">
        <div className="relative flex items-end gap-3">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
              disabled={isLoading || disabled}
              className={cn(
                "min-h-[44px] max-h-[120px] resize-none pr-12 py-3",
                "bg-muted/50 border-border/60 focus:border-primary/60",
                "placeholder:text-muted-foreground/70",
              )}
              style={{ height: "auto" }}
            />

            {/* Character count indicator for very long messages */}
            {message.length > 1000 && (
              <div className="absolute bottom-2 right-12 text-xs text-muted-foreground">
                {message.length}/2000
              </div>
            )}
          </div>

          <Button
            onClick={handleSend}
            disabled={!message.trim() || isLoading || disabled}
            size="sm"
            className={cn(
              "h-11 w-11 shrink-0 rounded-xl",
              "bg-primary hover:bg-primary/90",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-all duration-200",
            )}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Helpful hints */}
        <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground/60">
          <span>Press Enter to send</span>
          <span>•</span>
          <span>Shift+Enter for new line</span>
        </div>
      </div>
    </div>
  );
}
