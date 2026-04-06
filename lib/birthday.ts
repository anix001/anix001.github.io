import { parseISO, startOfDay, differenceInDays, differenceInYears } from "date-fns";

function getNextBirthday(birthDate: string): Date {
  const today = startOfDay(new Date());
  const birth = parseISO(birthDate);
  const thisYear = today.getFullYear();

  let next = new Date(thisYear, birth.getMonth(), birth.getDate());
  if (next < today) {
    next = new Date(thisYear + 1, birth.getMonth(), birth.getDate());
  }
  return next;
}

export function getDaysUntilBirthday(birthDate: string): number {
  return differenceInDays(getNextBirthday(birthDate), startOfDay(new Date()));
}

export function getAge(birthDate: string): number {
  return differenceInYears(new Date(), parseISO(birthDate));
}

export function getAgeThisYear(birthDate: string): number {
  return new Date().getFullYear() - parseISO(birthDate).getFullYear();
}

export function isBirthdayToday(birthDate: string): boolean {
  return getDaysUntilBirthday(birthDate) === 0;
}

export function isBirthdaySoon(birthDate: string, withinDays: number): boolean {
  const days = getDaysUntilBirthday(birthDate);
  return days > 0 && days <= withinDays;
}

export function getBirthdayStatus(days: number): { label: string; color: string } {
  if (days === 0) return { label: "🎂 Today!", color: "#fbbf24" };
  if (days <= 7) return { label: "This week!", color: "#f97316" };
  if (days <= 30) return { label: "This month", color: "#3b82f6" };
  return { label: `${days} days away`, color: "#6b7280" };
}

export function getCountdownRingPercent(days: number): number {
  if (days === 0) return 100;
  return Math.max(0, Math.min(100, Math.round((1 - days / 365) * 100)));
}

export function getZodiacSign(birthDate: string): { sign: string; emoji: string } {
  const date = parseISO(birthDate);
  const m = date.getMonth() + 1;
  const d = date.getDate();

  if ((m === 3 && d >= 21) || (m === 4 && d <= 19)) return { sign: "Aries", emoji: "♈" };
  if ((m === 4 && d >= 20) || (m === 5 && d <= 20)) return { sign: "Taurus", emoji: "♉" };
  if ((m === 5 && d >= 21) || (m === 6 && d <= 20)) return { sign: "Gemini", emoji: "♊" };
  if ((m === 6 && d >= 21) || (m === 7 && d <= 22)) return { sign: "Cancer", emoji: "♋" };
  if ((m === 7 && d >= 23) || (m === 8 && d <= 22)) return { sign: "Leo", emoji: "♌" };
  if ((m === 8 && d >= 23) || (m === 9 && d <= 22)) return { sign: "Virgo", emoji: "♍" };
  if ((m === 9 && d >= 23) || (m === 10 && d <= 22)) return { sign: "Libra", emoji: "♎" };
  if ((m === 10 && d >= 23) || (m === 11 && d <= 21)) return { sign: "Scorpio", emoji: "♏" };
  if ((m === 11 && d >= 22) || (m === 12 && d <= 21)) return { sign: "Sagittarius", emoji: "♐" };
  if ((m === 12 && d >= 22) || (m === 1 && d <= 19)) return { sign: "Capricorn", emoji: "♑" };
  if ((m === 1 && d >= 20) || (m === 2 && d <= 18)) return { sign: "Aquarius", emoji: "♒" };
  return { sign: "Pisces", emoji: "♓" };
}
