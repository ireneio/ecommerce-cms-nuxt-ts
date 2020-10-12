<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4">重置密碼</h2>
        <v-card outlined>
          <v-card-subtitle>
            若員工/會員忘記密碼或無法自行變更密碼時，可以請企業福委窗口或客服人員採用重置密碼功能。<br />
            1. 準備欲重置密碼的帳號，以及該帳號所屬的E-mail。 <br />2.
            若帳號未設定E-mail則無法重置密碼。 <br />3.
            若需要新增或修改E-mail也可在此功能中完成，所有新增與修改都會同步至我的專區會員資料中。
          </v-card-subtitle>
          <v-card-text>
            <v-banner color="rgba(60, 141, 188, 0.05)">
              <v-container>
                <v-row>
                  <v-col cols="3">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="會員帳號"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="2" class="mt-4">
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
export default class SysResetPassword extends Vue {
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
