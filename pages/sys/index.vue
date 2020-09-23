<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar flat>
            <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

            <!-- <v-toolbar-title>Title</v-toolbar-title> -->

            <v-btn color="primary"> <v-icon>mdi-plus</v-icon> 新增 </v-btn>
            <v-btn color="success" class="ma-2">
              <v-icon>mdi-lead-pencil</v-icon> 修改
            </v-btn>
            <v-btn color="error"> <v-icon>mdi-close</v-icon> 刪除 </v-btn>
            <!-- <v-spacer></v-spacer> -->

            <!-- <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-heart</v-icon>
            </v-btn>

            <v-btn icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn> -->
          </v-toolbar>
          <v-card-text>123</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
// import { landingStore, dialogStore, giftStore, authStore } from '~/store'

@Component({
  layout: 'default',
  middleware: 'auth'
})
export default class SysIndex extends Vue {}
</script>
