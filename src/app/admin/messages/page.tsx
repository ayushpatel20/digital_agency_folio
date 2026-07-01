"use client";

import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import { Mail, CheckCircle, Trash2, Eye, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

const SAMPLE_MESSAGES: Message[] = [];

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<Message[]>(SAMPLE_MESSAGES);
  const [selected, setSelected] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  const markRead = (id: string) => {
    setMessages(messages.map((m) => m.id === id ? { ...m, read: true } : m));
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <AdminShell title="Messages">
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/50 text-sm">
          {unread > 0 ? (
            <span className="text-primary font-medium">{unread} unread message{unread > 1 ? "s" : ""}</span>
          ) : (
            "All messages read"
          )}
        </p>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-white/8 text-white/70 hover:text-white text-sm transition-all"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {messages.length === 0 ? (
        <div className="glass-card p-16 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Mail size={24} className="text-primary" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">No messages yet</h3>
          <p className="text-white/40 text-sm">
            Contact form submissions will appear here. Messages are sent via the contact form on the homepage.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Message list */}
          <div className="lg:col-span-2 space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => { setSelected(msg); markRead(msg.id); }}
                className={`glass-card p-4 cursor-pointer transition-all ${selected?.id === msg.id ? "border-primary/30 bg-primary/5" : ""} ${!msg.read ? "border-l-2 border-l-primary" : ""}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className={`text-sm font-medium ${!msg.read ? "text-white" : "text-white/60"}`}>{msg.name}</p>
                  <div className="flex items-center gap-2">
                    {!msg.read && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                    <button onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id); }} className="text-white/20 hover:text-red-400 transition-colors">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
                <p className="text-white/40 text-xs">{msg.email}</p>
                <p className="text-white/50 text-xs mt-1.5 line-clamp-1">{msg.subject || msg.message}</p>
                <p className="text-white/25 text-xs mt-1">{new Date(msg.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>

          {/* Message detail */}
          {selected && (
            <div className="lg:col-span-3 glass-card p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-white font-semibold text-lg">{selected.name}</h3>
                  <p className="text-white/40 text-sm">{selected.email}</p>
                </div>
                <button onClick={() => deleteMessage(selected.id)} className="p-2 rounded-xl glass border border-white/8 text-white/30 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
              {selected.subject && (
                <div className="mb-4">
                  <p className="text-white/30 text-xs font-medium uppercase tracking-wider mb-1">Subject</p>
                  <p className="text-white/80 text-sm">{selected.subject}</p>
                </div>
              )}
              <div>
                <p className="text-white/30 text-xs font-medium uppercase tracking-wider mb-2">Message</p>
                <p className="text-white/70 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>
              <div className="mt-6 pt-6 border-t border-white/5">
                <a
                  href={`mailto:${selected.email}`}
                  className="btn-primary text-sm px-6 py-3"
                >
                  <span>Reply via Email</span>
                  <Mail size={14} />
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </AdminShell>
  );
}
