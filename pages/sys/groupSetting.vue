<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>公司/群組管理</v-card-title>
          <v-toolbar flat>
            <v-btn color="primary"> <v-icon>mdi-plus</v-icon> 新增群組 </v-btn>
            <v-btn color="error" class="ml-2">
              <v-icon>mdi-close</v-icon> 批次刪除
            </v-btn>
            <v-btn color="success" class="ml-2">
              <v-icon>mdi-checkbox-marked-outline</v-icon> 批次啟用
            </v-btn>
            <v-btn color="warning" class="ml-2">
              <v-icon>mdi-checkbox-blank-outline</v-icon> 批次停用
            </v-btn>
          </v-toolbar>
          <v-banner color="#fff">
            <v-container>
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    v-model="model"
                    :counter="max"
                    :rules="rules"
                    label="群組名稱"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3" class="mt-4">
                  <v-btn color="primary">
                    <v-icon>mdi-magnify</v-icon> 搜尋
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-banner>
          <v-card-text>
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="desserts"
              :single-select="singleSelect"
              item-key="name"
              show-select
              class="elevation-1"
            >
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { sysStore } from '~/store'

@Component({
  layout: 'default',
  middleware: 'auth'
})
export default class SysGroupSetting extends Vue {
  // private async sendGetGroupListRequest() {
  //   try {
  //     await sysStore.getPermissionList({
  //       token: this.$cookies.get('accessToken')
  //     })
  //   } catch (e) {
  //     // error
  //   }
  // }

  private async created() {
    // await this.sendGetPermissionListRequest()
  }
}
</script>
