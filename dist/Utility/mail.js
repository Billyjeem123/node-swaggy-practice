"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = sendMail;
const nodemailer = require("nodemailer");
function sendMail(_a) {
    return __awaiter(this, arguments, void 0, function* ({ to, subject, html }) {
        const transporter = nodemailer.createTransport({
            host: 'sendtruly.com',
            port: 465,
            secure: true,
            auth: {
                user: 'no-reply@sendtruly.com',
                pass: 'w?92EJXuXpZt'
            }
        });
        yield transporter.sendMail({
            from: '"Your App Name" <no-reply@sendtruly.com>',
            to,
            subject,
            html
        });
    });
}
