const bestCountry = (listPlayers) => {
  const countries = [];
  listPlayers.forEach((element) => {
    countries.push({
      country: element.country.code,
      wins: calculateWins(element.data.last),
    });
  });
  return countries.reduce(function (prev, current) {
    return prev && prev.wins > current.wins ? prev : current;
  });
};

const calculateWins = (str) => {
  let sum = 0;
  for (let i = 0; i < str.length; i++) {
    sum += parseInt(str[i]);
  }
  return sum;
};

const dmiAverage = (listPlayers) => {
  const total = listPlayers.reduce((acc, current) => {
    const imc =
      current.data.weight / 1000 / Math.pow(current.data.height / 100, 2);
    return acc + imc;
  }, 0);
  return total / listPlayers.length;
};

const median = (elements) => {
  const medianHeightArr = elements.map((element) => element.data.height);

  medianHeightArr.sort(function (a, b) {
    return a - b;
  });

  const half = Math.floor(medianHeightArr.length / 2);

  if (medianHeightArr.length % 2) return medianHeightArr[half];

  return (medianHeightArr[half - 1] + medianHeightArr[half]) / 2.0;
};

export { bestCountry, calculateWins, dmiAverage, median };
