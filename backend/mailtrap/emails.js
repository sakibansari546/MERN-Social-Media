import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const recipients = [{ email }];
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "Email Verification",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });

        console.log("Email sent successfully", response);
    } catch (error) {
        console.log(error);
    }
};

export const sendWelcomeEmail = async (email, username) => {
    const recipients = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: `Welcome ${username}`,
            html: WELCOME_EMAIL_TEMPLATE.replace("[User's Name]", username),
            category: "Welcome Email",
        });

        console.log("Email sent successfully", response);
    } catch (error) {
        console.log(error);
    }
};

export const sendResetTokenEmail = async (email, resetPasswordLink) => {
    const recipients = [{ email }];

    try {
        // Send email via Mailtrap
        const response = await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "Reset Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetPasswordLink),
            category: "Reset Password",
        });

        console.log("Email sent successfully", response);
        return response;
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send reset password email");
    }
};