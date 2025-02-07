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

  for (const interval in intervals) {
    const secondsInInterval = intervals[interval as keyof typeof intervals];
    const count = Math.floor(seconds / secondsInInterval);

    if (count >= 1) {
      if (interval === "year") {
        return count === 1 ? "last year" : `${count} years ago`;
      }
      if (interval === "month") {
        return count === 1 ? "last month" : `${count} months ago`;
      }
      if (interval === "week") {
        return count === 1 ? "last week" : `${count} weeks ago`;
      }
      if (interval === "day") {
        return count === 1 ? "yesterday" : `${count} days ago`;
      }
      if (interval === "hour") {
        return count === 1 ? "an hour ago" : `${count} hours ago`;
      }
      if (interval === "minute") {
        return count === 1 ? "a minute ago" : `${count} minutes ago`;
      }
      if (interval === "second") {
        return count === 1 ? "a second ago" : `${count} seconds ago`;
      }
    }
  }

  return "just now"; // Handle cases where the time difference is very small.
}
