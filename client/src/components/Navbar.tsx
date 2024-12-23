import { useState } from "react";
// import King from "../../public/chess-pieces/king-b.svg";

const Navbar = () => {
  const [hover, setHover] = useState(false);
  const King = hover ? "/chess-pieces/king-w.svg" : "/chess-pieces/king-b.svg";
  return (
    <nav
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={` ${
        hover ? "bg-green-400 text-white" : "bg-white text-green-300"
      } w-full text-4xl font-serif  flex items-center justify-center h-28`}
    >
      Let's Play Chess <img className="block w-20" src={King} alt="img" />
    </nav>
  );
};

export default Navbar;
