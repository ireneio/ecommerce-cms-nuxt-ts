<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">特約商家管理</h2>
          <v-card outlined>
            <v-toolbar flat>
              <v-btn
                color="primary"
                @click=";(toggleModal = true), (currentTab = 0)"
              >
                <v-icon>mdi-plus</v-icon> 新增
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-banner color="rgba(60, 141, 188, 0.05)">
                <v-container>
                  <v-row>
                    <v-col cols="3">
                      <v-select :items="items" label="所在地區"></v-select>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="店名關鍵字"
                      >
                      </v-text-field>
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
                    <v-col cols="3" class="mt-n7">
                      <v-select :items="items" label="商家分類"></v-select>
                    </v-col>
                    <v-col cols="3" class="mt-n7">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="地址關鍵字"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3" class="mt-n7">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="統一編號"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3" class="mt-n7">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="店家電話"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3" class="mt-n7">
                      <v-select :items="items" label="上架企業"></v-select>
                    </v-col>
                    <v-col cols="3" class="mt-n7">
                      <v-select :items="items" label="優惠類別"></v-select>
                    </v-col>
                    <v-col cols="6" class="mt-n3">
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
      v-if="currentTab >= 0"
    >
      <v-card>
        <v-card-title class="primary white--text">
          新增/編輯商家
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-tabs>
              <v-tab @click="currentTab = 0">基本資料</v-tab>
              <v-tab @click="currentTab = 1">商家圖片</v-tab>
              <v-tab @click="currentTab = 2">優惠方案</v-tab>
            </v-tabs>
            <v-card-text color="#fff" v-show="currentTab === 0">
              <v-container>
                <v-row>
                  <v-col cols="6" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="店名"
                      hint="限 20 個字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="4" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="電話"
                      hint="限填數字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="2" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="分機"
                      hint="限填數字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="地址"
                      hint="限 150 個字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="4" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="緯度"
                      hint="限填數字"
                      type="number"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="4" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="經度"
                      hint="限填數字"
                      type="number"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="4" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="均消"
                      hint="限填數字"
                      type="number"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="6" class="mt-n5">
                    <v-select :items="items" label="所在地區"></v-select>
                  </v-col>
                  <v-col cols="6" class="mt-n5">
                    <v-select :items="items" label="商家分類"></v-select>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="商家說明"
                      hint="限 12 個字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="商家介紹網址"
                      hint="填寫商家的官方網址，例：http://stayfun.mayohr.com"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-file-input
                      small-chips
                      multiple
                      label="商家列表圖片"
                      placeholder="點擊上傳"
                      prepend-icon=""
                      hint="格式限制為大小限制 2MB，1080*720px 的 JPG、PNG、GIF"
                      persistent-hint
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="商家統一編號"
                      hint="商家統編或負責人身分證字號"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-card>
                      <v-card-title>負責人資訊</v-card-title>
                      <v-card-text>
                        <v-container class="px-0">
                          <v-row>
                            <v-col cols="6" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="負責人姓名"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="6" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="負責人電話"
                                hint="限填數字，不可輸入特殊符號，如-、*、()、#等"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="負責人地址"
                                hint="限 100 個字"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="負責人 Email"
                                type="email"
                              >
                              </v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-card>
                      <v-card-title>營業時間</v-card-title>
                      <v-card-subtitle>請至少設定一個營業時間</v-card-subtitle>
                      <v-card-text>
                        <v-container class="px-0">
                          <v-row>
                            <v-col cols="12" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="營業時間說明"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="星期一"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="星期二"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="星期三"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="星期四"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="星期五"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="星期六"
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="12" class="mt-n5">
                              <v-text-field
                                v-model="model"
                                :counter="max"
                                :rules="rules"
                                label="星期日"
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
              <v-container>
                <v-row>
                  <v-col cols="12" class="mt-n5">
                    <v-file-input
                      small-chips
                      multiple
                      label="商家 LOGO"
                      placeholder="點擊上傳"
                      prepend-icon=""
                      hint="格式限制為大小限制 2MB，285*285px 的 JPG、PNG、GIF"
                      persistent-hint
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-file-input
                      small-chips
                      multiple
                      label="商家海報"
                      placeholder="點擊上傳"
                      prepend-icon=""
                      hint="格式限制為大小限制 2MB，1080*720px 的 JPG、PNG、GIF"
                      persistent-hint
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-text color="#fff" v-show="currentTab === 2">
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <v-card outlined>
                      <v-toolbar flat>
                        <v-btn color="primary" @click="toggleCreate = true">
                          <v-icon>mdi-plus</v-icon> 新增方案
                        </v-btn>
                      </v-toolbar>
                      <v-card-text v-if="toggleCreate">
                        <v-banner color="rgba(60, 141, 188, 0.05)">
                          <v-container>
                            <v-row>
                              <v-col cols="4">
                                <v-select
                                  :items="items"
                                  label="優惠客戶"
                                ></v-select>
                              </v-col>
                              <v-col cols="4">
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
                                      label="優惠起日"
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
                              <v-col cols="4">
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
                                      label="優惠迄日"
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
                                <v-radio-group v-model="radios" row>
                                  <template v-slot:label>
                                    <div>狀態</div>
                                  </template>
                                  <v-radio value="Duckduckgo">
                                    <template v-slot:label>
                                      <div>
                                        上架
                                      </div>
                                    </template>
                                  </v-radio>
                                  <v-radio value="aaa" class="ml-lg-4">
                                    <template v-slot:label>
                                      <div>
                                        下架
                                      </div>
                                    </template>
                                  </v-radio>
                                </v-radio-group>
                              </v-col>

                              <v-col cols="4" class="mt-n5">
                                <v-select
                                  :items="items"
                                  label="優惠類別"
                                ></v-select>
                              </v-col>
                              <v-col cols="12" class="mt-n5">
                                <v-textarea
                                  v-model="model"
                                  :counter="max"
                                  :rules="rules"
                                  label="優惠內容"
                                  hint="限 140 字"
                                >
                                </v-textarea>
                              </v-col>

                              <v-col cols="6" class="mt-n3">
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
  </div>
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
    { text: '項次', value: 'calories', align: 'start', sortable: false },
    { text: '區域', value: 'fat', align: 'start', sortable: true },
    { text: '類別', value: 'fat', align: 'start', sortable: true },
    { text: '建檔者', value: 'fat', align: 'start', sortable: true },
    { text: '建檔公司', value: 'fat', align: 'start', sortable: true },
    { text: '商家店名', value: 'fat', align: 'start', sortable: true },
    { text: '建檔時間', value: 'fat', align: 'start', sortable: true },
    { text: '評價分數', value: 'fat', align: 'start', sortable: false },
    { text: '收藏數', value: 'fat', align: 'start', sortable: false },
    { text: '點擊數', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private currentTab: number = -1

  private toggleModal: boolean = false

  private toggleCreate: boolean = false

  private handleCancelEdit(): void {
    this.toggleCreate = false
  }

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
