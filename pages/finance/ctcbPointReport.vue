<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">信託點數對帳單</h2>
          <v-card outlined>
            <v-toolbar>
              <h3>鼎恒帳戶即時狀態</h3>
              <h3 class="ml-4 success--text">802,508(可用點數餘額)</h3>
              <h3 class="ml-4 success--text">98.95%(使用水位)</h3>
              <v-spacer></v-spacer>
              <span>2020/9/25 上午7:05:02 更新</span>
              <v-btn color="primary" class="ml-4">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-data-table
                v-model="selected"
                :headers="headers"
                :items="aaa"
                :single-select="singleSelect"
                hide-default-footer
                item-key="name"
                class="elevation-1"
              >
              </v-data-table>
            </v-card-text>
            <v-card-text>
              <v-banner color="rgba(60, 141, 188, 0.05)">
                <v-container>
                  <v-row>
                    <v-col cols="3">
                      <v-select :items="items" label="選擇企業客戶"></v-select>
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
                    <v-col cols="3">
                      <v-checkbox
                        v-model="readonly"
                        class="mx-2"
                        label="顯示無點數企業"
                      ></v-checkbox>
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
              <div class="mb-4">
                <v-btn color="success">
                  匯出已勾選之單筆 Excel
                </v-btn>
              </div>
              <v-data-table
                v-model="selected"
                :headers="ctcbPointReportHeaders"
                :items="ctcbPointReportData"
                :single-select="singleSelect"
                item-key="name"
                show-select
                class="elevation-1"
                @dblclick:row="handleCtcbPointReportTableClick"
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
          企業名稱 【{{ currentTabName }}】
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-tabs>
              <v-tab
                v-for="item in tabs"
                :key="item.value"
                @click="currentTab = item.value"
              >
                {{ item.name }}
              </v-tab>
            </v-tabs>
            <v-card-text v-show="currentTab === 0">
              <v-data-table
                v-model="selected"
                :headers="tab0Headers"
                :items="desserts"
                :single-select="singleSelect"
                hide-default-footer
                item-key="name"
                class="elevation-1"
              >
              </v-data-table>
            </v-card-text>
            <v-card-text v-if="currentTab === 1">
              <v-data-table
                v-model="selected"
                :headers="tab1Headers"
                :items="desserts"
                :single-select="singleSelect"
                hide-default-footer
                item-key="name"
                class="elevation-1"
              >
              </v-data-table>
            </v-card-text>
            <v-card-text v-if="currentTab === 2">
              <v-data-table
                v-model="selected"
                :headers="tab2Headers"
                :items="desserts"
                :single-select="singleSelect"
                hide-default-footer
                item-key="name"
                class="elevation-1"
              >
              </v-data-table>
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
export default class FinanceCtcbPointReport extends Vue {
  private headers: Array<any> = [
    {
      text: '已開立總額',
      value: 'serialno',
      align: 'start',
      sortable: false
    },
    {
      text: '已扣除(提領)總額',
      value: 'user',
      align: 'start',
      sortable: false
    },
    {
      text: '已發出點數',
      value: 'escrowBegin',
      align: 'start',
      sortable: false
    },
    {
      text: '未使用點數',
      value: 'escrowNew',
      align: 'start',
      sortable: false
    },
    {
      text: '已使用點數',
      value: 'escrowTotal',
      align: 'start',
      sortable: false
    },
    {
      text: '已作廢點數',
      value: 'escrowUsed',
      align: 'start',
      sortable: false
    },
    {
      text: '信託到期點數',
      value: 'escrowRefunded',
      align: 'start',
      sortable: false
    },
    {
      text: '點數尚可發出餘額',
      value: 'escrowExpired',
      align: 'start',
      sortable: false
    }
  ]

