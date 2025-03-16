/**
 * Logs a formatted message to the console with timestamp, action and message
 * @param action The action being performed
 * @param message The message to log
 */
export default function actionLog(action: string, message: string): void {
  // Get current date and time
  const now = new Date();

  // Format date as DD-MM-YYYY
  const date = [
    now.getDate().toString().padStart(2, "0"),
    (now.getMonth() + 1).toString().padStart(2, "0"),
    now.getFullYear(),
  ].join("-");

  // Format time as HH-MM-SS
  const time = [
    now.getHours().toString().padStart(2, "0"),
    now.getMinutes().toString().padStart(2, "0"),
    now.getSeconds().toString().padStart(2, "0"),
  ].join("-");

  // Format the log message
  const formattedMessage = `${date}:${time} | ${action.toUpperCase()} | ${message}`;

  // Log to console
  console.log(formattedMessage);
}
