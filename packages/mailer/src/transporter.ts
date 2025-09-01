import nodemailer from 'nodemailer';
import {
    getSmtpHost,
    getSmtpPassword,
    getSmtpPort,
    getSmtpUser
} from '@beluga/utils/env';

export function createTransporter() {
    const transporter = nodemailer.createTransport({
        host: getSmtpHost(),
        port: Number(getSmtpPort()),
        secure: false,
        auth: {
            user: getSmtpUser(),
            pass: getSmtpPassword()
        }
    });

    return transporter;
}
