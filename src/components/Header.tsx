import { useAuth } from "@/providers/AuthProvider";
import { useTheme } from "@/providers/ThemeProvider";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faBarsStaggered,
  faMagnifyingGlass,
  faMoon,
  faSun,
  faUser,
  faUserGroup,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";

const routes = [
  {
    url: "/series",
    label: "Manga List",
  },
  {
    url: "/genres",
    label: "Genre List",
  },
  {
    url: "/bookmarks",
    label: "Bookmarks",
  },
];

const Header = () => {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { user, pending, logout } = useAuth();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      navigate(0);
    },
  });

  const handleSearch = (str: string) => {
    if (str.length > 0) {
      navigate(`/search/${str}`);
    }
  };

  return (
    <header>
      <div className="bg-white dark:bg-[#3b3c4c] w-full shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between w-full h-[61px] relative z-20">
          <button
            className="h-full p-[18px] cursor-pointer md:hidden bg-[#f1f1f1] dark:bg-[#45475a] text-[#444444] dark:text-[#eeeeee]"
            onClick={() => {
              setIsSearchOpen(false);
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <FontAwesomeIcon icon={faBarsStaggered} className="text-[25px]" />
          </button>
          <div className="w-full px-3 text-left flex items-center lg:pl-0 bg-[#ffffff] dark:bg-[#3b3c4c]">
            <Link to="/" className="flex gap-2 items-center justify-center">
              <FontAwesomeIcon
                icon={faReact}
                className="text-[#3453d1] size-6"
              />
              <h1 className="text-2xl text-[#444444] dark:text-[#eeeeee] font-extrabold hover:text-[#3453d1] transition-colors duration-500">
                KomikGan
              </h1>
            </Link>
            <ul className="hidden md:flex gap-2 ml-5">
              {routes.map((route) => (
                <li key={route.label}>
                  <NavLink
                    to={route.url}
                    className="font-semibold rounded-md px-[15px] py-[8px] text-[16px] cursor-pointer transition-colors hover:bg-cprimary hover:text-white dark:hover:bg-cprimary dark:hover:text-white bg-[#f1f1f1] text-[#444444] dark:bg-[#45475a] dark:text-[#9ca9b9] "
                  >
                    {route.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex">
            <button
              className="h-full p-[18px] cursor-pointer md:hidden bg-[#f1f1f1] dark:bg-[#45475a] text-[#444444] dark:text-[#eeeeee]"
              onClick={() => {
                setIsMenuOpen(false);
                setIsSearchOpen(!isSearchOpen);
              }}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-[25px] font-extrabold"
                width={25}
              />
            </button>
            <div className="hidden md:flex h-full items-center mr-2">
              <input
                type="text"
                name="search"
                className="py-2 px-4 rounded-sm outline-none text-sm font-semibold focus:ring-1 ring-[#777777] bg-[#f1f1f1] text-[#444444] placeholder:text-[#777777] dark:bg-[#2f303e] dark:text-[#aaaaaa] dark:placeholder:text-[#aaaaaa] dark:ring-[#45475a]"
                placeholder="Search..."
                autoComplete="off"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    e.stopPropagation();
                    handleSearch(e.currentTarget.value);
                  }
                }}
              />
            </div>
            <div className="h-full px-[12px] cursor-pointer flex items-center relative lg:pr-0 bg-[#ffffff] dark:bg-[#3b3c4c] text-[#444444] dark:text-[#eeeeee]">
              {!pending ? (
                <>
                  <div
                    className="w-[40px] h-[40px] relative"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    <img
                      src={"/no-avatar.jpg"}
                      alt=""
                      className="rounded-full"
                    />
                  </div>
                  {/* user menu */}
                  <ul
                    className={
                      "absolute z-40 top-16 right-1 rounded-md shadow-md bg-[#ffffff] text-[#444444] dark:bg-[#3b3c4c] dark:text-[#9ca9b9]" +
                      (isUserMenuOpen ? "" : " hidden")
                    }
                  >
                    <li className="m-[7px]">
                      <button
                        className="text-left w-28 flex items-center px-[10px] py-[7px] rounded-md text-[13px] font-semibold tracking-wide hover:bg-[#f1f1f1] dark:hover:bg-[#45475a]"
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                      >
                        <FontAwesomeIcon
                          icon={theme === "light" ? faMoon : faSun }
                          className="mr-3"
                        />
                        {theme === "light" ? "Dark Mode" : "Light Mode"}
                      </button>
                    </li>
                    {!user && (
                      <>
                        <li className="m-[7px]">
                          <Link
                            to="/login"
                            className="text-left w-28 flex items-center px-[10px] py-[7px] rounded-md text-[13px] font-semibold tracking-wide hover:bg-[#f1f1f1] dark:hover:bg-[#45475a]"
                          >
                            <FontAwesomeIcon
                              icon={faArrowRightToBracket}
                              className="mr-3"
                            />
                            Login
                          </Link>
                        </li>
                        <li className="m-[7px]">
                          <Link
                            to="/register"
                            className="text-left w-28 flex items-center px-[10px] py-[7px] rounded-md text-[13px] font-semibold tracking-wide hover:bg-[#f1f1f1] dark:hover:bg-[#45475a]"
                          >
                            <FontAwesomeIcon
                              icon={faUserPlus}
                              className="mr-2"
                            />
                            Register
                          </Link>
                        </li>
                      </>
                    )}

                    {user && (
                      <>
                        {/* {session?.user?.role !== "USER" && ( */}
                        {user?.role !== "user" && (
                          <li className="m-[7px]">
                            <Link
                              to="/admin"
                              className="text-left w-28 flex items-center px-[10px] py-[7px] rounded-md text-[13px] font-semibold tracking-wide hover:bg-[#f1f1f1] dark:hover:bg-[#45475a]"
                            >
                              <FontAwesomeIcon
                                icon={faUserGroup}
                                className="mr-3"
                              />
                              Panel
                            </Link>
                          </li>
                        )}
                        <li className="m-[7px]">
                          <Link
                            to="/profile"
                            className="text-left w-28 flex items-center px-[10px] py-[7px] rounded-md text-[13px] font-semibold tracking-wide hover:bg-[#f1f1f1] dark:hover:bg-[#45475a]"
                          >
                            <FontAwesomeIcon icon={faUser} className="mr-3" />
                            Profile
                          </Link>
                        </li>
                        <li className="m-[7px]">
                          <button
                            onClick={() => logoutMutation.mutate()}
                            className="text-left w-28 flex items-center px-[10px] py-[7px] rounded-md text-[13px] font-semibold tracking-wide hover:bg-[#f1f1f1] dark:hover:bg-[#45475a]"
                          >
                            <FontAwesomeIcon
                              icon={faArrowRightFromBracket}
                              className="mr-3"
                            />
                            Logout
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </>
              ) : <Skeleton className="rounded-full h-[40px] w-[40px] cursor-not-allowed" /> }
            </div>
          </div>
        </div>
      </div>

      {/* mobile navigation */}
      <div
        className={
          "w-full p-[10px] flex flex-col gap-2 border-t-4 border-[#3453d1] transition-transform md:hidden z-10 absolute bg-[#ffffff] dark:bg-[#3b3c4c]" +
          (isMenuOpen ? "" : " -translate-y-[100%]")
        }
      >
        {routes.map((route) => (
          <NavLink
            to={route.url}
            key={route.label}
            className="mx-[10px] px-[15px] py-[8px] rounded-md font-semibold text-[16px] tracking-wide transition-colors hover:bg-[#3453d1] hover:text-[#ffffff] dark:hover:bg-[#3453d1] dark:hover:text-[#ffffff] bg-[#f1f1f1] text-[#444444] dark:bg-[#45475a] dark:text-[#9ca9b9]"
          >
            {route.label}
          </NavLink>
        ))}
      </div>

      {/* mobile search */}
      <div
        className={
          "w-full p-[10px] flex flex-col gap-2 border-t-4 border-[#3453d1] transition-transform md:hidden z-10 absolute bg-[#ffffff] text-[#444444] dark:bg-[#45475a] dark:text-[#9ca9b9]" +
          (isSearchOpen ? "" : " -translate-y-[100%]")
        }
      >
        <input
          type="text"
          name="search"
          className="py-2 px-4 rounded-sm outline-none text-sm w-full font-semibold focus:ring-1 ring-[#777777] bg-[#f1f1f1] text-[#444444] placeholder:text-[#777777] dark:bg-[#2f303e] dark:text-[#aaaaaa] dark:placeholder:text-[#aaaaaa] dark:ring-[#45475a]"
          placeholder="Search..."
          autoComplete="off"
        />
      </div>
    </header>
  );
};

export default Header;
