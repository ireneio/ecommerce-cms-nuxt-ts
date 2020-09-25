<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>新增問卷</v-card-title>
          <v-card-text>
            <v-tabs v-model="currentTab">
              <v-tab v-for="item in tabs" :key="item.name">
                {{ item.name }}
              </v-tab>
            </v-tabs>
            <v-container>
              <v-row v-if="currentTab === 0">
                <v-col cols="12">
                  <v-text-field
                    v-model="model"
                    :counter="max"
                    :rules="rules"
                    label="問卷名稱"
                    hint="限 30 字"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    small-chips
                    multiple
                    label="問卷Banner"
                    placeholder="圖檔格式限制為 JPG、PNG、GIF，大小限制2MB"
                    prepend-icon=""
                  ></v-file-input>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    name="input-7-1"
                    label="問卷說明"
                    hint="限 200 字"
                  ></v-textarea>
                </v-col>
                <v-col cols="12">
                  <v-radio-group v-model="radios" row>
                    <template v-slot:label>
                      <div>前台顯示問卷</div>
                    </template>
                    <v-radio value="Duckduckgo">
                      <template v-slot:label>
                        <div>
                          是
                        </div>
                      </template>
                    </v-radio>
                    <v-radio value="aaa">
                      <template v-slot:label>
                        <div>
                          否
                        </div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12">
                  <v-radio-group v-model="radios" row>
                    <template v-slot:label>
                      <div>前台顯示問卷</div>
                    </template>
                    <v-radio value="Duckduckgo">
                      <template v-slot:label>
                        <div>
                          是
                        </div>
                      </template>
                    </v-radio>
                    <v-radio value="aaa">
                      <template v-slot:label>
                        <div>
                          否
                        </div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12">
                  <v-radio-group v-model="radios" row>
                    <template v-slot:label>
                      <div>問卷提交後是否可再編輯</div>
                    </template>
                    <v-radio value="Duckduckgo">
                      <template v-slot:label>
                        <div>
                          是
                        </div>
                      </template>
                    </v-radio>
                    <v-radio value="aaa">
                      <template v-slot:label>
                        <div>
                          否
                        </div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12">
                  <v-radio-group v-model="radios" row>
                    <template v-slot:label>
                      <div>問卷填答⽅式</div>
                    </template>
                    <v-radio value="Duckduckgo">
                      <template v-slot:label>
                        <div>
                          非匿名
                        </div>
                      </template>
                    </v-radio>
                    <v-radio value="aaa">
                      <template v-slot:label>
                        <div>
                          匿名
                        </div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12">
                  <v-radio-group v-model="radios" row>
                    <template v-slot:label>
                      <div>問卷填答次數</div>
                    </template>
                    <v-radio value="Duckduckgo">
                      <template v-slot:label>
                        <div>
                          限定⼀次
                        </div>
                      </template>
                    </v-radio>
                    <v-radio value="aaa">
                      <template v-slot:label>
                        <div>
                          不限
                        </div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="4">
                  <v-radio-group v-model="radios" row>
                    <template v-slot:label>
                      <div>問卷調查期間</div>
                    </template>
                    <v-radio value="Duckduckgo">
                      <template v-slot:label>
                        <div>
                          無設定
                        </div>
                      </template>
                    </v-radio>
                    <v-radio value="aaa">
                      <template v-slot:label>
                        <div>
                          設定調查起訖日
                        </div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="4">
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
                      <v-btn text color="primary" @click="$refs.menu.save(date)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="4">
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
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false"
                        >Cancel</v-btn
                      >
                      <v-btn text color="primary" @click="$refs.menu.save(date)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="4">
                  <v-radio-group v-model="radios" row>
                    <template v-slot:label>
                      <div>問卷調查對象</div>
                    </template>
                    <v-radio value="Duckduckgo">
                      <template v-slot:label>
                        <div>
                          STAYFUN 全體會員
                        </div>
                      </template>
                    </v-radio>
                    <v-radio value="aaa">
                      <template v-slot:label>
                        <div>
                          指定企業
                        </div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" class="mt-4">
                  <v-btn color="primary" @click="currentTab = 1">
                    <v-icon>mdi-checkbox-marked-outline</v-icon>
                    <span> 下一步</span>
                  </v-btn>
                </v-col>
              </v-row>
              <v-row v-if="currentTab === 1">
                <v-col cols="12">
                  <v-card outlined>
                    <v-card-title>選擇題目類型</v-card-title>
                    <v-card-subtitle>
                      <v-container fluid>
                        <v-row>
                          <v-col cols="3" class="mt-4">
                            <v-btn
                              color="primary"
                              block
                              @click="currentQuestionType = 0"
                            >
                              <v-icon>mdi-checkbox-marked-outline</v-icon>
                              <span> 選擇題</span>
                            </v-btn>
                          </v-col>
                          <v-col cols="3" class="mt-4">
                            <v-btn
                              color="success"
                              block
                              @click="currentQuestionType = 1"
                            >
                              <v-icon>mdi-checkbox-marked-outline</v-icon>
                              <span> 單行文字</span>
                            </v-btn>
                          </v-col>
                          <v-col cols="3" class="mt-4">
                            <v-btn
                              color="info"
                              block
                              @click="currentQuestionType = 2"
                            >
                              <v-icon>mdi-checkbox-marked-outline</v-icon>
                              <span> 多行文字</span>
                            </v-btn>
                          </v-col>
                          <v-col cols="3" class="mt-4">
                            <v-btn
                              color="warning"
                              block
                              @click="currentQuestionType = 3"
                            >
                              <v-icon>mdi-checkbox-marked-outline</v-icon>
                              <span> 矩陣題</span>
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-subtitle>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col></v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { sysStore } from '~/store'

@Component({
  layout: 'default',
  middleware: 'auth'
})
export default class QuestionnaireCreate extends Vue {
  private tabs: Array<any> = [
    { name: '問卷設定', value: 0 },
    { name: '新增題目', value: 1 }
  ]

  private currentTab: number = 0

  private currentQuestionType: number = 0
  // private async sendGetGroupListRequest() {
  //   try {
  //     await sysStore.getPermissionList({
  //       token: this.$cookies.get('accessToken')
  //     })
  //   } catch (e) {
  //     // error
  //   }
  // }

  private async created() {
    // await this.sendGetPermissionListRequest()
  }
}
</script>
