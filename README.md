# vue3-otp

Library to use OTP

![Gifphy](https://media.giphy.com/media/1BH2ujRXDqNjDR7jwB/giphy.gif)

## Installation
To install the latest version:
```
npm install --save vue3-otp
```

Import to your components
```javascript
import { Vue3Otp } from "vue3-otp";
```

Example:
```javascript
<template>
  <vue3-otp
    :otp="otp"
    :inputsCount="9"
    @complete="handleComplete"
  />
</template>
```

## Props
<table>
  <tr>
    <th>Name<br></th>
    <th>Type</th>
    <th>Required</th>
    <th>Default</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>inputsCount</td>
    <td>number</td>
    <td>false</td>
    <td>4</td>
    <td>Number of inputs</td>
  </tr>
  <tr>
    <td>otp</td>
    <td>string</td>
    <td>false</td>
    <td>""</td>
    <td>Filled in inputs</td>
  </tr>
  <tr>
    <td>options</td>
    <td>object</td>
    <td>false</td>
    <td>
        {   
            focusOnLoad: true,
            disableArrows: true,
            focusNextOnInput: true 
        }
    </td>
    <td></td>
  </tr>
</table>

## Events
<table>
  <tr>
    <th>Name<br></th>
    <th>Description</th>
  </tr>
  <tr>
    <td>complete</td>
    <td>Handle complete event</td>
  </tr>
</table>

## Timer
Timer events:
<table>
  <tr>
    <th>Name<br></th>
    <th>Description</th>
  </tr>
  <tr>
    <td>start</td>
    <td>Start timer</td>
  </tr>
  <tr>
    <td>stop</td>
    <td>Stop timer</td>
  </tr>
  <tr>
    <td>resume</td>
    <td>Resume stopped timer</td>
  </tr>
  <tr>
    <td>reset</td>
    <td>Reset timer</td>
  </tr>
</table>

Timer data:
<table>
  <tr>
    <th>Name<br></th>
    <th>Type</th>
  </tr>
  <tr>
    <td>duration</td>
    <td>number</td>
  </tr>
  <tr>
    <td>timer</td>
    <td>string</td>
  </tr>
</table>

Import timer hook.
Example:

```javascript
import { Vue3Otp, useTimer } from 'vue3-otp';

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Vue3Otp, useTimer } from 'vue3-otp';

export default defineComponent({
  components: {
    Vue3Otp
  },
  setup() {
    const otp = ref("5");
    const handleComplete = (value: string) =>
      console.log('complete: ', value);
      
    return {
      ...useTimer(),
      otp,
      handleComplete,
    }
  }
});
</script>

<template>
  <vue3-otp
    :otp="otp"
    :inputsCount="6"
    @complete="handleComplete"
  />
  <div>
    {{ timer }}
    <button @click="reset">Reset</button>
    <button @click="stop">Stop</button>
    <button @click="resume">Resume</button>
  </div>
</template>
```

Resend Sms
```javascript
<script lang="ts">
import { defineComponent } from 'vue';
import { Vue3Otp, useTimer } from 'vue3-otp';

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

<template>
  <div id="app">
    <vue3-otp :otp="otp" />
    <div class="timer">
      {{ timer }}
      <a href="#" @click.prevent="resend">Send again</a>
    </div>
  </div>
</template>
```

## Some basic styles
```css
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
```

