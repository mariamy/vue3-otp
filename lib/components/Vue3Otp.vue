<template>
    <div class="vue3-otp" ref="inputsContainerRef">
      <input
        v-for="(input, i) in inputsCount"
        :key="input"
        type="text"
        inputmode="numeric"
        v-model="otpArr[i]"
        :autocomplete="i === 0 ? 'one-time-code' : 'off'"
        :placeholder="placeholder[i] || ''"
        :class="[`vue3-otp-input-${i}`, classes[i]]"
        @keypress="keypressHandler"
        @input="inputHandler($event, i)"
        @keyup="keyupHander($event, i)"
        @paste="pasteHandler($event, i)"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, nextTick, onMounted, ref, watch } from 'vue';
  import { NeighborEnum } from '../enums';
  
  const props = defineProps({
    inputsCount: {
      type: Number,
      default: 4
    },
    modelValue: {
      type: String,
      default: ""
    },
    placeholder: {
      type: Array as () => string[],
      default: ['', '', '', '']
    },
    classes: {
      type: Array,
      default: ['', '', '', '']
    }
  });
  
  const emit = defineEmits(['update:modelValue', 'complete']);
  
  const inputsContainerRef = ref<HTMLElement>();
  const otpArr = ref<string[]>([]);
    
  const inputs = computed((): any =>
    inputsContainerRef.value?.querySelectorAll("input"));
  
  const updateOtp = (arr: string[]) => {
    emitOtp(arr);
    handeComplete(arr);
  };
  
  const emitOtp = (arr: string[]) => emit('update:modelValue', arr.join(""));
  
  const fillInputs = (text: string, i: number) => {
    const arr = text.replace(/[^0-9]/g, "").split("");
    arr.forEach(l => {
      if (i < props.inputsCount) {
        otpArr.value[i] = l;
        i++;
      }
    });
    inputs.value[0].blur();
  }
  
  const focusNeighbor = (i: number, type: NeighborEnum = 1): void => {
    if (!inputs.value) return;
    if (type === NeighborEnum.prev) {
      const prev = inputs.value[i - 1];
      if (prev) prev.focus();
    } else {
      const next = inputs.value[i + 1];
      if (next) next.focus();
      else if (findEmptyIndex() === -1) inputs.value[i].blur();
    }
  };
  
  const keypressHandler = (e: KeyboardEvent) => {
    const key = e.key;
    if (/[^0-9]/g.test(key)) {
      e.preventDefault();
    }
  };
  
  const inputHandler = (e: Event, i: number): void | Boolean => {
    const data = (e as InputEvent).data || (e.target as HTMLTextAreaElement).value;
    if (!data || isNaN(parseInt(data))) return;
  
    if (data.length > 1) {
      fillInputs(data, i);
    } else {
      otpArr.value[i] = data;
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
      if (key === "ArrowLeft") focusNeighbor(i);
      else if (key === "ArrowRight") focusNeighbor(i, 2);
    }
    emitOtp(otpArr.value);
  };

  const findEmptyIndex = () => otpArr.value.findIndex(l => isNaN(parseInt(l as string)));
  
  const handeComplete = (arr: string[]) => {
    if (arr.length === props.inputsCount) {
      const index = findEmptyIndex();
      if (index === -1) emit('complete', otpArr.value.join(""));
    }
  };
  
  const asignValue = () => {
    const arr = props.modelValue.replace(/[^0-9]/g, "").split("");
    otpArr.value = arr.map(l => l);
    emitOtp(otpArr.value);
    nextTick(() => focusNeighbor(arr.length - 1, 2));
  };
  
  const pasteHandler = (e: ClipboardEvent, i: number) => {
    e.preventDefault();
    let data = e.clipboardData?.getData('text/plain');
    if (data) {
      fillInputs(data, i);
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
  </script>
  