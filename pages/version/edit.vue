<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>版本維護編輯</v-card-title>
          <v-banner color="#fff">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="model"
                    :counter="max"
                    :rules="rules"
                    label="iOS 版本號碼"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="mt-n7">
                  <v-text-field
                    v-model="model"
                    :counter="max"
                    :rules="rules"
                    label="Android 版本號碼"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="mt-n7">
                  <v-text-field
                    v-model="model"
                    :counter="max"
                    :rules="rules"
                    label="Web 版本號碼"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="mt-n7">
                  <v-text-field
                    v-model="model"
                    :counter="max"
                    :rules="rules"
                    label="商城版本號碼"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" class="mt-n7">
                  <v-radio-group v-model="radios" row>
                    <template v-slot:label>
                      <div>更新類別</div>
                    </template>
                    <v-radio value="Duckduckgo">
                      <template v-slot:label>
                        <div>
                          強更
                        </div>
                      </template>
                    </v-radio>
                    <v-radio value="aaa">
                      <template v-slot:label>
                        <div>
                          例行更新
                        </div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
                <v-col cols="12" class="mt-n7">
                  <v-textarea
                    name="input-7-1"
                    label="Release Note"
                  ></v-textarea>
                </v-col>
                <v-col cols="3" class="mt-n3">
                  <v-btn color="primary">
                    <v-icon>mdi-checkbox-marked-outline</v-icon> 儲存送出
                  </v-btn>
                  <v-btn color="default" class="ml-lg-4">
                    返回列表
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-banner>
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
export default class VersionEdit extends Vue {
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
