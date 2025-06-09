import {getHours, getMinutes, getSeconds, getTime, format, parse} from 'date-fns';
import {ELECTOR_REGISTRATION_START_DATE} from "@/constants/general";

const MONTH_ABBREVS = [
  'Jan','Feb','Mar','Apr','May','Jun',
  'Jul','Aug','Sep','Oct','Nov','Dec'
];

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

export function registrationStartDate() {
  return formatDate(formatUnixTimestamp(ELECTOR_REGISTRATION_START_DATE));
}

export function parseFormattedDate(formattedDate, dateFormat = "dd/MM/yyyy") {
  return parse(formattedDate, dateFormat, new Date());
}

export function getMonthAbbrev(monthOrDate) {
  let idx = null;

  if (monthOrDate instanceof Date) {
    idx = monthOrDate.getMonth();           // 0-based
  } else if (typeof monthOrDate === 'number') {
    idx = monthOrDate - 1;                  // convert 1–12 → 0–11
  } else if (typeof monthOrDate === 'string') {
    const lc = monthOrDate.toLowerCase();
    idx = MONTH_ABBREVS.findIndex(m => m.toLowerCase() === lc)
    // if user passed full name, try matching:
    >= 0
      ? MONTH_ABBREVS.findIndex(m => m.toLowerCase() === lc)
      : ['january','february','march','april','may','june',
        'july','august','september','october','november','december']
        .findIndex(full => full === lc);
  }

  return (idx >= 0 && idx < 12) ? MONTH_ABBREVS[idx] : null;
}

export function formatUnixTimestamp(unixTimestamp) {
  return new Date(unixTimestamp * 1000);
}