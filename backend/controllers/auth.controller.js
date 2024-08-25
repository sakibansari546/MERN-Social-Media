import bcrypt from "bcrypt";
import crypto from 'crypto'

import User from "../models/user.model.js";

import { genrateTokenAndSetCookie } from "../utils/genrateTokenAndSetCookie.js";
import { sendResetTokenEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";
import { getDataURI } from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";


const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please enter all fields", success: false });
        }
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email", success: false });
        }
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Password must be between 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter", success: false });
        }

        let user = await User.findOne({ "personal_info.email": email });

        if (user) {
            // Check if verification token is expired
            if (user.personal_info.verificationTokenExpiresAt && user.personal_info.verificationTokenExpiresAt < Date.now()) {
                // Generate a new verification token
                const varificationToken = Math.floor(100000 + Math.random() * 900000).toString();

                user.personal_info.verificationTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour 
                user.personal_info.varificationToken = varificationToken;
                await user.save();

                genrateTokenAndSetCookie(res, user._id);
                await sendVerificationEmail(user.personal_info.email, varificationToken);

                return res.status(401).json({ message: "Email not verified, new verification code sent to your email", success: false });
            }
            return res.status(400).json({ message: "User already exists", success: false });
        }

        const hash_password = await bcrypt.hash(password, 10);
        const varificationToken = Math.floor(100000 + Math.random() * 900000) // generate 6 digit code

        const newUser = new User({
            personal_info: {
                username,
                email,
                password: hash_password,
                varificationToken,
                verificationTokenExpiresAt: Date.now() + 60 * 1000, // token expires in 1 min
            }
        })

        await newUser.save();

        genrateTokenAndSetCookie(res, newUser._id);
        await sendVerificationEmail(newUser.personal_info.email, varificationToken);

        res.status(200).json({
            message: "Signup successful",
            success: true,
            user: {
                ...newUser._doc,
                password: undefined,
            }
        });
    } catch (error) {
        if (error.code === 11000 || error.keyPattern?.email) {
            return res.status(400).json({ message: "Email already exists", success: false });
        }
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}


