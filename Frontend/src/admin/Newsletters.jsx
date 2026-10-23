import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Plus,
  Pencil,
  Trash2,
  FileText,
  Send,
} from "lucide-react";

import api from "../api/api";


const Newsletters = () => {

  // ==========================================
  // STATES
  // ==========================================

  const [newsletters, setNewsletters] =
    useState([]);

  const [filter, setFilter] =
    useState("all");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [sendingId, setSendingId] =
    useState(null);


  // ==========================================
  // LOAD NEWSLETTERS
  // ==========================================

  useEffect(() => {
    fetchNewsletters();
  }, []);


  const fetchNewsletters = async () => {
    try {

      setLoading(true);
      setError("");

      const response = await api.get(
        "/newsletters/admin/all"
      );

      setNewsletters(
        response.data
      );

    } catch (error) {

      console.log(
        "Fetch newsletters error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Could not load newsletters"
      );

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // DELETE NEWSLETTER
  // ==========================================

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this newsletter?"
      );

    if (!confirmed) {
      return;
    }

    try {

      await api.delete(
        `/newsletters/${id}`
      );

      setNewsletters(
        newsletters.filter(
          (newsletter) =>
            newsletter._id !== id
        )
      );

    } catch (error) {

      console.log(
        "Delete newsletter error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Could not delete newsletter"
      );

    }
  };


  // ==========================================
  // SEND NEWSLETTER
  // ==========================================

  const handleSend = async (
    newsletter
  ) => {

    // Newsletter must be published
    if (
      newsletter.status !==
      "published"
    ) {

      alert(
        "Publish the newsletter before sending it."
      );

      return;
    }


    // Prevent sending twice
    if (newsletter.emailSent) {

      alert(
        "This newsletter has already been sent."
      );

      return;
    }


    // Confirmation before sending
    const confirmed =
      window.confirm(
        `Are you sure you want to send "${newsletter.title}" to all active subscribers?`
      );


    if (!confirmed) {
      return;
    }


    try {

      // Store ID of newsletter being sent
      setSendingId(
        newsletter._id
      );


      const response =
        await api.post(
          `/newsletters/${newsletter._id}/send`
        );


      // Success message
      alert(
        response.data.message
      );


      // Reload newsletters
      await fetchNewsletters();

    } catch (error) {

      console.log(
        "Send newsletter error:",
        error
      );


      alert(
        error.response?.data?.message ||
          "Could not send newsletter"
      );

    } finally {

      setSendingId(null);

    }
  };


  // ==========================================
  // FILTER NEWSLETTERS
  // ==========================================

  const filteredNewsletters =
    newsletters.filter(
      (newsletter) => {

        if (filter === "all") {
          return true;
        }

        return (
          newsletter.status === filter
        );
      }
    );


  // ==========================================
  // COUNTS
  // ==========================================

  const publishedCount =
    newsletters.filter(
      (newsletter) =>
        newsletter.status ===
        "published"
    ).length;


  const draftCount =
    newsletters.filter(
      (newsletter) =>
        newsletter.status ===
        "draft"
    ).length;


  // ==========================================
  // UI
  // ==========================================

  return (
    <div>

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

        <div>

          <p className="text-[#FF5C35] text-xs font-black tracking-[0.2em]">
            BYTEPOST / CONTENT
          </p>

          <h1 className="text-4xl md:text-5xl font-black mt-3">
            NEWSLETTERS.
          </h1>

        </div>


        <Link
          to="/admin/newsletters/new"
          className="bg-[#FF5C35] border-2 border-black px-5 py-3 font-black flex items-center gap-2 hover:bg-black hover:text-white transition"
        >

          <Plus size={18} />

          CREATE NEWSLETTER

        </Link>

      </div>


      {/* ======================================
          STATS
      ====================================== */}

      <div className="grid md:grid-cols-3 gap-4 mt-10">

        {/* TOTAL */}

        <div className="bg-white border-2 border-black p-5">

          <p className="text-xs font-black tracking-widest text-gray-500">
            TOTAL
          </p>

          <p className="text-4xl font-black mt-2">
            {newsletters.length}
          </p>

        </div>


        {/* PUBLISHED */}

        <div className="bg-[#FF5C35] border-2 border-black p-5">

          <p className="text-xs font-black tracking-widest">
            PUBLISHED
          </p>

          <p className="text-4xl font-black mt-2">
            {publishedCount}
          </p>

        </div>


        {/* DRAFTS */}

        <div className="bg-white border-2 border-black p-5">

          <p className="text-xs font-black tracking-widest text-gray-500">
            DRAFTS
          </p>

          <p className="text-4xl font-black mt-2">
            {draftCount}
          </p>

        </div>

      </div>


      {/* ======================================
          FILTER BUTTONS
      ====================================== */}

      <div className="flex border-2 border-black w-fit mt-8">

        {/* ALL */}

        <button
          onClick={() =>
            setFilter("all")
          }
          className={`px-5 py-3 text-xs font-black ${
            filter === "all"
              ? "bg-black text-white"
              : "bg-white"
          }`}
        >
          ALL
        </button>


        {/* PUBLISHED */}

        <button
          onClick={() =>
            setFilter("published")
          }
          className={`px-5 py-3 text-xs font-black ${
            filter === "published"
              ? "bg-black text-white"
              : "bg-white"
          }`}
        >
          PUBLISHED
        </button>


        {/* DRAFTS */}

        <button
          onClick={() =>
            setFilter("draft")
          }
          className={`px-5 py-3 text-xs font-black ${
            filter === "draft"
              ? "bg-black text-white"
              : "bg-white"
          }`}
        >
          DRAFTS
        </button>

      </div>


      {/* ======================================
          ERROR
      ====================================== */}

      {error && (

        <div className="bg-red-100 border-2 border-red-700 text-red-800 font-bold p-4 mt-6">

          {error}

        </div>

      )}


      {/* ======================================
          NEWSLETTER LIST
      ====================================== */}

      <div className="mt-6 border-2 border-black bg-white">

        {loading ? (

          <p className="p-6 font-bold">
            Loading newsletters...
          </p>

        ) : filteredNewsletters.length === 0 ? (

          // ====================================
          // EMPTY
          // ====================================

          <div className="p-10 text-center">

            <FileText
              size={35}
              className="mx-auto text-gray-400"
            />

            <p className="font-black mt-4">
              No newsletters found.
            </p>

          </div>

        ) : (

          // ====================================
          // TABLE
          // ====================================

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              {/* TABLE HEADER */}

              <thead className="border-b-2 border-black">

                <tr>

                  <th className="p-4 text-xs font-black tracking-widest">
                    ISSUE
                  </th>

                  <th className="p-4 text-xs font-black tracking-widest">
                    TITLE
                  </th>

                  <th className="p-4 text-xs font-black tracking-widest">
                    STATUS
                  </th>

                  <th className="p-4 text-xs font-black tracking-widest">
                    DATE
                  </th>

                  <th className="p-4 text-xs font-black tracking-widest text-right">
                    ACTIONS
                  </th>

                </tr>

              </thead>


              {/* TABLE BODY */}

              <tbody>

                {filteredNewsletters.map(
                  (newsletter) => (

                    <tr
                      key={
                        newsletter._id
                      }
                      className="border-b border-gray-200"
                    >

                      {/* =========================
                          ISSUE
                      ========================= */}

                      <td className="p-4 font-black">

                        #

                        {String(
                          newsletter.issueNumber
                        ).padStart(
                          3,
                          "0"
                        )}

                      </td>


                      {/* =========================
                          TITLE
                      ========================= */}

                      <td className="p-4">

                        <p className="font-bold">
                          {
                            newsletter.title
                          }
                        </p>

                        <p className="text-gray-400 text-sm mt-1 max-w-md truncate">
                          {
                            newsletter.description
                          }
                        </p>

                      </td>


                      {/* =========================
                          STATUS
                      ========================= */}

                      <td className="p-4">

                        <div className="flex items-center gap-2 flex-wrap">

                          {/* PUBLISHED / DRAFT */}

                          <span
                            className={`text-xs font-black px-3 py-1 ${
                              newsletter.status ===
                              "published"
                                ? "bg-[#FF5C35]"
                                : "bg-gray-200 text-gray-600"
                            }`}
                          >

                            {newsletter.status.toUpperCase()}

                          </span>


                          {/* SENT BADGE */}

                          {newsletter.emailSent && (

                            <span className="bg-black text-white text-xs font-black px-3 py-1">

                              SENT

                            </span>

                          )}

                        </div>

                      </td>


                      {/* =========================
                          DATE
                      ========================= */}

                      <td className="p-4 text-gray-500 text-sm">

                        {new Date(
                          newsletter.createdAt
                        ).toLocaleDateString()}

                      </td>


                      {/* =========================
                          ACTIONS
                      ========================= */}

                      <td className="p-4">

                        <div className="flex justify-end items-center gap-2">


                          {/* EDIT */}

                          <Link
                            to={`/admin/newsletters/${newsletter._id}/edit`}
                            title="Edit newsletter"
                            className="border-2 border-black p-2 hover:bg-black hover:text-white transition"
                          >

                            <Pencil
                              size={16}
                            />

                          </Link>


                          {/* SEND */}

                          {newsletter.status ===
                            "published" && (

                            <button
                              onClick={() =>
                                handleSend(
                                  newsletter
                                )
                              }
                              disabled={
                                newsletter.emailSent ||
                                sendingId ===
                                  newsletter._id
                              }
                              title={
                                newsletter.emailSent
                                  ? "Newsletter already sent"
                                  : "Send newsletter"
                              }
                              className="border-2 border-black p-2 hover:bg-[#FF5C35] transition disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                            >

                              {sendingId ===
                              newsletter._id ? (

                                <span className="text-xs font-black px-1">
                                  SENDING...
                                </span>

                              ) : (

                                <Send
                                  size={16}
                                />

                              )}

                            </button>

                          )}


                          {/* DELETE */}

                          <button
                            onClick={() =>
                              handleDelete(
                                newsletter._id
                              )
                            }
                            title="Delete newsletter"
                            className="border-2 border-black p-2 hover:bg-red-600 hover:text-white hover:border-red-600 transition"
                          >

                            <Trash2
                              size={16}
                            />

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default Newsletters;