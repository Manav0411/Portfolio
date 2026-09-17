import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Approach } from "@/components/Approach";
import { Work } from "@/components/Work";
import { Projects } from "@/components/Projects";
import { Stack } from "@/components/Stack";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Approach />
        <Work />
        <Projects />
        <Stack />
      </main>
      <Contact />
    </>
  );
}
