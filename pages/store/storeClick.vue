<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4">點擊紀錄</h2>
        <v-card outlined>
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
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { sysStore } from '~/store'

@Component({
  layout: 'default',
  middleware: 'auth'
})
export default class StoreStoreClick extends Vue {
  private headers: Array<any> = [
    { text: '區域', value: 'calories', align: 'start', sortable: false },
    { text: '類別', value: 'fat', align: 'start', sortable: false },
    { text: '店名', value: 'fat', align: 'start', sortable: false },
    { text: '會員代碼', value: 'fat', align: 'start', sortable: false },
    { text: '點擊次數', value: 'fat', align: 'start', sortable: false }
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
