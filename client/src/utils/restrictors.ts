export const restrictInputLength = (value : string, length : number) : string => {
  if (value.length > length)
    return value.substring(0, length);
  return value;
}