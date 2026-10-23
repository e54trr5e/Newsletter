import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const StoryCard = ({
  number,
  category,
  title,
  description,
  slug,
  image,
}) => {
  return (
    <article className="group border-t-2 border-black pt-5">

      {/* Category */}

      <div className="flex items-center justify-between">

        <p className="text-[#FF5C35] text-xs font-bold tracking-widest">
          {number} / {category}
        </p>

        <ArrowUpRight
          size={18}
          className="text-gray-400 group-hover:text-[#FF5C35] transition duration-300"
        />

      </div>


      {/* Story Image */}

      <Link to={`/stories/${slug}`}>

        <div className="h-52 mt-5 overflow-hidden bg-[#E7E3DC]">

          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover
                       group-hover:scale-105
                       transition-transform duration-500"
          />

        </div>

      </Link>


      {/* Story Title */}

      <Link to={`/stories/${slug}`}>

        <h3
          className="text-2xl font-black mt-5 leading-tight
                     group-hover:text-[#FF5C35]
                     transition duration-300"
        >
          {title}
        </h3>

      </Link>


      {/* Description */}

      <p className="text-gray-600 mt-4 leading-7">
        {description}
      </p>


      {/* Read Story */}

      <Link
        to={`/stories/${slug}`}
        className="inline-flex items-center gap-2
                   mt-6 text-sm font-bold
                   hover:text-[#FF5C35]
                   transition duration-300"
      >
        READ STORY

        <ArrowRight
          size={16}
          className="group-hover:translate-x-1 transition duration-300"
        />

      </Link>

    </article>
  );
};

export default StoryCard;