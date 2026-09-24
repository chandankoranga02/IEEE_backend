const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_POSITIONS = ["1st", "2nd", "3rd"];

const validateCertificateFields = (req, res, next) => {
  const { name, email, event, branch, date, position } = req.body;

  // ── Required fields ──────────────────────────────────────────────────────
  if (!name || !email || !event || !branch || !date) {
    return res.status(400).json({
      success: false,
      message: "All fields (name, email, event, branch, date) are required",
    });
  }

  const trimmed = {
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    event: String(event).trim(),
    branch: String(branch).trim(),
    date: String(date).trim(),
    position: position ? String(position).trim() : null,
  };

  // ── Email format ─────────────────────────────────────────────────────────
  if (!EMAIL_REGEX.test(trimmed.email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }


  if (trimmed.position && !VALID_POSITIONS.includes(trimmed.position)) {
    return res.status(400).json({
      success: false,
      message: `position must be one of: ${VALID_POSITIONS.join(", ")}`,
    });
  }

  req.certificateData = trimmed;
  next();
};

export { validateCertificateFields };
