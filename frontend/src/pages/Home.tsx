import Navbar from "@/components/Navbar";
import Calendar from "@/components/Calendar";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, CalendarPlus } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
        {/* Welcome / Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border/40">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary mb-2">
              <Sparkles className="size-3" />
              <span>Troy Tracker Preview</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-foreground">
              Campus Calendar
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1 max-w-xl">
              View upcoming university events, lectures, and milestones. Log in or create an account to customize your schedule.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}
            >
              <CalendarPlus className="size-4" />
              <span>Add Event</span>
            </Link>
            <Link
              to="/signup"
              className={cn(buttonVariants({ variant: "default", size: "sm" }), "shadow-xs")}
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Empty Calendar Grid */}
        <section aria-label="Calendar view" className="flex-1 pb-10">
          <Calendar />
        </section>
      </main>
    </div>
  );
}
