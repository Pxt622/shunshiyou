'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain } from 'lucide-react';

type ChatPhase = 'idle' | 'typing' | 'thinking' | 'showing-map' | 'showing-rag' | 'complete';

export default function AIChatDemo() {
  const [phase, setPhase] = useState<ChatPhase>('idle');
  const [displayText, setDisplayText] = useState('');
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => {
    clearAllTimers();
    let timer: NodeJS.Timeout;

    switch (phase) {
      case 'idle':
        timer = setTimeout(() => setPhase('typing'), 800);
        break;
      case 'typing':
        timer = setTimeout(() => setPhase('thinking'), 1500);
        break;
      case 'thinking':
        timer = setTimeout(() => setPhase('showing-map'), 2500);
        break;
      case 'showing-map':
        timer = setTimeout(() => setPhase('showing-rag'), 2000);
        break;
      case 'showing-rag':
        timer = setTimeout(() => setPhase('complete'), 3000);
        break;
      case 'complete':
        timer = setTimeout(() => setPhase('idle'), 5000);
        break;
    }
    
    if (timer) timersRef.current.push(timer);
    return clearAllTimers;
  }, [phase]);

  // 打字机效果
  useEffect(() => {
    if (phase !== 'typing') {
      setDisplayText('');
      return;
    }
    const text = "周五晚上海大学路，预算300，要出片";
    let i = 0;
    const timer = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, [phase]);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden" id="demo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900"
        >
          AI实时规划演示
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* 左侧聊天界面 */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-gray-50 px-6 py-4 border-b flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-4 text-sm text-gray-500">与AI旅游搭子对话中...</span>
            </div>
            
            <div className="p-6 space-y-4 h-[400px] overflow-hidden relative">
              {/* AI欢迎消息 */}
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                  <p className="text-gray-800">嗨！我是你的AI旅游搭子 🎯 想去哪里玩？</p>
                </div>
              </div>

              {/* 用户输入（打字机效果） */}
              <AnimatePresence>
                {(phase === 'typing' || phase === 'thinking' || phase === 'complete') && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-end"
                  >
                    <div className="bg-brand-blue text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]">
                      {displayText || (phase !== 'typing' ? "周五晚上海大学路，预算300，要出片" : '')}
                      {phase === 'typing' && <span className="animate-pulse">|</span>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AI思考动画 */}
              <AnimatePresence>
                {phase === 'thinking' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white animate-pulse" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AI回复 */}
              <AnimatePresence>
                {(phase === 'showing-map' || phase === 'showing-rag' || phase === 'complete') && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div className="w-10 h-10 bg-brand-blue rounded-full flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
                      <p className="text-gray-800">
                        已为你规划好路线！🗺️<br/>
                        <span className="text-brand-orange font-semibold">A</span> → 网红餐厅(实时库存)<br/>
                        <span className="text-brand-orange font-semibold">B</span> → 胶片风拍照点<br/>
                        <span className="text-brand-orange font-semibold">C</span> → 特色酒吧<br/>
                        预计花费298元，全程步行15分钟
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* 右侧地图可视化 */}
          <div className="relative h-[500px] bg-gray-900 rounded-3xl overflow-hidden">
            {/* 网格背景 */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>
            
            {/* RAG信息框 - 固定在顶部 */}
            <AnimatePresence>
              {(phase === 'showing-rag' || phase === 'complete') && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 z-20"
                >
                  <div className="flex items-center gap-2 text-white/90 text-sm">
                    <Brain className="w-4 h-4 text-brand-orange" />
                    <span className="font-medium">RAG系统调用：</span>
                    <span className="text-white/70">用户历史偏好 - 喜欢胶片风、安静环境</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 地图标记点 */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[
                { id: 'A', label: '网红餐厅', x: 30, y: 40, hasBadge: true },
                { id: 'B', label: '胶片风拍照点', x: 55, y: 35, hasBadge: false },
                { id: 'C', label: '特色酒吧', x: 70, y: 55, hasBadge: false },
              ].map((point, i) => (
                <AnimatePresence key={point.id}>
                  {(phase === 'showing-map' || phase === 'showing-rag' || phase === 'complete') && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: 1, 
                        opacity: 1,
                        transition: { delay: i * 0.4, type: "spring", stiffness: 200 }
                      }}
                      className="absolute"
                      style={{ left: `${point.x}%`, top: `${point.y}%` }}
                    >
                      {/* 脉冲光环 */}
                      <div className="absolute inset-0 bg-brand-orange/30 rounded-full animate-ping" />
                      
                      <div className="relative">
                        <div className="w-12 h-12 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/50 border-2 border-white">
                          {point.id}
                        </div>
                        
                        {/* 标签 */}
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.4 + 0.3 }}
                          className="absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap"
                        >
                          <span className="bg-white text-gray-900 px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg">
                            {point.label}
                          </span>
                        </motion.div>

                        {/* 实时库存标签 */}
                        {point.hasBadge && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.4 + 0.5 }}
                            className="absolute -top-6 left-0 bg-green-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap font-medium shadow-md"
                          >
                            实时库存: 有座
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              ))}
            </div>

            {/* 连接线（SVG） */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <AnimatePresence>
                {(phase === 'showing-map' || phase === 'showing-rag' || phase === 'complete') && (
                  <>
                    <motion.path
                      d="M 120 200 Q 220 140 330 175"
                      fill="none"
                      stroke="#F97316"
                      strokeWidth="3"
                      strokeDasharray="8 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.8 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                    <motion.path
                      d="M 330 175 Q 400 200 450 275"
                      fill="none"
                      stroke="#F97316"
                      strokeWidth="3"
                      strokeDasharray="8 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.8 }}
                      transition={{ duration: 1, delay: 1 }}
                    />
                  </>
                )}
              </AnimatePresence>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}