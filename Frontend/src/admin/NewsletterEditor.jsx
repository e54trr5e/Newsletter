import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  Save,
  Send,
  ArrowLeft,
} from "lucide-react";

import api from "../api/api";

const NewsletterEditor = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  // If ID exists → edit
  // If ID doesn't exist → create

  const isEditing = Boolean(id);


  const [formData, setFormData] = useState({
    issueNumber: "",
    title: "",
    description: "",
    coverImage: "",
    content: "",
  });


  const [loading, setLoading] =
    useState(false);

  const [fetching, setFetching] =
    useState(false);

  const [error, setError] =
    useState("");


  // ========================================
  // LOAD NEWSLETTER WHEN EDITING
  // ========================================

  useEffect(() => {
    if (isEditing) {
      fetchNewsletter();
    }
  }, [id]);


  const fetchNewsletter = async () => {
    try {
      setFetching(true);

      const response = await api.get(
        `/newsletters/admin/${id}`
      );

      const newsletter = response.data;

      setFormData({
        issueNumber:
          newsletter.issueNumber || "",

        title:
          newsletter.title || "",

        description:
          newsletter.description || "",

        coverImage:
          newsletter.coverImage || "",

        content:
          newsletter.content || "",
      });

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Could not load newsletter"
      );

    } finally {

      setFetching(false);

    }
  };


  // ========================================
  // INPUT CHANGE
  // ========================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData({
      ...formData,

      [name]: value,
    });
  };


  // ========================================
  // SAVE
  // ========================================

  const saveNewsletter = async (
    status
  ) => {
    setError("");
    setLoading(true);

    try {

      const data = {
        ...formData,

        issueNumber: Number(
          formData.issueNumber
        ),

        status,
      };


      if (isEditing) {

        await api.put(
          `/newsletters/${id}`,
          data
        );

      } else {

        await api.post(
          "/newsletters",
          data
        );

      }


      navigate(
        "/admin/newsletters"
      );

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Could not save newsletter"
      );

    } finally {

      setLoading(false);

    }
  };


  if (fetching) {
    return (
      <p className="font-bold">
        Loading newsletter...
      </p>
    );
  }


  return (
    <div className="max-w-5xl">

      {/* BACK */}

      <button
        onClick={() =>
          navigate("/admin/newsletters")
        }
        className="flex items-center gap-2 text-sm font-black hover:text-[#FF5C35]"
      >
        <ArrowLeft size={17} />

        BACK TO NEWSLETTERS
      </button>


      {/* HEADER */}

      <div className="mt-7">

        <p className="text-[#FF5C35] text-xs font-black tracking-[0.2em]">
          BYTEPOST / EDITOR
        </p>

        <h1 className="text-4xl md:text-5xl font-black mt-3">

          {isEditing
            ? "EDIT ISSUE."
            : "NEW ISSUE."}

        </h1>

      </div>


      {/* ERROR */}

      {error && (

        <div className="bg-red-100 border-2 border-red-700 text-red-800 font-bold p-4 mt-7">
          {error}
        </div>

      )}


      {/* FORM */}

      <div className="bg-white border-2 border-black p-6 md:p-8 mt-8">

        {/* ISSUE NUMBER */}

        <label className="text-xs font-black tracking-widest">
          ISSUE NUMBER
        </label>

        <input
          type="number"
          name="issueNumber"
          value={formData.issueNumber}
          onChange={handleChange}
          placeholder="26"
          className="w-full border-2 border-black px-4 py-3 mt-2 outline-none focus:shadow-[4px_4px_0px_#FF5C35]"
        />


        {/* TITLE */}

        <label className="block text-xs font-black tracking-widest mt-6">
          TITLE
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="The Future of AI Agents"
          className="w-full border-2 border-black px-4 py-3 mt-2 outline-none focus:shadow-[4px_4px_0px_#FF5C35]"
        />


        {/* DESCRIPTION */}

        <label className="block text-xs font-black tracking-widest mt-6">
          DESCRIPTION
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="A short description of this issue..."
          className="w-full border-2 border-black px-4 py-3 mt-2 outline-none resize-none focus:shadow-[4px_4px_0px_#FF5C35]"
        />


        {/* COVER IMAGE */}

        <label className="block text-xs font-black tracking-widest mt-6">
          COVER IMAGE
        </label>

        <input
          type="text"
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
          placeholder="/images/ai-agents.jpg"
          className="w-full border-2 border-black px-4 py-3 mt-2 outline-none focus:shadow-[4px_4px_0px_#FF5C35]"
        />


        {/* CONTENT */}

        <label className="block text-xs font-black tracking-widest mt-6">
          CONTENT
        </label>

        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows="15"
          placeholder="Write your newsletter..."
          className="w-full border-2 border-black px-4 py-3 mt-2 outline-none resize-y focus:shadow-[4px_4px_0px_#FF5C35]"
        />


        {/* BUTTONS */}

        <div className="flex flex-col sm:flex-row gap-3 mt-8">

          <button
            type="button"
            disabled={loading}
            onClick={() =>
              saveNewsletter("draft")
            }
            className="flex-1 border-2 border-black px-5 py-4 font-black flex items-center justify-center gap-2 hover:bg-gray-100 disabled:opacity-50"
          >
            <Save size={18} />

            {loading
              ? "SAVING..."
              : "SAVE DRAFT"}
          </button>


          <button
            type="button"
            disabled={loading}
            onClick={() =>
              saveNewsletter(
                "published"
              )
            }
            className="flex-1 bg-[#FF5C35] border-2 border-black px-5 py-4 font-black flex items-center justify-center gap-2 hover:bg-black hover:text-white disabled:opacity-50"
          >
            <Send size={18} />

            {loading
              ? "PUBLISHING..."
              : "PUBLISH"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default NewsletterEditor;