import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {

  return (
    <div className="min-h-[75vh] bg-[#F5F3EE]
                    flex items-center justify-center px-6">

      <div className="text-center">

        <p className="text-[#FF5C35] font-black text-xl">
          404
        </p>

        <h1 className="text-6xl md:text-8xl font-black mt-3">
          PAGE NOT FOUND.
        </h1>

        <p className="text-gray-600 mt-5">
          The page you're looking for doesn't exist.
        </p>


        <Link
          to="/"
          className="inline-flex items-center gap-2
                     bg-black text-white
                     px-6 py-4 mt-8 font-bold
                     hover:bg-[#FF5C35]
                     hover:text-black transition"
        >
          <ArrowLeft size={18} />

          BACK HOME
        </Link>

      </div>

    </div>
  );
};

export default NotFound;