import { defineComponent as t, onMounted as n } from "vue";
import "./index.scss.mjs";
const m = t({
  name: "lg-earth",
  components: {},
  props: {},
  emits: {},
  setup(o, r) {
    return n(() => {
      const e = document.querySelector("#container");
      new XE.Earth(e);
    }), {};
  }
});
export {
  m as default
};
