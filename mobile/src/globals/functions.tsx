export function convertNumberToPrice(price:number): string {
  return (price / 100).toFixed(2) + " €";
}

export function formatDate(date:string|number): string {
  var d = new Date(date);
  const months = ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc']
  return d.getDate() + "-" + months[d.getMonth()] + "-" + d.getFullYear()
}
