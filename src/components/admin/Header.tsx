import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBook,
  faGear,
  faHome,
  faNewspaper,
  faTags,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/providers/AuthProvider";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import { useTheme } from "@/providers/ThemeProvider";

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

const Header = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <nav className="grid gap-6 text-lg font-medium">
            <Link to="/" className="flex gap-4 items-center">
              <div className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base">
                <FontAwesomeIcon
                  icon={faReact}
                  className="h-5 w-5 transition-all group-hover:scale-110"
                />
                <span className="sr-only">Komikgan</span>
              </div>
              <span className="text-lg font-semibold">KOMIKGAN</span>
            </Link>
            {routes.map((route) => (
              <Link
                key={route.name}
                to={route.href}
                className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <FontAwesomeIcon icon={route.icon} className="h-5 w-5" />
                {route.name}
              </Link>
            ))}
            <Link
              to="/admin/settings"
              className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
            >
              <FontAwesomeIcon icon={faGear} className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      {/* <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="#">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="#">Products</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>All Products</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb> */}
      {/* <div className="relative ml-auto flex-1 md:grow-0">
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
        />
        <Input
          type="text"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div> */}
      <div className="relative ml-auto flex-1">
        <Link to="/" className="text-xl font-semibold">
          KOMIKGAN
        </Link>
      </div>
      {status !== "loading" ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <img
                src={user?.image || "/no-avatar.jpg"}
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={(e) => {
                e.preventDefault()
                setTheme(theme === "light" ? "dark" : "light")
            }}>
                {theme === "light" ? "Dark Mode" : "Light Mode"}
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Skeleton className="overflow-hidden rounded-full w-[36px] h-[36px]" />
      )}
    </header>
  );
};

export default Header;
