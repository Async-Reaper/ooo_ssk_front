export const usePlaceholderItems = (maxValue: number) => {
  const arr = [];
  for (let i = 1; i <= maxValue; i++) {
    arr.push(i);
  }
   
  return arr;
};
