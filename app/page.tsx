import Image from "next/image";
import { BlogPosts } from "app/components/posts";
import { ExperienceAccordion } from "app/components/experience-accordion";

export default function Page() {
  return (
    <section>
      <div className="flex flex-row items-center gap-2">
        <Image src="/favicon.svg" alt="Jasper Kense" width={48} height={48} />
        <h1 className="my-8 text-2xl font-semibold tracking-tighter">
          Jasper Kense
        </h1>
      </div>
      <p className="mb-4 text-slate-800">
        {`I'm a product designer & engineer who is passionate about creating impactful products. 
        I combine technical expertise with design thinking to 
        build solutions that make a difference. My approach merges clean, efficient code 
        with thoughtful user experience design, always focusing on creating intuitive and 
        powerful tools that help people work better.`}
      </p>

      <div className="my-8">
        <h2 className="mb-3 text-2xl font-semibold tracking-tight text-slate-900">
          Projects
        </h2>
        <BlogPosts filterType="project" />
      </div>

      <div className="my-8">
        <h2 className="mb-3 text-2xl font-semibold tracking-tight text-slate-900">
          Publications
        </h2>
        <BlogPosts filterType="publication" />
      </div>

      <div className="my-8">
        <h2 className="mb-3 text-2xl font-semibold tracking-tight text-slate-900">
          Experience
        </h2>
        <ExperienceAccordion
          items={[
            {
              company: "Leapfrog",
              role: "Founder",
              period: "2023 — ongoing",
              summary:
                "Founder & developer of my own AI-driven design tool Leapfrog. Leapfrog is an AI-first user research synthesis tool for research teams to reduce time-to-insight.",
              highlights: [
                "Deep interaction design with AI interactions",
                "Full-stack development in Nextjs App router",
              ],
            },
            {
              company: "coeo incasso",
              role: "Product designer",
              period: "2022 — ongoing · part-time freelance",
              summary:
                "First hired to implement design proposals from thesis, later evolved to general designer for communication-related projects from research to delivery. Focus on digital communication.",
              highlights: [
                "Redesigned their payment portal from the ground up to facilitate better accessbility for vulnerable groups",
                "Redesigned traditional communication, like emails and letters, for a more understandable judicial trajectory",
                "Pioneered a new client portal for analytical insights for self-service business",
                "Designed and implemented a new marketing website",
              ],
            },
            {
              company: "Chemistry team",
              role: "UX Designer",
              period: "2023 — ongoing · part-time freelance",
              summary:
                "Design researcher on the Europe team for clients in the EMEA region, mostly healthcare-focused research & design projects.",
              highlights: [
                "Conducted user research and design for a next-generation healthcare platform that puts patients at the center of their care journey",
                "Benchmarked fashion design in the Middle East",
                "Facilitated user research sprints with various clients, spanning both Europe and Asia",
              ],
            },
            {
              company: "Aerlabs",
              role: "Design engineer",
              period: "2019 · internship",
              summary:
                "Front-end development and UX design internship at an aerospace noise startup. Built an interactive Mapbox integration for their sensor suite.",
              highlights: [
                "Designed and built an interactive Mapbox integration for their sensor suite",
              ],
            },
          ]}
        />
      </div>

      <div className="my-8">
        <h2 className="mb-3 text-2xl font-semibold tracking-tight text-slate-900">
          Education
        </h2>
        <ExperienceAccordion
          items={[
            {
              company: "Technical University Delft",
              role: "MSc. Design for Interaction & MSc. Strategic Product Design",
              period: "2020 — 2022",
              highlights: [
                "Specialisation in UXR, design methodology and digital design",
                "Courses on prototyping, smart products and machine learning",
              ],
            },
            {
              company: "Technical University Delft",
              role: "BSc. Industrial Design Engineering",
              period: "2015 — 2019",
              highlights: [
                "Specialisation in industrial design and software design",
                "Courses on entrepreneurship and software development",
              ],
            },
          ]}
        />
      </div>
    </section>
  );
}
