<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4">特約商家匯入</h2>
        <v-card outlined>
          <v-card-subtitle>
            作業前，請先備妥特約商家清單(檔案型態:Excel)。<br />
            1、檔案欄位第一列為標題，匯入的資料從第二列開始，詳細欄位請參考Excel範例檔。<br />
            2、Excel範例檔有*欄位不得為空。<br />
            3、匯入商家資料時，請選擇電腦中的Excel檔案，按下Upload，系統將進⾏行初步檢查，無法匯入者將列於異常清單；<br />
            異常比對條件為商家電話資料，若已存在資料庫中的商家恕無法重複匯入，若您要建立新的商家名單，請確認商家資料不重複。<br />
            4、按下確認匯入後，系統將逐一新增特約商家。<br />
            5、目前僅提供商家基本資料與一個優惠方案匯入，商家圖片或是一個以上優惠方案請手動新增。<br />
            6、優惠方案為Excel內5個欄位，請全填或全不填，否則會出現在錯誤清單。<br />
            7、"優惠客戶公司id" 請填寫優惠客戶的公司id(群組代碼) 例如
            "天空公司(DEMO)" 就填寫 "DEMO"，多個公司請以","分隔。<br />
            如果是適用全體會員，請填寫"ALL"。 <br />＊ 商家分類代碼：1.美食,
            2.住宿, 3.舒壓, 4.生活, 5.時尚 <br />＊ 商家地區代碼：1.台北,
            2.新北, 3.桃園, 4.新竹, 5.苗栗, 6.台中, 7.彰化, 8.南投, 9.雲林,
            10.嘉義, 11.台南, 12.高雄, 13.屏東, 14.基隆, 15.宜蘭, 16.花蓮,
            17.台東, 18.澎湖, 19.金門, 20.馬祖 <br />
            <v-btn color="primary" class="mt-4">
              Excel 範例檔下載
            </v-btn>
          </v-card-subtitle>
          <v-card-text>
            <v-banner color="rgba(60, 141, 188, 0.05)">
              <v-container>
                <v-row>
                  <v-col cols="12">
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
                </v-row>
              </v-container>
            </v-banner>
            <v-banner class="mt-4">
              <v-container>
                <v-row>
                  <v-col cols="12" class="mt-n7">
                    <v-textarea
                      name="input-7-1"
                      label="商家匯入清單"
                      readonly
                      hint="共計 0 筆"
                      persistent-hint
                      :value="
                        'Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功, Andy RD-0002 匯入成功,Andy RD-0002 匯入成功, Andy RD-0002 匯入成功,Andy RD-0002 匯入成功, Andy RD-0002 匯入成功,Andy RD-0002 匯入成功, Andy RD-0002 匯入成功,Andy RD-0002 匯入成功, Andy RD-0002 匯入成功,Andy RD-0002 匯入成功, Andy RD-0002 匯入成功,Andy RD-0002 匯入成功, Andy RD-0002 匯入成功,'
                      "
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" class="mt-n7">
                    <v-textarea
                      name="input-7-1"
                      label="商家異常清單"
                      readonly
                      hint="共計 0 筆"
                      persistent-hint
                    ></v-textarea>
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
export default class StoreStoreImport extends Vue {
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
