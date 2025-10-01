"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { 
  id: string; 
  createdAt: string; 
  anonId: string; 
  text: string; 
};

export default function PublicChat({ 
  mode 
}: { 
  mode: "MANHUNT" | "EMERGENCY" | "NORMAL" 
}) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  async function load() {
    const res = await fetch("/api/chat?channel=public");
    const data = await res.json();
    setMsgs(data);
    // scroll to bottom
    setTimeout(() => {
      listRef.current?.scrollTo({ 
        top: listRef.current.scrollHeight 
      });
    }, 0);
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 4000); // simple polling; swap to SSE later
    return () => clearInterval(t);
  }, []);

  async function send() {
    if (!text.trim()) return;
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        channel: "public", 
        text, 
        lat: null, 
        lon: null 
      }) // can add coords later
    });
    if (res.ok) {
      const data = await res.json();
      setText("");
      if (data.needsModeration) {
        alert(data.message);
      }
      load();
    } else {
      alert(await res.text());
    }
  }

  return (
    <div className="rounded-xl bg-white border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="font-medium">
          {mode === "MANHUNT" 
            ? "Community Coordination (Manhunt)" 
            : "Community Coordination (Emergency)"
          }
        </div>
        <div className="text-xs text-gray-500">
          Be respectful. No doxxing. Use secure tips for private info.
        </div>
      </div>
      
      <div 
        ref={listRef} 
        className="h-72 overflow-y-auto divide-y divide-gray-100"
      >
        {msgs.map(m => (
          <div key={m.id} className="px-4 py-3">
            <div className="text-xs text-gray-500">
              {new Date(m.createdAt).toLocaleTimeString()} • {m.anonId}
            </div>
            <div className="text-sm text-gray-800 whitespace-pre-wrap">
              {m.text}
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t border-gray-200">
        <div className="flex gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share verified info, resources (shelters, churches), or offers to help. No personal data."
            className="flex-1 border border-gray-300 rounded-md p-2 h-20"
          />
          <button 
            onClick={send} 
            className="self-end px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500"
          >
            Post
          </button>
        </div>
        <div className="text-[11px] text-gray-500 mt-1">
          We auto-filter phone numbers/addresses; tips with sensitive info may be held for review.
        </div>
      </div>
    </div>
  );
}
