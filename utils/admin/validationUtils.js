// ✅ Utility Function for Email Validation
const isValidEmail = (email) => {
  const emailRegex =
    /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// ✅ Utility Function to Check Missing Fields
const getMissingFields = (fields) => {
  return Object.keys(fields).filter((key) => !fields[key]?.trim());
};

module.exports = { isValidEmail, getMissingFields };
