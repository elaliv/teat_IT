// HOC pattern
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Card = ({ children }: Props) => {
  return (
    <div className="relative z-10 px-[5%] py-[3%] rounded-3xl bg-primary-dark-blue text-white">
      {children}
    </div>
  );
};

export default Card;
