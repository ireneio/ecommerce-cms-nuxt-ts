<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4">優惠類別管理</h2>
        <v-card outlined>
          <v-card-subtitle>
            說明： <br />
            1.優惠類別ID：用於特約商家匯入;
            優惠類別名稱：用於特約商家管理-建立優惠方案 <br />
            2.優惠類別建立後，會被企業福委權限管理者共用，建議盡量少修改、少刪除
          </v-card-subtitle>
          <v-toolbar flat>
            <v-btn color="primary" @click="toggleEdit = true">
              <v-icon>mdi-plus</v-icon> 新增類別
            </v-btn>
          </v-toolbar>
          <v-card-text>
            <div class="d-flex">
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
              <v-container style="flex: 0 0 50%;">
                <v-row v-if="toggleEdit">
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="優惠類別 ID"
                      hint="請依列表順序依序排序"
                      type="number"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="優惠類別名稱"
                      hint="限制 10 字"
                      type="number"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n3">
                    <v-btn color="primary">
                      <v-icon>mdi-checkbox-marked-outline</v-icon>
                      儲存
                    </v-btn>
                    <v-btn color="default" class="ml-lg-4">
                      清除
                    </v-btn>
                    <v-btn
                      color="error"
                      class="ml-lg-4"
                      @click="handleCancelEdit"
                    >
                      取消
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </div>
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
export default class StoreStoreSpecialType extends Vue {
  private headers: Array<any> = [
    { text: '優惠類別 ID', value: 'calories', align: 'start', sortable: false },
    { text: '優惠類別名稱', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private toggleEdit: boolean = false

  private handleCancelEdit(): void {
    this.toggleEdit = false
  }

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
