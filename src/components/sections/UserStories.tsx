'use client';

import { motion } from 'framer-motion';
import { Briefcase, Users, Heart, ChevronRight } from 'lucide-react';

const stories = [
  {
    icon: Briefcase,
    title: '职场新人周末充电',
    scenario: '周六早9点输入"想一个人静静"',
    result: '5分钟后获得"城市图书馆→独立书店→日落咖啡馆"治愈路线',
    tag: '独处时光',
    color: 'bg-blue-500'
  },
  {
    icon: Users,
    title: '闺蜜拍照局',
    scenario: '4人宿舍拼团决策',
    result: 'AI协调4人偏好→生成"最佳出片动线"',
    tag: '多人协调',
    color: 'bg-pink-500'
  },
  {
    icon: Heart,
    title: '情侣纪念日',
    scenario: '预算500元',
    result: 'AI推荐小众非遗手作工坊→自动生成朋友圈官宣文案',
    tag: '浪漫约会',
    color: 'bg-red-500'
  }
];

export default function UserStories() {
  return (
    <section className="py-20 bg-gray-50 overflow-hidden" id="stories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            用户场景故事
          </h2>
          <p className="text-gray-600">看看他们如何用瞬时游规划完美周末</p>
        </motion.div>

        {/* 改为Grid布局，一行三列，无滚动 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, index) => (
            <motion.div
              key={story.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bg-white rounded-3xl p-6 shadow-lg h-full border border-gray-100 hover:shadow-xl transition-shadow flex flex-col">
                <div className={`w-12 h-12 ${story.color} rounded-xl flex items-center justify-center mb-4`}>
                  <story.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="inline-flex px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium mb-3 w-fit">
                  {story.tag}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{story.title}</h3>
                
                {/* 固定高度确保对齐 */}
                <div className="flex flex-col flex-grow">
                  {/* 输入区域 */}
                  <div className="bg-gray-50 rounded-xl p-3 border-l-4 border-brand-blue mb-3">
                    <p className="text-xs text-gray-500 mb-1">输入</p>
                    <p className="text-gray-800 font-medium text-sm min-h-[40px] flex items-center">{story.scenario}</p>
                  </div>
                  
                  {/* 箭头动画 */}
                  <div className="flex justify-center mb-3">
                    <div className="w-6 h-6 rounded-full bg-brand-orange/10 flex items-center justify-center">
                      <motion.div
                        animate={{ y: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <ChevronRight className="w-4 h-4 text-brand-orange rotate-90" />
                      </motion.div>
                    </div>
                  </div>
                  
                  {/* AI输出区域 - 底部对齐 */}
                  <div className="bg-brand-blue/5 rounded-xl p-3 border-l-4 border-brand-orange mt-auto">
                    <p className="text-xs text-gray-500 mb-1">AI输出</p>
                    <p className="text-gray-800 text-sm min-h-[60px] leading-relaxed">{story.result}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}