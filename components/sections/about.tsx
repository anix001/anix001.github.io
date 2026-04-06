"use client";

import { useReducedMotion, motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { H2 } from "@/components/ui/typography";
import { fadeIn } from "@/lib/animations";
import { portfolio } from "@/data/portfolio";

export default function About() {
  const reduced = useReducedMotion();
  const item = reduced ? {} : fadeIn;

  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-4xl px-6 md:px-12 lg:px-24">
        <div className="mb-12">
          <H2>About</H2>
          <Separator className="mt-6" />
        </div>

        <motion.div
          variants={item}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-12 md:grid-cols-2"
        >
          <div className="flex flex-col gap-4">
            <p className="text-base leading-7 text-muted-foreground">
              I&apos;m a full stack developer with a focus on building products
              that are fast, accessible, and well-crafted. I care deeply about
              the details — both in code and in design.
            </p>
            <p className="text-base leading-7 text-muted-foreground">
              I&apos;ve worked across the stack — from designing data models and
              REST/GraphQL APIs to building polished React interfaces. I enjoy
              the full arc of a product, from whiteboard to production.
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm text-muted-foreground">Technologies</p>
            <div className="flex flex-wrap gap-2">
              {portfolio.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
