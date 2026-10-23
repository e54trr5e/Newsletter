import { useEffect, useState } from "react";
import { Search, Users } from "lucide-react";

import api from "../api/api";

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);

  const [filter, setFilter] = useState("all");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/subscribers"
      );

      setSubscribers(response.data);

    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Could not load subscribers"
      );

    } finally {
      setLoading(false);
    }
  };

  const filteredSubscribers =
    subscribers.filter((subscriber) => {

      const matchesStatus =
        filter === "all" ||
        subscriber.status === filter;

      const matchesSearch =
        subscriber.email
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesStatus && matchesSearch;
    });

  const activeCount = subscribers.filter(
    (subscriber) =>
      subscriber.status === "active"
  ).length;

  const unsubscribedCount = subscribers.filter(
    (subscriber) =>
      subscriber.status === "unsubscribed"
  ).length;

  return (
    <div>

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">

        <div>

          <p className="text-[#FF5C35] text-xs font-black tracking-[0.2em]">
            BYTEPOST / AUDIENCE
          </p>

          <h1 className="text-4xl md:text-5xl font-black mt-3">
            SUBSCRIBERS.
          </h1>

        </div>

        <div className="flex items-center gap-2 text-gray-500">

          <Users size={18} />

          <span className="font-bold">
            {subscribers.length} total
          </span>

        </div>

      </div>


      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-4 mt-10">

        <div className="bg-white border-2 border-black p-5">

          <p className="text-xs font-black tracking-widest text-gray-500">
            TOTAL
          </p>

          <p className="text-4xl font-black mt-2">
            {subscribers.length}
          </p>

        </div>


        <div className="bg-[#FF5C35] border-2 border-black p-5">

          <p className="text-xs font-black tracking-widest">
            ACTIVE
          </p>

          <p className="text-4xl font-black mt-2">
            {activeCount}
          </p>

        </div>


        <div className="bg-white border-2 border-black p-5">

          <p className="text-xs font-black tracking-widest text-gray-500">
            UNSUBSCRIBED
          </p>

          <p className="text-4xl font-black mt-2">
            {unsubscribedCount}
          </p>

        </div>

      </div>


      {/* FILTER */}

      <div className="flex flex-col lg:flex-row gap-4 justify-between mt-8">

        <div className="flex border-2 border-black w-fit">

          {[
            ["all", "ALL"],
            ["active", "ACTIVE"],
            ["unsubscribed", "UNSUBSCRIBED"],
          ].map(([value, label]) => (

            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-5 py-3 text-xs font-black ${
                filter === value
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {label}
            </button>

          ))}

        </div>


        {/* SEARCH */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search email..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border-2 border-black bg-white pl-11 pr-4 py-3 outline-none w-full md:w-72"
          />

        </div>

      </div>


      {/* ERROR */}

      {error && (
        <div className="bg-red-100 border-2 border-red-700 text-red-800 p-4 mt-6 font-bold">
          {error}
        </div>
      )}


      {/* TABLE */}

      <div className="bg-white border-2 border-black mt-6 overflow-x-auto">

        {loading ? (

          <p className="p-6 font-bold">
            Loading subscribers...
          </p>

        ) : (

          <table className="w-full text-left">

            <thead className="border-b-2 border-black">

              <tr>

                <th className="p-4 text-xs font-black tracking-widest">
                  EMAIL
                </th>

                <th className="p-4 text-xs font-black tracking-widest">
                  STATUS
                </th>

                <th className="p-4 text-xs font-black tracking-widest">
                  JOINED
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredSubscribers.map(
                (subscriber) => (

                  <tr
                    key={subscriber._id}
                    className="border-b border-gray-200"
                  >

                    <td className="p-4 font-bold">
                      {subscriber.email}
                    </td>

                    <td className="p-4">

                      <span
                        className={`text-xs font-black px-3 py-1 ${
                          subscriber.status ===
                          "active"
                            ? "bg-[#FF5C35]"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {subscriber.status.toUpperCase()}
                      </span>

                    </td>

                    <td className="p-4 text-gray-500">

                      {new Date(
                        subscriber.subscribedAt
                      ).toLocaleDateString()}

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
};

export default Subscribers;