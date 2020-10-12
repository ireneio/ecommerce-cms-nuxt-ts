<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">點數類別管理</h2>
          <v-card outlined>
            <v-toolbar flat>
              <v-btn color="primary" @click="toggleModal = true">
                <v-icon>mdi-plus</v-icon> 新增
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
          新增/編輯享樂金點數類別
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-card-text color="#fff">
              <v-container>
                <v-row>
                  <v-col cols="12" class="mt-n4">
                    <v-select :items="items" label="適用客戶"></v-select>
                  </v-col>
                  <v-col cols="12" class="mt-n4">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="點數名稱"
                      hint="請輸入中英文字⺟、數字，限20個字元"
                    >
                    </v-text-field>
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
import { sysStore } from '~/store'

@Component({
  layout: 'default',
  middleware: 'auth'
})
export default class TravelPointIndex extends Vue {
  private headers: Array<any> = [
    { text: '適用客戶', value: 'calories', align: 'start', sortable: false },
    { text: '點數類別名稱', value: 'fat', align: 'start', sortable: false }
  ]

  private toggleModal: boolean = false

  private async created() {}
}
</script>
