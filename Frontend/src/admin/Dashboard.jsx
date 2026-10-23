import { useEffect, useState } from "react";
import {
  Users,
  Newspaper,
  FileText,
} from "lucide-react";

import api from "../api/api";

const Dashboard = () => {
  const admin = JSON.parse(
    localStorage.getItem("admin")
  );

  const [stats, setStats] = useState({
    subscribers: 0,
    published: 0,
    drafts: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ==========================================
  // LOAD DASHBOARD DATA
  // ==========================================

  useEffect(() => {
    fetchDashboardData();
  }, []);


  // ==========================================
  // FETCH DATA
  // ==========================================

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      // Get subscribers and newsletters
      // at the same time
      const [
        subscribersResponse,
        newslettersResponse,
      ] = await Promise.all([
        api.get("/subscribers"),

        api.get(
          "/newsletters/admin/all"
        ),
      ]);


      const subscribers =
        subscribersResponse.data;

      const newsletters =
        newslettersResponse.data;


      // ======================================
      // COUNT ACTIVE SUBSCRIBERS
      // ======================================

      const activeSubscribers =
        subscribers.filter(
          (subscriber) =>
            subscriber.status === "active"
        ).length;


      // ======================================
      // COUNT PUBLISHED NEWSLETTERS
      // ======================================

      const published =
        newsletters.filter(
          (newsletter) =>
            newsletter.status === "published"
        ).length;


      // ======================================
      // COUNT DRAFT NEWSLETTERS
      // ======================================

      const drafts =
        newsletters.filter(
          (newsletter) =>
            newsletter.status === "draft"
        ).length;


      // Save numbers in state
      setStats({
        subscribers: activeSubscribers,
        published: published,
        drafts: drafts,
      });

    } catch (error) {
      console.log(
        "Dashboard error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Could not load dashboard data."
      );

    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div>

      {/* HEADER */}

      <p className="text-[#FF5C35] text-xs font-black tracking-[0.2em]">
        BYTEPOST / ADMIN
      </p>

      <h1 className="text-4xl md:text-5xl font-black mt-3">
        DASHBOARD.
      </h1>

      <p className="text-gray-500 mt-3">
        Welcome back, {admin?.name}.
      </p>


      {/* ERROR */}

      {error && (
        <div className="border-2 border-red-700 bg-red-50 text-red-800 font-bold p-4 mt-7">
          {error}
        </div>
      )}


      {/* DASHBOARD CARDS */}

      <div className="grid md:grid-cols-3 gap-5 mt-10">

        {/* ACTIVE SUBSCRIBERS */}

        <div className="bg-white border-2 border-black p-6">

          <div className="flex items-center justify-between">

            <p className="text-xs font-black tracking-widest text-gray-500">
              ACTIVE SUBSCRIBERS
            </p>

            <Users size={20} />

          </div>

          <h2 className="text-5xl font-black mt-5">
            {loading
              ? "..."
              : stats.subscribers}
          </h2>

        </div>


        {/* PUBLISHED */}

        <div className="bg-white border-2 border-black p-6">

          <div className="flex items-center justify-between">

            <p className="text-xs font-black tracking-widest text-gray-500">
              PUBLISHED
            </p>

            <Newspaper size={20} />

          </div>

          <h2 className="text-5xl font-black mt-5">
            {loading
              ? "..."
              : stats.published}
          </h2>

        </div>


        {/* DRAFTS */}

        <div className="bg-[#FF5C35] border-2 border-black p-6">

          <div className="flex items-center justify-between">

            <p className="text-xs font-black tracking-widest">
              DRAFTS
            </p>

            <FileText size={20} />

          </div>

          <h2 className="text-5xl font-black mt-5">
            {loading
              ? "..."
              : stats.drafts}
          </h2>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;