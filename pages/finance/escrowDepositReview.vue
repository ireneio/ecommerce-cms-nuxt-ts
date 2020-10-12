<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4">經辦放行設定</h2>
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
                    <v-select :items="items" label="類別"></v-select>
                  </v-col>
                  <v-col cols="3">
                    <v-select :items="items" label="放行狀態"></v-select>
                  </v-col>
                  <v-col cols="6" class="mt-n3">
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
            <div class="mb-4">
              <v-btn color="success">
                <v-icon>mdi-checkbox-marked-outline</v-icon> 放行
              </v-btn>
              <v-btn color="error" class="ml-4">
                <v-icon>mdi-close</v-icon> 退件
              </v-btn>
            </div>

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
export default class StoreStore extends Vue {
  private headers: Array<any> = [
    {
      text: '申請日期',
      value: 'fat',
      align: 'start',
      sortable: true
    },
    { text: '類別', value: 'fat', align: 'start', sortable: false },
    { text: '申請人員', value: 'fat', align: 'start', sortable: false },
    { text: '帳號後五碼', value: 'fat', align: 'start', sortable: false },
    { text: '交易日期', value: 'fat', align: 'start', sortable: true },
    { text: '交易金額', value: 'fat', align: 'start', sortable: false },
    { text: '經辦放行日期', value: 'fat', align: 'start', sortable: false },
    { text: '經辦放行帳號', value: 'fat', align: 'start', sortable: false },
    { text: '經辦放行狀態', value: 'fat', align: 'start', sortable: false },
    { text: '主管放行日期', value: 'fat', align: 'start', sortable: false },
    { text: '主管放行帳號', value: 'fat', align: 'start', sortable: false },
    { text: '主管放行狀態', value: 'fat', align: 'start', sortable: false },
    { text: '備註', value: 'fat', align: 'start', sortable: false }
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
