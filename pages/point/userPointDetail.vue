<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>帳號點數查詢</v-card-title>
          <v-banner color="#fff">
            <v-container>
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    v-model="model"
                    :counter="max"
                    :rules="rules"
                    label="帳號"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-select :items="items" label="信託"></v-select>
                </v-col>
                <v-col cols="3">
                  <v-select :items="items" label="點數類別名稱"></v-select>
                </v-col>
                <v-col cols="3">
                  <v-checkbox
                    v-model="selected"
                    label="顯示剩餘點數為0的匯入紀錄"
                    :value="true"
                  ></v-checkbox>
                </v-col>
                <v-col cols="6" class="mt-n7">
                  <v-text-field
                    v-model="model"
                    :counter="max"
                    :rules="rules"
                    label="發放說明"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3" class="mt-n3">
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
export default class PointUserPointDetail extends Vue {
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
