<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">活動退貨單</h2>
          <v-card outlined>
            <v-card-text>
              <v-banner color="rgba(60, 141, 188, 0.05)">
                <v-container>
                  <v-row>
                    <v-col cols="3">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="退貨單號關鍵字"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="訂單編號關鍵字"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-select
                        :items="items"
                        label="依退貨狀態查詢"
                      ></v-select>
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
                            label="申請起日"
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
                            label="申請迄日"
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
                      <v-select
                        :items="items"
                        label="是否使用STAYFUN金流"
                      ></v-select>
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
          瘋活動退貨資訊
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-card-title>
              <h3>
                退貨單狀態:
                <span class="primary--text ml-4">瘋活動票券已退貨</span>
              </h3>
            </v-card-title>
            <v-card-subtitle class="mt-2">
              退貨單號碼: MR2009291003502733 <br />
              訂單編號: MXS2009260C22J81652 <br />
              建立日期:2020-09-29 08:35:02 am <br />
              姓名: Danny <br />
              Email: danny_hsieh@mayohr.com <br />
              市話: 0988777666 <br />
              手機: 0932065694
            </v-card-subtitle>
            <v-toolbar flat>
              <v-btn color="primary">繼續退貨</v-btn>
              <v-btn color="default" class="ml-4">取消退貨</v-btn>
              <v-btn
                color="success"
                class="ml-4"
                @click="toggleHistory = !toggleHistory"
                >歷程
              </v-btn>
            </v-toolbar>
            <v-card-text color="#fff">
              <div>
                <span>折讓單號: </span>
                <span class="primary--text ml-4">N/A</span>
                <v-radio-group v-model="radios" row>
                  <template v-slot:label>
                    <div>折讓單類型</div>
                  </template>
                  <v-radio value="aaa" readonly>
                    <template v-slot:label>
                      <div>
                        電子折讓單
                      </div>
                    </template>
                  </v-radio>
                  <v-radio value="Duckduckgo" class="ml-lg-4" readonly>
                    <template v-slot:label>
                      <div>
                        紙本折讓單
                      </div>
                    </template>
                  </v-radio>
                  <v-radio value="Duckduckgo1" class="ml-lg-4" readonly>
                    <template v-slot:label>
                      <div>
                        無折讓單
                      </div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </div>
            </v-card-text>
            <v-card-text color="#fff">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">交易兌換序號</th>
                      <th class="text-left">商品狀態</th>
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
            </v-card-text>
            <v-card-text color="#fff">
              <v-card>
                <v-card-title>退刷狀態</v-card-title>
                <v-card-text>
                  <div>
                    刷退 :
                    <span class="primary--text ml-4">0</span>
                  </div>
                  <div>
                    刷退時間 :
                    <span class="primary--text ml-4">
                      2020-09-29 08:35:04 am
                    </span>
                  </div>
                </v-card-text>
              </v-card>
            </v-card-text>
            <v-card-text color="#fff">
              <v-card>
                <v-card-title>退點狀態</v-card-title>
                <v-card-text>
                  <div>
                    退點 :
                    <span class="primary--text ml-4">50,000</span>
                  </div>
                  <div>
                    退點時間 :
                    <span class="primary--text ml-4">
                      2020-09-29 08:35:04 am
                    </span>
                  </div>
                </v-card-text>
              </v-card>
            </v-card-text>
            <v-card-text color="#fff" v-if="toggleHistory">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">狀態</th>
                      <th class="text-left">狀態詳細說明</th>
                      <th class="text-left">最後更新日期</th>
                      <th class="text-left">退貨總額</th>
                      <th class="text-left">刷退</th>
                      <th class="text-left">退點</th>
                      <th class="text-left">折讓單號</th>
                      <th class="text-left">折讓單類型</th>
                      <th class="text-left">刷退金額</th>
                      <th class="text-left">退款批次編號</th>
                      <th class="text-left">退款批次序號</th>
                      <th class="text-left">申請審核時間</th>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { sysStore } from '~/store'

@Component({
  layout: 'default',
  middleware: 'auth'
})
export default class FunActivityRefundFunActivityOrder extends Vue {
  private headers: Array<any> = [
    { text: '退貨單號', value: 'fat', align: 'start', sortable: false },
    {
      text: '申請日期',
      value: 'fat',
      align: 'start',
      sortable: true
    },
    { text: '訂單編號', value: 'fat', align: 'start', sortable: false },
    { text: '活動名稱', value: 'fat', align: 'start', sortable: false },
    { text: '姓名', value: 'fat', align: 'start', sortable: false },
    { text: '電話', value: 'fat', align: 'start', sortable: false },
    { text: 'Email', value: 'fat', align: 'start', sortable: false },
    {
      text: '是否使用 STAYFUN 金流',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '退貨總金額', value: 'fat', align: 'start', sortable: false },
    { text: '退刷現金', value: 'fat', align: 'start', sortable: false },
    { text: '退貨點數', value: 'fat', align: 'start', sortable: false }
  ]

  private toggleModal: boolean = true

  private toggleHistory: boolean = false

  private async created() {}
}
</script>
