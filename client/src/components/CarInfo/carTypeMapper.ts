const carTypeMapper = (carType?: string): string => {
  switch (carType) {
    case 'large':
      return '대형';
    case 'middle':
      return '중형';
    case 'small':
      return '소형';
    default:
      return '정보 없음';
  }
};

export default carTypeMapper;
