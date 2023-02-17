import axios from "axios";
import { KEY_FIXER, API_FIXER } from "../config/config.js";

export const consultExchange = async ({ to = "", from = "", amount = 0.0 }) => {
  const config = {
    headers: {
      apikey: KEY_FIXER,
    },
  };

  try {
    const response = await axios.get(
      `${API_FIXER}/convert?to=${to}&from=${from}&amount=${amount}`,
      config
    );
    const request = await response.data;
    const {
      info: { rate },
      result,
    } = request;
    return { currency: rate, exchange: result };
  } catch (error) {
    console.log(error);
    throw new Error("Error response FIXER");
  }
};

export const getLatestExchange = async () => {
  const BASE = "USD";
  const NAME_KEY = "apikey";
  const myHeaders = new Headers();
  myHeaders.append(NAME_KEY, KEY_FIXER);
  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };
  try {
    const response = await fetch(
      `${API_FIXER}/latest?symbols=ars%2c%20eur%2c%20gtq%2c%20mxn&base=${BASE}`,
      requestOptions
    );
    const data = await response.json();
    return data.rates;
  } catch (error) {
    console.log(error);
    throw new Error("Error response FIXER");
  }
};
