<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4">人員帳號匯入</h2>
        <v-card outlined>
          <v-card-subtitle>
            作業前，請先備妥人員清單(檔案型態:Excel)。 <br />1.
            檔案欄位依序為工號、預設密碼、電子信箱、中文姓名，第一列為標題，匯入的資料從第二列開始。<br />
            2.
            選擇匯入公司後，選擇電腦中的Excel檔案，按下Upload，系統進行初步檢查，無法匯入者將列於異常清單。<br />
            3.
            按下確認匯入後，系統將逐一新增系統帳號(帳號規則為公司代碼-員工工號，公司代碼由系統自動產生，無須輸入)。<br />
            4.
            因帳號匯入成功後需等待排程同步資料，請於60分鐘後再操作此次新增的帳號。<br />
          </v-card-subtitle>
          <v-toolbar flat>
            <v-btn color="info">
              Excel 範例檔下載
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <v-banner color="rgba(60, 141, 188, 0.05)">
              <v-container>
                <v-row>
                  <v-col cols="9">
                    <v-select :items="items" label="選擇公司"></v-select>
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
                  <v-col cols="6" class="mt-n7">
                    <v-textarea
                      name="input-7-1"
                      label="檢查成功清單"
                      readonly
                      hint="共計 0 筆"
                      persistent-hint
                    ></v-textarea>
                  </v-col>
                  <v-col cols="6" class="mt-n7">
                    <v-textarea
                      name="input-7-1"
                      label="檢查異常清單"
                      readonly
                      hint="共計 0 筆"
                      persistent-hint
                    ></v-textarea>
                  </v-col>
                  <v-col cols="3" class="mt-n3">
                    <v-btn color="primary">
                      <v-icon>mdi-checkbox-marked-outline</v-icon> 確認匯入
                    </v-btn>
                    <v-btn color="default" class="ml-lg-4">
                      取消
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
export default class SysImportTeam extends Vue {
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
