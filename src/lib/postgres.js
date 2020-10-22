import Slonik from "slonik";
import { POSTGRES_URL } from "./base.js";

export const sql = Slonik.sql;
export const pool = Slonik.createPool(POSTGRES_URL);

export const end = () => {
  return pool.end();
};
