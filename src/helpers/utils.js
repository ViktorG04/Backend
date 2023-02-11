import bcrypt from "bcryptjs";

export const passwordEncrypt = (password = "") => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

export const nameCapitalize = (word = "") => {
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

export const dateFormat = (date = "") => {
  let dateTime = new Date(date).toISOString();
  return dateTime.split("T")[0].split("-").reverse().join("-");
};

export const total = (arr) => {
  const total = arr.reduce((acc, item) => {
    return (acc += item.amount);
  }, 0.0);
  return +total.toFixed(2);
};

export const creditDebitTransfer = (total, transfers) => {
  const CATEGORY = "Transfer";
  const all = +total.toFixed(2);

  const transformTransfer = transfers.map((transfer) => {
    const { date, amount, description } = transfer;
    return { date, amount, category: CATEGORY, description };
  });

  return { all, transformTransfer };
};
