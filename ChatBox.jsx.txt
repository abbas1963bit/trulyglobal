import React, { useState, useRef, useEffect } from 'react';

const EMOJIS = ['😊', '❤️', '🔥', '😍', '👍', '🌹', '✨', '☕'];

export function ChatBox({ recipient, messages = [], onSendMessage }) {
  const [text, setText] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const handleSend = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    onSendMessage?.(value);
    setText('');
  };

  const addEmoji = (emoji) => {
    setText((prev) => prev + emoji);
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden">
      <div className="bg-gradient-to-r from-pink-500 to-blue-500 p-4 text-white flex items-center gap-3">
        <img
          src={recipient?.avatar}
          alt={recipient?.name || ''}
          className="w-12 h-12 rounded-full object-cover border-2 border-white"
        />
        <div>
          <h3 className="font-bold text-lg">{recipient?.name}</h3>
          <span className="text-xs text-pink-100">نشط الآن</span>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-pink-50/30">
        {messages.map((msg, idx) => (
          <div
            key={msg.id ?? idx}
            className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
          >
            <div
              dir="auto"
              className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl text-sm break-words ${
                msg.sender === 'me'
                  ? 'bg-pink-500 text-white rounded-ee-none'
                  : 'bg-white text-gray-800 shadow-sm rounded-es-none'
              }`}
            >
              {msg.text}
            </div>
            <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
              <span>{msg.time}</span>
              {msg.sender === 'me' && <span>{msg.read ? '✓✓ قرئت' : '✓ أُرسلت'}</span>}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex items-center gap-2 text-xl">
        {EMOJIS.map((emoji) => (
          <button
            key={emoji}
            type="button"
            aria-label={`إضافة ${emoji}`}
            onClick={() => addEmoji(emoji)}
            className="hover:scale-125 transition-transform"
          >
            {emoji}
          </button>
        ))}
        <span className="text-xs text-gray-400 ms-auto">مخصص للنصوص والرموز التعبيرية فقط 🔒</span>
      </div>

      <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
        <input
          type="text"
          dir="auto"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="اكتب رسالتك هنا..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-pink-400 text-sm"
        />
        <button
          type="submit"
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-medium text-sm transition-colors"
        >
          إرسال
        </button>
      </form>
    </div>
  );
}

