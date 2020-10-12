<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">排行榜管理</h2>
          <v-card outlined>
            <v-toolbar flat>
              <v-btn color="warning">
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
          新增/編輯排行榜
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-toolbar flat>
              <v-btn
                color="primary"
                @click="toggleRankingManagementModal = true"
              >
                商品管理
              </v-btn>
            </v-toolbar>
            <v-card-text color="#fff">
              <v-container>
                <v-row>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="列表名稱"
                      hint="限 7 字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-radio-group v-model="radios" row>
                      <template v-slot:label>
                        <div>上架</div>
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
                    <v-radio-group v-model="radios" row>
                      <template v-slot:label>
                        <div>指定企業</div>
                      </template>
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
    <v-dialog
      v-model="toggleRankingManagementModal"
      width="800px"
      scrollable
      persistent
      retain-focus
      fullscreen
    >
      <v-card>
        <v-card-title class="primary white--text">
          排行榜管理【熱銷排行】
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-toolbar flat>
              <v-btn
                color="primary"
                @click="toggleRankingManagementDetailModal = true"
              >
                <v-icon>mdi-plus</v-icon> 新增商品
              </v-btn>
              <v-btn color="error" class="ml-lg-4">
                <v-icon>mdi-close</v-icon> 批次刪除
              </v-btn>
              <v-btn color="warning" class="ml-lg-4">
                <v-icon>mdi-refresh</v-icon> 重新排序
              </v-btn>
            </v-toolbar>
            <v-card-text color="#fff">
              <v-data-table
                v-model="selected"
                :headers="rankingManagementTableHeaders"
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
            @click="toggleRankingManagementModal = false"
            text
            large
          >
            回新增/編輯排行榜
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="toggleRankingManagementDetailModal"
      width="800px"
      scrollable
      persistent
      retain-focus
      fullscreen
    >
      <v-card>
        <v-card-title class="primary white--text">
          新增/編輯排行榜商品
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-card-text color="#fff">
              <v-container>
                <v-row>
                  <v-col cols="12" class="mt-n5">
                    <v-radio-group v-model="radios" row>
                      <template v-slot:label>
                        <div>商品種類</div>
                      </template>
                      <v-radio value="aaa">
                        <template v-slot:label>
                          <div>
                            自行建立
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
                      <v-radio value="Duckduckgo" class="ml-lg-4">
                        <template v-slot:label>
                          <div>
                            電子票券
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
                      hint="限 20 字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="商品描述"
                      hint="限 300 字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-select :items="items" label="所屬賣場"></v-select>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="原價"
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
                      label="售價"
                      hint="限正整數"
                      type="number"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <div class="d-flex">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="連結網址"
                        style="flex: 0 0 80%"
                      >
                      </v-text-field>
                      <v-btn color="primary" class="mt-3 ml-4">前往</v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="default"
            @click="toggleRankingManagementDetailModal = false"
            text
            large
          >
            回排行榜管理
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text large>
            <v-icon>mdi-checkbox-marked-outline</v-icon>
            儲存
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
export default class JoinClubIndex extends Vue {
  private headers: Array<any> = [
    { text: '名稱', value: 'fat', align: 'start', sortable: false },
    {
      text: '是否顯示',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '顯示順序', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private rankingManagementTableHeaders: Array<any> = [
    { text: '商品圖片', value: 'fat', align: 'start', sortable: false },
    {
      text: '商品名稱',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '商品描述', value: 'fat', align: 'start', sortable: false },
    { text: '價格', value: 'fat', align: 'start', sortable: false },
    { text: '顯示順序', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private toggleModal: boolean = true

  private toggleRankingManagementModal: boolean = false

  private toggleRankingManagementDetailModal: boolean = false

  private async created() {}
}
</script>
