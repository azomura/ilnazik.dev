export function formatOrderNumber(position: number) {
  return String(position).padStart(2, '0')
}
