export default function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  // If the difference is more than 3 days, return the date in mm-dd-yyyy format
  if (seconds > intervals.day * 3) {
    const month = date.getMonth() + 1; // getMonth() is zero-based, so add 1
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}-${year}`;
  }

  for (const interval in intervals) {
    const secondsInInterval = intervals[interval as keyof typeof intervals];
    const count = Math.floor(seconds / secondsInInterval);

    if (count >= 1) {
      if (interval === "year") {
        return count === 1 ? "Last Year" : `${count} years ago`;
      }
      if (interval === "month") {
        return count === 1 ? "Last Month" : `${count} months ago`;
      }
      if (interval === "week") {
        return count === 1 ? "Last Week" : `${count} weeks ago`;
      }
      if (interval === "day") {
        return count === 1 ? "Yesterday" : `${count} days ago`;
      }
      if (interval === "hour") {
        return count === 1 ? "An Hour Ago" : `${count} hours ago`;
      }
      if (interval === "minute") {
        return count === 1 ? "A Minute Ago" : `${count} minutes ago`;
      }
      if (interval === "second") {
        return count === 1 ? "A Second Ago" : `${count} seconds ago`;
      }
    }
  }

  return "just now"; // Handle cases where the time difference is very small.
}
