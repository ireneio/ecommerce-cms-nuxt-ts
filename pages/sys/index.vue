<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>功能表管理</v-card-title>
          <v-toolbar flat>
            <v-btn color="primary"> <v-icon>mdi-plus</v-icon> 新增 </v-btn>
            <v-btn color="success" class="ma-2">
              <v-icon>mdi-lead-pencil</v-icon> 修改
            </v-btn>
            <v-btn color="error"> <v-icon>mdi-close</v-icon> 刪除 </v-btn>
          </v-toolbar>
          <v-card-text>123</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component({
  layout: 'default',
  middleware: 'auth'
})
export default class SysIndex extends Vue {}
</script>
