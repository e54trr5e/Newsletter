import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

import IssueCard from "../components/IssueCard";
import api from "../api/api";

const Archive = () => {
  // ============================
  // STATE
  // ============================

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ============================
  // FETCH NEWSLETTERS
  // ============================

  useEffect(() => {
    fetchIssues();
  }, []);


  const fetchIssues = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/newsletters");

      setIssues(response.data);
    } catch (error) {
      console.log("Archive error:", error);

      setError(
        error.response?.data?.message ||
          "Could not load newsletter archive."
      );
    } finally {
      setLoading(false);
    }
  };


  // ============================
  // LOADING
  // ============================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F3EE] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#FF5C35] text-xs font-black tracking-[0.2em]">
            BYTEPOST
          </p>

          <p className="font-black text-xl mt-3">
            Loading archive...
          </p>
        </div>
      </div>
    );
  }


  // ============================
  // PAGE
  // ============================

  return (
    <div className="min-h-screen bg-[#F5F3EE]">

      {/* ================================= */}
      {/* HERO */}
      {/* ================================= */}

      <section className="border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">

          <p className="text-[#FF5C35] text-xs font-black tracking-[0.25em]">
            BYTEPOST / ARCHIVE
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.05em] leading-[0.9] mt-6">
            PAST
            <br />
            <span className="text-[#FF5C35]">
              ISSUES.
            </span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl leading-8 max-w-2xl mt-8">
            Browse previous BYTEPOST issues covering AI,
            software development, tools and the technology
            shaping our world.
          </p>

        </div>
      </section>


      {/* ================================= */}
      {/* ARCHIVE */}
      {/* ================================= */}

      <section className="max-w-7xl mx-auto px-6 py-14 md:py-20">

        {/* ARCHIVE HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-black pb-5">

          <div>
            <p className="text-xs font-black tracking-[0.2em] text-gray-500">
              NEWSLETTER ARCHIVE
            </p>

            <h2 className="text-3xl md:text-4xl font-black mt-2">
              ALL ISSUES
            </h2>
          </div>


          <p className="text-sm font-bold text-gray-500">
            {issues.length}{" "}
            {issues.length === 1 ? "ISSUE" : "ISSUES"}
          </p>

        </div>


        {/* ================================= */}
        {/* ERROR */}
        {/* ================================= */}

        {error && (
          <div className="border-2 border-red-700 bg-red-50 text-red-800 font-bold p-5 mt-8">
            {error}
          </div>
        )}


        {/* ================================= */}
        {/* EMPTY ARCHIVE */}
        {/* ================================= */}

        {!error && issues.length === 0 && (
          <div className="border-2 border-black bg-white p-10 md:p-16 mt-8 text-center">

            <div className="w-14 h-14 bg-[#FF5C35] flex items-center justify-center mx-auto">
              <FileText size={25} />
            </div>

            <h2 className="text-2xl md:text-3xl font-black mt-6">
              NO ISSUES YET.
            </h2>

            <p className="text-gray-500 max-w-md mx-auto mt-3 leading-7">
              The first BYTEPOST issue hasn't been published
              yet. Check back soon.
            </p>

          </div>
        )}


        {/* ================================= */}
        {/* ISSUES */}
        {/* ================================= */}

        {!error && issues.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-7 gap-y-12 mt-10">

            {issues.map((issue) => (
              <IssueCard
                key={issue._id}
                id={issue._id}
                number={issue.issueNumber}
                title={issue.title}
                description={issue.description}
                image={issue.coverImage}
                date={issue.publishedAt}
              />
            ))}

          </div>
        )}

      </section>


      {/* ================================= */}
      {/* BOTTOM TEXT */}
      {/* ================================= */}

      {issues.length > 0 && (
        <section className="bg-[#0D0D0D] text-white">

          <div className="max-w-7xl mx-auto px-6 py-14 md:py-16">

            <p className="text-[#FF5C35] text-xs font-black tracking-[0.2em]">
              BYTEPOST ARCHIVE
            </p>

            <div className="grid md:grid-cols-2 gap-8 items-end mt-5">

              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                EVERY ISSUE.
                <br />
                ONE PLACE.
              </h2>

              <p className="text-gray-400 leading-7 md:max-w-md md:ml-auto">
                Missed a week? Explore previous BYTEPOST
                briefings and catch up on the technology stories
                that mattered.
              </p>

            </div>

          </div>

        </section>
      )}

    </div>
  );
};

export default Archive;