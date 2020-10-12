<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">點數匯入作業</h2>
          <v-card outlined>
            <v-toolbar flat>
              <v-btn color="primary" @click="toggleModal = true">
                <v-icon>mdi-plus</v-icon> 新增
              </v-btn>
              <v-btn color="error" class="ml-4">
                <v-icon>mdi-close</v-icon> 刪除
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="success">
                匯出 Excel
              </v-btn>
            </v-toolbar>
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
    <v-dialog
      v-model="toggleModal"
      width="800px"
      scrollable
      persistent
      retain-focus
      fullscreen
    >
      <v-card>
        <v-card-title class="primary white--text">
          享樂金點數匯入紀錄詳細資訊
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined class="d-flex">
            <v-card-text color="#fff">
              <v-container>
                <v-row>
                  <v-col cols="5" class="mt-n5">
                    <v-select
                      :items="items"
                      v-model="model"
                      label="匯入客戶"
                      :readonly="false"
                      value="還記得你說家是唯一的城堡"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="3" class="mt-n5">
                    <v-btn color="primary" class="mt-4">
                      Excel 範例檔下載
                    </v-btn>
                  </v-col>
                  <v-col cols="4" class="mt-n5">
                    <v-select
                      :items="items"
                      v-model="model"
                      label="點數類別"
                      :readonly="false"
                      value="還記得你說家是唯一的城堡"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="4" class="mt-n5">
                    <v-select
                      :items="items"
                      label="受益對象"
                      value="非信託"
                    ></v-select>
                  </v-col>
                  <v-col cols="4" class="mt-n5">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="信託啟日"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(date)"
                          >OK</v-btn
                        >
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="4" class="mt-n5">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="信託迄日"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(date)"
                          >OK</v-btn
                        >
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-textarea
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="發放說明"
                      hint="請輸⼊中英文字⺟、數字，限 50 個字"
                      value="還記得你說家是唯一的城堡"
                    >
                    </v-textarea>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="date"
                          label="點數有效迄日"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="date" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false"
                          >Cancel</v-btn
                        >
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(date)"
                          >OK</v-btn
                        >
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-textarea
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="備註"
                      hint="請輸⼊中英文字⺟、數字，限 250 個字"
                    >
                    </v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-text color="#fff">
              <v-container>
                <v-row>
                  <v-col cols="12" class="mt-n5 mb-4">
                    <v-tooltip right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn color="teal" dark v-bind="attrs" v-on="on">
                          <strong>?</strong>
                        </v-btn>
                      </template>
                      <span>
                        作業前，請先備妥點數匯⼊清單檔 (檔案型態: Excel)。<br />
                        1.
                        檔案欄位依序為工號、匯⼊金額、姓名，第一列為標題，匯入的資料從第⼆列開始。
                        <br />
                        2. 選擇電腦中的 Excel 檔案，按下
                        Upload，系統進⾏初步檢查，無法匯⼊者將列於異常清單。
                        <br />
                        3. 按下確認匯⼊後，系統將逐一檢查匯入成功與異常清單。
                        <br />
                      </span>
                    </v-tooltip>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-file-input
                      small-chips
                      multiple
                      label="選擇 Excel"
                      placeholder="點擊上傳"
                      prepend-icon=""
                      hint="格式限制為大小限制 2MB 的 XSLX"
                      persistent-hint
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" class="mt-5">
                    <h3 class="d-flex">
                      <span>檢查成功清單</span>
                      <div class="ml-auto d-flex">
                        <small class="d-flex">
                          <div class="mr-12">共計筆數</div>
                          <div style="width: 120px">1,200,000</div>
                        </small>
                        <small class="d-flex">
                          <div class="mr-12">總點數</div>
                          <div style="width: 120px">99,999</div>
                        </small>
                      </div>
                    </h3>
                    <v-data-table
                      v-model="selected"
                      :headers="importTableHeaders"
                      :items="desserts"
                      item-key="name"
                      class="elevation-1 mt-2"
                      disable-pagination
                      disable-filtering
                      disable-sort
                    >
                    </v-data-table>
                  </v-col>
                  <v-col cols="12" class="mt-5">
                    <h3 class="d-flex">
                      <span>檢查失敗清單</span>
                      <div class="ml-auto d-flex">
                        <small class="d-flex">
                          <div class="mr-12">共計筆數</div>
                          <div style="width: 120px">1,200,000</div>
                        </small>
                        <small class="d-flex">
                          <div class="mr-12">總點數</div>
                          <div style="width: 120px">99,999</div>
                        </small>
                      </div>
                    </h3>
                    <v-data-table
                      v-model="selected"
                      :headers="importTableHeaders"
                      :items="desserts"
                      item-key="name"
                      class="elevation-1 mt-2"
                      disable-pagination
                      disable-filtering
                      disable-sort
                    >
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text large>
            <v-icon>mdi-checkbox-marked-outline</v-icon> 暫存
          </v-btn>
          <v-btn
            color="default"
            class="ml-lg-4"
            @click="toggleModal = false"
            text
            large
          >
            回列表
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { sysStore } from '~/store'

@Component({
  layout: 'default',
  middleware: 'auth'
})
export default class TravelPointPointImportOperation extends Vue {
  private headers: Array<any> = [
    { text: '受益對象', value: 'calories', align: 'start', sortable: false },
    { text: '客戶', value: 'fat', align: 'start', sortable: false },
    { text: '點數類別名稱', value: 'fat', align: 'start', sortable: false },
    { text: '發放說明', value: 'fat', align: 'start', sortable: false },
    { text: '建檔日期', value: 'fat', align: 'start', sortable: false },
    { text: '匯入總人數', value: 'fat', align: 'start', sortable: false },
    { text: '匯入總點數', value: 'fat', align: 'start', sortable: false }
  ]

  private importTableHeaders: Array<any> = [
    { text: '工號', value: 'calories', align: 'start', sortable: false },
    { text: '金額', value: 'fat', align: 'start', sortable: false },
    { text: '姓名', value: 'fat', align: 'start', sortable: false },
    { text: '結果說明', value: 'fat', align: 'start', sortable: false }
  ]

  private toggleModal: boolean = false

  private async created() {}
}
</script>
