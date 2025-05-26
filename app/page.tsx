import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Jasper Kense
      </h1>
      <p className="mb-4 text-slate-800">
        {`I'm a software engineer and designer passionate about creating impactful products. 
        As the founder of Leapfrog, I combine technical expertise with design thinking to 
        build solutions that make a difference. My approach merges clean, efficient code 
        with thoughtful user experience design, always focusing on creating intuitive and 
        powerful tools that help people work better.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
