<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">帳號點數查詢</h2>
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
                        label="帳號"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-select :items="items" label="信託"></v-select>
                    </v-col>
                    <v-col cols="3">
                      <v-select :items="items" label="點數類別名稱"></v-select>
                    </v-col>
                    <v-col cols="3">
                      <v-checkbox
                        v-model="selected"
                        label="顯示剩餘點數為0的匯入紀錄"
                        :value="true"
                      ></v-checkbox>
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
          帳號點數查詢資訊
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-card-title>
              <span>點數有效迄日:</span>
              <span class="ml-4">無期限</span>
            </v-card-title>
            <v-card-text color="#fff">
              <v-data-table
                v-model="selected"
                :headers="detailTableHeaders"
                :items="desserts"
                :single-select="singleSelect"
                item-key="name"
                show-select
                class="elevation-1"
              >
              </v-data-table>
              <v-card-actions>
                <v-spacer></v-spacer>
                <div>
                  <span>期末屢保點數餘額</span>
                  <span class="ml-4 primary--text">
                    <strong>100</strong>
                  </span>
                </div>
                <div class="ml-12">
                  <span>期末非屢保點數餘額</span>
                  <span class="ml-4 primary--text">
                    <strong>100</strong>
                  </span>
                </div>
                <div class="ml-12">
                  <span>合計屢保點數餘額</span>
                  <span class="ml-4 primary--text">
                    <strong>100</strong>
                  </span>
                </div>
                <div class="ml-12">
                  <span>合計非屢保點數餘額</span>
                  <span class="ml-4 primary--text">
                    <strong>100</strong>
                  </span>
                </div>
              </v-card-actions>
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
export default class PointUserPointDetail extends Vue {
  private headers: Array<any> = [
    { text: '信託', value: 'calories', align: 'start', sortable: false },
    { text: '點數類別名稱', value: 'fat', align: 'start', sortable: false },
    { text: '發放說明', value: 'fat', align: 'start', sortable: false },
    { text: '匯入日期', value: 'fat', align: 'start', sortable: false },
    { text: '匯入總點數', value: 'fat', align: 'start', sortable: false },
    { text: '餘額', value: 'fat', align: 'start', sortable: false }
  ]

  private detailTableHeaders: Array<any> = [
    { text: '異動日期', value: 'calories', align: 'start', sortable: false },
    { text: '訂單號碼', value: 'fat', align: 'start', sortable: false },
    { text: '逾期點數', value: 'fat', align: 'start', sortable: false },
    { text: '', value: 'fat', align: 'start', sortable: false },
    { text: '點數進帳', value: 'fat', align: 'start', sortable: false },
    { text: '', value: 'fat', align: 'start', sortable: false },
    { text: '點數消費', value: 'fat', align: 'start', sortable: false },
    { text: '', value: 'fat', align: 'start', sortable: false },
    { text: '期末點數', value: 'fat', align: 'start', sortable: false },
    { text: '', value: 'fat', align: 'start', sortable: false }
  ]

  private toggleModal: boolean = true

  private async created() {}
}
</script>
