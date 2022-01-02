import { HeartIcon} from "@heroicons/react/outline";
import { HeartIcon as HeartIcon2} from "@heroicons/react/solid";
import { StarIcon } from "@heroicons/react/solid"
import {useState} from "react"

import Image from "next/image";
function InfoCards({ img, location, title, description, star, price, total }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="flex py-7 px-2 border-b cursor-pointer hover:opacity-80
     hover:shadow-lg transition duration-200 ease-out first:border-t">
      <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
        <Image className="rounded-2xl" src={img} layout="fill" objectFit="cover" />
      </div>
      <div className="flex flex-col flex-grow pl-5">
        <div className="flex justify-between">
          <p>{location}</p>
          {liked ? (
            <HeartIcon2 onClick={() => setLiked(!liked)} className="h-8 cursor-pointer text-red-500"/>
          ) : (
            <HeartIcon onClick={() => setLiked(!liked)} className="h-10 cursor-pointer dark:text-black p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-200"/>
          )}
        </div>
        <h4 className="text-xl">{title}</h4>
        <div className="border-b w-10 pt-2"></div>
        <p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>

        <div className="flex justify-between items-end pt-5">
            <p className="flex items-center">
                <StarIcon className="h-5 text-red-400 "/>{star}
            </p>
            <div>
                <p className="text-lg lg:text-2xl font-semibold pb-2">{price}</p>
                <p className="text-right font-extralight">{total}</p>
            </div>
        </div>
      </div>
    </div>
  );
}
export default InfoCards;
