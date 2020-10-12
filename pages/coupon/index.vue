<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">票券明細</h2>
          <v-card outlined>
            <v-toolbar flat>
              <v-btn color="primary">
                <v-icon>mdi-checkbox-marked-outline</v-icon> 批次上架
              </v-btn>
              <v-btn color="warning" class="ml-4">
                <v-icon>mdi-checkbox-blank-outline</v-icon> 批次下架
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-banner color="rgba(60, 141, 188, 0.05)">
                <v-container>
                  <v-row>
                    <v-col cols="3">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="票券代碼"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="商家名稱"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="票券名稱"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-select :items="items" label="供應商"></v-select>
                    </v-col>
                    <v-col cols="12" class="mt-4">
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
                :headers="valueHistoryTableHeaders"
                :items="desserts"
                :single-select="singleSelect"
                item-key="name"
                show-select
                class="elevation-1"
              >
              </v-data-table>
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
      v-if="currentTab >= 0"
    >
      <v-card>
        <v-card-title class="primary white--text">
          編輯票券資料
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-tabs>
              <v-tab @click="currentTab = 0">基本資料</v-tab>
              <v-tab @click="currentTab = 1">圖片</v-tab>
              <v-tab @click="currentTab = 2">方案</v-tab>
              <v-tab @click="currentTab = 3">票券發行商</v-tab>
              <v-tab @click="currentTab = 4">適用分店</v-tab>
              <v-tab @click="currentTab = 5">指定企業</v-tab>
              <v-tab @click="currentTab = 6">金額變動歷程</v-tab>
              <v-tab @click="currentTab = 7">團購設定</v-tab>
            </v-tabs>
            <v-card-text color="#fff" v-show="currentTab === 0">
              <v-toolbar flat>
                <v-btn color="success">
                  <v-icon>mdi-checkbox-marked-outline</v-icon>
                  <span> 儲存</span>
                </v-btn>
                <v-btn
                  color="error"
                  class="ml-lg-4"
                  @click="toggleModal = false"
                >
                  取消
                </v-btn>
              </v-toolbar>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-card>
                      <v-card-title>基本資料</v-card-title>
                      <v-card-text>
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left">票券簡碼</th>
                                <th class="text-left">票券名稱</th>
                                <th class="text-left">票券簡介</th>
                                <th class="text-left">票券兌換規則(說明)</th>
                                <th class="text-left">供應商狀態</th>
                                <th class="text-left">可售數量</th>
                                <th class="text-left">已售數量</th>
                                <th class="text-left">鎖單數量</th>
                                <th class="text-left">成本</th>
                                <th class="text-left">市價</th>
                                <th class="text-left">供應商建議售價</th>
                                <th class="text-left">開始販售日</th>
                                <th class="text-left">結束販售日</th>
                                <th class="text-left">有效日期</th>
                                <th class="text-left">備註</th>
                                <th class="text-left">例外日期</th>
                                <th class="text-left">銷售模式</th>
                                <th class="text-left">適用分店</th>
                                <th class="text-left">方案模式</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in desserts" :key="item.name">
                                <td>{{ item.name }}</td>
                                <td>{{ item.calories }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card>
                      <v-card-title>票券評價</v-card-title>
                      <v-card-text>
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left">被瀏覽次數</th>
                                <th class="text-left">被收藏次數</th>
                                <th class="text-left">被評價次數</th>
                                <th class="text-left">平均評價</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in desserts" :key="item.name">
                                <td>{{ item.name }}</td>
                                <td>{{ item.calories }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="6">
                    <v-card>
                      <v-card-title>編輯自訂</v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="成本"
                                hint="限填數字，不可輸入特殊符號，如-、*、()、#等"
                                type="number"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="市價"
                                hint="限填數字，不可輸入特殊符號，如-、*、()、#等"
                                type="number"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="STAYFUN 自訂售價"
                                hint="限填數字，不可輸入特殊符號，如-、*、()、#等"
                                type="number"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n5">
                              <v-checkbox
                                v-model="selected"
                                label="商品上架"
                                :value="true"
                              ></v-checkbox>
                            </v-col>
                            <v-col cols="12" class="mt-n5">
                              <v-select
                                :items="items"
                                label="所在地區"
                                multiple
                              ></v-select>
                            </v-col>
                            <v-col cols="12" class="mt-n5">
                              <v-select
                                :items="items"
                                label="票卷分類"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="單次最⾼購買張數"
                                hint="限填數字，不可輸入特殊符號，如-、*、()、#等"
                                type="number"
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-text color="#fff" v-show="currentTab === 1">
              <div class="mb-4">
                <v-btn color="primary" @click="handleUploadModal">
                  圖片管理
                </v-btn>
              </div>
              <v-data-table
                v-model="selected"
                :headers="imageTableHeaders"
                :items="desserts"
                :single-select="singleSelect"
                item-key="name"
                show-select
                class="elevation-1"
              >
              </v-data-table>
            </v-card-text>
            <v-card-text color="#fff" v-show="currentTab === 2">
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <v-card outlined>
                      <v-toolbar flat>
                        <v-btn color="primary" @click="toggleCreate = true">
                          <v-icon>mdi-plus</v-icon> 新增
                        </v-btn>
                        <v-btn color="success" class="ml-lg-4">
                          <v-icon>mdi-checkbox-marked-outline</v-icon>
                          <span> 儲存</span>
                        </v-btn>
                        <v-btn
                          color="error"
                          class="ml-lg-4"
                          @click="toggleModal = false"
                        >
                          取消
                        </v-btn>
                      </v-toolbar>
                      <v-card-text v-if="toggleCreate">
                        <v-banner color="rgba(60, 141, 188, 0.05)">
                          <v-container>
                            <v-row>
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
                                      label="開始時間"
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
                                      label="結束時間"
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
                                <v-text-field
                                  v-model="model"
                                  :counter="max"
                                  :rules="rules"
                                  label="金額"
                                  type="number"
                                  hint="限數字"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col cols="12" class="mt-n5">
                                <v-text-field
                                  v-model="model"
                                  :counter="max"
                                  :rules="rules"
                                  label="下單次數限制"
                                  type="number"
                                  hint="限數字"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col cols="12" class="mt-n5">
                                <v-text-field
                                  v-model="model"
                                  :counter="max"
                                  :rules="rules"
                                  label="單次最⾼購買張數"
                                  type="number"
                                  hint="限數字"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col cols="12" class="mt-n5">
                                <v-text-field
                                  v-model="model"
                                  :counter="max"
                                  :rules="rules"
                                  label="購買總張數限制"
                                  type="number"
                                  hint="限數字"
                                >
                                </v-text-field>
                              </v-col>
                              <v-col cols="12" class="mt-n3">
                                <v-btn color="primary">
                                  <v-icon>mdi-checkbox-marked-outline</v-icon>
                                  暫存
                                </v-btn>
                                <v-btn color="default" class="ml-lg-4">
                                  清除
                                </v-btn>
                                <v-btn
                                  color="error"
                                  class="ml-lg-4"
                                  @click="handleCancelEdit"
                                >
                                  取消
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
            </v-card-text>
            <v-card-text color="#fff" v-show="currentTab === 3">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-card>
                      <v-card-text>
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left">名稱</th>
                                <th class="text-left">電話</th>
                                <th class="text-left">地址</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in desserts" :key="item.name">
                                <td>{{ item.name }}</td>
                                <td>{{ item.calories }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-text color="#fff" v-show="currentTab === 5">
              <v-container>
                <v-row>
                  <v-col cols="12" class="mt-n5">
                    <v-radio-group v-model="radios" row>
                      <!-- <template v-slot:label>
                        <div></div>
                      </template> -->
                      <v-radio value="aaa">
                        <template v-slot:label>
                          <div>
                            STAYFUN 全體會員
                          </div>
                        </template>
                      </v-radio>
                      <v-radio value="Duckduckgo" class="ml-lg-4">
                        <template v-slot:label>
                          <div>
                            指定企業
                          </div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-combobox
                      v-model="select"
                      :items="items"
                      label="指定企業"
                      multiple
                      chips
                      clearable
                      hide-selected
                      open-on-clear
                      :allow-overflow="false"
                      deletable-chips
                    ></v-combobox>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-text color="#fff" v-show="currentTab === 6">
              <v-banner color="rgba(60, 141, 188, 0.05)">
                <v-container>
                  <v-row>
                    <v-col cols="4" class="mt-n4">
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
                            label="開始時間"
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
                    <v-col cols="4" class="mt-n4">
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
                            label="結束時間"
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
                    <v-col cols="4">
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
            <v-card-text color="#fff" v-show="currentTab === 7">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-card>
                      <v-card-title>基本設定</v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" class="mt-n5">
                              <v-radio-group v-model="radios" row>
                                <template v-slot:label>
                                  <div>是否為揪團樂商品</div>
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
                              <v-radio-group v-model="radios" row>
                                <template v-slot:label>
                                  <div>是否開放團購</div>
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
                          </v-row>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12">
                    <v-card>
                      <v-card-title>揪團組數設定</v-card-title>
                      <v-card-text>
                        <v-toolbar flat>
                          <v-btn color="primary" @click="toggleNewGroup = true"
                            >新增組數</v-btn
                          >
                        </v-toolbar>
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left">名稱</th>
                                <th class="text-left">團購價格</th>
                                <th class="text-left">數量門檻</th>
                                <th class="text-left">是否限量</th>
                                <th class="text-left">順序</th>
                                <th class="text-left">明細</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in desserts" :key="item.name">
                                <td>{{ item.name }}</td>
                                <td>{{ item.calories }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="12">
                    <v-card v-if="toggleNewGroup">
                      <v-card-title>新增組數</v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="名稱"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="團購價格"
                                hint="限填正整數"
                                type="number"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="數量門檻"
                                hint="限填正整數"
                                type="number"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n5">
                              <v-radio-group v-model="radios" row>
                                <template v-slot:label>
                                  <div>限量</div>
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
                                label="顯示順序"
                                hint="限填整數"
                                type="number"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n3">
                              <v-btn color="primary">暫存</v-btn>
                              <v-btn
                                color="error"
                                class="ml-lg-4"
                                @click="handleCancelAddNewGroup"
                                >取消</v-btn
                              >
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
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
export default class CouponIndex extends Vue {
  private headers: Array<any> = [
    { text: '票券代碼', value: 'calories', align: 'start', sortable: false },
    { text: '票券名稱', value: 'fat', align: 'start', sortable: false },
    { text: '價格', value: 'fat', align: 'start', sortable: false },
    {
      text: '數量(鎖單/已售/可售)',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '平台上架狀態', value: 'fat', align: 'start', sortable: false },
    { text: '序號', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private imageTableHeaders: Array<any> = [
    { text: '類型', value: 'calories', align: 'start', sortable: false },
    { text: '預覽', value: 'fat', align: 'start', sortable: false },
    { text: '標題', value: 'fat', align: 'start', sortable: false },
    {
      text: '說明',
      value: 'fat',
      align: 'start',
      sortable: false
    }
  ]

  private valueHistoryTableHeaders: Array<any> = [
    { text: '修改前成本', value: 'calories', align: 'start', sortable: false },
    { text: '成本', value: 'fat', align: 'start', sortable: false },
    { text: '修改前手續費', value: 'fat', align: 'start', sortable: false },
    {
      text: '手續費',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    {
      text: '修改前市價',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    {
      text: '市價',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    {
      text: '修改前建議售價',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    {
      text: '建議售價',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    {
      text: '修改前 STAYFUN 自訂售價',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    {
      text: 'STAYFUN 自訂售價',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    {
      text: '修改時間',
      value: 'fat',
      align: 'start',
      sortable: false
    }
  ]

  private handleUploadModal(): void {}

  private currentTab: number = 0

  private toggleModal: boolean = true

  private toggleCreate: boolean = false

  private toggleNewGroup: boolean = false

  private handleCancelEdit(): void {
    this.toggleCreate = false
  }

  private handleCancelAddNewGroup(): void {
    this.toggleNewGroup = false
  }

  @Watch('currentTab')
  private onCurrentTabChange(newVal: number, oldVal: number): void {
    if (oldVal === 7 && newVal !== 7) {
      this.toggleNewGroup = false
      // reset form here too
    }
  }

  private async created() {}
}
</script>
