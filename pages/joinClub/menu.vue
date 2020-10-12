<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">揪團樂菜單維護</h2>
          <v-card outlined>
            <v-toolbar flat>
              <v-btn color="primary" @click="toggleModal = true">
                <v-icon>mdi-plus</v-icon> 建⽴菜單
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
                      <v-select :items="items" label="品牌"></v-select>
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
          新增/編輯揪團樂菜單
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
                    <v-select :items="items" label="品牌"></v-select>
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
                    <v-textarea
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="備註"
                      hint="限 50 字"
                    >
                    </v-textarea>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-file-input
                      small-chips
                      multiple
                      label="上傳菜單"
                      placeholder="點擊上傳"
                      prepend-icon=""
                      hint="格式限制為大小限制 2MB 的 XSLX"
                      persistent-hint
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12">
                    <v-btn color="info">EXCEL 範例檔下載</v-btn>
                    <v-tooltip right>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          color="teal"
                          dark
                          v-bind="attrs"
                          v-on="on"
                          class="ml-lg-4"
                        >
                          <strong>?</strong>
                        </v-btn>
                      </template>
                      <div>
                        注意事項： ⿈底區域標題：不可編輯，請勿新增刪減任⼀欄位
                        <br />
                        1、淺藍區域標題：請因應菜單類型，⾃⾏填寫 <br />
                        2、商品屬性可增加/減少屬性：新增後，需合併「商品屬性」的儲存格
                        <br />
                        3、商品屬性的標題：可新增/減少標題，ex.新增多冰，新增後需合併「屬性標題」儲存格
                        <br />
                        4、有此規格：請填寫「Y」 無此規格：空格/Ｎ <br />
                        5、價格可對應某個屬性，屬性ex.飲料⼤多對應「尺⼨」，因此價格下方需填寫屬性名稱「ex.尺⼨」，並對應屬性標題
                        <br />
                        6、價格若不對應屬性，不對應時請空白 <br />
                        7、屬性/屬性標題的名稱、先後順序，將影響前台顯示的名稱、順序
                        <br />
                        8、若整份菜單無屬性，可以全部刪除屬性欄位<br />
                        9、加料區，加料選項請於Tab2填寫，請勿填寫於Tab1<br />
                        10、屬性標題若為「必填」，請填：*屬性標題⽂字*<br />
                        11、 價格不需打$，數值格式即可
                        12、菜單中「主標」的商品名稱不可重複<br />
                      </div>
                    </v-tooltip>
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
export default class JoinClubMenu extends Vue {
  private headers: Array<any> = [
    { text: '項次', value: 'fat', align: 'start', sortable: false },
    {
      text: '名稱',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '品牌', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private toggleModal: boolean = false

  private async created() {}
}
</script>
