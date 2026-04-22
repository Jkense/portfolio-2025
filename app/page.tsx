import { BlogPosts } from "app/components/posts";
import { EducationList } from "app/components/education-list";

function FullWidthDivider() {
  return (
    <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
      <hr className="border-t border-divider" />
    </div>
  );
}

export default function Page() {
  return (
    <section className="py-6">
      {/* Hero */}
      <div className="py-6">
        <h1 className="title font-serif font-medium text-5xl tracking-tight mb-4">
          I&apos;m <span className="text-black dark:text-white">Jasper</span>,
          digital designer and software engineer
        </h1>
        <p className="text-ds-gray text-base leading-relaxed">
          I build high-quality, interactive interfaces and care deeply about how
          things look, feel, and perform. I approach problems from a builder’s
          perspective, using code as the primary tool.
        </p>
        <p className="pt-2 text-ds-gray text-base leading-relaxed">
          I leverage agentic coding workflows to translate user needs directly
          into working software, and I’m currently focused on building
          full-stack products and exploring AI-driven interfaces.{" "}
        </p>
      </div>

      <FullWidthDivider />

      {/* Projects */}
      <section className="py-6">
        <h2 className="text-lg font-normal mb-4">Projects</h2>
        <BlogPosts filterType="project" />
      </section>

      <FullWidthDivider />

      {/* Education */}
      <section className="py-6">
        <h2 className="text-lg font-normal mb-4">Education</h2>
        <EducationList
          items={[
            {
              period: "2020-2022",
              degree: "Double MSc. of engineering",
              university: "Delft University of Technology (TU Delft)",
              title: "design for interaction & strategic product design",
              highlights: [
                "Specialisation in UXR, design methodology and digital design",
                "Courses on prototyping, smart products and machine learning",
              ],
            },
            {
              period: "2015-2019",
              degree: "BSc. of engineering",
              university: "Delft University of Technology (TU Delft)",
              title: "industrial design engineering",
              highlights: [
                "Specialisation in industrial design and software design",
                "Courses on entrepreneurship and software development",
              ],
            },
          ]}
        />
      </section>

      <FullWidthDivider />

      {/* Publications */}
      <section className="py-6">
        <h2 className="text-lg font-normal mb-4">Publications</h2>
        <BlogPosts filterType="publication" />
      </section>
    </section>
  );
}
