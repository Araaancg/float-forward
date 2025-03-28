export const getContactUsSenderHtml = ({
  email,
  name,
  message,
}: {
  email: string;
  name: string;
  message: string;
}) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Message Received</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f7fc;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      font-size: 24px;
      font-weight: 600;
      color: #2a2a2a;
      text-align: center;
    }
    p {
      font-size: 16px;
      color: #555;
      line-height: 1.6;
    }
    .message-box {
      background-color: #f9f9f9;
      border: 1px solid #ddd;
      padding: 10px;
      margin-top: 10px;
      border-radius: 4px;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #888;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Thank you for your message, ${name || email}!</h1>
    <p>We have received your message and will get back to you as soon as possible. Please be patient while we review your inquiry.</p>
    <p>Here is a copy of your message:</p>
    <div class="message-box">
      <p>"${message}"</p>
    </div>
    <p>We appreciate your patience.</p>
  </div>
</body>
</html>
  `;
};
