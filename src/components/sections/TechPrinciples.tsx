'use client';

import { motion } from 'framer-motion';
import { Database, Zap, Cpu, Layers } from 'lucide-react';

const techItems = [
  {
    icon: Database,
    title: '简单查询',
    desc: '缓存/规则匹配',
    cost: '零成本',
    percent: '60%',
    color: 'bg-green-500',
  },
  {
    icon: Zap,
    title: '标准查询',
    desc: 'Qwen3.5-Flash',
    cost: '低成本',
    percent: '35%',
    color: 'bg-blue-500',
  },
  {
    icon: Cpu,
    title: '复杂生成',
    desc: '多模态大模型',
    cost: '高成本',
    percent: '5%',
    color: 'bg-purple-500',
  }
];

export default function TechPrinciples() {
  return (
    <section className="py-20 bg-gray-900 text-white relative overflow-hidden" id="tech">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900 to-gray-900" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            极致性价比的<span className="text-brand-orange">AI架构</span>
          </h2>
          <p className="text-gray-400 text-lg">智能算力路由，让每一分钱都花在刀刃上</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center gap-4 bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
              <Layers className="w-8 h-8 text-brand-blue" />
              <div>
                <div className="font-semibold">用户查询请求</div>
                <div className="text-sm text-gray-400">智能分类路由</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {techItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700"
              >
                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{item.desc}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">占比</span>
                    <span className="font-semibold text-white">{item.percent}</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: item.percent }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
                      className={`h-full ${item.color}`}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">成本</span>
                    <span className={`font-medium ${item.cost === '零成本' ? 'text-green-400' : item.cost === '低成本' ? 'text-blue-400' : 'text-purple-400'}`}>
                      {item.cost}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-brand-blue/20 to-brand-orange/20 rounded-2xl p-6 border border-white/10"
          >
            <p className="text-lg font-medium">
              百万次调用成本控制在 <span className="text-brand-orange font-bold">5000元/月</span>
            </p>
            <p className="text-gray-400 text-sm mt-2">
              让大学生创业团队也能用得起企业级AI
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}