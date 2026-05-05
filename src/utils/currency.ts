export function formatPKR(amount: number): string {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace('PKR', '₨');
}

export function calculateDiscount(original: number, sale: number): number {
  return Math.round(((original - sale) / original) * 100);
}
