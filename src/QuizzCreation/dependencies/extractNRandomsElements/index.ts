const extractNRandomsElements = <T>(number: number, set: T[]): T[] => {
  return [...set].sort((a, b) => 0.5 - Math.random()).slice(0, number);
};

export default extractNRandomsElements;
