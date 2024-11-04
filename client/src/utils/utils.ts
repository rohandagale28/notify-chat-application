// Email validation
export function validateEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

// Data formatter
export const FormatDate = (date: Date) => {
  const hours = new Date(date).getHours()
  const minutes = new Date(date).getMinutes()
  return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`
}
