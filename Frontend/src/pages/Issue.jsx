import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import api from "../api/api";

const Issue = () => {
  const { id } = useParams();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ==========================================
  // FETCH ISSUE FROM BACKEND
  // ==========================================

  useEffect(() => {
    fetchIssue();
  }, [id]);


  const fetchIssue = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        `/newsletters/${id}`
      );

      setIssue(response.data);

    } catch (error) {
      console.log(
        "Issue loading error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Newsletter not found."
      );

    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center">

        <div className="text-center">

          <p className="text-[#FF5C35] text-xs font-black tracking-[0.2em]">
            BYTEPOST
          </p>

          <p className="text-xl font-black mt-3">
            Loading issue...
          </p>

        </div>

      </div>
    );
  }


  // ==========================================
  // ERROR / NOT FOUND
  // ==========================================

  if (error || !issue) {
    return (
      <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center px-6">

        <div className="text-center">

          <p className="text-[#FF5C35] text-xs font-black tracking-[0.2em]">
            BYTEPOST / ERROR
          </p>

          <h1 className="text-4xl md:text-5xl font-black mt-4">
            Issue not found.
          </h1>

          <p className="text-gray-500 mt-4">
            {error}
          </p>

          <Link
            to="/archive"
            className="inline-flex items-center gap-2 mt-7 text-[#FF5C35] font-black"
          >
            <ArrowLeft size={17} />

            VIEW ARCHIVE
          </Link>

        </div>

      </div>
    );
  }


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formattedDate = issue.publishedAt
    ? new Date(
        issue.publishedAt
      ).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";


  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="min-h-screen bg-[#F5F3EE]">

      <article className="max-w-4xl mx-auto px-6 py-16 md:py-20">


        {/* BACK TO ARCHIVE */}

        <Link
          to="/archive"
          className="inline-flex items-center gap-2 font-black text-sm hover:text-[#FF5C35] transition"
        >
          <ArrowLeft size={17} />

          ARCHIVE
        </Link>


        {/* ISSUE NUMBER */}

        <p className="text-[#FF5C35] font-black text-sm tracking-[0.18em] mt-12">
          BYTEPOST / ISSUE #
          {String(
            issue.issueNumber
          ).padStart(3, "0")}
        </p>


        {/* TITLE */}

        <h1 className="text-5xl md:text-7xl font-black mt-4 leading-[0.95] tracking-[-0.04em]">
          {issue.title}
        </h1>


        {/* DESCRIPTION */}

        <p className="text-xl text-gray-600 mt-7 leading-8">
          {issue.description}
        </p>


        {/* DATE */}

        {formattedDate && (
          <p className="text-gray-500 font-bold text-sm tracking-wider uppercase mt-6">
            {formattedDate}
          </p>
        )}


        {/* COVER IMAGE */}

        {issue.coverImage && (
          <div className="mt-10 overflow-hidden bg-[#E7E3DC]">

            <img
              src={issue.coverImage}
              alt={issue.title}
              className="w-full h-[300px] md:h-[450px] object-cover"
            />

          </div>
        )}


        {/* ========================================== */}
        {/* NEWSLETTER CONTENT */}
        {/* ========================================== */}

        <div className="border-t-2 border-black mt-14 pt-10">

          <p className="text-[#FF5C35] text-xs font-black tracking-[0.2em]">
            THIS WEEK'S BRIEFING
          </p>


          <div className="text-gray-700 text-lg leading-9 whitespace-pre-line mt-7">
            {issue.content}
          </div>

        </div>


        {/* ========================================== */}
        {/* END OF ISSUE */}
        {/* ========================================== */}

        <div className="bg-[#FF5C35] border-2 border-black p-8 md:p-12 mt-16">

          <p className="font-black text-xs tracking-[0.2em]">
            THAT'S IT FOR THIS WEEK.
          </p>

          <h2 className="text-3xl md:text-4xl font-black mt-4">
            See you next Sunday.
          </h2>

          <p className="font-bold mt-5">
            — BYTEPOST
          </p>

        </div>

      </article>

    </div>
  );
};

export default Issue;