const calcDriveTime = (start: string | null, end: string | null) => {
  if (start && end) {
    const startTime = new Date(Number(start)).getTime();
    const endTime = new Date(Number(end)).getTime();
    let diffInMilliSeconds = Math.abs(startTime - endTime) / 1000;

    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;
    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;
    const seconds = Math.floor(diffInMilliSeconds);

    let totalTimeInString = '';
    if (hours > 0) totalTimeInString += `${hours}시간 `;
    if (minutes > 0) totalTimeInString += `${minutes}분`;
    if (seconds > 0) totalTimeInString += `${seconds}초`;

    return totalTimeInString;
  }
  return `0분`;
};

export default calcDriveTime;
