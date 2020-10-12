<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4">票券匯入作業</h2>
        <v-card outlined>
          <v-card-subtitle>
            作業前，請先備妥票券匯入清單檔(檔案型態:Excel)。<br />
            1.請選擇本次匯入的供應商。<br />
            2.供應商下方將跳出各個供應商的Excel匯入範例檔下載（請注意:
            各供應商的Excel匯入範例檔格式不同）。<br />
            3.整理好Excel匯入內容，第一列為標題，匯入的資料從第二列開始，每項欄位皆為必填。<br />
            4.選擇一個Excel檔案，按下Upload，系統進行初步檢查，無法匯入者將列於異常清單。<br />
            5.按下確認匯入後，系統將逐一新增票券。
          </v-card-subtitle>
          <v-card-text>
            <v-banner color="rgba(60, 141, 188, 0.05)">
              <v-container>
                <v-row>
                  <v-col cols="9">
                    <v-select :items="items" label="選擇供應商"></v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-file-input
                      small-chips
                      multiple
                      label="選擇 EXCEL"
                      placeholder="點擊上傳"
                      prepend-icon=""
                      hint="格式限制為大小限制 2MB 的 XSLX"
                      persistent-hint
                    ></v-file-input>
                  </v-col>
                  <v-col cols="3" class="mt-4">
                    <v-btn color="primary">
                      <v-icon>mdi-checkbox-marked-outline</v-icon> 確認匯入
                    </v-btn>
                    <v-btn color="default" class="ml-lg-4">
                      清除
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-banner>
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
export default class CouponCouponImport extends Vue {
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
