"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PaperAirplaneIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const sampleConversations = [
  {
    id: "1",
    otherUser: { id: "u1", name: "Ralph Martinez", avatarUrl: null, role: "Producer" },
    lastMessage: { content: "Let me know when you're available to discuss the Atlanta shoot.", createdAt: "2:30 PM", senderId: "u1" },
    unreadCount: 2,
  },
  {
    id: "2",
    otherUser: { id: "u2", name: "Shapur Ahmadi", avatarUrl: null, role: "Director" },
    lastMessage: { content: "The color grade looks amazing. Great work!", createdAt: "Yesterday", senderId: "u2" },
    unreadCount: 0,
  },
  {
    id: "3",
    otherUser: { id: "u3", name: "Sarah Chen", avatarUrl: null, role: "DP" },
    lastMessage: { content: "I can bring my ARRI package for the shoot.", createdAt: "Mar 6", senderId: "u3" },
    unreadCount: 0,
  },
];

const sampleMessages = [
  { id: "m1", senderId: "u1", content: "Hey, I saw your profile on FrameOne. We're staffing up for a feature shooting in Atlanta.", createdAt: "10:15 AM" },
  { id: "m2", senderId: "me", content: "Hi Ralph! Thanks for reaching out. I'd love to hear more about the project.", createdAt: "10:22 AM" },
  { id: "m3", senderId: "u1", content: "It's a thriller, shooting for 6 weeks starting March 15. We need a Line Producer who knows the Atlanta market.", createdAt: "10:25 AM" },
  { id: "m4", senderId: "me", content: "That sounds right up my alley. I've done three productions in Atlanta over the past two years. What's the budget range?", createdAt: "10:30 AM" },
  { id: "m5", senderId: "u1", content: "Let me know when you're available to discuss the Atlanta shoot.", createdAt: "2:30 PM" },
];

export default function MessagesPage() {
  const { data: session } = useSession();
  const [selectedConvo, setSelectedConvo] = useState<string | null>("1");
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(sampleMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      {
        id: `m${Date.now()}`,
        senderId: "me",
        content: newMessage.trim(),
        createdAt: "Just now",
      },
    ]);
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const selectedConversation = sampleConversations.find((c) => c.id === selectedConvo);

  return (
    <div className="flex h-[calc(100vh-7rem)] animate-fade-in rounded-xl border border-zinc-800 overflow-hidden">
      {/* Conversation list */}
      <div className="w-80 border-r border-zinc-800 flex flex-col bg-zinc-900/50">
        <div className="p-4 border-b border-zinc-800">
          <h2 className="text-base font-semibold text-white mb-3">Messages</h2>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 pl-9 pr-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {sampleConversations.map((convo) => (
            <button
              key={convo.id}
              onClick={() => setSelectedConvo(convo.id)}
              className={`w-full flex items-start gap-3 p-4 text-left hover:bg-zinc-800/50 transition-colors ${
                selectedConvo === convo.id ? "bg-zinc-800/80" : ""
              }`}
            >
              <div className="relative">
                <Avatar name={convo.otherUser.name} size="md" />
                {convo.unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                    {convo.unreadCount}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white truncate">{convo.otherUser.name}</span>
                  <span className="text-[10px] text-zinc-500 shrink-0">{convo.lastMessage.createdAt}</span>
                </div>
                <p className="text-xs text-indigo-400">{convo.otherUser.role}</p>
                <p className={`text-xs mt-0.5 truncate ${convo.unreadCount > 0 ? "text-zinc-300 font-medium" : "text-zinc-500"}`}>
                  {convo.lastMessage.content}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Message area */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-zinc-800">
            <Avatar name={selectedConversation.otherUser.name} size="md" />
            <div>
              <p className="text-sm font-semibold text-white">{selectedConversation.otherUser.name}</p>
              <Badge variant="default" size="sm">{selectedConversation.otherUser.role}</Badge>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
              const isMe = msg.senderId === "me";
              return (
                <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                    isMe
                      ? "bg-indigo-600 text-white rounded-br-md"
                      : "bg-zinc-800 text-zinc-200 rounded-bl-md"
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    <p className={`text-[10px] mt-1 ${isMe ? "text-indigo-200" : "text-zinc-500"}`}>{msg.createdAt}</p>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-zinc-800">
            <div className="flex items-end gap-2">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none resize-none max-h-32"
                rows={1}
              />
              <Button
                size="md"
                onClick={handleSend}
                disabled={!newMessage.trim()}
                className="rounded-xl"
              >
                <PaperAirplaneIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <ChatBubbleLeftRightIcon className="h-12 w-12 text-zinc-700 mx-auto mb-3" />
            <p className="text-sm text-zinc-500">Select a conversation to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
}
