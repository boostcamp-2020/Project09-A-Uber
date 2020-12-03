const calcDriveTime = (start: string | null, end: string | null) => {
  if (start && end) {
    const startTime = new Date(Number(start)).getTime();
    const endTime = new Date(Number(end)).getTime();
    const diff = Math.abs(startTime - endTime);

    const totalTimeMinutes = Math.floor(diff / 1000 / 60);

    return totalTimeMinutes;
  }
  return 0;
};

export default calcDriveTime;
