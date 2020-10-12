<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">權限群組管理</h2>
          <v-card outlined>
            <v-toolbar flat>
              <v-btn color="primary" @click="toggleModal = true">
                <v-icon>mdi-plus</v-icon> 新增權限群組
              </v-btn>
              <v-btn color="error" class="ml-4">
                <v-icon>mdi-close</v-icon> 批次刪除
              </v-btn>
              <v-btn color="success" class="ml-4">
                <v-icon>mdi-checkbox-marked-outline</v-icon> 批次啟用
              </v-btn>
              <v-btn color="warning" class="ml-4">
                <v-icon>mdi-checkbox-blank-outline</v-icon> 批次停用
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-banner flat color="rgba(60, 141, 188, 0.05)">
                <v-container>
                  <v-row>
                    <v-col cols="3">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="權限群組名稱"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3" class="mt-4">
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
          新增/編輯權限群組
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-tabs>
              <v-tab @click="currentTab = 0">權限群組資料</v-tab>
              <v-tab @click="currentTab = 1">權限群組對應功能資料</v-tab>
            </v-tabs>
            <v-card-text v-show="currentTab === 0">
              <v-container>
                <v-row>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="權限群組名稱"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="權限群組代碼"
                      hint="限英文字母【a-zA-Z】"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-radio-group v-model="radios" row>
                      <template v-slot:label>
                        <div>啟用</div>
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
            <v-card-text v-show="currentTab === 1">
              <v-treeview open-all :items="items" selectable></v-treeview>
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
export default class SysPermissionGroupSetting extends Vue {
  private headers: Array<any> = [
    {
      text: '權限群組名稱',
      value: 'calories',
      align: 'start',
      sortable: false
    },
    { text: '權限群組代碼', value: 'fat', align: 'start', sortable: false },
    { text: '是否啟用', value: 'carbs', align: 'start', sortable: false },
    { text: '操作', value: 'carbs', align: 'start', sortable: false }
  ]

  private items: Array<any> = [
    {
      id: 1,
      name: '聽你說什麼我都很快樂',
      children: [
        { id: 2, name: '接近你連影子都微笑著' },
        { id: 3, name: '幾千隻紙鶴' },
        { id: 4, name: '你都耐心地陪著我折' }
      ]
    },
    {
      id: 5,
      name: '卻怎麼都折不掉 那道無形的隔閡',
      children: [
        {
          id: 6,
          name: '越懂你陪著你就越寂寞',
          children: [
            {
              id: 7,
              name: '靈魂那麼美我卻碰不得',
              children: [
                { id: 8, name: '感覺再熾熱' },
                { id: 9, name: '也不能讓飛蛾去撲火' }
              ]
            }
          ]
        },
        {
          id: 10,
          name: '靠近你的夢',
          children: [
            {
              id: 11,
              name: '難道就能不失落',
              children: [
                { id: 12, name: '好朋友只是朋友' },
                { id: 13, name: '還是朋友 不能夠佔有' },
                { id: 14, name: '好朋友瘋狂以後' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 15,
      name: '就一個人走 無所求',
      children: [
        { id: 16, name: '好朋友只是朋友' },
        { id: 17, name: '只能保留 一點點溫柔' },
        { id: 18, name: '我知道什麼時候回頭' }
      ]
    },
    {
      id: 19,
      name: '不打擾你的自由',
      children: [
        {
          id: 20,
          name: '認識你也許我就足夠了',
          children: [
            { id: 21, name: '緣分的深淺我都不管了' },
            { id: 22, name: '可能你感動' },
            { id: 23, name: '也看不見我心如刀割' }
          ]
        },
        { id: 24, name: '哪怕很痛過' },
        { id: 25, name: '至少就不算錯過' }
      ]
    }
  ]

  private toggleModal: boolean = false

  private currentTab: number = 0

  private get permissionList() {
    return sysStore.permissionList
  }

  private async sendGetPermissionListRequest() {
    try {
      await sysStore.getPermissionList({
        token: this.$cookies.get('accessToken')
      })
    } catch (e) {
      // error
    }
  }

  private async created() {
    await this.sendGetPermissionListRequest()
  }
}
</script>
