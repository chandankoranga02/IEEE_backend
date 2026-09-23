const emailOtpTemplate = (otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>IEEE GBPIET Password Reset</title>
      </head>

      <body style="
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: Arial, Helvetica, sans-serif;
      ">

        <div style="
          max-width: 520px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 12px;
          padding: 40px;
          box-sizing: border-box;
        ">

          <!-- Brand -->
          <div style="
            text-align: center;
            margin-bottom: 30px;
          ">

            <h1 style="
              margin: 0;
              font-size: 28px;
              color: #00629B;
            ">
              IEEE GBPIET
            </h1>

            <p style="
              margin: 6px 0 0;
              color: #6b7280;
              font-size: 14px;
            ">
              IEEE Student Branch
            </p>

          </div>

          <!-- Content -->
          <h2 style="
            color: #111827;
            font-size: 22px;
            margin: 0 0 12px;
          ">
            Password Reset Request
          </h2>

          <p style="
            color: #4b5563;
            font-size: 15px;
            line-height: 1.6;
            margin: 0;
          ">
            A request was made to reset the password for the
            <strong>IEEE GBPIET Student Branch</strong> admin account.
            Use the verification code below to continue.
          </p>

          <!-- OTP -->
          <div style="
            text-align: center;
            margin: 32px 0;
          ">

            <div style="
              display: inline-block;
              background-color: #f3f4f6;
              padding: 18px 32px;
              border-radius: 10px;
              font-size: 32px;
              font-weight: bold;
              letter-spacing: 8px;
              color: #111827;
            ">
              ${otp}
            </div>

          </div>

          <p style="
            color: #4b5563;
            font-size: 14px;
            line-height: 1.6;
            margin: 0;
          ">
            This verification code will expire in
            <strong>10 minutes</strong>.
          </p>

          <p style="
            color: #6b7280;
            font-size: 14px;
            line-height: 1.6;
            margin-top: 16px;
          ">
            If you did not request a password reset, please ignore this
            email. Do not share this verification code with anyone.
          </p>

          <!-- Footer -->
          <div style="
            border-top: 1px solid #e5e7eb;
            margin-top: 32px;
            padding-top: 20px;
            text-align: center;
          ">

            <p style="
              color: #6b7280;
              font-size: 12px;
              margin: 0;
            ">
              IEEE GBPIET Student Branch
            </p>

            <p style="
              color: #9ca3af;
              font-size: 12px;
              margin: 6px 0 0;
            ">
              Govind Ballabh Pant Institute of Engineering &amp; Technology
            </p>

            <p style="
              color: #9ca3af;
              font-size: 12px;
              margin: 6px 0 0;
            ">
              © ${new Date().getFullYear()} IEEE GBPIET Student Branch
            </p>

          </div>

        </div>

      </body>
    </html>
  `;
};

export default emailOtpTemplate;