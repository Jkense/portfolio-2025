export const metadata = {
  title: "Jasper Kense Resume",
  description:
    "Resume and background of Jasper Kense, UX researcher and developer.",
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 text-black dark:text-white">
      <div className="flex items-center gap-4 mb-4">
        <img
          src="portrait.jpg"
          alt="Jasper Kense"
          className="w-24 h-24 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">Jasper Kense</h1>
          <div className="text-lg font-medium">UX researcher and developer</div>
        </div>
      </div>
      <div className="mb-6 flex flex-col gap-1 text-sm">
        <a
          href="https://linkedin.com/in/jasperkense"
          className="underline text-blue-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          linkedin.com/in/jasperkense
        </a>
        <a
          href="https://x.com/JasperKense"
          className="underline text-blue-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          x.com/JasperKense
        </a>
        <a
          href="mailto:jasperkense@hotmail.com"
          className="underline text-blue-600"
        >
          jasperkense@hotmail.com
        </a>
      </div>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Profile</h2>
        <p>
          My passion lies in the intersection of design and development. I have
          a strong technical foundation professionally and personally. I tend to
          spend most of my free time programming, a passion I've had most of my
          life. I prefer action over words, and enjoy diving in and spending
          time prototyping and testing.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Education</h2>
        <ul className="list-disc pl-5">
          <li className="mb-2">
            <strong>
              MSc. Design for Interaction & MSc. Strategic product design
            </strong>{" "}
            (2020-2022)
            <br />
            Technical University Delft
            <br />
            Specialisation in UXR, design methodology and digital design.
            Courses on prototyping, smart products and machine learning.
          </li>
          <li>
            <strong>BSc. Industrial design engineering</strong> (2015-2019)
            <br />
            Technical University Delft
            <br />
            Specialisation in industrial design and software design. Courses on
            entrepreneurship and software development.
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Work experience</h2>
        <ul className="list-disc pl-5">
          <li className="mb-2">
            <strong>Founder, Leapfrog</strong> (2023 - ongoing)
            <br />
            Founder & developer of my own AI-driven design tool Leapfrog.
            Leapfrog is an AI-first user research synthesis tool for research
            teams to reduce time-to-insight.
            <br />
            <span className="italic">
              GCP, Typescript, NextJS, React, Node, Remix, Flask
            </span>
          </li>
          <li className="mb-2">
            <strong>User experience designer at coeo incasso</strong> (2023 -
            ongoing, part-time Freelance, Rotterdam)
            <br />
            First hired to implement design proposals from thesis, but later
            evolved to general designer for communication-related projects. From
            research to design delivery. Most projects focus on digital
            communication.
            <br />
            <span className="italic">Blender, Solidworks, Unity3D</span>
          </li>
          <li className="mb-2">
            <strong>Design researcher at Chemistry team</strong> (2023-2024,
            part-time Freelance, EMEA & Singapore, 90% Remote)
            <br />
            Design researcher at Chemistry team on the Europe team for clients
            in the EMEA region. Most projects revolved around research & design
            projects in the healthcare sector.
          </li>
          <li>
            <strong>Design engineer at Aerlabs</strong> (2019, internship,
            Delft)
            <br />
            Front-end development and UX design internship at an Aerospace noise
            startup. The project was to build an interactive Mapbox integration
            on their sensor suite.
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Hard skills</h2>
        <ul className="list-disc pl-5">
          <li>
            Development: GCP, Typescript, NextJS, React, Node, Remix, Flask
          </li>
          <li>3D modelling: Blender, Solidworks, Unity3D</li>
          <li>
            Design & prototyping tools: Figma, Adobe Suite, Arduino, RPi,
            AxureRP
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Soft skills</h2>
        <ul className="list-disc pl-5">
          <li>
            Project management, team work, organisational and analytical, loyal,
            design thinking
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Languages</h2>
        <ul className="list-disc pl-5">
          <li>Dutch (native)</li>
          <li>English (fluently, speaking, reading, writing, C2)</li>
          <li>Italian (intermediate, speaking, reading, A2/B1)</li>
          <li>French, German, Spanish (minimal, A1)</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Academic publications</h2>
        <ul className="list-disc pl-5">
          <li>
            <strong>Chapter on the implications of AI on UXR</strong> (Springer
            publication, expected last quarter 2024)
            <br />
            This publication was an initiative from SAP. I have been invited to
            write a chapter for their upcoming publication on AI.
          </li>
          <li>
            <strong>Thesis (internally developed with coeo incasso)</strong>{" "}
            (2022, January - November, Rotterdam)
            <br />
            Thesis subject: Research and design for an inclusive debt trajectory
            for vulnerable groups.
          </li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Personal interests</h2>
        <ul className="list-disc pl-5">
          <li>
            Cultural enthusiast, traveller, amateur cook, amateur writer,
            history geek and boulderer.
          </li>
        </ul>
      </section>
    </div>
  );
}
