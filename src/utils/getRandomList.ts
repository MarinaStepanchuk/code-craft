const getRandomList = <T>(list: T[], count: number): T[] => {
  const result: Set<T> = new Set();
  const n = count < list.length ? count : list.length;
  for (let i = 1; result.size <= n; i += 1) {
    result.add(list[Math.floor(Math.random() * list.length)]);
  }
  return Array.from(result);
};

export default getRandomList;