import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";

import api from "../api/api";

const Auth = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      // Save JWT
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save admin information
      localStorage.setItem(
        "admin",
        JSON.stringify(response.data.admin)
      );

      // Go to admin dashboard
      navigate("/admin");

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        <p className="text-[#FF5C35] text-xs font-black tracking-[0.25em]">
          BYTEPOST / ADMIN
        </p>

        <h1 className="text-5xl md:text-6xl font-black mt-4">
          WELCOME
          <br />
          BACK.
        </h1>

        <p className="text-gray-500 mt-5">
          Sign in to manage BYTEPOST.
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-10"
        >

          {/* EMAIL */}

          <label className="text-xs font-black tracking-widest">
            EMAIL
          </label>

          <div className="relative mt-2">

            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="w-full border-2 border-black bg-white pl-12 pr-4 py-4 outline-none focus:shadow-[4px_4px_0px_#FF5C35]"
            />

          </div>

          {/* PASSWORD */}

          <label className="block text-xs font-black tracking-widest mt-6">
            PASSWORD
          </label>

          <div className="relative mt-2">

            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              className="w-full border-2 border-black bg-white pl-12 pr-4 py-4 outline-none focus:shadow-[4px_4px_0px_#FF5C35]"
            />

          </div>

          {/* ERROR */}

          {error && (
            <div className="bg-red-100 border-2 border-red-700 text-red-800 font-bold text-sm p-4 mt-5">
              {error}
            </div>
          )}

          {/* LOGIN BUTTON */}

          <button
            type="submit"
            disabled={loading}
            className="group w-full bg-[#0D0D0D] text-white px-6 py-4 mt-7 font-black flex items-center justify-between hover:bg-[#FF5C35] hover:text-black transition disabled:opacity-60"
          >

            {loading
              ? "SIGNING IN..."
              : "SIGN IN"}

            {!loading && (
              <ArrowRight
                size={19}
                className="group-hover:translate-x-1 transition"
              />
            )}

          </button>

        </form>

      </div>

    </div>
  );
};

export default Auth;