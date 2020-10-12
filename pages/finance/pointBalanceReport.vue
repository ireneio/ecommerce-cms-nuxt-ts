<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">點數餘額對帳單</h2>
          <v-card outlined>
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
                            label="日期"
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
          點數消費歷程列表【STAYFUN】
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-card-text color="#fff">
              <v-banner color="rgba(60, 141, 188, 0.05)">
                <v-container>
                  <v-row>
                    <v-col cols="3" class="mt-n4">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="員工帳號"
                        hint="請輸入完整帳號"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3" class="mt-n4">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="訂單號碼"
                        hint="請輸入完整號碼"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3" class="mt-n4">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="發放說明"
                        hint="請輸入關鍵字"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3" class="mt-n4">
                      <v-select :items="items" label="點數種類"></v-select>
                    </v-col>
                    <v-col cols="3" class="mt-n4">
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
                    <v-col cols="3" class="mt-n4">
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
export default class FinancePointBalanceReport extends Vue {
  private headers: Array<any> = [
    { text: '公司名稱', value: 'calories', align: 'start', sortable: false },
    { text: '履保點數', value: 'fat', align: 'start', sortable: false },
    { text: '非履保點數', value: 'fat', align: 'start', sortable: false },
    { text: '合計點數', value: 'fat', align: 'start', sortable: false }
  ]

  private detailTableHeaders: Array<any> = [
    { text: '員工工號', value: 'calories', align: 'start', sortable: false },
    { text: '員工姓名', value: 'fat', align: 'start', sortable: false },
    { text: '異動日期', value: 'fat', align: 'start', sortable: false },
    { text: '點數有效迄日', value: 'fat', align: 'start', sortable: false },
    { text: '訂單號碼', value: 'fat', align: 'start', sortable: false },
    { text: '逾期點數', value: 'fat', align: 'start', sortable: false },
    { text: '', value: 'fat', align: 'start', sortable: false },
    { text: '點數進帳', value: 'fat', align: 'start', sortable: false },
    { text: '', value: 'fat', align: 'start', sortable: false },
    { text: '點數消費', value: 'fat', align: 'start', sortable: false },
    { text: '', value: 'fat', align: 'start', sortable: false }
  ]

  private toggleModal: boolean = true

  private async created() {}
}
</script>
