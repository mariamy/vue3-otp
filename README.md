# vue3-otp

Library to use OTP

![Gifphy](https://giphy.com/embed/gieotB7Q4ofW3Jw8XO)

## Installation
To install the latest version:
```
npm install --save vue3-otp
```

Import to your components
```javascript
import { ref } from 'vue'
import Vue3Otp from 'vue3-otp'

const otp = ref("")

const clear = () => otp.value = ""
const complete = (value) => console.log("Completed: ", value)
```

Example:
```javascript
<template>
  <vue3-otp
    v-model="otp"
    @complete="complete"
  />
  <button @click="clear">clear</button>
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
    <td>value</td>
    <td>string</td>
    <td>false</td>
    <td>""</td>
    <td>Value for binding (v-model="otp")</td>
  </tr>
  <tr>
    <td>inputsCount</td>
    <td>number</td>
    <td>false</td>
    <td>4</td>
    <td>Number of inputs</td>
  </tr>
  <tr>
    <td>placeholder</td>
    <td>array</td>
    <td>false</td>
    <td>["", "", "", ""]</td>
    <td></td>
  </tr>
    <tr>
    <td>classes</td>
    <td>array</td>
    <td>false</td>
    <td>["", "", "", ""]</td>
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

## Some basic styles
```css
.vue3-otp {
  display: inline-flex;
  gap: 10px;
}
input {
  width: 50px;
  height: 50px;
  text-align: center;
  border-color: transparent transparent #3451b2 transparent;
  border-width: 1px;
  font-size: 16px;
  line-height: 18px;
}
input:focus {
  border-bottom-width: 2px;
  outline: none;
}
button {
  width: 80px;
  height: 50px;
  margin-left: 10px;
  background: #3451b2;
  color: #fff;
  border: none;
  cursor: pointer;
}
```

