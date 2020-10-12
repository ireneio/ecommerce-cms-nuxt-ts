<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">報表查詢</h2>
          <v-card outlined>
            <v-toolbar flat>
              <v-btn color="success">
                <v-icon>mdi-checkbox-marked-outline</v-icon> 批次簽核
              </v-btn>
              <v-btn color="primary" class="ml-4" @click="toggleModal = true">
                <v-icon>mdi-plus</v-icon> 歷史資料匯入
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-banner color="rgba(60, 141, 188, 0.05)">
                <v-container>
                  <v-row>
                    <v-col cols="3">
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
                            label="申請開始日期"
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
                    <v-col cols="3">
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
                            label="申請結束日期"
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
                    <v-col cols="3">
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
                            label="簽核同意開始日期"
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
                    <v-col cols="3">
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
                            label="簽核同意結束日期"
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
                    <v-col cols="3" class="mt-n7">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="關鍵字"
                        hint="請輸入表單名稱、帳號、姓名"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3" class="mt-n7">
                      <v-select :items="items" label="狀態"></v-select>
                    </v-col>
                    <v-col cols="6" class="mt-n3">
                      <v-btn color="primary">
                        <v-icon>mdi-magnify</v-icon> 搜尋
                      </v-btn>
                      <v-btn color="default" class="ml-lg-4">
                        清除
                      </v-btn>
                      <v-btn color="success" class="ml-lg-4">
                        匯出 Excel
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-banner>
            </v-card-text>

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
          歷史資料匯入
        </v-card-title>
        <v-card-text>
          <v-card outlined class="mt-4">
            <v-card-subtitle>
              作業前，請先備妥清單(檔案型態:Excel)。 <br />
              檔案欄位依序為案件編號，申請人帳號、公司別、申請人姓名、表單名稱、申請時間、簽核時間、申請金額、請款月份、發放日期，第一列為標題，匯入的資料從第二列開始。<br />
              選擇電腦中的Excel檔案，按下上傳，系統會進行初步檢查，無法匯入者將列於異常清單。<br />
              按下確認匯入後，系統將逐一新增表單紀錄 <br />
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
                        label="檢查成功清單"
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
                        label="檢查異常清單"
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
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" @click="toggleModal = false" text large>
            回列表
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="toggleFormDetailModal"
      width="800px"
      scrollable
      persistent
      retain-focus
      fullscreen
    >
      <v-card>
        <v-card-title class="primary white--text">
          報表查詢【0519測試生育/SFADM-RD0007】
        </v-card-title>
        <v-card-text>
          <v-card outlined class="mt-4">
            <v-card-subtitle>
              狀態：待補件 / 案件編號：05120090818AG6C1535
              <v-spacer></v-spacer>
              申請時間：2020/09/08 15:36 / 簽核時間：2020/09/08 15:36
            </v-card-subtitle>
            <v-card-title>0519測試生育</v-card-title>
            <v-card-text>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">填表人</th>
                      <th class="text-left">填表人帳號</th>
                      <th class="text-left">申請人</th>
                      <th class="text-left">申請人帳號</th>
                      <th class="text-left">補助金額</th>
                      <th class="text-left">事實發生日</th>
                      <th class="text-left">胎數</th>
                      <th class="text-left">相關文件</th>
                      <th class="text-left">備註</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in desserts" :key="item.name">
                      <td>{{ item.name }}</td>
                      <td>{{ item.calories }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-card class="mt-4">
                <v-card-title>
                  簽核人員
                </v-card-title>
                <v-card-subtitle>2020/09/08 15:36</v-card-subtitle>
                <v-card-text>32A長髮女神</v-card-text>
                <v-card-actions>
                  <v-btn color="primary">列印</v-btn>
                </v-card-actions>
              </v-card>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="default"
            @click="toggleFormDetailModal = false"
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
export default class WelfareReportList extends Vue {
  private headers: Array<any> = [
    { text: '案件編號', value: 'fat', align: 'start', sortable: false },
    {
      text: '申請人帳號',
      value: 'fat',
      align: 'start',
      sortable: true
    },
    { text: '公司別', value: 'fat', align: 'start', sortable: false },
    { text: '申請人', value: 'fat', align: 'start', sortable: false },
    { text: '申請表單', value: 'fat', align: 'start', sortable: false },
    { text: '申請時間', value: 'fat', align: 'start', sortable: true },
    { text: '簽核時間', value: 'fat', align: 'start', sortable: true },
    { text: '申請金額', value: 'fat', align: 'start', sortable: true },
    { text: '狀態', value: 'fat', align: 'start', sortable: true },
    { text: '更新帳號', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private toggleModal: boolean = false

  private toggleFormDetailModal: boolean = true

  private async created() {}
}
</script>
