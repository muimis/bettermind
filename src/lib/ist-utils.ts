/**
 * Better Mind IST Time Utilities
 * Core Rule: All times are IST (UTC+05:30).
 * Times show in IST whatever time zone the patient's device uses.
 */

export const IST_OFFSET_MINUTES = 330; // 5 hours 30 minutes

/**
 * Format a Date or ISO string into an IST display string
 * e.g., "10:30 AM IST", "Tuesday, 28 Oct 2026, 10:30 AM IST"
 */
export function formatIST(dateInput: Date | string, options: { includeDate?: boolean; includeTime?: boolean } = {}): string {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return 'Invalid Date';

  // Format using Intl.DateTimeFormat with Asia/Kolkata timezone
  const formatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    ...(options.includeDate ? { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' } : {})
  });

  const formatted = formatter.format(date);
  return `${formatted} IST`;
}

/**
 * Get the day of week (0 = Sun, 1 = Mon, ..., 6 = Sat) in IST
 */
export function getISTDayOfWeek(dateInput: Date | string): number {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short'
  });
  const weekday = formatter.format(date);
  const days: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return days[weekday] ?? 0;
}

/**
 * Convert YYYY-MM-DD + HH:mm to a full ISO timestamptz string in IST (+05:30)
 */
export function createISTDate(dateStr: string, timeStr: string): string {
  // Pad timeStr if needed: "09:00" -> "09:00:00"
  const cleanTime = timeStr.length === 5 ? `${timeStr}:00` : timeStr;
  return `${dateStr}T${cleanTime}+05:30`;
}

/**
 * Check if two time intervals overlap: [startA, endA) and [startB, endB)
 */
export function intervalsOverlap(startA: string | Date, endA: string | Date, startB: string | Date, endB: string | Date): boolean {
  const a1 = new Date(startA).getTime();
  const a2 = new Date(endA).getTime();
  const b1 = new Date(startB).getTime();
  const b2 = new Date(endB).getTime();
  return a1 < b2 && b1 < a2;
}

/**
 * Check if interval B is at least gapMinutes after interval A (or vice versa if B is earlier)
 */
export function hasMinimumGap(
  startA: string | Date,
  endA: string | Date,
  startB: string | Date,
  endB: string | Date,
  gapMinutes: number
): boolean {
  const a1 = new Date(startA).getTime();
  const a2 = new Date(endA).getTime();
  const b1 = new Date(startB).getTime();
  const b2 = new Date(endB).getTime();
  const gapMs = gapMinutes * 60 * 1000;

  if (a1 < b2 && b1 < a2) {
    return false; // Direct overlap
  }

  if (a2 <= b1) {
    return (b1 - a2) >= gapMs;
  } else {
    return (a1 - b2) >= gapMs;
  }
}
