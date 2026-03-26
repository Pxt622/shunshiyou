import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import AIChatDemo from '@/components/sections/AIChatDemo';
import Features from '@/components/sections/Features';
import TechPrinciples from '@/components/sections/TechPrinciples';
import UserStories from '@/components/sections/UserStories';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <AIChatDemo />
      <section id="features">
        <Features />
      </section>
      <TechPrinciples />
      <UserStories />
      <Footer /> 
    </main>
  );
}