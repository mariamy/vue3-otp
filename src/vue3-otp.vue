<template>
  <div class="vue3-otp" ref="inputsContainerRef">
    <input
      type="text"
      v-for="(input, i) in inputsCount"
      :key="input"
      v-model="otpArr[i]"
      @keypress="keypressHandler"
      @input="inputHandler($event, i)"
      @keyup="keyupHander($event, i)"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, reactive, ref, watch } from 'vue';
import { DefaultOptions } from '@/types';
import { NeighborEnum } from '@/enums';
export * from "@/timer";

const defaultOptions = {
  focusOnLoad: true,
  disableArrows: false,
  focusNextOnInput: true,
}

export default defineComponent({
  props: {
    inputsCount: {
        type: Number,
        default: 4
    },
    otp: {
        type: String,
        default: ""
    },
    options: {
        type: Object as () => DefaultOptions,
        default: defaultOptions
    }
  },
  emits: ["change", "complete"],
  setup(props, { emit }) {
    const inputsContainerRef = ref<HTMLElement>();
    const otpArr = ref<number[] | string[]>([]);
    const opts: DefaultOptions = reactive({
      ...defaultOptions,
      ...props.options
    });
      
    const inputs = computed((): any =>
      inputsContainerRef.value?.querySelectorAll("input"));

    const emitOtp = () => emit('change', otpArr.value.join(""));

    const focusNeighbor = (i: number, type: NeighborEnum = 1): void => {
      if (!inputs.value) return;
      if (type === NeighborEnum.prev) {
        const prev = inputs.value[i - 1];
        if (prev) prev.focus();
      } else {
        const next = inputs.value[i + 1];
        if (next) next.focus();
      }
    }

    const keypressHandler = (e: KeyboardEvent) => {
      const key = e.key;
      if (/[a-zA-Z]/g.test(key)) {
        e.preventDefault();
      }
    }

    const inputHandler = (e: InputEvent, i: number): void | Boolean => {
      const value = e.data;
      if (!value) return;

      const data = parseInt(value);
      if(isNaN(data)) return false;
              
      otpArr.value[i] = data as number;
      if (inputs.value && opts.focusNextOnInput) {
        focusNeighbor(i, 2);
      }
      emitOtp();
      handeComplete();
    };

    const keyupHander = (e: KeyboardEvent, i: number) => {
      const key = e.key;
      const code = e.code;
      if (key === "Backspace" || code === "Backspace" || key === "Delete" || code === "Delete") {
        focusNeighbor(i);
      } else {
        if (!opts.disableArrows) {
          if (key === "ArrowLeft") focusNeighbor(i);
          else if (key === "ArrowRight") focusNeighbor(i, 2);
        }
      }
      emitOtp();
    };

    const handeComplete = () => {
      if (otpArr.value.length === props.inputsCount) {
          const index = otpArr.value.findIndex(l => isNaN(parseInt(l as string)));
          if (index === -1) emit('complete', otpArr.value.join(""));
      }
    };

    const asignValue = () => {
      const arr = props.otp.replace(/[^0-9]/g, "").split("");
      otpArr.value = arr.map(l => parseInt(l));
      if (opts.focusOnLoad) {
        nextTick(() => focusNeighbor(arr.length - 1, 2));
      }
    };

    watch(
      () => props.otp,
      () => asignValue()
    );

    watch(
      otpArr.value,
      () => emitOtp()
    );

    onMounted(() => asignValue());

    return {
      inputsContainerRef,
      keypressHandler,
      inputHandler,
      keyupHander,
      otpArr,
    };
  }
});
</script>
