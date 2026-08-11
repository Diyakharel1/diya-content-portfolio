import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { BrandMarquee } from "@/components/BrandMarquee";
import { About } from "@/components/About";
import { ReelsWork } from "@/components/ReelsWork";
import { Services } from "@/components/Services";
import { Experience } from "@/components/Experience";
import { Pricing } from "@/components/Pricing";
import { Contact, Footer } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <BrandMarquee />
        <About />
        <ReelsWork />
        <Services />
        <Experience />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
