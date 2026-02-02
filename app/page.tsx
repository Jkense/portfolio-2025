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
          I build impactful digital products by combining engineering and
          design. I enjoy working directly with users, shaping clear user
          experiences and implementing ideas directly into the codebase. My goal
          is to create the best possible experience for users.
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
