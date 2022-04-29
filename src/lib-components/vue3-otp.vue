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
      @paste="pasteHandler($event, i)"
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
    modelValue: {
      type: String,
      default: ""
    },
    options: {
      type: Object as () => DefaultOptions,
      default: defaultOptions
    }
  },
  emits: ["update:modelValue", "complete"],
  setup(props, { emit }) {
    const inputsContainerRef = ref<HTMLElement>();
    const otpArr = ref<string[]>([]);
    const opts: DefaultOptions = reactive({
      ...defaultOptions,
      ...props.options
    });
      
    const inputs = computed((): any =>
      inputsContainerRef.value?.querySelectorAll("input"));

    const updateOtp = (arr: string[]) => {
      emitOtp(arr);
      handeComplete(arr);
    };

    const emitOtp = (arr: string[]) => emit('update:modelValue', arr.join(""));

    const focusNeighbor = (i: number, type: NeighborEnum = 1): void => {
      if (!inputs.value) return;
      if (type === NeighborEnum.prev) {
        const prev = inputs.value[i - 1];
        if (prev) prev.focus();
      } else {
        const next = inputs.value[i + 1];
        if (next) next.focus();
      }
    };

    const keypressHandler = (e: KeyboardEvent) => {
      const key = e.key;
      if (/[^0-9]/g.test(key)) {
        e.preventDefault();
      }
    };

    const inputHandler = (e: InputEvent, i: number): void | Boolean => {
      const data = e.data;
      if (!data || isNaN(parseInt(data))) return;
              
      otpArr.value[i] = data;
      if (inputs.value && opts.focusNextOnInput) {
        focusNeighbor(i, 2);
      }
      updateOtp(otpArr.value);
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
      emitOtp(otpArr.value);
    };

    const handeComplete = (arr: string[]) => {
      if (arr.length === props.inputsCount) {
          const index = otpArr.value.findIndex(l => isNaN(parseInt(l as string)));
          if (index === -1) emit('complete', otpArr.value.join(""));
      }
    };

    const asignValue = () => {
      const arr = props.modelValue.replace(/[^0-9]/g, "").split("");
      otpArr.value = arr.map(l => l);
      emitOtp(otpArr.value);
      if (opts.focusOnLoad) {
        nextTick(() => focusNeighbor(arr.length - 1, 2));
      }
    };

    const pasteHandler = (e: ClipboardEvent, i: number) => {
      e.preventDefault();
      let data = e.clipboardData?.getData('text');
      if (data) {
        const dataArr = data.replace(/[^0-9]/g, "").split("");
        dataArr.forEach(l => {
          if (i < props.inputsCount) {
            otpArr.value[i] = l;
            i++;
          }
        });
        updateOtp(otpArr.value);
      }
    };

    watch(
      () => props.modelValue,
      (newVal) => {
        if (otpArr.value.join("") !== newVal) {
          asignValue();
        }
      }
    );

    onMounted(() => asignValue());

    return {
      inputsContainerRef,
      keypressHandler,
      inputHandler,
      keyupHander,
      pasteHandler,
      otpArr,
    };
  }
});
</script>
