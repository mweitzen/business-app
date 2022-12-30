function getChoices(dataset: any[], key: string) {
  if (!dataset) return [];

  const rawChoices = dataset.map((item) => item[key]);

  const choices = rawChoices.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });

  return choices;
}

export default getChoices;
