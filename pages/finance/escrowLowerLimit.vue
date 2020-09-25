<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>水位警示設定</v-card-title>
          <v-banner color="#fff">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="model"
                    :counter="max"
                    :rules="rules"
                    label="最低水位"
                    hint="請輸入正整數，至多9位"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="mt-n7">
                  <v-textarea
                    v-model="model"
                    :counter="max"
                    :rules="rules"
                    label="通知名單"
                    hint="請輸入多個信箱請以【半形逗號: ,】分隔"
                  >
                  </v-textarea>
                </v-col>
                <v-col cols="6" class="mt-n3">
                  <v-btn color="primary">
                    <v-icon>mdi-magnify</v-icon> 儲存
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-banner>
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
export default class StoreStore extends Vue {
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