export const varifyEmail = async (req, res) => {
    let { code } = req.body;
    try {
        let user = await User.findOne({
            "personal_info.varificationToken": code,
            "personal_info.verificationTokenExpiresAt": { $gt: Date.now() }
        })
        if (!user) {
            return res.status(400).json({ message: "Invalid or expired verification code", success: false });
        }

        user.personal_info.isVerified = true;
        user.personal_info.varificationToken = undefined;
        user.personal_info.verificationTokenExpiresAt = undefined;

        await user.save();

        await sendWelcomeEmail(user.personal_info.email, user.personal_info.username);

        res.status(200).json({ message: "Email verified successfully", success: true, });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}

export const signin = async (req, res) => {
    let { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields", success: false });
        }
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email", success: false });
        }

        const user = await User.findOne({ "personal_info.email": email });
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        const isMatch = await bcrypt.compare(password, user.personal_info.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password", success: false });
        }

        if (!user.personal_info.isVerified) {
            return res.status(400).json({ message: "Email not verified", success: false });
        }

        genrateTokenAndSetCookie(res, user._id);
        return res.status(200).json({
            message: "Signin successful",
            success: true,
            user: {
                ...user._doc,
                password: undefined,
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};


export const logout = async (req, res) => {
    try {
        // Clear the authentication token cookie
        res.clearCookie("token", {
            httpOnly: true,  // Ensures the cookie is only accessible by the web server
            secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production
            sameSite: 'Strict',  // Ensures the cookie is sent only for same-site requests
        });

        // Send success response
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        // Handle any errors that occur during logout
        console.error('Error during logout:', error);
        res.status(500).json({ success: false, message: "An error occurred during logout" });
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if email is provided
        if (!email) {
            return res.status(400).json({ message: "Please enter all fields", success: false });
        }

        // Validate email format
        if (!emailRegex.test(email)) { // Fixed typo: .tast -> .test
            return res.status(400).json({ message: "Invalid email", success: false });
        }

        // Find user by email
        const user = await User.findOne({ "personal_info.email": email });
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        // Check if reset password token is already generated and not expired
        if (user.personal_info.resetPasswordExpiresAt && user.personal_info.resetPasswordExpiresAt > Date.now()) {
            return res.status(400).json({ message: "Password reset link already sent to your email", success: false });
        }

        // Check if email is verified
        if (!user.personal_info.isVerified) {
            return res.status(400).json({ message: "Email not verified", success: false });
        }

        // Generate reset token
        const resetPasswordToken = crypto.randomBytes(20).toString("hex");
        user.personal_info.resetPasswordToken = resetPasswordToken;
        user.personal_info.resetPasswordExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

        // Save user with the reset token and expiration time
        await user.save();

        // Create reset password link
        const resetPasswordLink = `http://localhost:5173/reset-password/${resetPasswordToken}`;

        // Send reset email
        await sendResetTokenEmail(user.personal_info.email, resetPasswordLink);

        // Send response
        return res.status(200).json({ message: "Password reset link sent to your email", success: true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        // Check if token and password are provided
        if (!token || !password) {
            return res.status(400).json({ message: "Invalid token or password", success: false });
        }

        // Find user by reset password token and ensure it's not expired
        const user = await User.findOne({
            "personal_info.resetPasswordToken": token,
            "personal_info.resetPasswordExpiresAt": { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired token", success: false });
        }

        // Validate password length and strength (example: at least 8 characters)
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Password must be between 6 to 20 characters and contain at least one numeric digit, one uppercase and one lowercase letter", success: false });
        }


        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user's password and clear reset token fields
        user.personal_info.password = hashedPassword;
        user.personal_info.resetPasswordToken = undefined;
        user.personal_info.resetPasswordExpiresAt = undefined;

        await user.save();

        return res.status(200).json({ message: "Password reset successful", success: true });
    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

export const checkAuth = async (req, res) => {
    try {
        let user = await User.findById(req.userId).select("-personal_info.password");
        if (!user) return res.status(400).json({ message: "User not found", success: false });

        res.status(200).json({ user });

    } catch (error) {
        console.log("Error in checkAuth ", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

export const editProfile = async (req, res) => {
    const { fullname, bio, username } = req.body;
    const profileImage = req.file;

    try {
        let user = await User.findById(req.userId);
        if (!user) return res.status(400).json({ message: "User not found", success: false });

        // Check if the username is already taken by another user
        let isUsername = await User.findOne({ "personal_info.username": username });
        if (isUsername && isUsername._id.toString() !== req.userId) {
            return res.status(400).json({ message: "Username already taken", success: false });
        }

        if (bio) user.personal_info.bio = bio;
        if (fullname) user.personal_info.fullname = fullname;
        if (username) user.personal_info.username = username;

        if (profileImage) {
            const fileURI = getDataURI(profileImage);

            try {
                const cloudResponse = await cloudinary.uploader.upload(fileURI, { resource_type: 'image' });
                user.personal_info.profile_img = cloudResponse.secure_url;
            } catch (err) {
                return res.status(500).json({ message: "Error uploading image", success: false });
            }
        }

        await user.save();

        // Exclude password from the response
        user = user.toObject();
        delete user.personal_info.password;

        return res.status(200).json({ message: "Profile updated successfully", success: true, user });

    } catch (error) {
        console.log(error);
        if (error.code === 11000 || error.keyPattern?.username) {
            return res.status(400).json({ message: "Username already exists", success: false });
        }
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};




export const deleteUser = async (req, res) => {
    try {
        let user = await User.findOneAndDelete({ "personal_info.email": "ankitbharatwaaj@gmail.com" });
        res.status(200).json({ message: "User deleted successfully", success: true });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

