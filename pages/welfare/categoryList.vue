<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">表單維護</h2>
          <v-card outlined>
            <v-toolbar flat>
              <v-btn color="primary" @click="toggleModal = true">
                <v-icon>mdi-plus</v-icon> 新增分類
              </v-btn>
              <v-btn color="warning" class="ml-4">
                <v-icon>mdi-refresh</v-icon> 重新排序
              </v-btn>
            </v-toolbar>
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
          新增/編輯表單分類
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
                      label="分類名稱"
                      hint="限 30 字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-radio-group v-model="radios" row>
                      <template v-slot:label>
                        <div>顯示</div>
                      </template>
                      <v-radio value="aaa">
                        <template v-slot:label>
                          <div>
                            是
                          </div>
                        </template>
                      </v-radio>
                      <v-radio value="Duckduckgo" class="ml-lg-4">
                        <template v-slot:label>
                          <div>
                            否
                          </div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="金額上限"
                      hint="限正整數"
                      type="number"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="次數上限"
                      hint="限正整數"
                      type="number"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-radio-group v-model="radios" row>
                      <template v-slot:label>
                        <div>指定人員</div>
                      </template>
                      <v-radio value="aaa">
                        <template v-slot:label>
                          <div>
                            本公司
                          </div>
                        </template>
                      </v-radio>
                      <v-radio value="Duckduckgo" class="ml-lg-4">
                        <template v-slot:label>
                          <div>
                            指定人員
                          </div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-btn
                      color="primary"
                      @click="toggleSelectCompanies = true"
                    >
                      選擇對象
                    </v-btn>
                    <v-select
                      v-if="toggleSelectCompanies"
                      :items="items"
                      label="選擇企業"
                      multiple
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="default"
            class="ml-lg-4"
            @click="toggleModal = false"
            text
            large
          >
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
    <v-dialog
      v-model="toggleFormManagementModal"
      width="800px"
      scrollable
      persistent
      retain-focus
      fullscreen
    >
      <v-card>
        <v-card-title class="primary white--text">
          表單管理【分類名稱】
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-card-text color="#fff">
              <div>
                <v-btn
                  color="primary"
                  @click="toggleSelectFormType = !toggleSelectFormType"
                >
                  <v-icon>mdi-plus</v-icon>
                  新增表單
                </v-btn>
                <v-btn color="warning" class="ml-lg-4">
                  <v-icon>mdi-refresh</v-icon>
                  重新排序
                </v-btn>
              </div>
              <div v-if="toggleSelectFormType" class="mt-4">
                <v-card>
                  <v-card-title>請選擇新增的表單類型</v-card-title>
                  <v-card-text>
                    <v-btn
                      color="primary"
                      @click=";(toggleForm = true), (currentForm = 0)"
                    >
                      生育禮金
                    </v-btn>
                    <v-btn
                      color="primary"
                      class="ml-lg-4"
                      @click=";(toggleForm = true), (currentForm = 1)"
                    >
                      結婚禮金
                    </v-btn>
                    <v-btn
                      color="primary"
                      class="ml-lg-4"
                      @click=";(toggleForm = true), (currentForm = 2)"
                    >
                      喪葬慰問
                    </v-btn>
                  </v-card-text>
                </v-card>
              </div>
              <v-data-table
                v-model="selected"
                :headers="formManagementTableHeaders"
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
          <v-btn
            color="default"
            @click="toggleFormManagementModal = false"
            text
            large
          >
            回列表
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="toggleForm"
      width="800px"
      scrollable
      persistent
      retain-focus
      fullscreen
    >
      <v-card>
        <v-card-title class="primary white--text">
          新增/編輯{{
            currentForm === 0
              ? '生育禮金'
              : currentForm === 1
              ? '結婚禮金'
              : '喪葬慰問'
          }}表單
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-card-text color="#fff">
              <v-card>
                <v-card-title>一般設定</v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" class="mt-n5">
                        <v-radio-group v-model="radios" row>
                          <template v-slot:label>
                            <div>顯示</div>
                          </template>
                          <v-radio value="aaa">
                            <template v-slot:label>
                              <div>
                                是
                              </div>
                            </template>
                          </v-radio>
                          <v-radio value="Duckduckgo" class="ml-lg-4">
                            <template v-slot:label>
                              <div>
                                否
                              </div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </v-col>
                      <v-col cols="4" class="mt-n5">
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
                              label="申請區間開始時間"
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
                      <v-col cols="4" class="mt-n5">
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
                              label="申請區間結束時間"
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
                      <v-col cols="4" class="mt-n5">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <div v-bind="attrs" v-on="on">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="限制申請次數"
                                hint="限正整數"
                                type="number"
                              >
                              </v-text-field>
                            </div>
                          </template>
                          <span>
                            若未設定，則無次數限制
                          </span>
                        </v-tooltip>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="文件編號"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="表單名稱"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="補助金額"
                          type="number"
                          hint="限整數"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-textarea
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="規章說明"
                        >
                        </v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
              <v-card class="mt-4">
                <v-card-title>欄位設定</v-card-title>
                <v-card-text color="#fff">
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            需填寫欄位
                          </th>
                          <th class="text-left">
                            是否必填
                          </th>
                          <th class="text-left">
                            參數設定
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="item in birthFormInputData"
                          :key="item.name"
                          v-show="currentForm === 0 || currentForm === 1"
                        >
                          <td>
                            <v-checkbox
                              v-model="selected"
                              :label="item.name"
                              :value="true"
                            ></v-checkbox>
                          </td>
                          <td>
                            <v-radio-group v-model="radios" row>
                              <v-radio value="aaa">
                                <template v-slot:label>
                                  <div>
                                    是
                                  </div>
                                </template>
                              </v-radio>
                              <v-radio value="Duckduckgo" class="ml-lg-4">
                                <template v-slot:label>
                                  <div>
                                    否
                                  </div>
                                </template>
                              </v-radio>
                            </v-radio-group>
                          </td>
                          <td v-if="item.name === '事實發生日'">
                            <v-text-field
                              v-model="model"
                              :counter="max"
                              :rules="rules"
                              label="日期可輸入過去 X 天內"
                            >
                            </v-text-field>
                            <v-text-field
                              v-model="model"
                              :counter="max"
                              :rules="rules"
                              label="日期可輸入未來 X 天內"
                            >
                            </v-text-field>
                            <v-text-field
                              v-model="model"
                              :counter="max"
                              :rules="rules"
                              label="與前次申請的事實發生日相隔 X 天才可再次申請"
                            >
                            </v-text-field>
                          </td>
                          <td v-if="item.name === '胎數'">
                            <v-select
                              :items="items"
                              label="最大胎數限制"
                            ></v-select>
                          </td>
                        </tr>
                        <tr
                          v-for="item in deathFormInputData"
                          :key="item.name"
                          v-show="currentForm === 2"
                        >
                          <td>
                            <v-checkbox
                              v-model="selected"
                              :label="item.name"
                              :value="true"
                            ></v-checkbox>
                          </td>
                          <td>
                            <v-radio-group v-model="radios" row>
                              <v-radio value="aaa">
                                <template v-slot:label>
                                  <div>
                                    是
                                  </div>
                                </template>
                              </v-radio>
                              <v-radio value="Duckduckgo" class="ml-lg-4">
                                <template v-slot:label>
                                  <div>
                                    否
                                  </div>
                                </template>
                              </v-radio>
                            </v-radio-group>
                          </td>
                          <td v-if="item.name === '事實發生日'">
                            <v-text-field
                              v-model="model"
                              :counter="max"
                              :rules="rules"
                              label="日期可輸入過去 X 天內"
                            >
                            </v-text-field>
                            <v-text-field
                              v-model="model"
                              :counter="max"
                              :rules="rules"
                              label="日期可輸入未來 X 天內"
                            >
                            </v-text-field>
                            <v-text-field
                              v-model="model"
                              :counter="max"
                              :rules="rules"
                              label="與前次申請的事實發生日相隔 X 天才可再次申請"
                            >
                            </v-text-field>
                          </td>
                          <td v-if="item.name === '與喪者關係'">
                            <v-text-field
                              v-model="model"
                              :counter="max"
                              :rules="rules"
                              label="選項名稱"
                              hint="請以半型逗號【,】分離"
                            >
                            </v-text-field>
                            <v-text-field
                              v-model="model"
                              :counter="max"
                              :rules="rules"
                              label="補助金額"
                              hint="請以半型逗號【,】分離"
                            >
                            </v-text-field>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="default"
            class="ml-lg-4"
            @click="toggleForm = false"
            text
            large
          >
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
export default class WelfareCatrgoryList extends Vue {
  private headers: Array<any> = [
    { text: '分類名稱', value: 'fat', align: 'start', sortable: false },
    {
      text: '是否發佈',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '顯示順序', value: 'fat', align: 'start', sortable: false },
    { text: '編輯分類', value: 'fat', align: 'start', sortable: false },
    { text: '表單維護', value: 'fat', align: 'start', sortable: false }
  ]

  private formManagementTableHeaders: Array<any> = [
    { text: '文件編號', value: 'fat', align: 'start', sortable: false },
    {
      text: '表單名稱',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '是否發佈', value: 'fat', align: 'start', sortable: false },
    { text: '顯示順序', value: 'fat', align: 'start', sortable: false },
    { text: '更新時間', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private birthFormInputData: Array<any> = [
    { name: '申請人' },
    { name: '事實發生日' },
    { name: '胎數' },
    { name: '相關文件' },
    { name: '備註' }
  ]

  private deathFormInputData: Array<any> = [
    { name: '申請人' },
    { name: '事實發生日' },
    { name: '與喪者關係' },
    { name: '是否需申請輓聯' },
    { name: '喪者姓名' },
    { name: '喪者享年' },
    { name: '喪者性別' },
    { name: '輓聯送達日' },
    { name: '聯絡人' },
    { name: '聯絡人電話' },
    { name: '輓聯寄送地址' },
    { name: '備註' }
  ]

  private toggleModal: boolean = false

  private toggleSelectCompanies: boolean = false

  private toggleFormManagementModal: boolean = true

  private toggleSelectFormType: boolean = false

  private toggleForm: boolean = false

  private currentForm: number = -1

  private async created() {}
}
</script>
