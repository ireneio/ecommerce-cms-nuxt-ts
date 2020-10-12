<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4 d-flex align-start">
            <div class="mt-1">群組資料</div>
            <v-breadcrumbs :items="items"></v-breadcrumbs>
          </h2>
          <v-card outlined>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="群組名稱"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="群組代碼"
                      hint="只能輸入英文代碼"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      :value="'3/3'"
                      :rules="rules"
                      label="公司開通人數/公司總人數"
                      readonly
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-radio-group v-model="radios" row>
                      <template v-slot:label>
                        <div>群組類別</div>
                      </template>
                      <v-radio value="aaa">
                        <template v-slot:label>
                          <div>
                            企業/公司
                          </div>
                        </template>
                      </v-radio>
                      <v-radio value="Duckduckgo" class="ml-lg-4">
                        <template v-slot:label>
                          <div>
                            部門
                          </div>
                        </template>
                      </v-radio>
                      <v-radio value="Duckduckgo" class="ml-lg-4">
                        <template v-slot:label>
                          <div>
                            社團
                          </div>
                        </template>
                      </v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="統一編號"
                      hint="8 碼數字"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="聯絡地址"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="聯絡電話"
                      hint="限數字"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" class="mt-n5">
                    <v-file-input
                      small-chips
                      multiple
                      label="手機群組圖像"
                      placeholder="點擊上傳"
                      prepend-icon=""
                      hint="格式限制為大小限制 2MB ，200*88px 的 JPG、PNG、GIF"
                      persistent-hint
                    ></v-file-input>
                  </v-col>

                  <v-col cols="12" class="mt-n5">
                    <v-file-input
                      small-chips
                      multiple
                      label="網站群組圖像"
                      placeholder="點擊上傳"
                      prepend-icon=""
                      hint="格式限制為大小限制 2MB ，348*145 的 JPG、PNG、GIF"
                      persistent-hint
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-radio-group v-model="radios" row>
                      <template v-slot:label>
                        <div>對外公開</div>
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
                    <v-checkbox
                      v-model="selected"
                      label="建立 AuthorizedClientKey"
                      hint="授權用戶金鑰"
                      persistent-hint
                      :value="true"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="系統異常聯絡人"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-radio-group v-model="radios" row>
                      <template v-slot:label>
                        <div>群組功能</div>
                      </template>
                      <v-checkbox
                        label="逛特約"
                        :value="5"
                        disabled
                        :input-value="5"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="selected"
                        label="好好買"
                        :value="1"
                        disabled
                        :input-value="1"
                        class="ml-lg-4"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="selected"
                        label="我的專區"
                        :value="2"
                        disabled
                        :input-value="2"
                        class="ml-lg-4"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="selected"
                        label="揪團樂"
                        :value="3"
                        disabled
                        :input-value="3"
                        class="ml-lg-4"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="selected"
                        label="調查所"
                        :value="true"
                        class="ml-lg-4"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="selected"
                        label="訊息牆"
                        :value="true"
                        class="ml-lg-4"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="selected"
                        label="瘋活動"
                        :value="true"
                        class="ml-lg-4"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="selected"
                        label="津貼中心"
                        :value="true"
                        class="ml-lg-4"
                      ></v-checkbox>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-radio-group v-model="radios" row>
                      <template v-slot:label>
                        <div>點數模組前台顯示</div>
                      </template>
                      <v-checkbox value="aaa">
                        <template v-slot:label>
                          <div>
                            享樂金
                          </div>
                        </template>
                      </v-checkbox>
                      <v-checkbox value="Duckduckgo" class="ml-lg-4">
                        <template v-slot:label>
                          <div>
                            旅遊金
                          </div>
                        </template>
                      </v-checkbox>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" class="mt-n3">
                    <v-btn color="primary">
                      <v-icon>mdi-checkbox-marked-outline</v-icon>
                      <span> 儲存</span>
                    </v-btn>
                    <v-btn color="default" class="ml-lg-4">
                      取消
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { sysStore } from '~/store'

@Component({
  layout: 'default',
  middleware: 'auth'
})
export default class SysGroupSettingSerialno extends Vue {
  private headers: Array<any> = [
    { text: '群組名稱', value: 'calories', align: 'start', sortable: false },
    { text: '群組代碼', value: 'fat', align: 'start', sortable: false },
    { text: '統一編號', value: 'carbs', align: 'start', sortable: false },
    { text: '群組類別', value: 'carbs', align: 'start', sortable: false },
    { text: '客戶別', value: 'carbs', align: 'start', sortable: true },
    { text: '是否對外開放', value: 'carbs', align: 'start', sortable: false },
    { text: '狀態', value: 'carbs', align: 'start', sortable: false },
    { text: '操作', value: 'carbs', align: 'start', sortable: false }
  ]

  private toggleModal: boolean = false

  private items: Array<any> = [
    {
      text: '公司/群組管理',
      disabled: false,
      href: '/sys/groupSetting'
    },
    {
      text: '群組資料',
      disabled: true
      // href: 'breadcrumbs_link_1'
    }
  ]

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
