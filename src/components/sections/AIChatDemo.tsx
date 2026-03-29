'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Route, Sparkles } from 'lucide-react';

export default function AIChatDemo() {
  const [stage, setStage] = useState<'entering' | 'demonstrating' | 'completed'>('entering');
  const [typingIndex, setTypingIndex] = useState(0);
  
  // 对话内容
  const chatMessages = [
    { type: 'ai', content: '嗨！我是你的AI旅游搭子 🎯 想去哪里玩？', delay: 0 },
    { type: 'user', content: '找个安静适合拍照的地方，预算300', delay: 800 },
    { type: 'ai', content: '已为你规划好路线！ 🗺️', delay: 1600 },
    { type: 'list', content: 'A → 网红餐厅(实时库存)\nB → 胶片风拍照点\nC → 特色酒吧\n预计花费298元，全程步行15分钟', delay: 2400 },
  ];

  // 右侧地图节点
  const mapNodes = [
    { id: 'A', label: '网红餐厅', x: 25, y: 60, delay: 2000 },
    { id: 'B', label: '胶片风拍照点', x: 65, y: 35, delay: 2400 },
    { id: 'C', label: '特色酒吧', x: 80, y: 75, delay: 2800 },
  ];

  // 入场动画完成后开始演示
  useEffect(() => {
    const timer = setTimeout(() => {
      setStage('demonstrating');
    }, 1200); // 入场动画1.2秒后开始演示

    return () => clearTimeout(timer);
  }, []);

  // 演示完成后标记
  useEffect(() => {
    if (stage === 'demonstrating') {
      const timer = setTimeout(() => {
        setStage('completed');
      }, 5000); // 5秒演示后完成
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题 */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 font-shuzhi"
        >
          AI实时规划演示
        </motion.h2>

        {/* 双卡片容器 */}
        <div className="relative h-[600px] flex items-center justify-center gap-8 perspective-1000">
          
          {/* 左侧：对话卡片 */}
          <motion.div
            initial={{ 
              x: '-100vw', 
              opacity: 0, 
              filter: 'blur(20px)',
              scale: 0.8 
            }}
            animate={{ 
              x: 0, 
              opacity: 1, 
              filter: 'blur(0px)',
              scale: 1 
            }}
            transition={{ 
              type: "spring",
              stiffness: 50,
              damping: 20,
              duration: 1.2,
              delay: 0.2
            }}
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* 窗口标题栏 */}
            <div className="bg-gray-50/80 backdrop-blur-sm px-6 py-4 border-b border-gray-100 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <span className="text-sm text-gray-500 ml-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                与AI旅游搭子对话中...
              </span>
            </div>

            {/* 对话内容 */}
            <div className="p-6 space-y-4 h-[400px] overflow-y-auto bg-gradient-to-b from-white to-gray-50/50">
              <AnimatePresence>
                {chatMessages.map((msg, index) => (
                  stage !== 'entering' && (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ 
                        opacity: index <= typingIndex ? 1 : 0, 
                        y: index <= typingIndex ? 0 : 20,
                        scale: index <= typingIndex ? 1 : 0.95
                      }}
                      transition={{ duration: 0.5, delay: index * 0.8 }}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] p-4 rounded-2xl ${
                        msg.type === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-none' 
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}>
                        {msg.type === 'list' ? (
                          <div className="whitespace-pre-line text-sm leading-relaxed">
                            {msg.content.split('\n').map((line, i) => (
                              <div key={i} className={i === 0 ? 'font-semibold mb-2' : ''}>
                                {line}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed">{msg.content}</p>
                        )}
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
              
              {/* 打字指示器 */}
              {stage === 'demonstrating' && typingIndex < chatMessages.length - 1 && (
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-none flex gap-1">
                    <motion.div 
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-gray-400 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* 右侧：地图卡片 */}
          <motion.div
            initial={{ 
              x: '100vw', 
              opacity: 0, 
              filter: 'blur(20px)',
              scale: 0.8 
            }}
            animate={{ 
              x: 0, 
              opacity: 1, 
              filter: 'blur(0px)',
              scale: 1 
            }}
            transition={{ 
              type: "spring",
              stiffness: 50,
              damping: 20,
              duration: 1.2,
              delay: 0.4 // 比左侧稍晚一点，形成错落感
            }}
            className="w-full max-w-lg bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-700 relative"
          >
            {/* RAG系统提示 */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ 
                opacity: stage !== 'entering' ? 1 : 0, 
                y: stage !== 'entering' ? 0 : -20 
              }}
              transition={{ delay: 1.5, duration: 0.5 }}
              className="absolute top-4 left-4 right-4 bg-slate-800/90 backdrop-blur-sm rounded-xl p-3 border border-slate-700 z-10"
            >
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>RAG系统调用：用户历史偏好 - 喜欢胶片风、安静环境</span>
              </div>
            </motion.div>

            {/* 地图画布 */}
            <div className="h-[500px] relative bg-slate-950 overflow-hidden">
              {/* 网格背景 */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full" style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} />
              </div>

              {/* SVG 路线和节点 */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500">
                {/* 路线绘制动画 */}
                <motion.path
                  d="M 100 300 Q 150 200 260 175 Q 300 150 320 380"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ 
                    pathLength: stage !== 'entering' ? 1 : 0,
                    opacity: stage !== 'entering' ? 1 : 0
                  }}
                  transition={{ duration: 2, delay: 1.8, ease: "easeInOut" }}
                />

                {/* 节点 A - 网红餐厅 */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: stage !== 'entering' ? 1 : 0,
                    opacity: stage !== 'entering' ? 1 : 0
                  }}
                  transition={{ delay: 2, type: "spring", stiffness: 200 }}
                >
                  <circle cx="100" cy="300" r="25" fill="#1e293b" stroke="#f97316" strokeWidth="3" />
                  <text x="100" y="305" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">A</text>
                </motion.g>

                <motion.foreignObject
                  x="130"
                  y="280"
                  width="120"
                  height="40"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: stage !== 'entering' ? 1 : 0,
                    x: stage !== 'entering' ? 0 : -10
                  }}
                  transition={{ delay: 2.1 }}
                >
                  <div className="bg-white rounded-lg px-3 py-1.5 shadow-lg text-xs font-medium text-slate-800 whitespace-nowrap">
                    网红餐厅
                    <span className="ml-2 text-green-600 text-[10px]">实时库存: 有座</span>
                  </div>
                </motion.foreignObject>

                {/* 节点 B - 胶片风拍照点 */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: stage !== 'entering' ? 1 : 0,
                    opacity: stage !== 'entering' ? 1 : 0
                  }}
                  transition={{ delay: 2.4, type: "spring", stiffness: 200 }}
                >
                  <circle cx="260" cy="175" r="25" fill="#1e293b" stroke="#f97316" strokeWidth="3" />
                  <text x="260" y="180" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">B</text>
                </motion.g>

                <motion.foreignObject
                  x="290"
                  y="155"
                  width="100"
                  height="40"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: stage !== 'entering' ? 1 : 0,
                    x: stage !== 'entering' ? 0 : -10
                  }}
                  transition={{ delay: 2.5 }}
                >
                  <div className="bg-white rounded-lg px-3 py-1.5 shadow-lg text-xs font-medium text-slate-800">
                    胶片风拍照点
                  </div>
                </motion.foreignObject>

                {/* 节点 C - 特色酒吧 */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: stage !== 'entering' ? 1 : 0,
                    opacity: stage !== 'entering' ? 1 : 0
                  }}
                  transition={{ delay: 2.8, type: "spring", stiffness: 200 }}
                >
                  <circle cx="320" cy="380" r="25" fill="#1e293b" stroke="#f97316" strokeWidth="3" />
                  <text x="320" y="385" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">C</text>
                </motion.g>

                <motion.foreignObject
                  x="350"
                  y="360"
                  width="80"
                  height="40"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ 
                    opacity: stage !== 'entering' ? 1 : 0,
                    x: stage !== 'entering' ? 0 : -10
                  }}
                  transition={{ delay: 2.9 }}
                >
                  <div className="bg-white rounded-lg px-3 py-1.5 shadow-lg text-xs font-medium text-slate-800">
                    特色酒吧
                  </div>
                </motion.foreignObject>

                {/* 发光效果 */}
                <motion.circle
                  cx="100"
                  cy="300"
                  r="30"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: stage === 'completed' ? [0, 0.5, 0] : 0,
                    scale: stage === 'completed' ? [0.8, 1.2, 1.5] : 0.8
                  }}
                  transition={{ 
                    repeat: stage === 'completed' ? Infinity : 0,
                    duration: 2
                  }}
                />
              </svg>

              {/* 悬浮标签 */}
              <div className="absolute bottom-4 left-4 bg-slate-800/80 backdrop-blur-sm rounded-lg px-3 py-2 border border-slate-700">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Route className="w-4 h-4 text-orange-500" />
                  <span>最优路线计算完成</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}