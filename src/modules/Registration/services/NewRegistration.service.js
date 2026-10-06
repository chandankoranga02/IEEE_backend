import Registration from "../../../models/Registration.js";
import generateRegistrationId from "../../../utils/RegistrationIDgenerator.js";
import generateCertificateId from "../../../utils/certificateIDgenerator.js";
import certificate from "../../../models/certificate.js"

const createRegistrationService = async ({
  eventName,
  date,
  teamName,
  members,
  mode,
}) => {
  // =====================================================
  // 1. REQUIRED DATA VALIDATION
  // =====================================================

  if (!eventName) {
    const error = new Error("Event name is required");
    error.statusCode = 400;
    throw error;
  }

  if (!mode) {
    const error = new Error("Registration mode is required");
    error.statusCode = 400;
    throw error;
  }

  if (!members) {
    const error = new Error("Members data is required");
    error.statusCode = 400;
    throw error;
  }

  if (!Array.isArray(members)) {
    const error = new Error("Members must be an array");
    error.statusCode = 400;
    throw error;
  }

  // =====================================================
  // 2. MODE VALIDATION
  // =====================================================

  const normalizedMode = mode.toUpperCase();

  if (!["INDIVIDUAL", "TEAM"].includes(normalizedMode)) {
    const error = new Error("Invalid mode. Mode must be INDIVIDUAL or TEAM");
    error.statusCode = 400;
    throw error;
  }

  // =====================================================
  // 3. INDIVIDUAL / TEAM VALIDATION
  // =====================================================

  if (normalizedMode === "INDIVIDUAL") {
    // Individual can have only ONE member
    if (members.length !== 1) {
      const error = new Error(
        "Individual registration can have only one member",
      );
      error.statusCode = 400;
      throw error;
    }

    // Individual cannot have team name
    if (teamName) {
      const error = new Error(
        "Team name is not allowed for individual registration",
      );
      error.statusCode = 400;
      throw error;
    }
  }

  if (normalizedMode === "TEAM") {
    // Team must have at least 2 members
    if (members.length < 2) {
      const error = new Error(
        "Team registration must have at least two members",
      );
      error.statusCode = 400;
      throw error;
    }

    // Team name is required
    if (!teamName || !teamName.trim()) {
      const error = new Error("Team name is required for team registration");
      error.statusCode = 400;
      throw error;
    }
  }

  // =====================================================
  // 4. MEMBER DATA VALIDATION
  // =====================================================

  for (const member of members) {
    const { instituteId, name, phone, email, year, branch } = member;

    if (!instituteId || !name || !phone || !email || !year || !branch) {
      const error = new Error(
        "All member fields are required: instituteId, name, phone, email, year and branch",
      );

      error.statusCode = 400;
      throw error;
    }
  }

  // =====================================================
  // 5. TEAM NAME UNIQUENESS CHECK
  // =====================================================

  if (normalizedMode === "TEAM") {
    const existingTeam = await Registration.findOne({
      eventName: eventName.trim(),
      teamName: teamName.trim(),
      mode: "TEAM",
    });

    if (existingTeam) {
      const error = new Error(
        "This team name is already registered for this event",
      );

      error.statusCode = 409;
      throw error;
    }
  }

  // =====================================================
  // 6. GENERATE UNIQUE REGISTRATION ID
  // =====================================================

  let registrationId = null;

  const MAX_ATTEMPTS = 10;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const generatedId = generateRegistrationId();

    const existingRegistration = await Registration.exists({
      registrationId: generatedId,
    });

    if (!existingRegistration) {
      registrationId = generatedId;
      break;
    }
  }

  // =====================================================
  // 7. ID GENERATION FAILED
  // =====================================================

  if (!registrationId) {
    const error = new Error(
      "Unable to generate a unique registration ID. Please try again.",
    );

    error.statusCode = 500;
    throw error;
  }

  // =====================================================
  // 8. CREATE REGISTRATION
  // =====================================================

  const registration = await Registration.create({
    registrationId,
    date,
    eventName: eventName.trim(),
    mode: normalizedMode,
    teamName: normalizedMode === "TEAM" ? teamName.trim() : null,
    members,
  });

const certificateData = [];

for (const member of members) {
  let certificateId = null;

  for (let attempt = 1; attempt <= 10; attempt++) {
    const generatedId = generateCertificateId();

    const existingCertificate = await certificate.exists({
      certificateId: generatedId,
    });

    if (!existingCertificate) {
      certificateId = generatedId;
      break;
    }
  }

  if (!certificateId) {
    const error = new Error(
      "Unable to generate a unique certificate ID. Please try again.",
    );
    error.statusCode = 500;
    throw error;
  }

  certificateData.push({
    name: member.name,
    email: member.email,
    branch: member.branch,
    eventName: eventName.trim(),
    date,
    certificateId,
    position: null,
    status: "pending",
  });
}

await certificate.insertMany(certificateData);

  // =====================================================
  // 9. RETURN RESULT
  // =====================================================

  return registration;
};

export default createRegistrationService;
