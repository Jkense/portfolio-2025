import { BlogPosts } from "app/components/posts";
import { EducationList } from "app/components/education-list";

export default function Page() {
  return (
    <section className="py-8">
      {/* Hero */}
      <div className="py-8 mb-16">
        <h1 className="title font-serif font-medium text-5xl lg:text-6xl tracking-tight mb-6 leading-tight">
          I&apos;m <span className="text-black dark:text-white">Jasper</span>,
          digital designer and software engineer
        </h1>
        <p className="text-ds-gray text-base leading-relaxed max-w-2xl">
          I build impactful digital products by combining engineering and
          design. I enjoy working directly with users, shaping clear user
          experiences and implementing ideas directly into the codebase. My goal
          is to create the best possible experience for users.
        </p>
      </div>

      {/* Projects */}
      <section className="py-8 mb-16">
        <h2 className="text-lg font-normal mb-6 font-serif">Projects</h2>
        <BlogPosts filterType="project" />
      </section>

      {/* Education */}
      <section className="py-8 mb-16">
        <h2 className="text-lg font-normal mb-6 font-serif">Education</h2>
        <EducationList
          items={[
            {
              period: "2020-2022",
              degree: "Double MSc. of engineering",
              university: "Technical university of Delft",
              title: "design for interaction & strategic product design",
              highlights: [
                "Specialisation in UXR, design methodology and digital design",
                "Courses on prototyping, smart products and machine learning",
              ],
            },
            {
              period: "2015-2019",
              degree: "BSc. of engineering",
              university: "Technical university of Delft",
              title: "industrial design engineering",
              highlights: [
                "Specialisation in industrial design and software design",
                "Courses on entrepreneurship and software development",
              ],
            },
          ]}
        />
      </section>

      {/* Publications */}
      <section className="py-8">
        <h2 className="text-lg font-normal mb-6 font-serif">Publications</h2>
        <BlogPosts filterType="publication" />
      </section>
    </section>
  );
}
