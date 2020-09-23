<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card outlined>
          <v-toolbar flat>
            <v-btn color="primary">
              <v-icon>mdi-plus</v-icon> 新增權限群組
            </v-btn>
            <v-btn color="error" class="ml-2">
              <v-icon>mdi-close</v-icon> 批次刪除
            </v-btn>
            <v-btn color="success" class="ml-2">
              <v-icon>mdi-checkbox-marked-outline</v-icon> 批次啟用
            </v-btn>
            <v-btn color="warning" class="ml-2">
              <v-icon>mdi-checkbox-blank-outline</v-icon> 批次停用
            </v-btn>
          </v-toolbar>
          <v-toolbar class="pt-4 mt-5 mx-4" flat color="#f9fcf7">
            <v-container>
              <v-row>
                <v-col cols="4" class="px-0 pb-4">
                  <v-text-field
                    v-model="model"
                    :counter="max"
                    :rules="rules"
                    label="權限群組名稱"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="2">
                  <v-btn color="primary">
                    <v-icon>mdi-magnify</v-icon> 搜尋
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-toolbar>
          <v-card-text>
            <!-- <v-form ref="form"> -->
            <!-- <v-container>
              <v-row>
                <v-col class="px-0"> -->
            <v-data-table
              v-model="selected"
              :headers="headers"
              :items="desserts"
              :single-select="singleSelect"
              item-key="name"
              show-select
              class="elevation-1"
            >
              <template v-slot:top>
                <!-- <v-switch
                        v-model="singleSelect"
                        label="Single select"
                        class="pa-3"
                      ></v-switch> -->
              </template>
            </v-data-table>
            <!-- </v-col>
              </v-row>
            </v-container> -->
            <!-- </v-form> -->
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
// import { landingStore, dialogStore, giftStore, authStore } from '~/store'

@Component({
  layout: 'default',
  middleware: 'auth'
})
export default class SysPermissionGroupSetting extends Vue {}
</script>
