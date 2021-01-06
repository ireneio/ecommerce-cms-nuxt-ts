<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">票券退貨單查詢</h2>
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
                        label="依退貨單號查詢"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="依訂單編號查詢"
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
                            label="開始日期"
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
                            label="結束日期"
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
                    <v-col cols="3" class="mt-n3">
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
          票券退票資訊
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-card-title>
              <h3>
                退貨單狀態:
                <span class="primary--text ml-4">票券已退貨</span>
              </h3>
            </v-card-title>
            <v-toolbar flat>
              <v-btn color="primary">繼續退貨</v-btn>
              <v-btn color="default" class="ml-4">取消退貨</v-btn>
              <v-btn
                color="success"
                class="ml-4"
                @click="toggleHistoryModal = !toggleHistoryModal"
                >歷程
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-data-iterator
                      :items="refundInfo"
                      :items-per-page.sync="itemsPerPage"
                      hide-default-footer
                    >
                      <template v-slot:default="props">
                        <v-row>
                          <v-col
                            v-for="item in props.items"
                            :key="item.name"
                            cols="12"
                            lg="12"
                          >
                            <v-list dense>
                              <v-list-item>
                                <v-list-item-content
                                  >退貨單號碼</v-list-item-content
                                >
                                <v-list-item-content class="align-end">
                                  {{ item.退貨單號碼 }}
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-content
                                  >訂單編號</v-list-item-content
                                >
                                <v-list-item-content class="align-end">
                                  {{ item.訂單編號 }}
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-content
                                  >建立日期</v-list-item-content
                                >
                                <v-list-item-content class="align-end">
                                  {{ item.建立日期 }}
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-content>姓名</v-list-item-content>
                                <v-list-item-content class="align-end">
                                  {{ item.姓名 }}
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-content>Email</v-list-item-content>
                                <v-list-item-content class="align-end">
                                  {{ item.Email }}
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-content>市話</v-list-item-content>
                                <v-list-item-content class="align-end">
                                  {{ item.市話 }}
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-content>手機</v-list-item-content>
                                <v-list-item-content class="align-end">
                                  {{ item.手機 }}
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-content
                                  >折讓單號</v-list-item-content
                                >
                                <v-list-item-content class="align-end">
                                  {{ item.折讓單號 }}
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-content
                                  >折讓單類型</v-list-item-content
                                >
                                <v-list-item-content class="align-end">
                                  {{ item.折讓單類型 }}
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-col>
                        </v-row>
                      </template>
                    </v-data-iterator>
                  </v-col>
                  <v-col cols="6">
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
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6">
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
                  </v-col>
                  <v-col cols="6">
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
                  </v-col>
                </v-row>
              </v-container>
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
      v-model="toggleHistoryModal"
      width="1200px"
      scrollable
      retain-focus
    >
      <v-card>
        <v-card-title class="primary white--text">
          歷程
        </v-card-title>
        <v-card-text class="mt-4">
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
export default class OrderRefundOrder extends Vue {
  private headers: Array<any> = [
    { text: '退貨單號', value: 'calories', align: 'start', sortable: false },
    { text: '申請日期	', value: 'fat', align: 'start', sortable: false },
    {
      text: '訂單編號',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '姓名', value: 'fat', align: 'start', sortable: false },
    { text: '電話', value: 'fat', align: 'start', sortable: false },
    { text: 'Email', value: 'fat', align: 'start', sortable: false },
    { text: '退貨總金額', value: 'fat', align: 'start', sortable: false },
    { text: '退刷現金', value: 'fat', align: 'start', sortable: false },
    { text: '退貨點數', value: 'fat', align: 'start', sortable: false },
    { text: '折讓單', value: 'fat', align: 'start', sortable: false },
    { text: '退貨狀態', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private get refundInfo(): Array<any> {
    return [
      {
        退貨單號碼: '【SF 金流】黑長直齊劉海最棒了',
        訂單編號: '2020-09-01 02:54 pm ~ 2024-09-28 02:54 pm',
        建立日期: '使用STAYFUN金流',
        姓名: '你家',
        Email: '你家',
        市話: 'aaa',
        手機: 'bbb',
        折讓單號: 'ccc',
        折讓單類型: 'ddddddddddddddddddddd'
      }
    ]
  }

  private toggleModal: boolean = true

  private toggleHistoryModal: boolean = false

  private async created() {}
}
</script>