  private ctcbPointReportHeaders: Array<any> = [
    {
      text: '序號',
      value: 'serialno',
      align: 'start',
      sortable: false
    },
    { text: '企業客戶', value: 'user', align: 'start', sortable: false },
    {
      text: '期初點數(A)',
      value: 'escrowBegin',
      align: 'start',
      sortable: false
    },
    {
      text: '新增點數(B)',
      value: 'escrowNew',
      align: 'start',
      sortable: false
    },
    {
      text: '點數總額(C)=(A)+(B)',
      value: 'escrowTotal',
      align: 'start',
      sortable: false
    },
    {
      text: '使用點數(D)',
      value: 'escrowUsed',
      align: 'start',
      sortable: false
    },
    {
      text: '退費點數(E)',
      value: 'escrowRefunded',
      align: 'start',
      sortable: false
    },
    {
      text: '信託到期點數(F)',
      value: 'escrowExpired',
      align: 'start',
      sortable: false
    },
    {
      text: '信託提前解約點數(G)',
      value: 'escrowDeactivated',
      align: 'start',
      sortable: false
    },
    {
      text: '信託失效點數總額(H)=(F)+(G)',
      value: 'escrowInvalid',
      align: 'start',
      sortable: false
    },
    {
      text: '期末點數(I)=(C)-(D)+(E)-(H)-(K)+(L)',
      value: 'escrowEnd',
      align: 'start',
      sortable: false
    },
    {
      text: '可請款點數(J)=(D)-(E)+(H)',
      value: 'escrowPayable',
      align: 'start',
      sortable: false
    },
    {
      text: '移出點數(K)',
      value: 'escrowRemoved',
      align: 'start',
      sortable: false
    },
    {
      text: '移入點數(L)',
      value: 'escrowAdded',
      align: 'start',
      sortable: false
    }
  ]

