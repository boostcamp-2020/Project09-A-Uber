export const numberWithCommas = (TaxiFee: number): string => {
  return `${TaxiFee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`;
};
