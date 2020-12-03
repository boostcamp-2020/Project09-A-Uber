const calcDriveTime = (start: string | null, end: string | null) => {
  if (start && end) {
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();

    return 0;
  }
  return 0;
};

export default calcDriveTime;
