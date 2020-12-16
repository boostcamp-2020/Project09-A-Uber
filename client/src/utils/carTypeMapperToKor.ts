const carTypes: string[] = ['large', 'middle', 'small'];
export type CarTypeEng = typeof carTypes[0] | typeof carTypes[1] | typeof carTypes[2];

export const carTypeMapperToKor = (carType: CarTypeEng): CarTypeEng | '' => {
  switch (carType) {
    case carTypes[0]:
      return '대형';
    case carTypes[1]:
      return '중형';
    case carTypes[2]:
      return '소형';
    default:
      return '';
  }
};
