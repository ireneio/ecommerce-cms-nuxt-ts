<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">熱門賣場管理</h2>
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
          新增/編輯熱門賣場
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
                      label="入口名稱"
                      hint="限 14 字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="⼊口 slogan"
                      hint="限 14 字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-radio-group v-model="radios" row>
                      <template v-slot:label>
                        <div>站內</div>
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
                    <v-select :items="items" label="模組名稱"></v-select>
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
                    <v-radio-group v-model="radios" row>
                      <template v-slot:label>
                        <div>顯示連外提示</div>
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
                  <v-col cols="12" class="mt-n5">
                    <v-textarea
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="連外提示訊息"
                      hint="限 50 字"
                    >
                    </v-textarea>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-btn
                      color="primary"
                      @click="toggleSelectCompanies = true"
                    >
                      選擇企業
                    </v-btn>
                    <v-select
                      v-if="toggleSelectCompanies"
                      :items="items"
                      label="選擇企業"
                      multiple
                    ></v-select>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-file-input
                      small-chips
                      multiple
                      label="WEB 圖示"
                      placeholder="點擊上傳"
                      prepend-icon=""
                      hint="格式限制為大小限制 2MB，187*100px 的 JPG、PNG、GIF"
                      persistent-hint
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-file-input
                      small-chips
                      multiple
                      label="APP 圖示"
                      placeholder="點擊上傳"
                      prepend-icon=""
                      hint="格式限制為大小限制 2MB，240*240px 的 JPG、PNG、GIF"
                      persistent-hint
                    ></v-file-input>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { sysStore } from '~/store'

@Component({
  layout: 'default',
  middleware: 'auth'
})
export default class FunMallShops extends Vue {
  private headers: Array<any> = [
    { text: '名稱', value: 'fat', align: 'start', sortable: false },
    {
      text: 'LOGO 圖示',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '是否顯示', value: 'fat', align: 'start', sortable: false },
    { text: '顯示順序', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private toggleModal: boolean = false

  private async created() {}
}
</script>
