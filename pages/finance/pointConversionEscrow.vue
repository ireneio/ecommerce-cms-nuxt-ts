<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">點數轉履保管理</h2>
          <v-card outlined>
            <v-card-text>
              <v-banner color="rgba(60, 141, 188, 0.05)">
                <v-container>
                  <v-row>
                    <v-col cols="3">
                      <v-select :items="items" label="選擇企業客戶"></v-select>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="關鍵字"
                      >
                      </v-text-field>
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
              <v-tabs v-model="tab">
                <v-tab
                  v-for="item in tabs"
                  :key="item.name"
                  @click="currentTab = item.value"
                >
                  {{ item.name }}
                </v-tab>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="toggleToInsuredModal = true">
                  轉履保日期設定
                </v-btn>
              </v-tabs>
              <v-data-table
                v-model="selected"
                :headers="headers"
                :items="desserts"
                :single-select="singleSelect"
                item-key="name"
                show-select
                class="elevation-1 mt-4"
                v-show="currentTab === 0"
              >
              </v-data-table>
              <v-data-table
                v-model="selected"
                :headers="inProgressTableHeaders"
                :items="desserts"
                :single-select="singleSelect"
                item-key="name"
                show-select
                class="elevation-1 mt-4"
                v-show="currentTab === 1"
              >
              </v-data-table>
              <v-data-table
                v-model="selected"
                :headers="historyTableHeaders"
                :items="desserts"
                :single-select="singleSelect"
                item-key="name"
                show-select
                class="elevation-1 mt-4"
                v-show="currentTab === 2"
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
          領好禮標題
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-card-text color="#fff">
              <v-banner color="rgba(60, 141, 188, 0.05)">
                <v-container>
                  <v-row>
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
                            label="領取時間開始日期"
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
                            label="領取時間結束日期"
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
                            label="履保開始日期"
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
                            label="履保結束日期"
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
                      <v-select :items="items" label="狀態"></v-select>
                    </v-col>
                    <v-col cols="3" class="mt-n4">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="關鍵字"
                        hint="請輸入帳號或姓名"
                      >
                      </v-text-field>
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
    <v-dialog
      v-model="toggleToInsuredModal"
      width="800px"
      scrollable
      persistent
      retain-focus
      fullscreen
    >
      <v-card>
        <v-card-title class="primary white--text">
          轉履保點數
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-card-title>
              非履保點數餘額
              <small class="ml-4 primary--text">總計: 100點</small>
            </v-card-title>
            <v-card-text color="#fff">
              <v-banner color="rgba(60, 141, 188, 0.05)">
                <v-container>
                  <v-row>
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
                            label="履保開始日期"
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
                            label="履保結束日期"
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
                      <v-btn color="primary">
                        <v-icon>mdi-checkbox-marked-outline</v-icon> 儲存
                      </v-btn>
                      <v-btn color="default" class="ml-lg-4">
                        清除
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-banner>
            </v-card-text>
            <v-card-text color="#fff">
              <v-data-table
                v-model="selected"
                :headers="toInsuredTableHeaders"
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
            @click="toggleToInsuredModal = false"
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
export default class FinancePointConversionEscrow extends Vue {
  private headers: Array<any> = [
    {
      text: '企業客戶名稱',
      value: 'calories',
      align: 'start',
      sortable: false
    },
    { text: '領好禮標題', value: 'fat', align: 'start', sortable: false },
    { text: '活動起訖', value: 'fat', align: 'start', sortable: true },
    { text: '非履保點數總額', value: 'fat', align: 'start', sortable: false },
    { text: '已履保點數', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private inProgressTableHeaders: Array<any> = [
    {
      text: '履保生效日',
      value: 'calories',
      align: 'start',
      sortable: true
    },
    { text: '企業客戶名稱', value: 'fat', align: 'start', sortable: false },
    { text: '領好禮標題', value: 'fat', align: 'start', sortable: false },
    { text: '活動起訖', value: 'fat', align: 'start', sortable: true },
    { text: '轉履保點數總額', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private historyTableHeaders: Array<any> = [
    {
      text: '處理日期',
      value: 'calories',
      align: 'start',
      sortable: true
    },
    { text: '企業客戶名稱', value: 'fat', align: 'start', sortable: false },
    { text: '領好禮標題', value: 'fat', align: 'start', sortable: false },
    { text: '活動起訖', value: 'fat', align: 'start', sortable: true },
    { text: '轉履保點數總額', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private detailTableHeaders: Array<any> = [
    {
      text: '帳號',
      value: 'calories',
      align: 'start',
      sortable: true
    },
    { text: '姓名', value: 'fat', align: 'start', sortable: false },
    { text: '履保起訖', value: 'fat', align: 'start', sortable: true },
    { text: '領取點數', value: 'fat', align: 'start', sortable: false },
    { text: '非履保點數', value: 'fat', align: 'start', sortable: false },
    { text: '已履保點數	', value: 'fat', align: 'start', sortable: false },
    { text: '狀態', value: 'fat', align: 'start', sortable: false }
  ]

  private toInsuredTableHeaders: Array<any> = [
    {
      text: '帳號',
      value: 'calories',
      align: 'start',
      sortable: true
    },
    { text: '姓名', value: 'fat', align: 'start', sortable: false },
    { text: '履保起訖', value: 'fat', align: 'start', sortable: true },
    { text: '領取點數', value: 'fat', align: 'start', sortable: false },
    { text: '非履保點數', value: 'fat', align: 'start', sortable: false },
    { text: '已履保點數	', value: 'fat', align: 'start', sortable: false }
  ]

  private tabs: Array<any> = [
    { name: '待處理', value: 0 },
    { name: '待轉中', value: 1 },
    { name: '歷史清單', value: 2 }
  ]

  private currentTab: number = 0

  private toggleModal: boolean = false

  private toggleToInsuredModal: boolean = true
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
