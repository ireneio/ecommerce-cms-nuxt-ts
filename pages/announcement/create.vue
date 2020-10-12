<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4">發送新訊息</h2>
        <v-card outlined>
          <v-card-text color="#fff">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="model"
                    :counter="max"
                    :rules="rules"
                    label="標題"
                    hint="限 25 字"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="mt-n5">
                  <!-- <tiptap-vuetify
                    v-model="content"
                    :extensions="extensions"
                  ></tiptap-vuetify> -->
                </v-col>
                <v-col cols="12" class="mt-n5">
                  <v-radio-group v-model="radios" row>
                    <template v-slot:label>
                      <div>訊息開始時間</div>
                    </template>
                    <v-radio value="aaa">
                      <template v-slot:label>
                        <div>
                          立即送出
                        </div>
                      </template>
                    </v-radio>
                    <v-radio value="Duckduckgo" class="ml-lg-4">
                      <template v-slot:label>
                        <div>
                          選擇日期
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
                        label="訊息開始日期"
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
                        label="訊息結束時間"
                        hint="若不輸入代表訊息無使用期限"
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
                <v-col cols="12" class="mt-n5">
                  <v-radio-group v-model="radios" row>
                    <template v-slot:label>
                      <div>是否置頂</div>
                    </template>
                    <v-radio value="Duckduckgo">
                      <template v-slot:label>
                        <div>
                          是
                        </div>
                      </template>
                    </v-radio>
                    <v-radio value="aaa" class="ml-lg-4">
                      <template v-slot:label>
                        <div>
                          否
                        </div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" class="mt-n5">
                  <v-file-input
                    small-chips
                    multiple
                    label="上傳附件"
                    placeholder="點擊上傳"
                    prepend-icon=""
                    hint="格式限制為大小限制 2MB 的 PDF"
                    persistent-hint
                  ></v-file-input>
                </v-col>
                <v-col cols="12" class="mt-n5">
                  <v-select :items="items" label="訊息類型"></v-select>
                </v-col>
                <v-col cols="12" class="mt-n5">
                  <v-text-field
                    v-model="model"
                    :counter="max"
                    :rules="rules"
                    label="TAG"
                    hint="每個 TAG 限 10 字，以逗號相隔"
                    placeholder="新版首頁將出現 TAG【行銷廣告】訊息 (優先顯示最新一則)"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="mt-n5">
                  <v-radio-group v-model="radios" row>
                    <template v-slot:label>
                      <div>收件對象</div>
                    </template>
                    <v-radio value="Duckduckgo">
                      <template v-slot:label>
                        <div>
                          STAYFUN 全體會員
                        </div>
                      </template>
                    </v-radio>
                    <v-radio value="aaa" class="ml-lg-4">
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
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import {
  // TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History
} from 'tiptap-vuetify'

@Component({
  layout: 'default',
  middleware: 'auth',
  components: {
    // TiptapVuetify
  }
})
export default class AnnouncementCreate extends Vue {
  private extensions: Array<any> = [
    History,
    Blockquote,
    Link,
    Underline,
    Strike,
    Italic,
    ListItem,
    BulletList,
    OrderedList,
    [
      Heading,
      {
        options: {
          levels: [1, 2, 3]
        }
      }
    ],
    Bold,
    Code,
    HorizontalRule,
    Paragraph,
    HardBreak
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
