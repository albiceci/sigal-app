import { tplContext } from "./carType/tplType/tplContext";
import { fireContext } from "./wealthType/fireType/fireContext";

export type productIDs =
  | "00000000-e1fe-43e2-85cd-439ac4c6a857"
  | "00000000-e1fe-43e2-85cd-439ac4c6a856";

export const productIDtoContextDict = {
  "00000000-e1fe-43e2-85cd-439ac4c6a857": tplContext,
  "00000000-e1fe-43e2-85cd-439ac4c6a856": fireContext,
};
