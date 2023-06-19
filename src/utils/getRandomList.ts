const getRandomList = <T>(list: T[], count: number): T[] => {
  const result = [];
  const n = count < list.length + 1 ? count : list.length + 1;
  for (let i = 1; i < n; i += 1) {
    result.push(list[Math.floor(Math.random() * list.length)]);
  }
  return result;
};

export default getRandomList;
