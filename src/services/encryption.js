import CryptoJS from "crypto-js";

// Encryption service for secure note handling
export const EncryptionService = {
  // Encrypt note content with password
  encrypt: (content, password) => {
    try {
      const encrypted = CryptoJS.AES.encrypt(content, password).toString();
      return { success: true, data: encrypted };
    } catch (error) {
      return { success: false, error: "Encryption failed" };
    }
  },

  // Decrypt note content with password
  decrypt: (encryptedContent, password) => {
    try {
      const decrypted = CryptoJS.AES.decrypt(
        encryptedContent,
        password
      ).toString(CryptoJS.enc.Utf8);
      if (!decrypted) {
        return { success: false, error: "Invalid password" };
      }
      return { success: true, data: decrypted };
    } catch (error) {
      return { success: false, error: "Decryption failed" };
    }
  },

  // Generate secure hash for password verification
  generateHash: (password) => {
    return CryptoJS.SHA256(password).toString();
  },

  // Validate password strength
  validatePassword: (password) => {
    const minLength = 4;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let strength = 0;
    let feedback = [];

    if (password.length < minLength) {
      feedback.push(`Password must be at least ${minLength} characters long`);
    } else {
      strength += 1;
    }

    if (!hasLowerCase) {
      feedback.push("Include lowercase letters");
    } else {
      strength += 1;
    }

    if (!hasUpperCase) {
      feedback.push("Include uppercase letters");
    } else {
      strength += 1;
    }

    if (!hasNumbers) {
      feedback.push("Include numbers");
    } else {
      strength += 1;
    }

    if (!hasSpecialChar) {
      feedback.push("Include special characters");
    } else {
      strength += 1;
    }

    let level = "Very Weak";
    if (strength >= 4) level = "Strong";
    else if (strength >= 3) level = "Moderate";
    else if (strength >= 2) level = "Weak";

    return {
      isValid: password.length >= minLength,
      strength: level,
      score: strength,
      feedback,
    };
  },
};
