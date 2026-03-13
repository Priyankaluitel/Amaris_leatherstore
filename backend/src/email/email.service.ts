import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;

    constructor() {
        // Using Ethereal Email for testing purposes
        // In a real application, you would use environment variables for configuration
        this.transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'dummy@ethereal.email', // Replace with real credentials or test account
                pass: 'dummy_pass',
            },
        });
    }

    async sendOrderConfirmation(email: string, orderDetails: any) {
        const info = await this.transporter.sendMail({
            from: '"Amaris Leather Store" <noreply@amarisleather.com>',
            to: email,
            subject: 'Your order has been placed!',
            text: `Hello, your payment is done and your order #${orderDetails.id} of $${orderDetails.total} is being processed.`,
            html: `<b>Hello!</b><p>Your payment is done and your order #${orderDetails.id} of $${orderDetails.total} is being processed.</p>`,
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
}
