import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Story = () => {
  const { slug } = useParams();

  const stories = [
    {
      slug: "ai-coding-agents",
      category: "AI",
      date: "OCTOBER 21, 2026",
      title: "AI agents are changing how developers write software.",
      description: "Coding assistants are evolving beyond simple autocomplete.",
      image: "/images/ai-agents.jpg",

      content: [
        "Artificial intelligence has already changed how developers write software.",

        "The latest generation of coding agents can understand larger parts of a project, inspect files and assist with more complicated development tasks.",

        "Developers are therefore moving from simply writing every line of code toward reviewing, planning and working alongside intelligent development tools.",
      ],
    },

    {
      slug: "react-ecosystem",
      category: "DEVELOPMENT",
      date: "OCTOBER 20, 2026",
      title: "What's changing in the React ecosystem.",
      description:
        "React development continues to evolve with new tools and approaches.",
      image: "/images/react.jpg",

      content: [
        "React remains one of the most widely used technologies for building modern user interfaces.",

        "The ecosystem surrounding React continues to evolve as developers adopt new frameworks, build tools and application patterns.",

        "Understanding the fundamentals of React remains important even as higher-level tools make development easier.",
      ],
    },

    {
      slug: "developer-tools",
      category: "TOOLS",
      date: "OCTOBER 19, 2026",
      title: "Five developer tools worth trying this week.",
      description: "A selection of useful tools for modern developers.",
      image: "/images/developer-tools.jpg",

      content: [
        "Developers have access to more tools than ever before.",

        "The best tools reduce repetitive work and allow developers to concentrate on solving actual problems.",

        "Choosing a small collection of useful tools is often better than constantly switching between new applications.",
      ],
    },

    {
      slug: "next-generation-web",
      category: "TECH",
      date: "OCTOBER 23, 2026",

      title: "The next generation of the web is taking shape.",

      description:
        "Browsers, AI and cloud technology are changing how web applications work.",

      image: "/images/ai-browser.jpg",

      content: [
        "The web is evolving faster than ever before.",

        "Modern browsers, artificial intelligence and cloud technology are changing how developers build and users interact with web applications.",

        "The next generation of the web will be faster, smarter and more connected, allowing developers to create increasingly powerful experiences.",
      ],
    },
  ];

  const story = stories.find((item) => item.slug === slug);

  if (!story) {
    return (
      <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-black">Story not found.</h1>

          <Link
            to="/stories"
            className="inline-block mt-6 text-[#FF5C35] font-bold"
          >
            ← BACK TO STORIES
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F3EE] min-h-screen">
      <article className="max-w-4xl mx-auto px-6 py-20">
        <Link
          to="/stories"
          className="inline-flex items-center gap-2 font-bold text-sm"
        >
          <ArrowLeft size={17} />
          ALL STORIES
        </Link>

        <p className="text-[#FF5C35] font-bold tracking-widest mt-12">
          {story.category}
        </p>

        <h1 className="text-4xl md:text-6xl font-black leading-tight mt-4">
          {story.title}
        </h1>

        <p className="text-xl text-gray-600 mt-6">{story.description}</p>

        <p className="text-sm text-gray-500 mt-7">{story.date}</p>

        <img
          src={story.image}
          alt={story.title}
          className="w-full h-[450px] object-cover mt-10"
        />

        <div className="border-t border-black mt-12 pt-10">
          {story.content.map((paragraph, index) => (
            <p key={index} className="text-lg leading-8 mb-7">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="bg-[#0D0D0D] text-white p-8 md:p-10 mt-14">
          <p className="text-[#FF5C35] font-bold">BYTEPOST</p>

          <h2 className="text-3xl font-black mt-3">
            Get the next story in your inbox.
          </h2>

          <Link
            to="/subscribe"
            className="inline-block bg-[#FF5C35]
                       text-black px-6 py-3
                       font-bold mt-6"
          >
            SUBSCRIBE →
          </Link>
        </div>
      </article>
    </div>
  );
};

export default Story;
