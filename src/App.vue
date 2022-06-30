<template>
  <div id="prview">
    <vs-button-group>
      <vs-button success flat>
        Button
      </vs-button>
      <vs-button warn upload>
        Button
      </vs-button>
    </vs-button-group>

    <vs-button>
      Primary
    </vs-button>

    <div>
      <vs-alert v-model:hidden-content="show" >
        <template #title>
          Vuesax Framework
        </template>
        <template #default>
          Vuesax (pronounced / vjusacksː /, as view sacks) is a to make projects easily and with a
          Unique and pleasant style, Vuesax is created from scratch and designed for all types of
          developed from the frontend lover to the backend that wants to easily create
          your visual approach to the end user
        </template>
      </vs-alert>
    </div>


    <div class="box-loading">
<!--
      <vs-loading type="corners" :is-visible="false" />
-->
    </div>

    <div class="center content-inputs">
      <vs-input v-model:value="value" placeholder="Name" />
    </div>

    <div class="center content-inputs">
      <vs-input v-model:value="value" placeholder="Evan You" label="Name" />
    </div>

    <div class="center content-inputs">
      <vs-input
          label-placeholder="Country"
          v-model:value="value"
          success
          border
          state="success"
      >
        <template #icon>
          <i class='bx bx-user'></i>
        </template>

        <template #primary>
          Lỗi đăng ký
        </template>

      </vs-input>
    </div>

    <div class="center">
      <vs-checkbox v-model:value="option">
        Option
      </vs-checkbox>
    </div>


    <div class="center">
    <vs-checkbox v-model:value="option">
      Primary
    </vs-checkbox>
    <vs-checkbox success v-model:value="option">
      Success
    </vs-checkbox>
    <vs-checkbox danger v-model:value="option">
      Danger
    </vs-checkbox>
    <vs-checkbox warn v-model:value="option">
      warning
    </vs-checkbox>
    <vs-checkbox dark v-model:value="option">
      dark
    </vs-checkbox>
    <vs-checkbox color="#7d33ff" v-model:value="option">
      HEX
    </vs-checkbox>
    <vs-checkbox color="rgb(59,222,200)" v-model:value="option">
      RGB
    </vs-checkbox>
  </div>


    <div class="center con-checkbox">
      <vs-checkbox val="html" v-model:value="options">
        Html
      </vs-checkbox>
      <vs-checkbox val="css" v-model:value="options">
        Css
      </vs-checkbox>
      <vs-checkbox val="javascript" v-model:value="options">
        Javascript
      </vs-checkbox>
      <vs-checkbox val="vue" v-model:value="options">
        Vue
      </vs-checkbox>
      <vs-checkbox val="vuesax" v-model:value="options">
        Vuesax
      </vs-checkbox>

      <span class="data">
        {{ options }}
      </span>
    </div>


    <div style="height: 300px"></div>



  </div>

</template>
<script lang="ts" setup>
import './components/Button/Base/_button.sass'
import VsButton from "./components/Button/Base/VsButton";
import {reactive, ref} from "vue";
import VsAlert from "./components/Alert/Base/VsAlert.vue";
import VsInput from "@components/Input/Base/VsInput.vue";
import VsCheckbox from "@components/CheckBox/Base/VsCheckbox.vue";

const show = ref(false)
const option = ref(true)
const options = reactive<string[]>([])

const value = ref('')
</script>


<style>
#prview {
  max-width: 600px;
  margin: 0 auto;
}

#prview > * + * {
  margin-top: 1rem;
}

.box-loading {
  width: 120px;
  height: 120px;
  position: relative;
  margin: 5px;
  border-radius: 20px;
  box-shadow: 0px 10px 20px -10px rgba(0,0,0,.07);
  overflow: hidden;
  cursor: pointer;
  transition: all .25s ease;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex-wrap: wrap;
}

body, button, input {
  font-family: Poppins,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
}
</style>
