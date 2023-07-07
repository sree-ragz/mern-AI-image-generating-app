import React from "react";
import { download } from "../assets";
import { downloadImage } from "../utils";

const Card = ({ post }) => {
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        className="w-full h-full object-cover rounded-xl"
        src={post.photo}
        alt={post.prompt}
      />
      <div className="group-hover:flex flex-col max-h-[94%] hidden absolute hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md">
        <p className="text-white text-sm overflow-y-auto">{post.prompt}</p>
        <button
          className="outline-none bg-transparent border-none"
          onClick={() => downloadImage(post.photo, post._id)}
        >
          <img
            src={download}
            alt=""
            srcset=""
            className="w-6 h-auto object-cover invert"
          />
        </button>
      </div>
    </div>
  );
};

export default Card;
