import { useState } from "react";
import {
  ArrowRight,
  Check,
  Mail,
} from "lucide-react";

import api from "../api/api";

const SubscribeForm = () => {

  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);


    try {

      const response = await api.post(
        "/subscribers",
        {
          email: email,
        }
      );


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


  return (
    <div className="w-full">

      {/* LABEL */}

      <div className="flex items-center justify-between mb-3">

        <label
          htmlFor="subscribe-email"
          className="text-xs font-black tracking-[0.18em]"
        >
          YOUR EMAIL
        </label>


        <div className="flex items-center gap-2 text-xs font-bold text-black/50">

          <span className="w-2 h-2 bg-black rounded-full"></span>

          FREE

        </div>

      </div>


      {/* FORM */}

      <form onSubmit={handleSubmit}>

        <div
          className="bg-white
                     border-2 border-black
                     flex items-center
                     p-1.5
                     transition
                     focus-within:shadow-[5px_5px_0px_#0D0D0D]"
        >

          <div className="hidden sm:flex w-12 h-12 items-center justify-center">

            <Mail
              size={20}
              className="text-gray-500"
            />

          </div>


          <input
            id="subscribe-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="min-w-0 flex-1
                       bg-transparent
                       text-black
                       px-3 py-4
                       outline-none
                       placeholder:text-gray-400"
          />


          <button
            type="submit"
            disabled={loading}
            className="group
                       bg-[#0D0D0D]
                       text-white
                       px-5 md:px-7
                       py-4
                       font-black
                       text-sm
                       flex items-center
                       justify-center
                       gap-3
                       hover:bg-[#FF5C35]
                       hover:text-black
                       transition duration-300
                       disabled:opacity-60
                       disabled:cursor-not-allowed"
          >

            {loading ? (
              "JOINING..."
            ) : (
              <>
                <span className="hidden sm:inline">
                  JOIN BYTEPOST
                </span>

                <span className="sm:hidden">
                  JOIN
                </span>

                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition"
                />
              </>
            )}

          </button>

        </div>

      </form>


      {/* ERROR */}

      {error && (

        <div className="bg-red-100 border border-red-400 px-4 py-3 mt-4">

          <p className="text-red-800 text-sm font-bold">
            {error}
          </p>

        </div>

      )}


      {/* SUCCESS */}

      {message && (

        <div
          className="flex items-center gap-3
                     bg-black text-white
                     px-4 py-3 mt-4"
        >

          <div
            className="w-7 h-7
                       bg-[#FF5C35]
                       text-black
                       flex items-center
                       justify-center
                       rounded-full"
          >

            <Check
              size={15}
              strokeWidth={3}
            />

          </div>


          <p className="text-sm font-bold">
            {message}
          </p>

        </div>

      )}


      <div
        className="flex flex-wrap
                   gap-x-5 gap-y-2
                   mt-4
                   text-xs
                   text-black/55"
      >

        <span>✓ One email a week</span>

        <span>✓ No spam</span>

        <span>✓ Unsubscribe anytime</span>

      </div>

    </div>
  );
};

export default SubscribeForm;