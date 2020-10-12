<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">點數匯入紀錄</h2>
          <v-card outlined>
            <v-card-text>
              <v-banner color="rgba(60, 141, 188, 0.05)">
                <v-container>
                  <v-row>
                    <v-col cols="3">
                      <v-select :items="items" label="依客戶查詢"></v-select>
                    </v-col>
                    <v-col cols="3">
                      <v-select
                        :items="items"
                        label="依點數類別查詢"
                      ></v-select>
                    </v-col>
                    <v-col cols="3">
                      <v-select :items="items" label="受益對象"></v-select>
                    </v-col>
                    <v-col cols="3">
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
                            label="開始日期"
                            readonly
                            v-bind="attrs"
                            v-on="on"
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
                    <v-col cols="3" class="mt-n7">
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
                            label="結束日期"
                            readonly
                            v-bind="attrs"
                            v-on="on"
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
                    <v-col cols="6" class="mt-n7">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="發放說明"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3" class="mt-n3">
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
          享樂金點數匯入紀錄詳細資訊
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-card-text color="#fff">
              <v-container>
                <v-row>
                  <v-col cols="8" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="匯入客戶"
                      readonly
                      value="還記得你說家是唯一的城堡"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="4" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="點數類別"
                      readonly
                      value="還記得你說家是唯一的城堡"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="2" class="mt-n5">
                    <v-select
                      :items="items"
                      label="受益對象"
                      readonly
                      value="非信託"
                    ></v-select>
                  </v-col>
                  <v-col cols="5" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="信託啟日"
                      readonly
                      value="N/A"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="5" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="信託迄日"
                      readonly
                      value="N/A"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-textarea
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="發放說明"
                      readonly
                      value="還記得你說家是唯一的城堡"
                    >
                    </v-textarea>
                  </v-col>
                  <v-col cols="4" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="點數有效迄日"
                      readonly
                      value="N/A"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="4" class="mt-n5">
                    <div class="d-flex">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="匯入總人數"
                        readonly
                        value="100"
                      >
                      </v-text-field>
                      <v-btn color="info" class="mt-4 ml-2">
                        <span> 下載匯入名單</span>
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="4" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="匯入總點數"
                      readonly
                      value="99999"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="default"
            class="ml-lg-4"
            @click="toggleModal = false"
            text
            large
          >
            回列表
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
export default class TravelPointPointImportRecord extends Vue {
  private headers: Array<any> = [
    { text: '受益對象', value: 'calories', align: 'start', sortable: false },
    { text: '客戶', value: 'fat', align: 'start', sortable: false },
    { text: '點數類別名稱', value: 'fat', align: 'start', sortable: false },
    { text: '發放說明', value: 'fat', align: 'start', sortable: false },
    { text: '匯入日期', value: 'fat', align: 'start', sortable: false },
    { text: '匯入總人數', value: 'fat', align: 'start', sortable: false },
    { text: '匯入總點數', value: 'fat', align: 'start', sortable: false }
  ]

  private toggleModal: boolean = true

  private async created() {}
}
</script>
