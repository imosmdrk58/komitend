import { faDiscord, faGithub, faReact } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const routes = [
    {
        url: "https://github.com/rizkiromadoni",
        icon: faGithub
    },
    {
        url: "#",
        icon: faDiscord
    },
]

const Footer = () => {
  return (
    <footer className="flex justify-center flex-col items-center gap-4">
      <section className="w-full bg-[#f1f1f1] dark:bg-[#3b3c4c] py-3 px-2">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex gap-2 items-center text-[#444444] dark:text-[#9ca9b9]">
            <FontAwesomeIcon icon={faReact} className="size-6" />
            <h1 className="text-2xl font-extrabold">
              KomikGan
            </h1>
          </Link>
          <div className="flex gap-2">
            {routes.map((route, index) => (
                <Link key={index} to={route.url} className="text-[#f1f1f1] bg-[#444444] dark:bg-[#9ca9b9] dark:text-[#3b3c4c] rounded-full w-9 h-9 flex items-center justify-center">
                    <FontAwesomeIcon icon={route.icon} />
                </Link>
            ))}
          </div>
        </div>
      </section>

      <span className="font-semibold text-[#444444] dark:text-[#999999] text-sm">
        © Copyright 2024 - KomikGan. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
