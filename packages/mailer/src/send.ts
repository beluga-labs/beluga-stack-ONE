import { Transporter } from 'nodemailer';
import type { SendMailOptions } from './types';
import { getMailSenderAddress, getMailSenderName } from '@beluga/utils/env';

export async function sendEmail(
    transporter: Transporter,
    options: SendMailOptions
) {
    const { to, subject, html } = options;

    const from = `${getMailSenderName()} <${getMailSenderAddress()}>`;

    try {
        await transporter.sendMail({
            from,
            to,
            subject,
            html
        });
        console.log('Email sent successfully to:', to);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email.');
    }
}
