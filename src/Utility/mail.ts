import * as nodemailer from 'nodemailer';

export async function sendMail({ to, subject, html }) {
  const transporter = nodemailer.createTransport({
    host: 'spadeals.com.ng',
    port: 465,
    secure: true,
    auth: {
      user: 'info@spadeals.com.ng',
    pass: 'vX8)6mZQBj)8s1'
    }
  });

  await transporter.sendMail({
    from: '"Your App Name" <info@spadeals.com.ng>',
    to,
    subject,
    html
  });
}
