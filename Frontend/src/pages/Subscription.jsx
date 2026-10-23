import { useState } from "react";
import {
  Mail,
  Check,
  ArrowRight,
  X,
} from "lucide-react";

import api from "../api/api";

const Subscription = () => {
  const [mode, setMode] = useState("subscribe");

  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  // ================= HANDLE SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      let response;

      // SUBSCRIBE
      if (mode === "subscribe") {
        response = await api.post("/subscribers", {
          email: email,
        });
      }

      // UNSUBSCRIBE
      else {
        response = await api.post(
          "/subscribers/unsubscribe",
          {
            email: email,
          }
        );
      }

      setMessage(response.data.message);

      setEmail("");

    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };


  // ================= CHANGE MODE =================

  const changeMode = (newMode) => {
    setMode(newMode);

    setEmail("");

    setMessage("");

    setError("");
  };


  return (
    <div className="min-h-screen bg-[#F5F3EE]">

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">

        {/* ================= HEADER ================= */}

        <div className="max-w-4xl">

          <p className="text-[#FF5C35] text-xs font-black tracking-[0.25em]">
            BYTEPOST / NEWSLETTER
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.05em] leading-[0.9] mt-6">
            TECHNOLOGY
            <br />
            WORTH{" "}
            <span className="text-[#FF5C35]">
              KNOWING.
            </span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl leading-8 max-w-2xl mt-8">
            One carefully curated email covering AI,
            software development, useful tools and the
            technology stories that actually matter.
          </p>

        </div>


        {/* ================= MAIN CARD ================= */}

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] mt-16 border-2 border-black">

          {/* LEFT SIDE */}

          <div className="bg-[#0D0D0D] text-white p-8 md:p-12">

            <p className="text-[#FF5C35] text-xs font-black tracking-[0.2em]">
              WHY BYTEPOST?
            </p>

            <h2 className="text-3xl md:text-4xl font-black leading-tight mt-5">
              ONE EMAIL.
              <br />
              EVERY SUNDAY.
            </h2>

            <p className="text-gray-400 leading-7 mt-6 max-w-md">
              Skip the endless feeds. BYTEPOST gives you
              a concise briefing of important developments
              in technology every week.
            </p>


            {/* BENEFITS */}

            <div className="mt-10 space-y-5">

              <div className="flex items-center gap-4">

                <div className="w-7 h-7 bg-[#FF5C35] text-black flex items-center justify-center">
                  <Check
                    size={15}
                    strokeWidth={3}
                  />
                </div>

                <p className="text-gray-300">
                  One useful email every week
                </p>

              </div>


              <div className="flex items-center gap-4">

                <div className="w-7 h-7 bg-[#FF5C35] text-black flex items-center justify-center">
                  <Check
                    size={15}
                    strokeWidth={3}
                  />
                </div>

                <p className="text-gray-300">
                  AI, development and technology
                </p>

              </div>


              <div className="flex items-center gap-4">

                <div className="w-7 h-7 bg-[#FF5C35] text-black flex items-center justify-center">
                  <Check
                    size={15}
                    strokeWidth={3}
                  />
                </div>

                <p className="text-gray-300">
                  No spam or unnecessary emails
                </p>

              </div>


              <div className="flex items-center gap-4">

                <div className="w-7 h-7 bg-[#FF5C35] text-black flex items-center justify-center">
                  <Check
                    size={15}
                    strokeWidth={3}
                  />
                </div>

                <p className="text-gray-300">
                  Unsubscribe whenever you want
                </p>

              </div>

            </div>


            {/* SMALL INFO */}

            <div className="border-t border-white/10 mt-12 pt-7">

              <p className="text-gray-500 text-sm">
                READ LESS.
              </p>

              <p className="text-white font-black text-xl mt-1">
                KNOW MORE.
              </p>

            </div>

          </div>


          {/* ================= RIGHT SIDE ================= */}

          <div className="bg-white p-8 md:p-12">

            {/* MODE TOGGLE */}

            <div className="grid grid-cols-2 border-2 border-black">

              <button
                type="button"
                onClick={() =>
                  changeMode("subscribe")
                }
                className={`py-4 text-sm font-black transition ${
                  mode === "subscribe"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                SUBSCRIBE
              </button>


              <button
                type="button"
                onClick={() =>
                  changeMode("unsubscribe")
                }
                className={`py-4 text-sm font-black transition ${
                  mode === "unsubscribe"
                    ? "bg-black text-white"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                UNSUBSCRIBE
              </button>

            </div>


            {/* FORM HEADER */}

            <div className="mt-10">

              <div className="w-12 h-12 bg-[#FF5C35] flex items-center justify-center">

                {mode === "subscribe" ? (
                  <Mail size={22} />
                ) : (
                  <X size={22} />
                )}

              </div>


              <h2 className="text-3xl font-black mt-6">

                {mode === "subscribe"
                  ? "Join BYTEPOST."
                  : "Leaving BYTEPOST?"}

              </h2>


              <p className="text-gray-500 leading-7 mt-3">

                {mode === "subscribe"
                  ? "Enter your email and we'll add you to the weekly BYTEPOST briefing."
                  : "Enter your subscribed email address and we'll stop sending future newsletters."}

              </p>

            </div>


            {/* ================= FORM ================= */}

            <form
              onSubmit={handleSubmit}
              className="mt-9"
            >

              <label
                htmlFor="subscription-email"
                className="text-xs font-black tracking-[0.18em]"
              >
                EMAIL ADDRESS
              </label>


              <div className="relative mt-3">

                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />


                <input
                  id="subscription-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  disabled={loading}
                  className="w-full
                             border-2 border-black
                             bg-white
                             pl-12 pr-4 py-4
                             outline-none
                             transition
                             placeholder:text-gray-400
                             focus:shadow-[4px_4px_0px_#FF5C35]
                             disabled:bg-gray-100"
                />

              </div>


              {/* SUBMIT BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className={`group
                           w-full
                           mt-5
                           px-6 py-4
                           font-black
                           flex items-center
                           justify-between
                           transition
                           disabled:opacity-60
                           disabled:cursor-not-allowed
                           ${
                             mode === "subscribe"
                               ? "bg-[#FF5C35] text-black hover:bg-black hover:text-white"
                               : "bg-black text-white hover:bg-[#FF5C35] hover:text-black"
                           }`}
              >

                <span>

                  {loading
                    ? mode === "subscribe"
                      ? "SUBSCRIBING..."
                      : "UNSUBSCRIBING..."
                    : mode === "subscribe"
                    ? "JOIN BYTEPOST"
                    : "UNSUBSCRIBE"}

                </span>


                {!loading && (
                  <ArrowRight
                    size={19}
                    className="group-hover:translate-x-1 transition"
                  />
                )}

              </button>

            </form>


            {/* ================= SUCCESS ================= */}

            {message && (

              <div className="bg-[#0D0D0D] text-white p-4 mt-6 flex items-start gap-3">

                <div className="w-7 h-7 shrink-0 bg-[#FF5C35] text-black flex items-center justify-center">

                  <Check
                    size={15}
                    strokeWidth={3}
                  />

                </div>


                <div>

                  <p className="text-xs text-gray-500 font-bold tracking-widest">
                    SUCCESS
                  </p>

                  <p className="font-bold mt-1">
                    {message}
                  </p>

                </div>

              </div>

            )}


            {/* ================= ERROR ================= */}

            {error && (

              <div className="border-2 border-red-700 bg-red-50 p-4 mt-6 flex items-start gap-3">

                <div className="w-7 h-7 shrink-0 bg-red-700 text-white flex items-center justify-center">

                  <X size={15} />

                </div>


                <div>

                  <p className="text-xs text-red-700 font-black tracking-widest">
                    ERROR
                  </p>

                  <p className="text-red-800 font-bold mt-1">
                    {error}
                  </p>

                </div>

              </div>

            )}


            {/* PRIVACY */}

            <p className="text-xs text-gray-400 leading-5 mt-6">
              By subscribing, you agree to receive the
              BYTEPOST newsletter at the email address
              provided. You can unsubscribe at any time.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Subscription;