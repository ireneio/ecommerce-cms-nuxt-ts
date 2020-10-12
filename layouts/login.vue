<template>
  <v-app id="inspire">
    <nuxt />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { dialogStore, authStore } from '../store'

@Component
export default class LoginLayout extends Vue {}
</script>
