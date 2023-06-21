const getRandomList = <T>(list: T[], count: number): T[] => {
  const indexSet: Set<number> = new Set();
  const n = count < list.length ? count : list.length;
  for (let i = 1; indexSet.size <= n; i += 1) {
    indexSet.add(Math.floor(Math.random() * list.length));
  }
  return Array.from(indexSet).map((item) => list[item]);
};

export default getRandomList;
