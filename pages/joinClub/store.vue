<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>
            <span>揪團樂店家維護</span>
            <v-spacer></v-spacer>
            <v-btn color="primary"> <v-icon>mdi-plus</v-icon> 建⽴店家 </v-btn>
            <v-btn color="success" class="ml-lg-4">
              <v-icon>mdi-checkbox-marked-outline</v-icon> 批次上架
            </v-btn>
            <v-btn color="warning" class="ml-lg-4">
              <v-icon>mdi-checkbox-blank-outline</v-icon> 批次下架
            </v-btn>
            <v-btn color="error" class="ml-lg-4">
              <v-icon>mdi-close</v-icon> 刪除
            </v-btn>
          </v-card-title>
          <v-banner color="#fff">
            <v-container>
              <v-row>
                <v-col cols="3">
                  <v-text-field
                    v-model="model"
                    :counter="max"
                    :rules="rules"
                    label="關鍵字"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6" class="mt-4">
                  <v-btn color="primary">
                    <v-icon>mdi-magnify</v-icon> 搜尋
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
export default class JoinClubStore extends Vue {
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
