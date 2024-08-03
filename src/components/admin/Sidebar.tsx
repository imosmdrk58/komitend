import { Link, useLocation } from "react-router-dom";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import { faBook, faGear, faHome, faNewspaper, faTags, faUsers } from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

const routes = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: faHome,
  },
  {
    name: "Series",
    href: "/admin/series",
    icon: faBook,
  },
  {
    name: "Chapters",
    href: "/admin/chapters",
    icon: faNewspaper,
  },
  {
    name: "Genres",
    href: "/admin/genres",
    icon: faTags,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: faUsers,
  },
];

const Sidebar = () => {
  const { pathname } = useLocation()

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          to="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <FontAwesomeIcon icon={faReact} className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Komikgan</span>
        </Link>
        {routes.map((route) => (
          <Tooltip key={route.name}>
            <TooltipTrigger asChild>
              <Link
                to={route.href}
                className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8",
                    pathname === route.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                )}
              >
                <FontAwesomeIcon icon={route.icon} className="h-5 w-5" />
                <span className="sr-only">{route.name}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{route.name}</TooltipContent>
          </Tooltip>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to="/admin/settings"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <FontAwesomeIcon icon={faGear} className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  )
};

export default Sidebar;
