import { ApplicationStatus } from "../../../types/application.types";

export const getApplicationHtml = ({
  email,
  name,
  status,
  token,
}: {
  email: string;
  name: string;
  status: ApplicationStatus;
  token?: string;
}) => {
  let message;
  if (status === ApplicationStatus.DENIED) {
    message =
      "<p>Thank you for your interest in the Admin role. After careful consideration of your application, we regret to inform you that we will not be moving forward with your candidacy at this time.</p>";
  } else if (status === ApplicationStatus.LACKING_INFO) {
    const link = `${process.env.FRONTEND_URL}/first-responder/register/add-info?email=${email}&token=${token}`;
    message = `<p>Thank you for your application for the First Responder role. We are currently reviewing your application and require some additional information to proceed.</p>
    <p>Please click the button below to provide the necessary details:</p>
    <a href="${link}" class="button">Provide More Information</a>
    <p>We look forward to receiving your additional information and continuing the review process.</p>
    </div>`;
  } else {
    message = `
    <p>We are pleased to inform you that your application for the First Responder role has been approved. Sign up to the platform to start helping people.</p>
    <a href="${process.env.FRONTEND_URL}" class="button">Got to Float Forward</a>
    `;
  }

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
    <h1>Application Update</h1>
    <p>Dear ${name || email},</p>
    ${message}
  </div>
</body>
</html>
  `;
};
