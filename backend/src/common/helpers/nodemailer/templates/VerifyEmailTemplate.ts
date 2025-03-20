export const getVerifyEmailHtml = ({
    email,
    name,
    token,
  }: {
    email: string;
    name: string;
    token: string;
  }) => {
    const verifyLink = `${process.env.FRONTEND_URL}/auth/verify-email?email=${email}&token=${token}`;
    return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Verification</title>
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
            color: #fff !important;
            background-color: #28a745;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
          a:hover {
            background-color: #218838;
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
          <h1>Welcome, ${name || email}!</h1>
          <p>Thanks for signing up! To complete your registration, please verify your email address by clicking the button below:</p>
          <p><a href="${verifyLink}" target="_blank">Verify Your Email</a></p>
          <p>If you didn't sign up for an account, please ignore this email.</p>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
    `;
  };
  