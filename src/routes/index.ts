import {Request, Response} from "express";

export const index = (req : Request, res : Response) => {
  return res.send({
    name: "onthecut/reservoir",
    href: "https://github.com/onthecut/reservoir",
  });
};
