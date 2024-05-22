export function generateUsername(email) {
  const atIndex = email.indexOf("@");
  if (atIndex !== -1) {
    return email.slice(0, atIndex);
  } else {
    // Xử lý trường hợp email không có ký tự '@'
    return email;
  }
}

export function generateRandomPassword(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}
// Confirmation code generator (5 chars)
export function generateConfirmationCode() {
  return Math.floor(10000 + Math.random() * 90000).toString();
}
// The function generates the expiration time for the confirmation code (60 seconds)
export function generateExpirationTime() {
  const expirationTime = new Date();
  expirationTime.setSeconds(expirationTime.getSeconds() + 60);
  return expirationTime;
}
