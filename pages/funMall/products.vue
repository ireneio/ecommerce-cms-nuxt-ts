<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">分頁商品列表管理</h2>
          <v-card outlined>
            <v-toolbar flat>
              <v-btn color="primary" @click="toggleModal = true">
                <v-icon>mdi-plus</v-icon> 新增列表
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
          新增/編輯分頁商品列表
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
                      label="分頁列表名稱"
                      hint="限 7 字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="描述"
                      hint="限 14 字"
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
                      label="連結網址"
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
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          label="開始時間"
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
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          label="結束時間"
                          hint="若不輸入代表訊息無使用期限"
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
      v-model="toggleTabManagementModal"
      width="800px"
      scrollable
      persistent
      retain-focus
      fullscreen
    >
      <v-card>
        <v-card-title class="primary white--text">
          分頁商品列表 TAB 管理【INSERT ITEM LIST NAME HERE】
        </v-card-title>
        <v-card-text class="mt-4">
          <v-toolbar flat>
            <v-btn color="primary" @click="toggleAddNewTab = true">
              <v-icon>mdi-plus</v-icon> 新增 TAB
            </v-btn>
            <v-btn color="error" class="ml-lg-4">
              <v-icon>mdi-close</v-icon> 批次刪除
            </v-btn>
            <v-btn color="warning" class="ml-lg-4">
              <v-icon>mdi-refresh</v-icon> 重新排序
            </v-btn>
          </v-toolbar>
          <v-card outlined>
            <v-card-text color="#fff" v-if="toggleAddNewTab">
              <v-banner color="rgba(60, 141, 188, 0.05)">
                <v-container>
                  <v-row>
                    <v-col cols="12" class="mt-n5">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="TAB 名稱"
                        hint="限 7 字"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" class="mt-n5">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="顯示順序"
                        hint="限正整數"
                        type="number"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" class="mt-n3">
                      <v-btn color="primary">
                        <v-icon>mdi-checkbox-marked-outline</v-icon> 儲存
                      </v-btn>
                      <v-btn color="default" class="ml-lg-4">
                        清除
                      </v-btn>
                      <v-btn
                        color="error"
                        class="ml-lg-4"
                        @click="handleCancelAddNewTab"
                      >
                        取消
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-banner>
            </v-card-text>
            <v-card-text color="#fff">
              <v-data-table
                v-model="selected"
                :headers="tabManagementTableHeaders"
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
            @click="toggleTabManagementModal = false"
            text
            large
          >
            回新增/編輯分頁商品列表
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="toggleTabItemManagementModal"
      width="800px"
      scrollable
      persistent
      retain-focus
      fullscreen
    >
      <v-card>
        <v-card-title class="primary white--text">
          分頁商品列表 TAB 商品管理【INSERT TAB NAME HERE】
        </v-card-title>
        <v-card-text class="mt-4">
          <v-toolbar flat>
            <v-btn color="primary" @click="toggleAddNewItemModal = true">
              <v-icon>mdi-plus</v-icon> 新增商品
            </v-btn>
            <v-btn color="error" class="ml-lg-4">
              <v-icon>mdi-close</v-icon> 批次刪除
            </v-btn>
            <v-btn color="warning" class="ml-lg-4">
              <v-icon>mdi-refresh</v-icon> 重新排序
            </v-btn>
          </v-toolbar>
          <v-card outlined>
            <v-card-text color="#fff">
              <v-data-table
                v-model="selected"
                :headers="tabItemManagementHeaders"
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
            @click="toggleTabItemManagementModal = false"
            text
            large
          >
            回分頁商品列表 TAB 管理
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="toggleAddNewItemModal"
      width="800px"
      scrollable
      persistent
      retain-focus
      fullscreen
    >
      <v-card>
        <v-card-title class="primary white--text">
          新增/編輯分頁商品列表 TAB 商品
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
                      label="商品名稱"
                      hint="限 14 字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="特價描述"
                      hint="限 7 字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-select :items="items" label="所屬賣場"></v-select>
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
                  <v-col cols="12" class="mt-n5">
                    <v-file-input
                      small-chips
                      multiple
                      label="商品圖示"
                      placeholder="點擊上傳"
                      prepend-icon=""
                      hint="格式限制為大小限制 2MB，360*360px 的 JPG、PNG、GIF"
                      persistent-hint
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="default"
            @click="toggleAddNewItemModal = false"
            text
            large
          >
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
export default class FunMallProducts extends Vue {
  private headers: Array<any> = [
    { text: '名稱', value: 'fat', align: 'start', sortable: false },
    { text: '是否顯示', value: 'fat', align: 'start', sortable: true },
    { text: '顯示順序', value: 'fat', align: 'start', sortable: true },
    { text: '列表管理', value: 'fat', align: 'start', sortable: true },
    { text: 'TAB 編輯', value: 'fat', align: 'start', sortable: true }
  ]

  private tabManagementTableHeaders: Array<any> = [
    { text: 'TAB 名稱', value: 'fat', align: 'start', sortable: false },
    { text: '顯示順序', value: 'fat', align: 'start', sortable: true },
    { text: '名稱修改', value: 'fat', align: 'start', sortable: true },
    { text: '商品管理', value: 'fat', align: 'start', sortable: true }
  ]

  private tabItemManagementHeaders: Array<any> = [
    { text: '商品圖片', value: 'fat', align: 'start', sortable: false },
    { text: '商品名稱', value: 'fat', align: 'start', sortable: true },
    { text: '促銷副標', value: 'fat', align: 'start', sortable: true },
    { text: '顯示順序', value: 'fat', align: 'start', sortable: true },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private toggleModal: boolean = false

  private toggleSelectCompanies: boolean = false

  private toggleTabManagementModal: boolean = true

  private toggleAddNewTab: boolean = false

  private handleCancelAddNewTab(): void {
    this.toggleAddNewTab = false
  }

  private toggleTabItemManagementModal: boolean = true

  private toggleAddNewItemModal: boolean = false

  private async created() {}
}
</script>
