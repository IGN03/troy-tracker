import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CalendarProps {
  className?: string;
}

interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export default function Calendar({ className }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const today = new Date();

  // Navigation handlers
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Generate calendar days
  const getCalendarDays = (): CalendarDay[] => {
    const days: CalendarDay[] = [];

    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sunday
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // Previous month padding days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const dayNum = daysInPrevMonth - i;
      const date = new Date(year, month - 1, dayNum);
      days.push({
        date,
        dayNumber: dayNum,
        isCurrentMonth: false,
        isToday:
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear(),
      });
    }

    // Current month days
    for (let dayNum = 1; dayNum <= daysInCurrentMonth; dayNum++) {
      const date = new Date(year, month, dayNum);
      days.push({
        date,
        dayNumber: dayNum,
        isCurrentMonth: true,
        isToday:
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear(),
      });
    }

    // Next month padding days to complete 5 or 6 full weeks (total multiple of 7)
    const totalCells = days.length <= 35 ? 35 : 42;
    const remainingDays = totalCells - days.length;

    for (let dayNum = 1; dayNum <= remainingDays; dayNum++) {
      const date = new Date(year, month + 1, dayNum);
      days.push({
        date,
        dayNumber: dayNum,
        isCurrentMonth: false,
        isToday:
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear(),
      });
    }

    return days;
  };

  const calendarDays = getCalendarDays();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const monthName = currentDate.toLocaleString("default", { month: "long" });

  return (
    <div className={cn("w-full rounded-xl border border-border bg-card shadow-xs overflow-hidden", className)}>
      {/* Calendar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 sm:p-6 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <CalendarIcon className="size-5" />
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              {monthName} {year}
            </h2>
            <p className="text-xs text-muted-foreground">
              Empty calendar view • Log in to sync and create events
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handleToday}
            className="text-xs font-medium"
          >
            Today
          </Button>

          <div className="flex items-center rounded-lg border border-border bg-background p-0.5">
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handlePrevMonth}
              aria-label="Previous Month"
              title="Previous month"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={handleNextMonth}
              aria-label="Next Month"
              title="Next month"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 border-b border-border bg-muted/40 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider py-3">
        {weekDays.map((day, idx) => (
          <div
            key={day}
            className={cn(
              "py-1",
              idx === 0 || idx === 6 ? "text-muted-foreground/70" : "text-foreground/80"
            )}
          >
            <span className="hidden sm:inline">{day}</span>
            <span className="sm:hidden">{day.slice(0, 1)}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 divide-x divide-y divide-border bg-card">
        {calendarDays.map((day, index) => {
          const isSelected =
            selectedDate &&
            selectedDate.getDate() === day.date.getDate() &&
            selectedDate.getMonth() === day.date.getMonth() &&
            selectedDate.getFullYear() === day.date.getFullYear();

          return (
            <div
              key={`${day.date.toISOString()}-${index}`}
              onClick={() => setSelectedDate(day.date)}
              className={cn(
                "group relative min-h-[90px] sm:min-h-[115px] p-2 sm:p-2.5 transition-colors cursor-pointer flex flex-col justify-between",
                !day.isCurrentMonth && "bg-muted/15 text-muted-foreground/40",
                day.isCurrentMonth && "hover:bg-muted/30",
                isSelected && "bg-primary/5 ring-1 ring-inset ring-primary",
                day.isToday && "bg-primary/[0.03]"
              )}
            >
              {/* Day Number Row */}
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "text-xs sm:text-sm font-medium flex items-center justify-center",
                    day.isToday
                      ? "size-6 sm:size-7 rounded-full bg-primary text-primary-foreground font-semibold shadow-xs"
                      : day.isCurrentMonth
                      ? "text-foreground"
                      : "text-muted-foreground/50"
                  )}
                >
                  {day.dayNumber}
                </span>

                {/* Subtle Add action hint on hover */}
                {day.isCurrentMonth && (
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground">
                    <Plus className="size-3.5" />
                  </span>
                )}
              </div>

              {/* Day Cell Body (Empty for now) */}
              <div className="flex-1 flex items-center justify-center py-2">
                {/* Empty placeholder state */}
              </div>

              {/* Footer indicator if today */}
              {day.isToday && (
                <div className="text-[10px] font-medium text-primary tracking-tight truncate hidden sm:block">
                  Today
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
