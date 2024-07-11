const User = require("../../db/models/user");

const validateSignupInput = async (data) => {
    const { firstName, lastName, email, password, phone } = data;
    const errors = [];

    // Validate firstName
    if (!firstName) {
        errors.push({ field: "firstName", message: "First name is required" });
    }

    // Validate lastName
    if (!lastName) {
        errors.push({ field: "lastName", message: "Last name is required" });
    }

    // Validate email
    // if (email) {
    //     try {
    //         const existingUser = await User.findOne({ where: { email } });
    //         if (existingUser) {
    //             errors.push({ field: "email", message: "User with this credential already exist" });
    //         }
    //     } catch (error) {
    //         console.error("Error finding user:", error);
    //         errors.push({ field: "email", message: "Error checking email uniqueness" });
    //     }
        
    // }else{
    //     errors.push({ field: "email", message: "email name is required" });
    // }
    // Validate password
    if (!password) {
        errors.push({ field: "password", message: "Password is required" });
    }

    // Validate phone (optional)
    if (phone && typeof phone !== 'string' || phone == null || !phone) {
        errors.push({ field: "phone", message: "Phone is required" });
    }

    return errors;
};

module.exports = validateSignupInput;
