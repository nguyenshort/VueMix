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
      <vs-alert shadow v-model:hidden-content="show" >
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
  </div>

</template>
<script lang="ts" setup>
import './components/Button/Base/_button.sass'
import VsButton from "./components/Button/Base/VsButton";
import {ref} from "vue";
import VsAlert from "./components/Alert/Base/VsAlert.vue";

const show = ref(false)
</script>


<style>
#prview {
  max-width: 600px;
  margin: 0 auto;
}

#prview > * + * {
  margin-top: 1rem;
}
</style>
