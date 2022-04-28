<template>
  <div id="app">
    <vue3-otp :otp="otp" />
    <div class="timer">
      {{ timer }}
      <a href="#" @click.prevent="resend">Send again</a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Vue3Otp, { useTimer } from '@/vue3-otp.vue';

export default defineComponent({
  components: {
    Vue3Otp
  },
  setup() {
    const otp = ref("");
    const { timer, reset } = useTimer();
    const resend = () => {
      /** Send sms api */

      /** Clear inputs */
      otp.value = " ";

      /** Reset timer */
      reset();
    };
    return {
      otp,
      resend,
      timer,
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.vue3-otp {
  display: inline-flex;
  gap: 10px;
}
input {
  width: 50px;
  height: 50px;
  text-align: center;
  border-color: transparent transparent #999 transparent;
  border-width: 1px;
}
input:focus {
  border-bottom-color: #000;
  outline: none;
}
.timer {
  padding-top: 50px;
}
</style>
