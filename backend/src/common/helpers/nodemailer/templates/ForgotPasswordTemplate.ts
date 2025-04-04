export const getForgotPasswordHtml = ({
  email,
  name,
  token,
}: {
  email: string;
  name: string;
  token: string;
}) => {
  const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?email=${email}&token=${token}`;
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Forgot Password</title>
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
          font-size: 28px;
          font-weight: 600;
          color: #2a2a2a;
          text-align: center;
        }
        p {
          font-size: 16px;
          color: #555;
          line-height: 1.6;
          text-align: center;
        }
        a {
          display: inline-block;
          padding: 12px 20px;
          font-size: 16px;
          color: #ffffff !important;
          background-color: #9BC53DCC;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
        }
        a:hover {
          background-color: #9BC53D;
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
        <h1>Hi ${name || email}.</h1>
        <p>We received a request to reset your password. To reset your password, click the button below:</p>
        <p><a href="${resetLink}" target="_blank">Reset Your Password</a></p>
        <p>If you didn't request a password reset, please ignore this email.</p>
      </div>
    </body>
  </html>
  `;
};

