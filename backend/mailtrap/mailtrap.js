import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = process.env.MAILTRAP_ENDPOINT;

export const mailtrapClient = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

export const sender = {
    email: "mailtrap@demomailtrap.com",
    name: "2F-AUTH",
};

// const recipients = [
//     {
//         email: "ankitbharatwaaj@gmail.com",
//     }
// ];

// client
//     .send({
//         from: sender,
//         to: recipients,
//         subject: "You are awesome!",
//         text: "Congrats for sending test email with Mailtrap!",
//         category: "Integration Test",
//     })
//     .then(console.log, console.error);