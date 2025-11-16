// ----- NAME VALIDATION -----
export const validateName = (value: string) => {
    const cleaned = value.trimStart();

    if (!cleaned || cleaned.trim().length === 0) {
        return { value: cleaned, error: "This field is required." };
    }
    return { value: cleaned, error: "" };
};

// ----- EMAIL VALIDATION -----
export const validateEmailField = (
    value: string,
): { value: string; error: string } => {
    const cleanedStart = value.trimStart(); // remove only leading spaces first

    // If after removing leading spaces the rest is empty or just spaces -> error
    if (!cleanedStart || cleanedStart.trim().length === 0) {
        return { value: cleanedStart, error: "Email is required." };
    }

    // Also remove trailing spaces (user may accidentally add them)
    const normalized = cleanedStart.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalized)) {
        return { value: normalized, error: "Enter a valid email address." };
    }

    return { value: normalized, error: "" };
};

// ----- PASSWORD STRENGTH -----
export const getPasswordStrength = (value: string) => {
    if (!value) return "";

    let score = 0;
    if (value.length >= 6) score++;
    if (value.length >= 10) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score <= 2) return "weak";
    if (score <= 4) return "medium";
    return "strong";
};

// ----- PASSWORD VALIDATION -----
export const validatePasswordField = (value: string) => {
    if (!value) return { error: "Password is required." };

    if (value.length < 6) {
        return { error: "Password must be at least 6 characters." };
    }

    return { error: "" };
};

export const validateSigninPassword = (value: string) => {
    if (!value) {
        return { error: "Password is required." };
    }

    if (value.length < 6) {
        return { error: "Password must be at least 6 characters." };
    }

    return { error: "" };
};

// ----- CONFIRM PASSWORD VALIDATION -----
export const validateConfirmPasswordField = (
    value: string,
    password: string,
) => {
    if (!value) return { error: "Please confirm your password." };

    if (value !== password) {
        return { error: "Passwords do not match." };
    }

    return { error: "" };
};
