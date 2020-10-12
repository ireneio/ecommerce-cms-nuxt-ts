<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">供應商對帳單</h2>
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
                      <v-select :items="items" label="供應商名稱"></v-select>
                    </v-col>
                    <v-col cols="3" class="mt-4">
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
          供應商對帳單明細
        </v-card-title>
        <v-card-text class="mt-4">
          <v-toolbar flat>
            <v-btn color="success" class="ml-lg-4">
              匯出 Excel
            </v-btn>
          </v-toolbar>
          <v-card outlined>
            <v-card-text color="#fff">
              <v-data-table
                v-model="selected"
                :headers="detailTableHeaders"
                :items="desserts"
                :single-select="singleSelect"
                item-key="name"
                show-select
                class="elevation-1"
              >
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn color="primary" text large>
            <v-icon>mdi-checkbox-marked-outline</v-icon>
            <span> 儲存</span>
          </v-btn> -->
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
export default class FinanceMerchantReport extends Vue {
  private headers: Array<any> = [
    { text: '序號', value: 'calories', align: 'start', sortable: false },
    { text: '供應商名稱', value: 'fat', align: 'start', sortable: false },
    { text: '進貨價格(含稅)', value: 'fat', align: 'start', sortable: false },
    { text: '銷售總價格(含稅)', value: 'fat', align: 'start', sortable: false },
    { text: '通路毛利', value: 'fat', align: 'start', sortable: false },
    {
      text: '通路商毛利拆帳比例 & 服務費率',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '分潤金額(服務費)', value: 'fat', align: 'start', sortable: false },
    { text: '應付總金額(含稅)', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private detailTableHeaders: Array<any> = [
    { text: '序號', value: 'calories', align: 'start', sortable: false },
    { text: '供應商名稱', value: 'fat', align: 'start', sortable: false },
    { text: '交易類型', value: 'fat', align: 'start', sortable: false },
    { text: '交易日期', value: 'fat', align: 'start', sortable: false },
    { text: '訂單編號', value: 'fat', align: 'start', sortable: false },
    {
      text: '銷退類型',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '票券編號', value: 'fat', align: 'start', sortable: false },
    { text: '產品名稱', value: 'fat', align: 'start', sortable: false },
    { text: '進貨價格', value: 'fat', align: 'start', sortable: false },
    { text: '手續費(稅)', value: 'fat', align: 'start', sortable: false },
    { text: '銷售總額', value: 'fat', align: 'start', sortable: false },
    { text: '通貨毛利', value: 'fat', align: 'start', sortable: false },
    { text: '銷貨毛利率', value: 'fat', align: 'start', sortable: false },
    { text: '分潤限制', value: 'fat', align: 'start', sortable: false },
    { text: '分潤狀態', value: 'fat', align: 'start', sortable: false },
    { text: '拆帳比例', value: 'fat', align: 'start', sortable: false },
    { text: '分潤金額', value: 'fat', align: 'start', sortable: false },
    { text: '應付總額(含稅)', value: 'fat', align: 'start', sortable: false },
    { text: '訂單狀態', value: 'fat', align: 'start', sortable: false },
    { text: '票券狀態', value: 'fat', align: 'start', sortable: false },
    { text: '取票時間', value: 'fat', align: 'start', sortable: false },
    { text: '退票時間', value: 'fat', align: 'start', sortable: false },
    { text: '退貨完成時間', value: 'fat', align: 'start', sortable: false }
  ]

  private toggleModal: boolean = true

  private async created() {}
}
</script>
