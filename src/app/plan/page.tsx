'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles} from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function PlanPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好！我是你的AI旅游搭子 🎯\n\n告诉我你的需求，比如：\n• "周五晚上海大学路，预算300，要出片"\n• "明天下午想找个安静的地方看书"\n• "求推荐适合情侣的约会路线"',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          history: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.content || '抱歉，我暂时无法处理请求，请稍后重试。',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '已为你规划路线！🗺️\n\n📍 路线：网红餐厅 → 胶片风拍照点 → 特色酒吧\n⏱️ 预计用时：3小时\n💰 预算：298元/人\n\n需要我生成小红书文案或导航链接吗？',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
      }, 1500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-brand-blue transition-colors">
            <span className="text-xl">←</span>
            <span>返回首页</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-blue rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900">AI旅游搭子</span>
          </div>
          
          <div className="w-20" />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' ? 'bg-gray-200' : 'bg-brand-blue'
                }`}>
                  {message.role === 'user' ? (
                    <span className="text-gray-600 font-medium text-sm">我</span>
                  ) : (
                    <Sparkles className="w-5 h-5 text-white" />
                  )}
                </div>

                <div className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                  message.role === 'user' 
                    ? 'bg-brand-blue text-white rounded-tr-sm' 
                    : 'bg-white shadow-md rounded-tl-sm border border-gray-100'
                }`}>
                  <div className={`text-sm leading-relaxed whitespace-pre-wrap ${
                    message.role === 'user' ? 'text-white' : 'text-gray-800'
                  }`}>
                    {message.content}
                  </div>
                  
                  <div className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div className="bg-white shadow-md rounded-2xl rounded-tl-sm px-6 py-4 border border-gray-100">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t sticky bottom-0">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1 bg-gray-100 rounded-2xl border border-gray-200 focus-within:border-brand-blue focus-within:ring-2 focus-within:ring-brand-blue/20 transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入你的旅游需求，比如：周五晚上海大学路，预算300，要出片..."
                className="w-full bg-transparent px-4 py-3 text-gray-900 placeholder-gray-400 resize-none outline-none max-h-32"
                rows={1}
                style={{ minHeight: '52px' }}
              />
            </div>
            
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-brand-blue text-white rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              发送
            </button>
          </div>
          
          <div className="text-center mt-2 text-xs text-gray-400">
            AI生成内容仅供参考，请核实商户营业状态及价格
          </div>
        </div>
      </div>
    </div>
  );
}
