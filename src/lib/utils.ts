import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function readingTime(html: string) {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
}

export function dateRange(startDate: Date | string, endDate?: Date | string): string {
  // Convert startDate to a Date object if it's a string
  if (typeof startDate === 'string') {
    startDate = new Date(startDate);
  }

  // Validate startDate
  if (!(startDate instanceof Date) || isNaN(startDate.getTime())) {
    throw new Error("Invalid startDate provided to dateRange function");
  }

  const startMonth = startDate.toLocaleString("default", { month: "short" });
  const startYear = startDate.getFullYear().toString();
  let endMonth = "";
  let endYear = "";

  if (endDate) {
    if (typeof endDate === "string") {
      // Handle "Current" or "Present"
      if (endDate.toLowerCase() === "current" || endDate.toLowerCase() === "present") {
        endYear = "Present";
      } else {
        // Attempt to convert endDate to a Date object
        const potentialDate = new Date(endDate);
        if (!isNaN(potentialDate.getTime())) {
          endDate = potentialDate;
        } else if (/^\d{4}$/.test(endDate)) {
          // If it's a valid year string
          endYear = endDate;
        } else {
          throw new Error("Invalid endDate provided to dateRange function");
        }
      }
    }

    if (endDate instanceof Date && !isNaN(endDate.getTime())) {
      endMonth = endDate.toLocaleString("default", { month: "short" });
      endYear = endDate.getFullYear().toString();
    }
  }

  // Return the formatted date range
  return endYear === "Present"
    ? `${startMonth}${startYear} - ${endYear}`
    : `${startMonth}${startYear} - ${endMonth}${endYear}`;
}



// export function dateRange(startDate: Date, endDate?: Date | string): string {
//   const startMonth = startDate.toLocaleString("default", { month: "short" });
//   const startYear = startDate.getFullYear().toString();
//   let endMonth;
//   let endYear;

//   if (endDate) {
//     if (typeof endDate === "string") {
//       endMonth = "";
//       endYear = endDate;
//     } else {
//       endMonth = endDate.toLocaleString("default", { month: "short" });
//       endYear = endDate.getFullYear().toString();
//     }
//   }

//   return `${startMonth}${startYear} - ${endMonth}${endYear}`;
// }
