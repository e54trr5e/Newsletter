import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MailX, CheckCircle } from "lucide-react";

import api from "../api/api";

const Unsubscribe = () => {
  const { id } = useParams();

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const handleUnsubscribe = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.patch(
        `/subscribers/unsubscribe/${id}`
      );

      setMessage(response.data.message);
      setSuccess(true);

    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not unsubscribe."
      );

    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="min-h-[70vh] bg-[#F5F3EE] flex items-center justify-center px-6">

        <div className="max-w-xl w-full bg-white border-2 border-black p-10 text-center">

          <CheckCircle
            size={50}
            className="mx-auto text-[#FF5C35]"
          />

          <p className="text-[#FF5C35] text-xs font-black tracking-[0.2em] mt-6">
            BYTEPOST
          </p>

          <h1 className="text-4xl font-black mt-3">
            UNSUBSCRIBED.
          </h1>

          <p className="text-gray-600 mt-5">
            {message}
          </p>

          <Link
            to="/"
            className="inline-block mt-8 bg-black text-white px-6 py-3 font-black hover:bg-[#FF5C35] hover:text-black transition"
          >
            RETURN HOME
          </Link>

        </div>

      </section>
    );
  }

  return (
    <section className="min-h-[70vh] bg-[#F5F3EE] flex items-center justify-center px-6">

      <div className="max-w-xl w-full bg-white border-2 border-black p-10 text-center">

        <MailX
          size={50}
          className="mx-auto"
        />

        <p className="text-[#FF5C35] text-xs font-black tracking-[0.2em] mt-6">
          BYTEPOST
        </p>

        <h1 className="text-4xl md:text-5xl font-black mt-3">
          UNSUBSCRIBE?
        </h1>

        <p className="text-gray-600 mt-5">
          Are you sure you want to stop
          receiving BYTEPOST newsletters?
        </p>

        {error && (
          <div className="bg-red-100 border-2 border-red-600 text-red-700 p-3 mt-6 font-bold">
            {error}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">

          <button
            onClick={handleUnsubscribe}
            disabled={loading}
            className="bg-[#FF5C35] border-2 border-black px-6 py-3 font-black hover:bg-black hover:text-white transition disabled:opacity-50"
          >
            {loading
              ? "UNSUBSCRIBING..."
              : "YES, UNSUBSCRIBE"}
          </button>

          <Link
            to="/"
            className="border-2 border-black px-6 py-3 font-black hover:bg-black hover:text-white transition"
          >
            CANCEL
          </Link>

        </div>

      </div>

    </section>
  );
};

export default Unsubscribe;