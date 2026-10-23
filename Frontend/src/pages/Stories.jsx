import { useState } from "react";
import { Search } from "lucide-react";
import StoryCard from "../components/StoryCard";

const Stories = () => {

  const [category, setCategory] = useState("ALL");
  const [search, setSearch] = useState("");

  const categories = [
    "ALL",
    "AI",
    "DEVELOPMENT",
    "TOOLS",
    "TECH",
  ];


  const stories = [
    {
      id: 1,
      number: "01",
      category: "AI",
      title: "AI agents are changing how developers write software.",
      description:
        "Coding assistants are evolving from autocomplete tools into powerful development agents.",
      slug: "ai-coding-agents",
      image: "/images/ai-agents.jpg",
    },

    {
      id: 2,
      number: "02",
      category: "DEVELOPMENT",
      title: "What's changing in the React ecosystem.",
      description:
        "New tools and approaches are changing how developers build modern React applications.",
      slug: "react-ecosystem",
      image: "/images/react.jpg",
    },

    {
      id: 3,
      number: "03",
      category: "TOOLS",
      title: "Five developer tools worth trying this week.",
      description:
        "Useful tools for developers, designers and technology enthusiasts.",
      slug: "developer-tools",
      image: "/images/developer-tools.jpg",
    },

    {
      id: 4,
      number: "04",
      category: "TECH",
      title: "The next generation of the web is taking shape.",
      description:
        "Browsers, AI and cloud technology are changing how web applications work.",
      slug: "future-web",
      image: "/images/future-web.jpg",
    },
  ];


  const filteredStories = stories.filter((story) => {

    const matchesCategory =
      category === "ALL" ||
      story.category === category;

    const matchesSearch =
      story.title
        .toLowerCase()
        .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;

  });


  return (
    <div className="min-h-screen bg-[#F5F3EE]">

      <section className="max-w-7xl mx-auto px-6 py-20">

        <p className="text-[#FF5C35] font-bold tracking-widest text-sm">
          BYTEPOST / STORIES
        </p>

        <h1 className="text-5xl md:text-7xl font-black mt-4">
          STORIES WORTH
          <br />
          YOUR TIME.
        </h1>

        <p className="text-gray-600 text-lg mt-6 max-w-xl">
          AI, development, tools and technology —
          carefully selected without the unnecessary noise.
        </p>


        {/* FILTERS */}

        <div className="flex flex-wrap gap-3 mt-12">

          {categories.map((item) => (

            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`px-5 py-3 text-sm font-bold border border-black transition
                ${
                  category === item
                    ? "bg-black text-white"
                    : "hover:bg-black hover:text-white"
                }`}
            >
              {item}
            </button>

          ))}

        </div>


        {/* SEARCH */}

        <div className="relative max-w-xl mt-8">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            placeholder="Search stories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border border-black
                       py-4 pl-12 pr-4 outline-none
                       focus:border-[#FF5C35]"
          />

        </div>


        {/* STORIES */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">

          {filteredStories.map((story) => (

            <StoryCard
              key={story.id}
              {...story}
            />

          ))}

        </div>


        {/* NO RESULTS */}

        {filteredStories.length === 0 && (

          <div className="py-20 text-center">

            <h2 className="text-2xl font-black">
              No stories found.
            </h2>

            <p className="text-gray-500 mt-2">
              Try another category or search.
            </p>

          </div>

        )}

      </section>

    </div>
  );
};

export default Stories;