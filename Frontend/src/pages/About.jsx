import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const About = () => {

  return (
    <div className="bg-[#F5F3EE] min-h-screen">

      <section className="max-w-5xl mx-auto px-6 py-20">

        <p className="text-[#FF5C35] font-bold tracking-widest">
          ABOUT BYTEPOST
        </p>


        <h1 className="text-5xl md:text-7xl font-black leading-[1] mt-5">
          TECHNOLOGY IS
          <br />
          COMPLICATED.
          <br />

          <span className="text-[#FF5C35]">
            READING ABOUT IT
            SHOULDN'T BE.
          </span>
        </h1>


        <div className="grid md:grid-cols-2 gap-12 mt-16 border-t border-black pt-12">

          <h2 className="text-3xl font-black">
            Why BYTEPOST?
          </h2>


          <div className="space-y-6 text-lg text-gray-600 leading-8">

            <p>
              Technology moves quickly. Every day brings
              new products, AI models, developer tools
              and announcements.
            </p>

            <p>
              BYTEPOST exists to filter that noise and
              focus on the stories that are actually
              worth understanding.
            </p>

            <p>
              Every Sunday, readers receive one carefully
              curated technology briefing covering AI,
              software development and the internet.
            </p>

          </div>

        </div>


        <div className="bg-[#0D0D0D] text-white p-10 md:p-14 mt-20">

          <p className="text-[#FF5C35] font-bold">
            JOIN BYTEPOST
          </p>

          <h2 className="text-4xl font-black mt-3">
            One email. Every Sunday.
          </h2>

          <p className="text-gray-400 mt-4">
            Free technology stories worth your time.
          </p>


          <Link
            to="/subscribe"
            className="inline-flex items-center gap-2
                       bg-[#FF5C35] text-black
                       px-6 py-4 font-bold mt-7"
          >
            SUBSCRIBE

            <ArrowRight size={18} />

          </Link>

        </div>

      </section>

    </div>
  );
};

export default About;