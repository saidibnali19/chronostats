export const validateSignup = (body: any) => {
    if (!body.firstName || !body.lastName || !body.email || !body.password) {
        return "All fields (fisrt name, last name, email, password) are required.";
    }

    if (body.password.length < 6) {
        return "Password must be at least 6 characters.";
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(body.email)) {
        return "Invalid email format.";
    }

    return null;
};
