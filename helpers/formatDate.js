import {getHours, getMinutes, getSeconds, getTime, format, parse} from 'date-fns';

export function getCurrentHours(date = new Date()) {
  return getHours(date);
}

export function getCurrentMinutes(date = new Date()) {
  return getMinutes(date);
}

export function getCurrentSeconds(date = new Date()) {
  return getSeconds(date);
}

export function getTimestamp(date = new Date()) {
  return getTime(date);
}

export function formatTime(date = new Date()) {
  return format(date, 'EEEE, d MMMM yyyy');
}

export function getFirstDateOfMonth(){
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

export function formatDate(dateString = new Date(), dateFormat = "dd/MM/yyyy") {
  const parsedDate =
    typeof dateString === "string"
      ? parse(dateString, dateFormat, new Date())
      : dateString;

  return format(parsedDate, dateFormat);
}

export function parseFormattedDate(formattedDate, dateFormat = "dd/MM/yyyy") {
  return parse(formattedDate, dateFormat, new Date());
}
