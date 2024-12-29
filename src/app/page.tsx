import HeroSection from '@/components/HeroSection';
import Shipping from '@/components/search/Shipping';

export default function Home() {
  return (
    <>
      <section className="hero">
        <HeroSection />
      </section>
      <section className="hero">
        <Shipping />
      </section>
    </>
  );
}
