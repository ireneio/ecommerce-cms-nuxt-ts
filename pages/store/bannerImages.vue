<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>首頁圖維護(暫用)</v-card-title>
          <v-banner color="#fff">
            <v-container>
              <v-row>
                <v-col cols="3">
                  <v-select :items="items" label="圖片位置"></v-select>
                </v-col>
                <v-col cols="3">
                  <v-file-input
                    small-chips
                    multiple
                    label="問卷Banner"
                    prepend-icon=""
                  ></v-file-input>
                </v-col>
                <v-col cols="3" class="mt-4">
                  <v-btn color="primary">
                    <v-icon>mdi-checkbox-marked-outline</v-icon> 儲存
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-banner>
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
export default class StoreBannerImages extends Vue {
  private tabs: Array<any> = [
    { name: '進行中' },
    { name: '未開始' },
    { name: '已結束' }
  ]
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
