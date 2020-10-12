<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">揪團樂品牌維護</h2>
          <v-card outlined>
            <v-toolbar flat>
              <v-btn color="primary" @click="toggleModal = true">
                <v-icon>mdi-plus</v-icon> 建⽴品牌
              </v-btn>
              <v-btn color="success" class="ml-lg-4">
                <v-icon>mdi-checkbox-marked-outline</v-icon> 批次上架
              </v-btn>
              <v-btn color="warning" class="ml-lg-4">
                <v-icon>mdi-checkbox-blank-outline</v-icon> 批次下架
              </v-btn>
              <v-btn color="error" class="ml-lg-4">
                <v-icon>mdi-close</v-icon> 刪除
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
          新增/編輯揪團樂品牌
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
                      label="名稱"
                      hint="限 25 字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-radio-group v-model="radios" row>
                      <template v-slot:label>
                        <div>類型</div>
                      </template>
                      <v-checkbox value="aaa">
                        <template v-slot:label>
                          <div>
                            飲料
                          </div>
                        </template>
                      </v-checkbox>
                      <v-checkbox value="Duckduckgo" class="ml-lg-4">
                        <template v-slot:label>
                          <div>
                            甜點
                          </div>
                        </template>
                      </v-checkbox>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-radio-group v-model="radios" row>
                      <template v-slot:label>
                        <div>上架</div>
                      </template>
                      <v-checkbox value="aaa">
                        <template v-slot:label>
                          <div>
                            是
                          </div>
                        </template>
                      </v-checkbox>
                      <v-checkbox value="Duckduckgo" class="ml-lg-4">
                        <template v-slot:label>
                          <div>
                            否
                          </div>
                        </template>
                      </v-checkbox>
                    </v-radio-group>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-text color="#fff">
              <v-container>
                <v-row>
                  <v-col cols="12" class="mt-n5">
                    <v-file-input
                      small-chips
                      multiple
                      label="上傳品牌海報"
                      placeholder="點擊上傳"
                      prepend-icon=""
                      hint="格式限制為大小限制 2MB，1080*720px 的 JPG、PNG、GIF"
                      persistent-hint
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-text color="#fff">
              <v-container>
                <v-row>
                  <v-col cols="12" class="mt-n5">
                    <v-file-input
                      small-chips
                      multiple
                      label="上傳品牌LOGO"
                      placeholder="點擊上傳"
                      prepend-icon=""
                      hint="格式限制為大小限制 2MB，1080*720px 的 JPG、PNG、GIF"
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
export default class JoinClubBrand extends Vue {
  private headers: Array<any> = [
    { text: '項次', value: 'fat', align: 'start', sortable: false },
    {
      text: '品牌名稱',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '類型', value: 'fat', align: 'start', sortable: false },
    { text: '狀態', value: 'fat', align: 'start', sortable: false },
    { text: '店家數', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private toggleModal: boolean = false

  private async created() {
    // await this.sendGetPermissionListRequest()
  }
}
</script>
