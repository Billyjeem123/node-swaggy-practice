"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCurrency = formatCurrency;
function formatCurrency(value, locale = 'en-NG') {
    return new Intl.NumberFormat(locale, {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(value);
}
