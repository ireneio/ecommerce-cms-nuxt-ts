<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">權限管理</h2>
          <v-card outlined>
            <v-toolbar flat>
              <v-btn color="primary" @click="toggleModal = true">
                <v-icon>mdi-plus</v-icon> 新增簽核權限
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
          新增/編輯簽核權限
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-card-subtitle>
              上傳說明: <br />
              檔案欄位從第一行開始依序為統一編號、工號、姓名 <br />
              第一列為標題，匯入的資料從第二列開始 <br />
              <v-btn color="primary" class="mt-4">
                Excel 範例檔下載
              </v-btn>
            </v-card-subtitle>
            <v-card-text>
              <v-banner color="rgba(60, 141, 188, 0.05)">
                <v-container>
                  <v-row>
                    <v-col cols="6">
                      <v-file-input
                        small-chips
                        multiple
                        label="選擇 EXCEL"
                        placeholder="點擊上傳"
                        prepend-icon=""
                        hint="格式限制為大小限制 2MB 的 XSLX"
                        persistent-hint
                      ></v-file-input>
                    </v-col>
                    <v-col cols="6" class="mt-4">
                      <span class="pr-4"> 或 </span>
                      <v-btn
                        color="primary"
                        @click="toggleChooseTargets = true"
                      >
                        選擇對象
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-banner>
              <v-banner class="mt-4">
                <v-container>
                  <v-row>
                    <v-col cols="12" class="mt-n7">
                      <v-textarea
                        name="input-7-1"
                        label="已選擇對象 (公司/工號/姓名)"
                        readonly
                        hint="共計 0 筆"
                        persistent-hint
                        :value="
                          'Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功\nAndy RD-0002 匯入成功,Andy RD-0002 匯入成功, Andy RD-0002 匯入成功,Andy RD-0002 匯入成功, Andy RD-0002 匯入成功,Andy RD-0002 匯入成功, Andy RD-0002 匯入成功,Andy RD-0002 匯入成功, Andy RD-0002 匯入成功,Andy RD-0002 匯入成功, Andy RD-0002 匯入成功,Andy RD-0002 匯入成功, Andy RD-0002 匯入成功,Andy RD-0002 匯入成功, Andy RD-0002 匯入成功,'
                        "
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" class="mt-n7">
                      <v-textarea
                        name="input-7-1"
                        label="已匯入對象 (公司/工號/姓名)"
                        readonly
                        hint="共計 0 筆"
                        persistent-hint
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-banner>
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
      v-model="toggleChooseTargets"
      width="800px"
      scrollable
      persistent
      retain-focus
      fullscreen
    >
      <v-card>
        <v-card-title class="primary white--text">
          選擇對象
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-card-text>
              <v-banner color="rgba(60, 141, 188, 0.05)">
                <v-container>
                  <v-row>
                    <v-col cols="3">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="工號"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="姓名關鍵字"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="部門關鍵字"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-btn color="primary" class="mt-4">
                        <v-icon>mdi-magnify</v-icon> 搜尋
                      </v-btn>
                    </v-col>
                    <v-col cols="12" class="mt-n5">
                      <v-combobox
                        v-model="select"
                        :items="items"
                        label="選擇查詢結果"
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
              </v-banner>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="default"
            class="ml-lg-4"
            @click="toggleChooseTargets = false"
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
export default class WelfareIndex extends Vue {
  private headers: Array<any> = [
    { text: '新增時間', value: 'fat', align: 'start', sortable: true },
    {
      text: '帳號',
      value: 'fat',
      align: 'start',
      sortable: true
    },
    { text: '名稱', value: 'fat', align: 'start', sortable: false },
    { text: '狀態', value: 'fat', align: 'start', sortable: true },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private toggleModal: boolean = false

  private toggleChooseTargets: boolean = false

  private async created() {}
}
</script>
