
const templateCertificate = ({
  name,
  branch,
  event,
  date,
  certificateId,
  issueDate,
  logoUrl,
}) => {
  return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8" />

    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      @page {
        size: A4 landscape;
        margin: 0;
      }

      body {
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
        background: #ffffff;
        color: #1e293b;
      }

      .certificate {
        width: 297mm;
        height: 210mm;

        position: relative;

        display: flex;
        flex-direction: column;
        align-items: center;

        padding: 25mm 30mm 20mm;

        background: #ffffff;

        overflow: hidden;
      }

      /* =========================
         DECORATIVE BORDER
      ========================== */

      .outer-border {
        position: absolute;

        top: 10mm;
        bottom: 10mm;
        left: 10mm;
        right: 10mm;

        border: 2px solid #00629b;

        pointer-events: none;
      }

      .inner-border {
        position: absolute;

        top: 14mm;
        bottom: 14mm;
        left: 14mm;
        right: 14mm;

        border: 1px solid #cbd5e1;

        pointer-events: none;
      }

      /* =========================
         CORNER DESIGN
      ========================== */

      .corner {
        position: absolute;

        width: 90px;
        height: 90px;

        background: #00629b;

        transform: rotate(45deg);
      }

      .top-left {
        top: -50px;
        left: -50px;
      }

      .top-right {
        top: -50px;
        right: -50px;
      }

      .bottom-left {
        bottom: -50px;
        left: -50px;
      }

      .bottom-right {
        bottom: -50px;
        right: -50px;
      }

      /* =========================
         LOGO
      ========================== */

      .logo-container {
        height: 65px;

        display: flex;
        align-items: center;
        justify-content: center;

        margin-bottom: 8px;
      }

      .logo {
        max-height: 65px;
        max-width: 180px;

        object-fit: contain;
      }

      /* =========================
         ORGANIZATION
      ========================== */

      .organization {
        font-size: 14px;
        font-weight: 600;

        color: #00629b;

        letter-spacing: 2px;
        text-transform: uppercase;

        margin-bottom: 12px;
      }

      /* =========================
         TITLE
      ========================== */

      .title {
        font-family: Georgia, "Times New Roman", serif;

        font-size: 44px;
        font-weight: 700;

        color: #0f172a;

        letter-spacing: 1px;

        margin-bottom: 6px;
      }

      .subtitle {
        font-size: 15px;

        color: #64748b;

        letter-spacing: 4px;

        text-transform: uppercase;

        margin-bottom: 28px;
      }

      /* =========================
         CERTIFICATE CONTENT
      ========================== */

      .presented-text {
        font-size: 16px;

        color: #64748b;

        margin-bottom: 12px;
      }

      .name {
        font-family: Georgia, "Times New Roman", serif;

        font-size: 36px;
        font-weight: 700;

        color: #00629b;

        margin-bottom: 6px;

        padding: 0 30px 7px;

        border-bottom: 1px solid #94a3b8;
      }

      .branch {
        font-size: 14px;
        color: #64748b;

        margin-bottom: 22px;
      }

      .description {
        max-width: 760px;

        text-align: center;

        font-family: Georgia, "Times New Roman", serif;

        font-size: 17px;

        line-height: 1.8;

        color: #334155;
      }

      .description strong {
        color: #0f172a;
      }

      .event {
        color: #00629b;
        font-weight: 700;
      }

      /* =========================
         FOOTER
      ========================== */

      .footer {
        position: absolute;

        bottom: 29mm;

        left: 32mm;
        right: 32mm;

        display: flex;

        justify-content: space-between;
        align-items: flex-end;
      }

      .footer-section {
        width: 220px;
      }

      .footer-center {
        text-align: center;
      }

      .footer-right {
        text-align: right;
      }

      .footer-value {
        font-size: 14px;
        font-weight: 600;

        color: #0f172a;

        margin-bottom: 6px;
      }

      .footer-label {
        padding-top: 6px;

        border-top: 1px solid #94a3b8;

        font-size: 11px;

        color: #64748b;

        text-transform: uppercase;

        letter-spacing: 1px;
      }

      /* =========================
         CERTIFICATE ID
      ========================== */

      .certificate-id {
        position: absolute;

        bottom: 17mm;

        font-size: 10px;

        color: #94a3b8;

        letter-spacing: 1px;
      }

      .certificate-id strong {
        color: #64748b;
      }

      /* =========================
         BLUE ACCENT
      ========================== */

      .accent {
        width: 60px;
        height: 3px;

        background: #00629b;

        margin: 0 auto 15px;
      }
    </style>
  </head>


  <body>

    <div class="certificate">

      <!-- Decorative Borders -->

      <div class="outer-border"></div>
      <div class="inner-border"></div>

      <!-- Corners -->

      <div class="corner top-left"></div>
      <div class="corner top-right"></div>
      <div class="corner bottom-left"></div>
      <div class="corner bottom-right"></div>


      <!-- Logo -->

      ${
        logoUrl
          ? `
            <div class="logo-container">
              <img
                class="logo"
                src="${logoUrl}"
                alt="Organization Logo"
              />
            </div>
          `
          : ""
      }


      <!-- Organization -->

      <div class="organization">
        IEEE Student Branch
      </div>


      <!-- Certificate Heading -->

      <div class="title">
        Certificate
      </div>

      <div class="subtitle">
        of Participation
      </div>

      <div class="accent"></div>


      <!-- Main Content -->

      <div class="presented-text">
        This is to certify that
      </div>


      <div class="name">
        ${name}
      </div>


      <div class="branch">
        ${branch}
      </div>


      <div class="description">

        has successfully participated in

        <span class="event">
          ${event}
        </span>

        held on

        <strong>
          ${date}
        </strong>.

        <br />

        This certificate is awarded in recognition of their
        enthusiastic participation, commitment, and contribution
        towards the successful completion of the event.

      </div>


      <!-- Footer -->

      <div class="footer">

        <div class="footer-section">

          <div class="footer-value">
            ${issueDate}
          </div>

          <div class="footer-label">
            Date of Issue
          </div>

        </div>


        <div class="footer-section footer-center">

          <div class="footer-value">
            IEEE GBPIET
          </div>

          <div class="footer-label">
            Organizing Committee
          </div>

        </div>


        <div class="footer-section footer-right">

          <div class="footer-value">
            Authorized Signatory
          </div>

          <div class="footer-label">
            Signature
          </div>

        </div>

      </div>


      <!-- Certificate ID -->

      <div class="certificate-id">
        Certificate ID:
        <strong>
          ${certificateId}
        </strong>
      </div>

    </div>

  </body>

  </html>
  `;
};

export default templateCertificate;

