import { Link } from "react-router-dom";
import { CalendarDays, LogIn, UserPlus, Moon, Sun } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs">
            <CalendarDays className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-lg leading-tight tracking-tight text-foreground">
              Troy Tracker
            </span>
            <span className="text-[11px] text-muted-foreground font-medium hidden sm:inline">
              Campus & Event Schedule
            </span>
          </div>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={toggleTheme}
            className="rounded-full text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </Button>

          {/* Login Button */}
          <Link
            to="/login"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "gap-1.5 text-sm font-medium")}
          >
            <LogIn className="size-4" />
            <span>Log in</span>
          </Link>

          {/* Signup Button */}
          <Link
            to="/signup"
            className={cn(buttonVariants({ variant: "default", size: "sm" }), "gap-1.5 text-sm font-medium shadow-xs")}
          >
            <UserPlus className="size-4" />
            <span>Sign up</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
