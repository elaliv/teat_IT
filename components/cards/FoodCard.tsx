"use client";

import Image from "next/image";
import Link from "next/link";

interface FoodCardParams {
  id: string;
  name: string;
  photo: string;
  rating: number;
  numberOfRatings: number;
  author: string;
  readonly?: boolean;
}

const FoodCard = ({
  id,
  photo,
  name,
  rating,
  numberOfRatings,
  author,
  readonly = false,
}: FoodCardParams) => {
  const onRatingChange = (rating: number) => {};

  return (
    <Link href={`/recipes/${id}`} className="flex flex-col shadow-select">
      <Image
        src={photo}
        alt={name}
        width={290}
        height={290}
        className="object-cover"
      />
      <div className="border-t-2 border-primary-green bg-white-smoke py-3">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-center text-black font-bold text-[21px]">
              {name}
            </p>
            <div className="rating flex justify-center">
              {[1, 2, 3, 4, 5].map((starNumber) => (
                <input
                  key={starNumber}
                  type="radio"
                  name="rating-2"
                  className={`mask mask-star-2 ${
                    starNumber <= rating ? "bg-orange-400" : ""
                  }`}
                  checked={starNumber <= rating}
                  onChange={() => onRatingChange?.(starNumber)}
                  disabled={readonly}
                />
              ))}
            </div>
            <p className="text-center font-light text-[21px]">
              Ratings: {numberOfRatings}
            </p>
          </div>
          <div>
            <p className="text-center font-light text-[16px]">Author:</p>
            <p className="text-center font-light text-[23px]">{author}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FoodCard;
