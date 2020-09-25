<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>特約商家管理</v-card-title>
          <v-toolbar flat>
            <v-btn color="primary"> <v-icon>mdi-plus</v-icon> 新增 </v-btn>
          </v-toolbar>
          <v-banner color="#fff">
            <v-container>
              <v-row>
                <v-col cols="3">
                  <v-select :items="items" label="所在地區"></v-select>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="model"
                    :counter="max"
                    :rules="rules"
                    label="店名關鍵字"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="開始日期"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false"
                        >Cancel</v-btn
                      >
                      <v-btn text color="primary" @click="$refs.menu.save(date)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="3">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="date"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="date"
                        label="結束日期"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false"
                        >Cancel</v-btn
                      >
                      <v-btn text color="primary" @click="$refs.menu.save(date)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="3" class="mt-n7">
                  <v-select :items="items" label="商家分類"></v-select>
                </v-col>
                <v-col cols="3" class="mt-n7">
                  <v-text-field
                    v-model="model"
                    :counter="max"
                    :rules="rules"
                    label="地址關鍵字"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3" class="mt-n7">
                  <v-text-field
                    v-model="model"
                    :counter="max"
                    :rules="rules"
                    label="統一編號"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3" class="mt-n7">
                  <v-text-field
                    v-model="model"
                    :counter="max"
                    :rules="rules"
                    label="店家電話"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3" class="mt-n7">
                  <v-select :items="items" label="上架企業"></v-select>
                </v-col>
                <v-col cols="3" class="mt-n7">
                  <v-select :items="items" label="優惠類別"></v-select>
                </v-col>
                <v-col cols="6" class="mt-n3">
                  <v-btn color="primary">
                    <v-icon>mdi-magnify</v-icon> 搜尋
                  </v-btn>
                  <v-btn color="success" class="ml-lg-4">
                    匯出 Excel
                  </v-btn>
                  <v-btn color="default" class="ml-lg-4">
                    清除條件
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
