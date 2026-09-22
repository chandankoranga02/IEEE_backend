
const emailCertificate = ({
  name,
  event,
  certificateId,
}) => {
  return `
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>Certificate of Participation</title>
    </head>

    <body
      style="
        margin: 0;
        padding: 0;
        background-color: #f1f5f9;
        font-family: Arial, Helvetica, sans-serif;
        color: #1e293b;
      "
    >

      <table
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="padding: 40px 15px;"
      >

        <tr>
          <td align="center">

            <!-- Main Container -->

            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="
                max-width: 620px;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                border: 1px solid #e2e8f0;
              "
            >

              <!-- Header -->

              <tr>
                <td
                  style="
                    background-color: #00629b;
                    padding: 28px 35px;
                    text-align: center;
                  "
                >

                  <h1
                    style="
                      margin: 0;
                      color: #ffffff;
                      font-size: 24px;
                      font-weight: 700;
                    "
                  >
                    Certificate of Participation
                  </h1>

                  <p
                    style="
                      margin: 8px 0 0;
                      color: #dbeafe;
                      font-size: 13px;
                    "
                  >
                    IEEE Student Branch
                  </p>

                </td>
              </tr>


              <!-- Content -->

              <tr>
                <td
                  style="
                    padding: 40px 40px 30px;
                  "
                >

                  <p
                    style="
                      margin: 0 0 18px;
                      font-size: 16px;
                      color: #334155;
                    "
                  >
                    Dear <strong>${name}</strong>,
                  </p>


                  <p
                    style="
                      margin: 0 0 18px;
                      font-size: 15px;
                      line-height: 1.7;
                      color: #475569;
                    "
                  >
                    We sincerely thank you for your participation in
                    <strong style="color: #00629b;">
                      ${event}
                    </strong>.
                  </p>


                  <p
                    style="
                      margin: 0 0 20px;
                      font-size: 15px;
                      line-height: 1.7;
                      color: #475569;
                    "
                  >
                    Your enthusiasm, involvement, and contribution
                    made the event successful. We appreciate your
                    participation and hope you continue to take part
                    in future activities and initiatives.
                  </p>


                  <!-- Certificate Information -->

                  <table
                    width="100%"
                    cellpadding="0"
                    cellspacing="0"
                    border="0"
                    style="
                      background-color: #f8fafc;
                      border: 1px solid #e2e8f0;
                      border-radius: 8px;
                      margin: 25px 0;
                    "
                  >

                    <tr>
                      <td
                        style="
                          padding: 18px 20px;
                          font-size: 13px;
                          color: #64748b;
                        "
                      >
                        Certificate ID
                      </td>

                      <td
                        align="right"
                        style="
                          padding: 18px 20px;
                          font-size: 13px;
                          font-weight: 600;
                          color: #0f172a;
                        "
                      >
                        ${certificateId}
                      </td>
                    </tr>

                  </table>


                  <p
                    style="
                      margin: 0 0 20px;
                      font-size: 15px;
                      line-height: 1.7;
                      color: #475569;
                    "
                  >
                    Kindly find your
                    <strong>Certificate of Participation</strong>
                    attached to this email.
                    Please download and keep it safely for your
                    records and future reference.
                  </p>


                  <p
                    style="
                      margin: 0 0 25px;
                      font-size: 14px;
                      line-height: 1.7;
                      color: #64748b;
                    "
                  >
                    If you notice any incorrect information on your
                    certificate, please contact the organizing team
                    with your Certificate ID.
                  </p>


                  <p
                    style="
                      margin: 0;
                      font-size: 15px;
                      line-height: 1.6;
                      color: #334155;
                    "
                  >
                    Best regards,
                    <br />

                    <strong>
                      IEEE Student Branch
                    </strong>

                    <br />

                    <span style="color: #64748b;">
                      GBPIET
                    </span>
                  </p>

                </td>
              </tr>


              <!-- Footer -->

              <tr>
                <td
                  style="
                    padding: 20px 35px;
                    background-color: #f8fafc;
                    border-top: 1px solid #e2e8f0;
                    text-align: center;
                  "
                >

                  <p
                    style="
                      margin: 0;
                      font-size: 11px;
                      line-height: 1.6;
                      color: #94a3b8;
                    "
                  >
                    This is an automated email.
                    Please do not reply directly to this message.
                  </p>

                  <p
                    style="
                      margin: 6px 0 0;
                      font-size: 11px;
                      color: #94a3b8;
                    "
                  >
                    © ${new Date().getFullYear()} IEEE Student Branch, GBPIET
                  </p>

                </td>
              </tr>

            </table>

          </td>
        </tr>

      </table>

    </body>

    </html>
  `;
};

export default emailCertificate;
