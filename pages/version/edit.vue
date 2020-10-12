<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h2 class="mb-4">版本維護編輯</h2>
        <v-card outlined>
          <v-card-text>
            <v-banner color="rgba(60, 141, 188, 0.05)">
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
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="Android 版本號碼"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="Web 版本號碼"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
                    <v-text-field
                      v-model="model"
                      :counter="max"
                      :rules="rules"
                      label="商城版本號碼"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" class="mt-n5">
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
                  <v-col cols="12" class="mt-n5">
                    <v-textarea
                      name="input-7-1"
                      label="Release Note"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="3" class="mt-n3">
                    <v-btn color="primary">
                      <v-icon>mdi-checkbox-marked-outline</v-icon> 儲存
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