  private tab0Headers: Array<any> = [
    {
      text: '帳號',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '異動日期', value: 'fat', align: 'start', sortable: false },
    { text: '信託迄日', value: 'fat', align: 'start', sortable: false },
    { text: '點數類別', value: 'fat', align: 'start', sortable: false },
    {
      text: '點數來源',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '受益對象', value: 'fat', align: 'start', sortable: false },
    { text: '受益 ID', value: 'fat', align: 'start', sortable: false },
    { text: '新增信託點數', value: 'fat', align: 'start', sortable: false },
    {
      text: '信託逾期點數',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    {
      text: '信託提前解約點數',
      value: 'fat',
      align: 'start',
      sortable: false
    }
  ]

  private tab1Headers: Array<any> = [
    {
      text: '帳號',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '異動日期', value: 'fat', align: 'start', sortable: false },
    { text: '信託迄日', value: 'fat', align: 'start', sortable: false },
    { text: '點數類別', value: 'fat', align: 'start', sortable: false },
    {
      text: '點數來源',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '受益對象', value: 'fat', align: 'start', sortable: false },
    { text: '受益 ID', value: 'fat', align: 'start', sortable: false },
    { text: '本期移入點數', value: 'fat', align: 'start', sortable: false },
    {
      text: '本期退費點數',
      value: 'fat',
      align: 'start',
      sortable: false
    }
  ]

  private tab2Headers: Array<any> = [
    {
      text: '帳號',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '異動日期', value: 'fat', align: 'start', sortable: false },
    { text: '信託迄日', value: 'fat', align: 'start', sortable: false },
    { text: '點數類別', value: 'fat', align: 'start', sortable: false },
    {
      text: '點數來源',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '受益對象', value: 'fat', align: 'start', sortable: false },
    { text: '受益 ID', value: 'fat', align: 'start', sortable: false },
    { text: '異動企業名稱', value: 'fat', align: 'start', sortable: false },
    {
      text: '本期移入點數',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    {
      text: '本期移出點數',
      value: 'fat',
      align: 'start',
      sortable: false
    }
  ]

  private toggleModal: boolean = true

  private currentTab: number = 0

  private get currentTabName(): string {
    return this.tabs.find(item => item.value === this.currentTab).name
  }

  private tabs: Array<any> = [
    { name: '本期新增與失效', value: 0 },
    { name: '本期消費與退費', value: 1 },
    { name: '人員異動明細', value: 2 }
  ]

  private get ctcbPointReportData(): Array<any> {
    return [
      {
        serialno: 'Placeholder',
        user: 159,
        escrowBegin: 6.0,
        escrowNew: 24,
        escrowTotal: 4.0,
        escrowUsed: '100',
        escrowRefunded: '100',
        escrowExpired: '100',
        escrowDeactivated: '100',
        escrowInvalid: '100',
        escrowEnd: '100',
        escrowPayable: '100',
        escrowRemoved: '100',
        escrowAdded: '100'
      },
      {
        serialno: 'Placeholder',
        user: 159,
        escrowBegin: 6.0,
        escrowNew: 24,
        escrowTotal: 4.0,
        escrowUsed: '100',
        escrowRefunded: '100',
        escrowExpired: '100',
        escrowDeactivated: '100',
        escrowInvalid: '100',
        escrowEnd: '100',
        escrowPayable: '100',
        escrowRemoved: '100',
        escrowAdded: '100'
      },
      {
        serialno: 'Placeholder',
        user: 159,
        escrowBegin: 6.0,
        escrowNew: 24,
        escrowTotal: 4.0,
        escrowUsed: '100',
        escrowRefunded: '100',
        escrowExpired: '100',
        escrowDeactivated: '100',
        escrowInvalid: '100',
        escrowEnd: '100',
        escrowPayable: '100',
        escrowRemoved: '100',
        escrowAdded: '100'
      },
      {
        serialno: 'Placeholder',
        user: 159,
        escrowBegin: 6.0,
        escrowNew: 24,
        escrowTotal: 4.0,
        escrowUsed: '100',
        escrowRefunded: '100',
        escrowExpired: '100',
        escrowDeactivated: '100',
        escrowInvalid: '100',
        escrowEnd: '100',
        escrowPayable: '100',
        escrowRemoved: '100',
        escrowAdded: '100'
      },
      {
        serialno: 'Placeholder',
        user: 159,
        escrowBegin: 6.0,
        escrowNew: 24,
        escrowTotal: 4.0,
        escrowUsed: '100',
        escrowRefunded: '100',
        escrowExpired: '100',
        escrowDeactivated: '100',
        escrowInvalid: '100',
        escrowEnd: '100',
        escrowPayable: '100',
        escrowRemoved: '100',
        escrowAdded: '100'
      },
      {
        serialno: 'Placeholder',
        user: 159,
        escrowBegin: 6.0,
        escrowNew: 24,
        escrowTotal: 4.0,
        escrowUsed: '100',
        escrowRefunded: '100',
        escrowExpired: '100',
        escrowDeactivated: '100',
        escrowInvalid: '100',
        escrowEnd: '100',
        escrowPayable: '100',
        escrowRemoved: '100',
        escrowAdded: '100'
      },
      {
        serialno: 'Placeholder',
        user: 159,
        escrowBegin: 6.0,
        escrowNew: 24,
        escrowTotal: 4.0,
        escrowUsed: '100',
        escrowRefunded: '100',
        escrowExpired: '100',
        escrowDeactivated: '100',
        escrowInvalid: '100',
        escrowEnd: '100',
        escrowPayable: '100',
        escrowRemoved: '100',
        escrowAdded: '100'
      },
      {
        serialno: 'Placeholder',
        user: 159,
        escrowBegin: 6.0,
        escrowNew: 24,
        escrowTotal: 4.0,
        escrowUsed: '100',
        escrowRefunded: '100',
        escrowExpired: '100',
        escrowDeactivated: '100',
        escrowInvalid: '100',
        escrowEnd: '100',
        escrowPayable: '100',
        escrowRemoved: '100',
        escrowAdded: '100'
      },
      {
        serialno: 'Placeholder',
        user: 159,
        escrowBegin: 6.0,
        escrowNew: 24,
        escrowTotal: 4.0,
        escrowUsed: '100',
        escrowRefunded: '100',
        escrowExpired: '100',
        escrowDeactivated: '100',
        escrowInvalid: '100',
        escrowEnd: '100',
        escrowPayable: '100',
        escrowRemoved: '100',
        escrowAdded: '100'
      },
      {
        serialno: 'Placeholder',
        user: 159,
        escrowBegin: 6.0,
        escrowNew: 24,
        escrowTotal: 4.0,
        escrowUsed: '100',
        escrowRefunded: '100',
        escrowExpired: '100',
        escrowDeactivated: '100',
        escrowInvalid: '100',
        escrowEnd: '100',
        escrowPayable: '100',
        escrowRemoved: '100',
        escrowAdded: '100'
      },
      {
        serialno: 'Placeholder',
        user: 159,
        escrowBegin: 6.0,
        escrowNew: 24,
        escrowTotal: 4.0,
        escrowUsed: '100',
        escrowRefunded: '100',
        escrowExpired: '100',
        escrowDeactivated: '100',
        escrowInvalid: '100',
        escrowEnd: '100',
        escrowPayable: '100',
        escrowRemoved: '100',
        escrowAdded: '100'
      }
    ]
  }

  private handleCtcbPointReportTableClick(): void {}

  private async created() {}
}
</script>
