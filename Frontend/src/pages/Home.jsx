import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";
import StoryCard from "../components/StoryCard";
import SubscribeForm from "../components/SubscribeForm";

const Home = () => {

    const stories = [
        {
            id: 1,
            number: "01",
            category: "AI",
            title: "AI agents are changing how developers write software.",
            description:
                "Coding assistants are evolving from simple autocomplete tools into powerful development agents.",
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
                "A selection of useful tools for developers, designers and technology enthusiasts.",
            slug: "developer-tools",
            image: "/images/developer-tools.jpg",
        },
    ];
    return (
        <div className="bg-[#F5F3EE] text-[#111111]">

            {/* ================= HERO ================= */}

            <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">

                <div className="grid lg:grid-cols-2 gap-14 items-center">

                    {/* LEFT */}

                    <div>

                        <div className="flex items-center gap-2 text-[#FF5C35] mb-6">

                            <TrendingUp size={18} />

                            <p className="text-sm font-bold tracking-[0.18em]">
                                WEEKLY TECH BRIEFING
                            </p>

                        </div>


                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">
                            TECH NEWS
                            <br />

                            WITHOUT THE

                            <span className="text-[#FF5C35]">
                                {" "}NOISE.
                            </span>
                        </h1>


                        <p className="text-gray-600 text-lg md:text-xl mt-7 max-w-xl leading-8">
                            A weekly newsletter covering the most important
                            stories in AI, software development and technology —
                            explained simply.
                        </p>


                        <div className="flex flex-col sm:flex-row gap-4 mt-9">

                            <Link
                                to="/subscribe"
                                className="group bg-[#0D0D0D] text-white
                           px-7 py-4 font-bold
                           flex items-center justify-center gap-3
                           hover:bg-[#FF5C35]
                           hover:text-black
                           transition duration-300"
                            >
                                JOIN BYTEPOST

                                <ArrowRight
                                    size={18}
                                    className="group-hover:translate-x-1 transition"
                                />
                            </Link>


                            <Link
                                to="/archive"
                                className="border border-black
                           px-7 py-4 font-bold
                           text-center
                           hover:bg-black
                           hover:text-white
                           transition duration-300"
                            >
                                BROWSE ARCHIVE
                            </Link>

                        </div>


                        <div className="flex items-center gap-6 mt-9 text-sm">

                            <div>
                                <p className="font-black text-xl">12K+</p>
                                <p className="text-gray-500">Readers</p>
                            </div>

                            <div className="h-10 w-px bg-gray-300"></div>

                            <div>
                                <p className="font-black text-xl">24</p>
                                <p className="text-gray-500">Issues</p>
                            </div>

                            <div className="h-10 w-px bg-gray-300"></div>

                            <div>
                                <p className="font-black text-xl">FREE</p>
                                <p className="text-gray-500">Every Sunday</p>
                            </div>

                        </div>

                    </div>


                    {/* ================= FEATURED ISSUE ================= */}

                    <div className="relative">

                        {/* Orange Decoration */}

                        <div className="absolute -top-4 -right-4 w-full h-full bg-[#FF5C35]"></div>


                        <div className="relative bg-[#0D0D0D] text-white p-8 md:p-10">

                            <div className="flex justify-between items-center">

                                <p className="text-[#FF5C35] font-bold text-sm tracking-widest">
                                    FEATURED ISSUE
                                </p>

                                <p className="text-gray-500 text-sm">
                                    #024
                                </p>

                            </div>


                            {/* Image Placeholder */}

                            {/* Featured Image */}

                            <div className="h-64 mt-8 overflow-hidden">

                                <img
                                    src="/images/ai-browser.jpg"
                                    alt="The AI Browser War Has Officially Started"
                                    className="w-full h-full object-cover
                                    hover:scale-105
                                    transition-transform duration-500"
                                />

                            </div>


                            <p className="text-gray-500 text-sm mt-7">
                                OCTOBER 18, 2026 • 6 MIN READ
                            </p>


                            <h2 className="text-3xl md:text-4xl font-black mt-3 leading-tight">
                                The AI Browser War Has Officially Started.
                            </h2>


                            <p className="text-gray-400 mt-5 leading-7">
                                AI browsers are no longer experiments.
                                They're becoming the next major battlefield
                                between technology companies.
                            </p>


                            <Link
                                to="/issue/24"
                                className="group inline-flex items-center gap-2
                           text-[#FF5C35] font-bold mt-7"
                            >
                                READ ISSUE

                                <ArrowRight
                                    size={18}
                                    className="group-hover:translate-x-1 transition"
                                />

                            </Link>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================= TRENDING BAR ================= */}

            <section className="bg-[#FF5C35] border-y border-black">

                <div className="max-w-7xl mx-auto px-6 py-4">

                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8">

                        <p className="font-black text-sm">
                            TRENDING
                        </p>

                        <p className="text-sm font-medium">
                            AI Agents
                        </p>

                        <span className="hidden md:block">•</span>

                        <p className="text-sm font-medium">
                            React
                        </p>

                        <span className="hidden md:block">•</span>

                        <p className="text-sm font-medium">
                            Developer Tools
                        </p>

                        <span className="hidden md:block">•</span>

                        <p className="text-sm font-medium">
                            Future of the Web
                        </p>

                    </div>

                </div>

            </section>


            {/* ================= LATEST STORIES ================= */}

            <section className="max-w-7xl mx-auto px-6 py-20">

                <div className="flex items-end justify-between gap-5">

                    <div>

                        <p className="text-[#FF5C35] text-sm font-bold tracking-widest">
                            01 / THE LATEST
                        </p>

                        <h2 className="text-4xl md:text-5xl font-black mt-3">
                            STORIES WORTH
                            <br />
                            YOUR TIME.
                        </h2>

                    </div>


                    <Link
                        to="/stories"
                        className="hidden md:flex items-center gap-2 font-bold
                       hover:text-[#FF5C35] transition"
                    >
                        VIEW ALL

                        <ArrowRight size={18} />
                    </Link>

                </div>


                <div className="grid md:grid-cols-3 gap-8 mt-12">

                    {stories.map((story) => (

                        <StoryCard
                            key={story.id}
                            number={story.number}
                            category={story.category}
                            title={story.title}
                            description={story.description}
                            slug={story.slug}
                        />

                    ))}

                </div>


                <Link
                    to="/stories"
                    className="md:hidden flex items-center gap-2 font-bold mt-10"
                >
                    VIEW ALL STORIES

                    <ArrowRight size={18} />
                </Link>

            </section>

            {/* ================= NEWSLETTER CTA ================= */}

            <section className="bg-[#F5F3EE] px-6 py-20">

                <div className="max-w-7xl mx-auto">

                    <div className="bg-[#FF5C35]">

                        <div className="grid lg:grid-cols-[1.3fr_0.7fr]">

                            {/* LEFT */}

                            <div className="p-8 md:p-12 lg:p-16">

                                <div className="flex items-center gap-3">

                                    <span className="w-2 h-2 bg-black rounded-full"></span>

                                    <p className="text-xs font-black tracking-[0.2em]">
                                        THE BYTEPOST NEWSLETTER
                                    </p>

                                </div>


                                <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.05em] leading-[0.88] mt-8">

                                    THE WEEK
                                    <br />

                                    <span className="text-white">
                                        IN TECH.
                                    </span>

                                </h2>


                                <p className="text-black/70 text-lg leading-8 max-w-xl mt-8">
                                    The most important stories in AI, development
                                    and technology — selected, simplified and sent
                                    directly to your inbox.
                                </p>

                            </div>


                            {/* RIGHT */}

                            <div className="border-t lg:border-t-0 lg:border-l border-black/30 p-8 md:p-12 lg:p-14 flex flex-col justify-between">

                                <div>

                                    <p className="text-xs font-black tracking-[0.2em]">
                                        EVERY SUNDAY
                                    </p>


                                    <p className="text-2xl md:text-3xl font-bold leading-snug mt-5">
                                        One email.
                                        <br />
                                        No noise.
                                        <br />
                                        Just what matters.
                                    </p>

                                </div>


                                <div className="mt-12">

                                    <Link
                                        to="/subscribe"
                                        className="group w-full bg-[#0D0D0D]
                         text-white px-6 py-5
                         flex items-center justify-between
                         font-black
                         hover:bg-white
                         hover:text-black
                         transition duration-300"
                                    >
                                        SUBSCRIBE FOR FREE

                                        <ArrowRight
                                            size={20}
                                            className="group-hover:translate-x-1 transition"
                                        />

                                    </Link>


                                    <p className="text-sm text-black/60 mt-4">
                                        Free to join. Unsubscribe anytime.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>
            <SubscribeForm />

        </div>
    );
};

export default Home;