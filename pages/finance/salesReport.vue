<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">銷售報表</h2>
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
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="訂單編號"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="TP 訂單編號"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3" class="mt-n7">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="發票號碼"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3" class="mt-n7">
                      <v-checkbox
                        v-model="selected"
                        label="隱藏領好禮"
                        :value="true"
                      ></v-checkbox>
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
          查看訂單【JCM2009290PLU9W1017】
        </v-card-title>
        <v-card-text>
          <div class="my-4">
            <v-btn color="primary"> <v-icon>mdi-refresh</v-icon> 刷新 </v-btn>
          </div>
          <v-card outlined>
            <v-card-title>訂單資訊</v-card-title>
            <v-card-text color="#fff">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">交易狀態</th>
                      <th class="text-left">交易日期</th>
                      <th class="text-left">訂單日期</th>
                      <th class="text-left">訂單號碼</th>
                      <th class="text-left">TP 訂單號碼</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        placeholder
                      </td>
                      <td>placeholder</td>
                      <td>placeholder</td>
                      <td>placeholder</td>
                      <td>placeholder</td>
                    </tr>
                    <!-- <tr v-for="item in desserts" :key="item.name">
                      <td>{{ item.name }}</td>
                      <td>{{ item.calories }}</td>
                    </tr> -->
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
          <v-card outlined class="mt-4">
            <v-card-title>付款資訊</v-card-title>
            <v-card-text color="#fff">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">公司名稱</th>
                      <th class="text-left">會員帳號</th>
                      <th class="text-left">訂單日期</th>
                      <th class="text-left">會員名稱</th>
                      <th class="text-left">銷售金額</th>
                      <th class="text-left">付款方式</th>
                      <th class="text-left">本期使用點數</th>
                      <th class="text-left">刷卡金額</th>
                      <th class="text-left">分期期數</th>
                      <th class="text-left">刷卡銀行</th>
                      <th class="text-left">其他金額</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        placeholder
                      </td>
                      <td>placeholder</td>
                      <td>placeholder</td>
                      <td>placeholder</td>
                      <td>placeholder</td>
                      <td>placeholder</td>
                      <td>placeholder</td>
                      <td>placeholder</td>
                      <td>placeholder</td>
                      <td>placeholder</td>
                    </tr>
                    <!-- <tr v-for="item in desserts" :key="item.name">
                      <td>{{ item.name }}</td>
                      <td>{{ item.calories }}</td>
                    </tr> -->
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
          <v-card outlined class="mt-4">
            <v-card-title>發票資訊</v-card-title>
            <v-card-text color="#fff">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">發票號碼</th>
                      <th class="text-left">發票日期</th>
                      <th class="text-left">發票總金額</th>
                      <th class="text-left">載具類型</th>
                      <th class="text-left">載具號碼</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        placeholder
                      </td>
                      <td>placeholder</td>
                      <td>placeholder</td>
                      <td>placeholder</td>
                      <td>placeholder</td>
                    </tr>
                    <!-- <tr v-for="item in desserts" :key="item.name">
                      <td>{{ item.name }}</td>
                      <td>{{ item.calories }}</td>
                    </tr> -->
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
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
export default class FinanceSalesReport extends Vue {
  private headers: Array<any> = [
    { text: '序號', value: 'calories', align: 'start', sortable: false },
    { text: '交易狀態', value: 'fat', align: 'start', sortable: false },
    { text: '交易日期', value: 'fat', align: 'start', sortable: false },
    { text: '訂單號碼', value: 'fat', align: 'start', sortable: false },
    { text: 'TP 訂單號碼', value: 'fat', align: 'start', sortable: false },
    {
      text: '企業客戶名稱',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '客戶帳號', value: 'fat', align: 'start', sortable: false },
    { text: '銷售金額(含稅)', value: 'fat', align: 'start', sortable: false },
    { text: '付款方式', value: 'fat', align: 'start', sortable: false },
    { text: '分期期數', value: 'fat', align: 'start', sortable: false },
    { text: '本期使用福利點數', value: 'fat', align: 'start', sortable: false },
    { text: '刷卡金額', value: 'fat', align: 'start', sortable: false },
    { text: '其他金額', value: 'fat', align: 'start', sortable: false },
    { text: '發票號碼', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private toggleModal: boolean = true

  private async created() {}
}
</script>
