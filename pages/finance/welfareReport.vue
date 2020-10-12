<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4">消費者點數對帳單</h2>
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
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { sysStore } from '~/store'

@Component({
  layout: 'default',
  middleware: 'auth'
})
export default class FinanceWelfareReport extends Vue {
  private headers: Array<any> = [
    { text: '序號', value: 'calories', align: 'start', sortable: false },
    { text: '交易狀態', value: 'fat', align: 'start', sortable: false },
    { text: '交易日期', value: 'fat', align: 'start', sortable: false },
    { text: '訂單號碼', value: 'fat', align: 'start', sortable: false },
    { text: '企業客戶名稱', value: 'fat', align: 'start', sortable: false },
    {
      text: '客戶姓名',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '客戶帳號', value: 'fat', align: 'start', sortable: false },
    { text: '銷售金額(含稅)', value: 'fat', align: 'start', sortable: false },
    { text: '期初點數', value: 'fat', align: 'start', sortable: false },
    { text: '期末點數', value: 'fat', align: 'start', sortable: false }
  ]
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
