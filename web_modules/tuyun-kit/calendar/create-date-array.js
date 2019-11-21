export default function CreateDateArr(year, month) {
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);
  const dateArr = [];
  const preDateLen = (-monthStart.getDay() - 5) % 7; // +2 保证是周一开始
  const curMonthDays = monthEnd.getDate(); // 当月的天数
  for (let i = 0; i < 6 * 7; i++) {
    const row = Math.floor(i / 7);
    if (!dateArr[row]) dateArr[row] = [];
    dateArr[row].push({
      date: new Date(year, month, preDateLen + i),
      isCurMonth: preDateLen + i > 0 && preDateLen + i <= curMonthDays
    });
  }
  return dateArr;
}
