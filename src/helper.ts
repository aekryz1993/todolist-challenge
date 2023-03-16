import moment from "moment";

const apiUrl = (path: string) => `${import.meta.env.VITE_API}/${path}`

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const isValidEmail = (email: string) => email.toLowerCase().match(EMAIL_REGEX)

const getMyHeader = () => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  return myHeaders
}

const formattedDate = (date: FormDataEntryValue | null) => {
  if (typeof date !== "string" || !date) return null
  const splittedDate = date.split("-")
  return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
}

const formattedInputDate = (date: string | undefined) => {
  if (typeof date !== "string") return
  const m = moment(date, "MM-DD-YYYY")
  if (!m.isValid()) return
  return m.format().split('T')[0]
}

const checkIsOutdated = (date: string | undefined) => {
  if (typeof date !== "string") return
  const formattedDate = date.split('/').join('-')
  const m = moment(formattedDate, "DD/MM/YYYY")
  if (!m.isValid()) return
  return m.isBefore();
}

const relativeTime = (date: string | undefined) => {
  if (typeof date !== "string") return
  const formattedDate = date.split('/').join('-')
  const m = moment(formattedDate, "DD/MM/YYYY")
  if (!m.isValid()) return
  return m.fromNow() === "12 hours ago" ? "Today" : m.fromNow() === "in 12 hours" ? "Tomorrow" : m.fromNow() === "2 days ago" ? "Yesterday" : m.fromNow();
}

export {
  apiUrl,
  isValidEmail,
  getMyHeader,
  formattedDate,
  formattedInputDate,
  checkIsOutdated,
  relativeTime
}