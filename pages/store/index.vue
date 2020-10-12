<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4">特約商家分類</h2>
        <v-card outlined>
          <v-toolbar flat>
            <v-btn color="primary" @click="showTab = true">
              <v-icon>mdi-plus</v-icon> 新增類別
            </v-btn>
          </v-toolbar>
          <div class="d-flex">
            <v-card-text style="flex: 0 0 50%">
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
            <v-card-text v-show="showTab">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="ID"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="類別名稱"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-file-input
                      small-chips
                      multiple
                      label="上傳附件"
                      placeholder="點擊上傳"
                      prepend-icon=""
                      hint="格式限制為大小限制 2MB 的 JPG、PNG、GIF"
                      persistent-hint
                    ></v-file-input>
                  </v-col>
                  <v-col cols="12" class="mt-4">
                    <v-btn color="success">
                      <v-icon>mdi-checkbox-marked-outline</v-icon> 儲存
                    </v-btn>
                    <v-btn color="default" class="ml-lg-4">
                      清除
                    </v-btn>
                    <v-btn
                      color="error"
                      class="ml-lg-4"
                      @click="showTab = false"
                    >
                      取消
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </div>
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
export default class StoreIndex extends Vue {
  private headers: Array<any> = [
    { text: 'ID', value: 'calories', align: 'start', sortable: false },
    { text: '類別名稱', value: 'fat', align: 'start', sortable: false }
  ]

  private showTab: boolean = false
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
