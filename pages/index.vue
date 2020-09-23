<template>
  <!-- <div class="container">STAYFUN BACKEND</div> -->
  <div></div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
// import { landingStore, dialogStore, giftStore, authStore } from '~/store'

@Component({
  layout: 'default',
  middleware: 'auth'
})
export default class Index extends Vue {}
</script>
