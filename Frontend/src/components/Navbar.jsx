import { Link, NavLink } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkStyle = ({ isActive }) =>
    `relative text-sm font-medium tracking-wide transition duration-300
    ${
      isActive
        ? "text-[#FF5C35]"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-[#0D0D0D] text-white border-b border-white/10">

      <div className=" px-6">

        <div className="h-20 flex items-center justify-between">

          {/* ================= LOGO ================= */}

          <Link to="/" className="flex items-center gap-3">

            <div className="w-10 h-10 bg-[#FF5C35] text-black flex items-center justify-center font-black text-lg">
              B
            </div>

            <div>
              <h1 className="text-xl font-black tracking-tight leading-none">
                BYTEPOST
              </h1>

              <p className="text-[10px] text-gray-500 tracking-[0.2em] mt-1">
                TECH BRIEFING
              </p>
            </div>

          </Link>


          {/* ================= DESKTOP NAV ================= */}

          <div className="hidden md:flex items-center gap-10">

            <NavLink
              to="/"
              className={navLinkStyle}
            >
              Home
            </NavLink>

            <NavLink
              to="/stories"
              className={navLinkStyle}
            >
              Stories
            </NavLink>

            <NavLink
              to="/archive"
              className={navLinkStyle}
            >
              Archive
            </NavLink>

            <NavLink
              to="/about"
              className={navLinkStyle}
            >
              About
            </NavLink>

          </div>


          {/* ================= RIGHT SIDE ================= */}

          <div className="hidden md:flex items-center gap-5">

            <div className="text-right">
              <p className="text-[10px] text-gray-500 tracking-widest">
                NEXT ISSUE
              </p>

              <p className="text-xs text-gray-300">
                SUNDAY
              </p>
            </div>


            <Link
              to="/subscribe"
              className="group flex items-center gap-2
                         bg-[#FF5C35] text-black
                         px-5 py-3
                         text-sm font-bold
                         hover:bg-white
                         transition duration-300"
            >
              SUBSCRIBE

              <ArrowUpRight
                size={17}
                className="group-hover:translate-x-0.5
                           group-hover:-translate-y-0.5
                           transition"
              />

            </Link>

          </div>


          {/* ================= MOBILE BUTTON ================= */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10
                       border border-white/20
                       flex items-center justify-center"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>

      </div>


      {/* ================= ORANGE LINE ================= */}

      <div className="h-[2px] bg-[#FF5C35]"></div>


      {/* ================= MOBILE MENU ================= */}

      {menuOpen && (

        <div className="md:hidden bg-[#0D0D0D] border-t border-white/10">

          <div className="px-6 py-8 flex flex-col">

            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-bold py-4 border-b border-white/10"
            >
              Home
            </NavLink>

            <NavLink
              to="/stories"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-bold py-4 border-b border-white/10"
            >
              Stories
            </NavLink>

            <NavLink
              to="/archive"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-bold py-4 border-b border-white/10"
            >
              Archive
            </NavLink>

            <NavLink
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-bold py-4 border-b border-white/10"
            >
              About
            </NavLink>


            <Link
              to="/subscribe"
              onClick={() => setMenuOpen(false)}
              className="mt-7 bg-[#FF5C35] text-black
                         py-4 px-5 font-bold
                         flex items-center justify-between"
            >
              SUBSCRIBE TO BYTEPOST

              <ArrowUpRight size={20} />

            </Link>


            <p className="text-gray-500 text-xs mt-5">
              One useful technology briefing every Sunday.
            </p>

          </div>

        </div>

      )}

    </nav>
  );
};

export default Navbar;