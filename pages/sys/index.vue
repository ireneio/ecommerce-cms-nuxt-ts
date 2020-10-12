<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">功能表管理</h2>
          <v-card outlined>
            <v-toolbar flat>
              <v-btn color="primary" @click="toggleModal = true">
                <v-icon>mdi-plus</v-icon> 新增
              </v-btn>
              <v-btn color="success" class="ml-4" @click="toggleModal = true">
                <v-icon>mdi-lead-pencil</v-icon> 修改
              </v-btn>
              <v-btn color="error" class="ml-4">
                <v-icon>mdi-close</v-icon> 刪除
              </v-btn>
            </v-toolbar>
            <v-card-text color="#fff">
              <v-treeview open-all :items="items" activatable></v-treeview>
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
          新增/編輯功能
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="功能名稱"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="功能代碼"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="功能連結"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="排序"
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
                  <v-col cols="12" class="mt-n5">
                    <v-select :items="items" label="模組選單"></v-select>
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

@Component({
  layout: 'default',
  middleware: 'auth'
})
export default class SysIndex extends Vue {
  private items: Array<any> = [
    {
      id: 1,
      name:
        '32AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      children: [
        { id: 2, name: '32' },
        { id: 3, name: '24' },
        { id: 4, name: '26' }
      ]
    },
    {
      id: 5,
      name: '愛情裡面的成分',
      children: [
        {
          id: 6,
          name: '有多少比例是對等',
          children: [
            {
              id: 7,
              name: '你在等的那個人',
              children: [
                { id: 8, name: '投入是否也一樣深' },
                { id: 9, name: '其實我們都不笨' }
              ]
            }
          ]
        },
        {
          id: 10,
          name: '看得出他愛有幾分',
          children: [
            {
              id: 11,
              name: '他喜歡忽熱忽冷',
              children: [
                { id: 12, name: '讓他世界保持可能' },
                { id: 13, name: '是我還不夠好' },
                { id: 14, name: '所以他不願承認' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 15,
      name: '承認他還想要鬧 ',
      children: [
        { id: 16, name: '保持這曖昧就好' },
        { id: 17, name: '是我還不夠好' },
        { id: 18, name: '所以他不願承認' }
      ]
    },
    {
      id: 19,
      name: '承認我對他的好',
      children: [
        {
          id: 20,
          name: '承認我到底有多重要',
          children: [
            { id: 21, name: '也許我不重要' },
            { id: 22, name: '也許該下定決心了' },
            { id: 23, name: '別再為不值得的人' }
          ]
        },
        { id: 24, name: '付出再多 不懂心疼' },
        { id: 25, name: '別再消費我的青春' }
      ]
    }
  ]

  private toggleModal: boolean = false
}
</script>
