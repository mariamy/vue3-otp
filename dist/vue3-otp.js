import { defineComponent as B, ref as h, computed as H, watch as j, onMounted as K, openBlock as d, createElementBlock as i, Fragment as N, renderList as O, withDirectives as R, normalizeClass as _, vModelText as b, nextTick as L } from "vue";
var g = /* @__PURE__ */ ((o) => (o[o.prev = 1] = "prev", o[o.next = 2] = "next", o))(g || {});
const M = ["onUpdate:modelValue", "autocomplete", "placeholder", "onInput", "onKeyup", "onPaste"], S = /* @__PURE__ */ B({
  __name: "Vue3Otp",
  props: {
    inputsCount: {
      type: Number,
      default: 4
    },
    modelValue: {
      type: String,
      default: ""
    },
    placeholder: {
      type: Array,
      default: ["", "", "", ""]
    },
    classes: {
      type: Array,
      default: ["", "", "", ""]
    }
  },
  emits: ["update:modelValue", "complete"],
  setup(o, { emit: C }) {
    const p = o, f = C, v = h(), l = h([]), s = H(() => {
      var e;
      return (e = v.value) == null ? void 0 : e.querySelectorAll("input");
    }), m = (e) => {
      c(e), A(e);
    }, c = (e) => f("update:modelValue", e.join("")), y = (e, n) => {
      e.replace(/[^0-9]/g, "").split("").forEach((a) => {
        n < p.inputsCount && (l.value[n] = a, n++);
      }), s.value[0].blur();
    }, r = (e, n = 1) => {
      if (s.value)
        if (n === g.prev) {
          const t = s.value[e - 1];
          t && t.focus();
        } else {
          const t = s.value[e + 1];
          t ? t.focus() : k() === -1 && s.value[e].blur();
        }
    }, V = (e) => {
      const n = e.key;
      /[^0-9]/g.test(n) && e.preventDefault();
    }, D = (e, n) => {
      const t = e.data || e.target.value;
      !t || isNaN(parseInt(t)) || (t.length > 1 ? y(t, n) : (l.value[n] = t, r(n, 2)), m(l.value));
    }, I = (e, n) => {
      const t = e.key, a = e.code;
      t === "Backspace" || a === "Backspace" || t === "Delete" || a === "Delete" || t === "ArrowLeft" ? r(n) : t === "ArrowRight" && r(n, 2), c(l.value);
    }, k = () => l.value.findIndex((e) => isNaN(parseInt(e))), A = (e) => {
      e.length === p.inputsCount && k() === -1 && f("complete", l.value.join(""));
    }, x = () => {
      const e = p.modelValue.replace(/[^0-9]/g, "").split("");
      l.value = e.map((n) => n), c(l.value), L(() => r(e.length - 1, 2));
    }, w = (e, n) => {
      var a;
      e.preventDefault();
      let t = (a = e.clipboardData) == null ? void 0 : a.getData("text/plain");
      t && (y(t, n), m(l.value));
    };
    return j(
      () => p.modelValue,
      (e) => {
        l.value.join("") !== e && x();
      }
    ), K(() => x()), (e, n) => (d(), i("div", {
      class: "vue3-otp",
      ref_key: "inputsContainerRef",
      ref: v
    }, [
      (d(!0), i(N, null, O(o.inputsCount, (t, a) => R((d(), i("input", {
        key: t,
        type: "text",
        inputmode: "numeric",
        "onUpdate:modelValue": (u) => l.value[a] = u,
        autocomplete: a === 0 ? "one-time-code" : "off",
        placeholder: o.placeholder[a] || "",
        class: _([`vue3-otp-input-${a}`, o.classes[a]]),
        onKeypress: V,
        onInput: (u) => D(u, a),
        onKeyup: (u) => I(u, a),
        onPaste: (u) => w(u, a)
      }, null, 42, M)), [
        [b, l.value[a]]
      ])), 128))
    ], 512));
  }
});
export {
  S as default
};
