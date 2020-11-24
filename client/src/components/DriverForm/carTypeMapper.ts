import { carTypes } from './DriverForm';

type CarType = typeof carTypes[0] | typeof carTypes[1] | typeof carTypes[2];

const carTypeMapper = (carType: CarType): CarType | '' => {
  switch (carType) {
    case carTypes[0]:
      return 'large';
    case carTypes[1]:
      return 'middle';
    case carTypes[2]:
      return 'small';
    default:
      return '';
  }
};

export default carTypeMapper;
