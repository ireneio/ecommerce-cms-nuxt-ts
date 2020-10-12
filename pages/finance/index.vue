<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">供應商資料</h2>
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
                        label="供應商名稱"
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
          編輯供應商基本資料
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-card-text color="#fff">
              <v-container>
                <v-row>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="廠商編號"
                      readonly
                      value="Edenred"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="供應商名稱"
                      hint="限 10 字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="統一編號"
                      hint="8 碼數字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="聯絡人"
                      hint="限 10 字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="聯絡電話"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="聯絡地址"
                      hint="限 25 字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-radio-group v-model="radios" row>
                      <template v-slot:label>
                        <div>人工匯入票卷序號</div>
                      </template>
                      <v-radio value="Duckduckgo">
                        <template v-slot:label>
                          <div>
                            開啟
                          </div>
                        </template>
                      </v-radio>
                      <v-radio value="aaa" class="ml-lg-4">
                        <template v-slot:label>
                          <div>
                            關閉
                          </div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-card>
                      <v-card-title>分潤條件設定</v-card-title>
                      <v-card-text>
                        <v-container class="px-0">
                          <v-row>
                            <v-col cols="12" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="分潤比率"
                                hint="限小於 1 的數字"
                                type="number"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="分潤限制"
                                hint="銷貨毛利率 < 該欄位 = 不分潤"
                                type="number"
                                max="1"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n5">
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
                                    label="分潤套用開始日期"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="date"
                                  no-title
                                  scrollable
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="menu = false"
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
                            <v-col cols="12" class="mt-n5">
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
                                    label="分潤套用結束日期"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="date"
                                  no-title
                                  scrollable
                                >
                                  <v-spacer></v-spacer>
                                  <v-btn
                                    text
                                    color="primary"
                                    @click="menu = false"
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
                          </v-row>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-data-table
                      v-model="selected"
                      :headers="profitSplitTableHeaders"
                      :items="desserts"
                      :single-select="singleSelect"
                      item-key="name"
                      show-select
                      class="elevation-1"
                    >
                    </v-data-table>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-btn color="default" @click="toggleModal = false" text large>
            取消
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text large>
            <v-icon>mdi-checkbox-marked-outline</v-icon>
            <span> 儲存</span>
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
export default class FinanceIndex extends Vue {
  private headers: Array<any> = [
    { text: '廠商編號', value: 'calories', align: 'start', sortable: false },
    { text: '供應商名稱', value: 'fat', align: 'start', sortable: false },
    { text: '分潤比率', value: 'fat', align: 'start', sortable: false },
    { text: '分潤區間', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private profitSplitTableHeaders: Array<any> = [
    { text: '編號', value: 'calories', align: 'start', sortable: false },
    { text: '分潤比率', value: 'fat', align: 'start', sortable: false },
    { text: '分潤限制', value: 'fat', align: 'start', sortable: false },
    { text: '套用期間', value: 'fat', align: 'start', sortable: false }
  ]

  private toggleModal: boolean = true

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
