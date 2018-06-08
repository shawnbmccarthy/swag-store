export const USDFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

export const DateFormatter = new Intl.DateTimeFormat('en-US', { 
  year: 'numeric', 
  month: 'long', 
  day: '2-digit' 
})
