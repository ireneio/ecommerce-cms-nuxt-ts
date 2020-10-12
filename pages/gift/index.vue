<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">禮品維護</h2>
          <v-card outlined>
            <v-toolbar flat>
              <v-btn color="primary" @click="toggleModal = true">
                <v-icon>mdi-plus</v-icon> 建立商品
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
                        label="關鍵字"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-select :items="items" label="商品類型"></v-select>
                    </v-col>
                    <v-col cols="6" class="mt-4">
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
              <v-tabs v-model="tab">
                <v-tab
                  v-for="item in tabs"
                  :key="item.name"
                  @click="currentTab = item.value"
                >
                  {{ item.name }}
                </v-tab>
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
                :headers="headers"
                :items="desserts"
                :single-select="singleSelect"
                item-key="name"
                show-select
                class="elevation-1 mt-4"
                v-if="currentTab === 1"
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
          新增/編輯商品
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-tabs>
              <v-tab @click="currentTabModal = 0">商品資訊</v-tab>
              <v-tab @click="currentTabModal = 1">相關領好禮活動</v-tab>
            </v-tabs>
            <v-card-text color="#fff" v-show="currentTabModal === 0">
              <v-container>
                <v-row>
                  <v-col cols="12" class="mt-n5">
                    <v-radio-group v-model="radios" row>
                      <template v-slot:label>
                        <div>商品類型</div>
                      </template>
                      <v-radio value="aaa">
                        <template v-slot:label>
                          <div>
                            實體商品
                          </div>
                        </template>
                      </v-radio>
                      <v-radio value="Duckduckgo" class="ml-lg-4">
                        <template v-slot:label>
                          <div>
                            電子票券
                          </div>
                        </template>
                      </v-radio>
                      <v-radio value="Duckduckgo" class="ml-lg-4">
                        <template v-slot:label>
                          <div>
                            商城商品
                          </div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-radio-group v-model="radios" row>
                      <template v-slot:label>
                        <div>上架狀態</div>
                      </template>
                      <v-radio value="aaa">
                        <template v-slot:label>
                          <div>
                            上架
                          </div>
                        </template>
                      </v-radio>
                      <v-radio value="Duckduckgo" class="ml-lg-4">
                        <template v-slot:label>
                          <div>
                            下架
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
                      label="商品名稱"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="供應商名稱"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="供應商電子信箱"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="進貨價格"
                      type="number"
                      hint="限正整數"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="市價"
                      type="number"
                      hint="限正整數"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="供應數量"
                      type="number"
                      hint="限正整數，空白即代表無限制數量"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="4" class="mt-n5">
                    <v-radio-group v-model="radios" row>
                      <template v-slot:label>
                        <div>備貨時間</div>
                      </template>
                      <v-radio value="aaa">
                        <template v-slot:label>
                          <div>
                            不可指定
                          </div>
                        </template>
                      </v-radio>
                      <v-radio value="Duckduckgo" class="ml-lg-4">
                        <template v-slot:label>
                          <div>
                            可指定
                          </div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="8" class="mt-n5">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <div v-bind="attrs" v-on="on">
                          <v-text-field
                            v-model="model"
                            :counter="max"
                            :rules="rules"
                            label="指定備貨時間"
                          >
                          </v-text-field>
                        </div>
                      </template>
                      <span>指定備貨時間為『0』為可指定當日為送達時間</span>
                    </v-tooltip>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-textarea
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="備註"
                      hint="限 255 字"
                    >
                    </v-textarea>
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
                      label="商品圖片"
                      placeholder="點擊上傳"
                      prepend-icon=""
                      hint="格式限制為大小限制 2MB，600*400px 【最小寬度限制: 600px】的 JPG、PNG、GIF"
                      persistent-hint
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-text color="#fff" v-show="currentTabModal === 1">
              <v-data-table
                v-model="selected"
                :headers="ongoingEventsTableHeaders"
                :items="desserts"
                :single-select="singleSelect"
                item-key="name"
                show-select
                class="elevation-1"
              >
              </v-data-table>
              <v-data-table
                v-model="selected"
                :headers="pastEventsTableHeaders"
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
export default class GiftIndex extends Vue {
  private headers: Array<any> = [
    { text: '商品編號', value: 'fat', align: 'start', sortable: false },
    {
      text: '商品名稱',
      value: 'fat',
      align: 'start',
      sortable: true
    },
    { text: '商品類型', value: 'fat', align: 'start', sortable: true },
    { text: '供應商名稱', value: 'fat', align: 'start', sortable: true },
    { text: '進貨價格', value: 'fat', align: 'start', sortable: false },
    { text: '市價', value: 'fat', align: 'start', sortable: false },
    { text: '商品數量', value: 'fat', align: 'start', sortable: false },
    {
      text: '正在舉辦活動',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '建立時間', value: 'fat', align: 'start', sortable: true },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private ongoingEventsTableHeaders: Array<any> = [
    { text: '正在舉辦活動', value: 'fat', align: 'start', sortable: false },
    {
      text: '公司',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '活動起迄', value: 'fat', align: 'start', sortable: false },
    { text: '兌換數', value: 'fat', align: 'start', sortable: false }
  ]

  private pastEventsTableHeaders: Array<any> = [
    { text: '歷史活動', value: 'fat', align: 'start', sortable: false },
    {
      text: '公司',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '活動起迄', value: 'fat', align: 'start', sortable: false },
    { text: '兌換數', value: 'fat', align: 'start', sortable: false }
  ]

  private currentTab: number = 0

  private tabs: Array<any> = [
    { name: '已上架', value: 0 },
    { name: '已下架', value: 1 }
  ]

  private toggleModal: boolean = false

  private currentTabModal: number = 0

  private async created() {
    // await this.sendGetPermissionListRequest()
  }
}
</script>
