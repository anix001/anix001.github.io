import Navbar from "@/components/sections/navbar";
import Hero from "@/components/sections/hero";
import Work from "@/components/sections/work";
import About from "@/components/sections/about";
import Experience from "@/components/sections/experience";
import Contact from "@/components/sections/contact";
import { GridBackground } from "@/components/ui/grid-background";

export default function Home() {
  return (
    <>
      <GridBackground />
      <Navbar />
      <main>
        <Hero />
        <Work />
        <About />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
