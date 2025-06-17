export function formatCurrency(value: number, locale: string = 'en-NG'): string {
  return new Intl.NumberFormat(locale, {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}
