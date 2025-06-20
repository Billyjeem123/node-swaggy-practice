import * as nodemailer from 'nodemailer';

export async function sendMail({ to, subject, html }) {
  const transporter = nodemailer.createTransport({
    host: 'sendtruly.com',
    port: 465,
    secure: true,
    auth: {
      user: 'no-reply@sendtruly.com',
    pass: 'w?92EJXuXpZt'
    }
  });

  await transporter.sendMail({
    from: '"Your App Name" <no-reply@sendtruly.com>',
    to,
    subject,
    html
  });
}
