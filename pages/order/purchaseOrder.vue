<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">第三方訂單查詢</h2>
          <v-card outlined>
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
                    <v-col cols="3">
                      <v-select :items="items" label="訂單類型"></v-select>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="商品名稱"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3" class="mt-n7">
                      <v-select :items="items" label="配送狀態"></v-select>
                    </v-col>
                    <v-col cols="3" class="mt-n7">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="帳號"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3" class="mt-n7">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="代購序號"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3" class="mt-n7">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="訂單編號"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3" class="mt-n7">
                      <v-select :items="items" label="付款方式"></v-select>
                    </v-col>
                    <v-col cols="3" class="mt-n7">
                      <v-select :items="items" label="訂單狀態"></v-select>
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
          訂單查詢明細頁 【JCM2009290V6GPM1613】
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-card-text color="#fff">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">訂單日期</th>
                      <th class="text-left">訂單逾期日</th>
                      <th class="text-left">訂單編號</th>
                      <th class="text-left">代購序號</th>
                      <th class="text-left">客戶帳號</th>
                      <th class="text-left">銷售金額</th>
                      <th class="text-left">訂單狀態</th>
                      <th class="text-left">付款時間</th>
                      <th class="text-left">付款方式</th>
                      <th class="text-left">本期使用福利點數</th>
                      <th class="text-left">刷卡金額</th>
                      <th class="text-left">收件人姓名</th>
                      <th class="text-left">收件人地址</th>
                      <th class="text-left">收件人電話</th>
                      <th class="text-left">訂購商品</th>
                      <th class="text-left">團購名稱</th>
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
export default class OrderPurchaseOrder extends Vue {
  private headers: Array<any> = [
    { text: '訂單日期', value: 'fat', align: 'start', sortable: false },
    {
      text: '訂單編號',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '代購序號', value: 'fat', align: 'start', sortable: false },
    { text: '客戶帳號', value: 'fat', align: 'start', sortable: false },
    { text: '銷售金額', value: 'fat', align: 'start', sortable: false },
    { text: '訂單狀態', value: 'fat', align: 'start', sortable: false },
    { text: '付款方式', value: 'fat', align: 'start', sortable: false },
    { text: '本期使用福利點數', value: 'fat', align: 'start', sortable: false },
    { text: '刷卡金額	', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private toggleModal: boolean = true

  private async created() {}
}
</script>
