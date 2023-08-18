import n from "./components.mjs";
import { testFunc as a } from "./utils/testFunc.mjs";
const e = function(o) {
  n.forEach((t) => {
    o.use(t);
  });
}, c = {
  install: e
};
export {
  c as default,
  a as testFunc
};
