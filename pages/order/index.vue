<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">票券訂單查詢</h2>
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
                        label="帳號"
                      >
                      </v-text-field>
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
                      <v-select :items="items" label="付款方式"></v-select>
                    </v-col>
                    <v-col cols="3" class="mt-4">
                      <v-btn color="primary">
                        <v-icon>mdi-magnify</v-icon> 搜尋
                      </v-btn>
                      <v-btn color="default" class="ml-lg-4">
                        清除
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
          訂單及票券資訊
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-card-title>訂單資訊</v-card-title>
            <v-card-text color="#fff">
              <v-data-table
                v-model="selected"
                :headers="valueHistoryTableHeaders"
                :items="desserts"
                :single-select="singleSelect"
                item-key="name"
                show-select
                class="elevation-1"
              >
              </v-data-table>
            </v-card-text>
            <v-card-title>票券資訊</v-card-title>
            <v-card-text color="#fff">
              <v-btn color="primary">
                <v-icon>mdi-refresh</v-icon> 同步狀態
              </v-btn>
              <v-btn color="error" class="ml-4">退票</v-btn>
              <v-data-table
                v-model="selected"
                :headers="valueHistoryTableHeaders"
                :items="desserts"
                :single-select="singleSelect"
                item-key="name"
                show-select
                class="elevation-1 mt-4"
              >
              </v-data-table>
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
export default class OrderIndex extends Vue {
  private headers: Array<any> = [
    { text: '編號', value: 'calories', align: 'start', sortable: false },
    { text: '供應商名稱', value: 'fat', align: 'start', sortable: false },
    { text: '訂單日期', value: 'fat', align: 'start', sortable: false },
    {
      text: '訂單編號',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '票券/商品編號', value: 'fat', align: 'start', sortable: false },
    { text: '票券/商品名稱', value: 'fat', align: 'start', sortable: false },
    { text: '企業客戶名稱', value: 'fat', align: 'start', sortable: false },
    { text: '客戶帳號', value: 'fat', align: 'start', sortable: false },
    { text: '客戶姓名', value: 'fat', align: 'start', sortable: false },
    { text: '銷售金額', value: 'fat', align: 'start', sortable: false },
    { text: '付款方式', value: 'fat', align: 'start', sortable: false },
    { text: '本期使用福利點數', value: 'fat', align: 'start', sortable: false },
    { text: '刷卡金額	', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private toggleModal: boolean = true

  private async created() {}
}
</script>
