<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">領好禮訊息牆</h2>
          <v-card outlined>
            <v-toolbar flat>
              <v-btn color="primary" @click="toggleModal = true">
                <v-icon>mdi-plus</v-icon> 建立好禮訊息
              </v-btn>
              <v-btn color="warning" class="ml-4">
                <v-icon>mdi-refresh</v-icon> 全部重新發送
              </v-btn>
              <v-btn color="info" class="ml-4">
                <v-icon>mdi-vector-difference-ba</v-icon> 手動轉貼
              </v-btn>
              <v-btn color="success" class="ml-4">
                <v-icon>mdi-bell</v-icon> 發送到期通知
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-banner color="rgba(60, 141, 188, 0.05)">
                <v-container>
                  <v-row>
                    <v-col cols="3">
                      <v-select :items="items" label="公司"></v-select>
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
                    <v-col cols="3">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="關鍵字"
                      >
                      </v-text-field>
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
          新增/編輯領好禮訊息
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-card-text class="d-flex flex-wrap">
              <v-card style="flex: 0 0 calc(50% - 16px);" class="mr-4">
                <v-card-title>訊息資訊</v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="領好禮標題"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="預計發放人數"
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
                          label="每位員工發放預算"
                          hint="限正整數"
                          type="number"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-textarea
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="領好禮訊息內容"
                        >
                        </v-textarea>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <div v-bind="attrs" v-on="on">
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
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    label="開始日期"
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
                            </div>
                          </template>
                          <span>
                            若此活動的享樂金需信託，則活動區間起訖將影響信託日期，活動開始後請勿反覆修改。
                          </span>
                        </v-tooltip>
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
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              label="結束日期"
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
                      <v-col cols="12" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="發送日期"
                          hint="限整數，活動開始 X 天前"
                          type="number"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="活動週期 (天)"
                          hint="限整數"
                          type="number"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-select
                          :items="items"
                          label="信託受益對象"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-radio-group v-model="radios" row>
                          <template v-slot:label>
                            <div>顯示市價</div>
                          </template>
                          <v-radio value="Duckduckgo">
                            <template v-slot:label>
                              <div>
                                是
                              </div>
                            </template>
                          </v-radio>
                          <v-radio value="aaa" class="ml-lg-4">
                            <template v-slot:label>
                              <div>
                                否
                              </div>
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-file-input
                          small-chips
                          multiple
                          label="商品圖片"
                          placeholder="點擊上傳"
                          prepend-icon=""
                          hint="格式限制為大小限制 2MB，600*600px 【最小寬度限制: 600px】 的 JPG、PNG、GIF"
                          persistent-hint
                        ></v-file-input>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
              <v-card style="flex: 0 0 50%;">
                <v-card-title>收件對象</v-card-title>
                <v-card-subtitle>
                  上傳說明: <br />
                  檔案欄位從第一行開始依序為公司、工號、姓名、發送日期 <br />
                  第一列為標題，匯入的資料從第二列開始 <br />
                  發送日期若已逾時，請手動操作重新發送 <br />
                  錯誤結果最多呈現1000筆資料 <br />
                  <v-btn color="info" class="mt-4">Excel 範例檔下載</v-btn>
                </v-card-subtitle>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" class="mt-n5">
                        <v-select :items="items" label="領好禮企業"></v-select>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-select :items="items"></v-select>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-file-input
                          small-chips
                          multiple
                          label="上傳附件"
                          placeholder="點擊上傳"
                          prepend-icon=""
                          hint="格式限制為大小限制 2MB 的 XSLX"
                          persistent-hint
                        ></v-file-input>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
              <v-card class="mt-4 mr-4" style="flex: 0 0 calc(50% - 16px);">
                <v-card-title>禮品選擇</v-card-title>
                <v-card-subtitle>單項禮品</v-card-subtitle>
                <v-card-text>
                  <v-banner color="#eee" class="pt-4">
                    <v-select :items="items" label="實體商品"></v-select>
                    <v-data-iterator
                      :items="giftInfo"
                      :items-per-page.sync="itemsPerPage"
                      hide-default-footer
                    >
                      <template v-slot:default="props">
                        <v-row>
                          <v-col
                            v-for="item in props.items"
                            :key="item.name"
                            cols="12"
                            lg="6"
                          >
                            <v-card>
                              <v-list dense>
                                <v-list-item>
                                  <v-list-item-content>
                                    市價
                                  </v-list-item-content>
                                  <v-list-item-content class="align-end">
                                    {{ item.市價 }}
                                  </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-content>
                                    商品圖片
                                  </v-list-item-content>
                                  <v-list-item-content class="align-end">
                                    {{ item.商品圖片 }}
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list>
                            </v-card>
                          </v-col>
                        </v-row>
                      </template>
                    </v-data-iterator>
                    <template v-slot:actions>
                      <v-btn color="primary" text class="mb-4">
                        <v-icon>mdi-plus</v-icon>
                        新增實體禮品
                      </v-btn>
                    </template>
                  </v-banner>
                  <v-banner color="#fff" class="pt-4">
                    <v-select :items="items" label="電子票券"></v-select>
                    <v-data-iterator
                      :items="giftInfo"
                      :items-per-page.sync="itemsPerPage"
                      hide-default-footer
                    >
                      <template v-slot:default="props">
                        <v-row>
                          <v-col
                            v-for="item in props.items"
                            :key="item.name"
                            cols="12"
                            lg="6"
                          >
                            <v-card>
                              <v-list dense>
                                <v-list-item>
                                  <v-list-item-content>
                                    市價
                                  </v-list-item-content>
                                  <v-list-item-content class="align-end">
                                    {{ item.市價 }}
                                  </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-content>
                                    商品圖片
                                  </v-list-item-content>
                                  <v-list-item-content class="align-end">
                                    {{ item.商品圖片 }}
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list>
                            </v-card>
                          </v-col>
                        </v-row>
                      </template>
                    </v-data-iterator>
                    <template v-slot:actions>
                      <v-btn color="primary" text class="mb-4">
                        <v-icon>mdi-plus</v-icon>
                        新增票券禮品
                      </v-btn>
                    </template>
                  </v-banner>
                  <v-banner color="#eee" class="pt-4">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="享樂金點數: STAYFUN享樂金"
                      hint="發放預算/人"
                    >
                    </v-text-field>
                    <template v-slot:actions>
                      <v-btn color="primary" text class="mb-4">
                        <v-icon>mdi-plus</v-icon>
                        新增享樂金點數
                      </v-btn>
                    </template>
                  </v-banner>
                  <v-banner color="#fff" class="pt-4">
                    <v-select :items="items" label="商城商品"></v-select>
                    <v-data-iterator
                      :items="giftInfo"
                      :items-per-page.sync="itemsPerPage"
                      hide-default-footer
                    >
                      <template v-slot:default="props">
                        <v-row>
                          <v-col
                            v-for="item in props.items"
                            :key="item.name"
                            cols="12"
                            lg="6"
                          >
                            <v-card>
                              <v-list dense>
                                <v-list-item>
                                  <v-list-item-content>
                                    市價
                                  </v-list-item-content>
                                  <v-list-item-content class="align-end">
                                    {{ item.市價 }}
                                  </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                  <v-list-item-content>
                                    商品圖片
                                  </v-list-item-content>
                                  <v-list-item-content class="align-end">
                                    {{ item.商品圖片 }}
                                  </v-list-item-content>
                                </v-list-item>
                              </v-list>
                            </v-card>
                          </v-col>
                        </v-row>
                      </template>
                    </v-data-iterator>
                    <template v-slot:actions>
                      <v-btn color="primary" text class="mb-4">
                        <v-icon>mdi-plus</v-icon>
                        新增商城商品
                      </v-btn>
                    </template>
                  </v-banner>
                </v-card-text>
                <v-card-subtitle>組合禮品</v-card-subtitle>
                <v-card-text>
                  <v-banner color="rgba(176, 208, 211, 0.21)" class="pt-4">
                    <v-container>
                      <v-row>
                        <v-col cols="12" class="mt-n5">
                          <v-text-field
                            v-model="model"
                            :counter="max"
                            :rules="rules"
                            label="禮品組合名稱"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" class="mt-n5">
                          <v-text-field
                            v-model="model"
                            :counter="max"
                            :rules="rules"
                            label="禮品組合市價"
                            type="number"
                            hint="限整數"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" class="mt-n5">
                          <v-text-field
                            v-model="model"
                            :counter="max"
                            :rules="rules"
                            label="禮品說明網址"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" class="mt-n5">
                          <v-file-input
                            small-chips
                            multiple
                            label="禮品組合圖片"
                            placeholder="點擊上傳"
                            prepend-icon=""
                            hint="格式限制為大小限制 2MB，600*400px 【最小寬度限制: 600px】 的 JPG、PNG、GIF"
                            persistent-hint
                          ></v-file-input>
                        </v-col>
                        <v-col cols="12" class="mt-n5">
                          <v-select
                            :items="items"
                            label="新增品項類別"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" class="mt-n5">
                          <v-select
                            :items="items"
                            label="選擇實體商品"
                          ></v-select>
                          <v-data-iterator
                            :items="giftInfo"
                            :items-per-page.sync="itemsPerPage"
                            hide-default-footer
                          >
                            <template v-slot:default="props">
                              <v-row>
                                <v-col
                                  v-for="item in props.items"
                                  :key="item.name"
                                  cols="12"
                                  lg="6"
                                >
                                  <v-card>
                                    <v-list dense>
                                      <v-list-item>
                                        <v-list-item-content>
                                          市價
                                        </v-list-item-content>
                                        <v-list-item-content class="align-end">
                                          {{ item.市價 }}
                                        </v-list-item-content>
                                      </v-list-item>
                                      <v-list-item>
                                        <v-list-item-content>
                                          商品圖片
                                        </v-list-item-content>
                                        <v-list-item-content class="align-end">
                                          {{ item.商品圖片 }}
                                        </v-list-item-content>
                                      </v-list-item>
                                    </v-list>
                                  </v-card>
                                </v-col>
                              </v-row>
                            </template>
                          </v-data-iterator>
                        </v-col>
                      </v-row>
                    </v-container>
                    <template v-slot:actions>
                      <v-btn text color="primary" class="mb-4">
                        <v-icon>mdi-plus</v-icon>
                        新增組合項目
                      </v-btn>
                    </template>
                  </v-banner>
                </v-card-text>
              </v-card>
              <v-card class="mt-4" style="flex: 0 0 50%;">
                <v-card-title>禮品清單</v-card-title>
                <v-card-subtitle>總清單</v-card-subtitle>
                <v-card-text>
                  <v-data-table
                    v-model="selected"
                    :items="desserts"
                    :single-select="singleSelect"
                    item-key="name"
                    class="elevation-1"
                    disable-pagination
                    hide-default-footer
                  >
                  </v-data-table>
                </v-card-text>
                <v-card-subtitle>期末自動兌換禮品</v-card-subtitle>
                <v-card-text>
                  <v-banner color="#eee" class="pt-4">
                    <v-container>
                      <v-row>
                        <v-col cols="12" class="mt-n5">
                          <v-select :items="items" label="期末禮品"></v-select>
                        </v-col>
                        <v-col cols="12" class="mt-n5">
                          <v-text-field
                            v-model="model"
                            :counter="max"
                            :rules="rules"
                            label="收件姓名"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" class="mt-n5">
                          <v-text-field
                            v-model="model"
                            :counter="max"
                            :rules="rules"
                            label="手機號碼"
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
                            label="收件地址"
                          >
                          </v-text-field>
                        </v-col>
                        <v-col cols="12" class="mt-n5">
                          <v-text-field
                            v-model="model"
                            :counter="max"
                            :rules="rules"
                            label="備註"
                            placeholder="期末自動兌換禮品"
                          >
                          </v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-banner>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-btn color="default" @click="toggleModal = false" text large>
            取消
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text large>
            <v-icon>mdi-checkbox-marked-outline</v-icon> 儲存
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
export default class GiftMessageList extends Vue {
  private headers: Array<any> = [
    { text: '企業客戶名稱', value: 'fat', align: 'start', sortable: false },
    {
      text: '標題',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '建立者', value: 'fat', align: 'start', sortable: false },
    { text: '活動起訖', value: 'fat', align: 'start', sortable: true },
    { text: '兌換人數', value: 'fat', align: 'start', sortable: false },
    { text: '每人預算', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private toggleModal: boolean = false

  private get giftInfo(): Array<any> {
    return [
      {
        市價: '87',
        商品圖片: 'Placeholder'
      }
    ]
  }

  private async created() {
    // await this.sendGetPermissionListRequest()
  }
}
</script>
