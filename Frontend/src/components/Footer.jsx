import { Link } from "react-router-dom";
import { ArrowUpRight, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0D0D0D] text-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* MAIN FOOTER */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">

          {/* BRAND */}
          <div className="lg:col-span-2">

            <Link
              to="/"
              className="inline-flex items-center gap-3"
            >
              <div className="w-11 h-11 bg-[#FF5C35] text-black flex items-center justify-center font-black text-xl">
                B
              </div>

              <div>
                <h2 className="text-2xl font-black tracking-tight">
                  BYTEPOST
                </h2>

                <p className="text-[10px] text-gray-500 tracking-[0.25em]">
                  TECH BRIEFING
                </p>
              </div>
            </Link>

            <h3 className="text-3xl md:text-4xl font-black leading-tight mt-8">
              TECHNOLOGY WORTH
              <br />
              <span className="text-[#FF5C35]">
                KNOWING.
              </span>
            </h3>

            <p className="text-gray-500 leading-7 mt-5 max-w-md">
              Independent stories and weekly briefings about
              AI, software development and the technology
              shaping our world.
            </p>
          </div>


          {/* EXPLORE */}
          <div>

            <p className="text-[#FF5C35] text-xs font-black tracking-[0.2em] mb-7">
              EXPLORE
            </p>

            <div className="flex flex-col items-start gap-4">

              <Link
                to="/"
                className="text-gray-400 hover:text-white transition"
              >
                Home
              </Link>

              <Link
                to="/stories"
                className="text-gray-400 hover:text-white transition"
              >
                Stories
              </Link>

              <Link
                to="/archive"
                className="text-gray-400 hover:text-white transition"
              >
                Archive
              </Link>

              <Link
                to="/about"
                className="text-gray-400 hover:text-white transition"
              >
                About
              </Link>

            </div>
          </div>


          {/* NEWSLETTER */}
          <div>

            <p className="text-[#FF5C35] text-xs font-black tracking-[0.2em] mb-7">
              STAY UPDATED
            </p>

            <p className="text-gray-400 leading-7">
              One useful technology briefing delivered
              every Sunday.
            </p>

            <Link
              to="/subscribe"
              className="group inline-flex items-center gap-2
                         text-white font-black mt-6
                         hover:text-[#FF5C35]
                         transition"
            >
              SUBSCRIBE

              <ArrowUpRight
                size={17}
                className="group-hover:translate-x-1
                           group-hover:-translate-y-1
                           transition"
              />
            </Link>

            <a
              href="mailto:hello@bytepost.com"
              className="flex items-center gap-2
                         text-gray-500 text-sm mt-7
                         hover:text-white transition"
            >
              <Mail size={16} />

              hello@bytepost.com
            </a>

          </div>

        </div>


        {/* BOTTOM BAR */}
        <div
          className="border-t border-white/10
                     py-6
                     flex flex-col md:flex-row
                     items-center justify-between
                     gap-5"
        >

          <p className="text-gray-600 text-sm">
            © {currentYear} BYTEPOST. All rights reserved.
          </p>

          <p className="text-gray-600 text-xs tracking-[0.15em]">
            READ LESS. KNOW MORE.
          </p>

          <div className="flex items-center gap-7 text-sm">

            <Link
              to="/about"
              className="text-gray-600 hover:text-white transition"
            >
              About
            </Link>

            <Link
              to="/archive"
              className="text-gray-600 hover:text-white transition"
            >
              Archive
            </Link>

            <Link
              to="/subscribe"
              className="text-gray-600 hover:text-white transition"
            >
              Unsubscribe
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;