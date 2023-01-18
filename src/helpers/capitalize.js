export const nameCapitalize = (word) => {
  let transformWord = word.split(" ");

  return (transformWord = transformWord
    .map((word) => {
      return word
        .split(" ")
        .map((char) => char.charAt(0).toLocaleUpperCase() + char.slice(1))
        .join(" ");
    })
    .join(" "));
};
