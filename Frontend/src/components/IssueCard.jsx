import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const IssueCard = ({
  id,
  number,
  title,
  description,
  date,
  image,
}) => {

  return (
    <article className="group">

      <Link to={`/issue/${id}`}>

        <div className="overflow-hidden h-64">

          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover
                       group-hover:scale-105
                       transition duration-500"
          />

        </div>

      </Link>


      <div className="flex justify-between mt-5">

        <p className="text-[#FF5C35] text-sm font-bold">
          ISSUE #{number}
        </p>

        <p className="text-gray-500 text-sm">
          {date}
        </p>

      </div>


      <h2 className="text-2xl font-black mt-3">
        {title}
      </h2>


      <p className="text-gray-600 mt-3 leading-7">
        {description}
      </p>


      <Link
        to={`/issue/${id}`}
        className="inline-flex items-center gap-2 font-bold mt-5
                   hover:text-[#FF5C35] transition"
      >
        READ ISSUE

        <ArrowRight size={17} />

      </Link>

    </article>
  );
};

export default IssueCard;