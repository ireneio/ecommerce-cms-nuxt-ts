<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>信託點數對帳單</v-card-title>
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
              :items="desserts"
              :single-select="singleSelect"
              hide-default-footer
              item-key="name"
              class="elevation-1"
            >
            </v-data-table>
          </v-card-text>
          <v-banner color="#fff">
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
                      <v-btn text color="primary" @click="$refs.menu.save(date)"
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
                      <v-btn text color="primary" @click="$refs.menu.save(date)"
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
                  <v-btn color="success" class="ml-lg-4">
                    匯出 Excel
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-banner>
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
export default class FinanceCtcbPointReport extends Vue {
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
