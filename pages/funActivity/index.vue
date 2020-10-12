<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">活動列表</h2>
          <v-card outlined>
            <v-toolbar flat>
              <v-btn
                color="primary"
                @click=";(toggleEditModal = true), (e1 = 1)"
              >
                <v-icon>mdi-plus</v-icon> 建立活動
              </v-btn>
            </v-toolbar>
            <v-card-text>
              <v-banner color="rgba(60, 141, 188, 0.05)">
                <v-container>
                  <v-row>
                    <v-col cols="3">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="關鍵字"
                        hint="活動名稱或訂單編號"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="6" class="mt-4">
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

            <v-card-text>
              <v-tabs>
                <v-tab @click="currentTab = 0">正在舉辦的活動</v-tab>
                <v-tab @click="currentTab = 1">歷史活動</v-tab>
              </v-tabs>
              <div class="mt-4">
                <v-btn color="warning">下架</v-btn>
              </div>
              <v-data-table
                v-model="selected"
                :headers="headers"
                :items="desserts"
                :single-select="singleSelect"
                item-key="name"
                show-select
                class="elevation-1 mt-4"
                v-show="currentTab === 0"
              >
              </v-data-table>
              <v-data-table
                v-model="selected"
                :headers="headers"
                :items="desserts"
                :single-select="singleSelect"
                item-key="name"
                show-select
                class="elevation-1 mt-4"
                v-show="currentTab === 1"
              >
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog
      v-model="toggleModal"
      width="800px"
      scrollable
      persistent
      retain-focus
      fullscreen
    >
      <v-card>
        <v-card-title class="primary white--text">
          活動明細 【活動名稱】
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-card-text color="#fff">
              <div>
                <v-btn color="success" @click="toggleEditModal = true">
                  <v-icon>mdi-pencil</v-icon>
                  編輯活動
                </v-btn>
                <v-btn color="warning" class="ml-lg-4">
                  <v-icon>mdi-close</v-icon>
                  下架
                </v-btn>
              </div>
              <v-data-iterator
                :items="activityInfo"
                :items-per-page.sync="itemsPerPage"
                hide-default-footer
              >
                <!-- <template v-slot:header>
                  <v-toolbar class="mb-2" color="indigo darken-5" dark flat>
                    <v-toolbar-title>This is a header</v-toolbar-title>
                  </v-toolbar>
                </template> -->

                <template v-slot:default="props">
                  <v-row>
                    <v-col
                      v-for="item in props.items"
                      :key="item.name"
                      cols="12"
                      lg="6"
                    >
                      <v-card>
                        <v-card-title class="subheading font-weight-bold">
                          活動基本資料
                        </v-card-title>

                        <v-divider></v-divider>
                        <v-list dense>
                          <v-list-item>
                            <v-list-item-content>活動名稱</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.活動名稱 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content
                              >活動舉辦時間</v-list-item-content
                            >
                            <v-list-item-content class="align-end">
                              {{ item.活動舉辦時間 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>付款方式</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.付款方式 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>活動地點</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.活動地點 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>活動地址</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.活動地址 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>活動簡介</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.活動簡介 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>活動描述</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.活動描述 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>主辦單位</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.主辦單位 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>協辦單位</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.協辦單位 }}
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                      <v-card class="mt-7">
                        <v-card-title class="subheading font-weight-bold">
                          活動宣傳照片
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                          <v-list-item>
                            <v-list-item-content
                              :style="
                                `width: 250px;height:250px;background-image:url(${item.活動宣傳照片});border:1px solid #eee;`
                              "
                            >
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-col>
                    <v-col
                      v-for="item in props.items"
                      :key="item.name"
                      cols="12"
                      lg="6"
                    >
                      <v-card>
                        <v-card-title class="subheading font-weight-bold">
                          活動狀態
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                          <v-list-item>
                            <v-list-item-content>已上架</v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>
                              活動置頂顯示
                            </v-list-item-content>
                            <v-list-item-content class="align-end">
                              aaaaaaaa
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                      <v-card class="mt-7">
                        <v-card-title class="subheading font-weight-bold">
                          活動報名資料
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                          <v-list-item>
                            <v-list-item-content>審核機制</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.審核機制 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>備取機制 </v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.備取機制 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>付款方式</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.付款方式 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content
                              >總報名人數</v-list-item-content
                            >
                            <v-list-item-content class="align-end">
                              {{ item.總報名人數 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content
                              >單人報名次數限制</v-list-item-content
                            >
                            <v-list-item-content class="align-end">
                              {{ item.單人報名次數限制 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>販售模式</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.販售模式 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content
                              >總售出張數</v-list-item-content
                            >
                            <v-list-item-content class="align-end">
                              {{ item.總售出張數 }}
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-col>
                    <v-col
                      v-for="item in props.items"
                      :key="item.name"
                      cols="12"
                    >
                      <v-card>
                        <v-card-title class="subheading font-weight-bold">
                          活動票種
                        </v-card-title>

                        <v-divider></v-divider>
                        <v-simple-table>
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left">
                                  票種狀態
                                </th>
                                <th class="text-left">
                                  票種名稱
                                </th>
                                <th class="text-left">
                                  販售時間
                                </th>
                                <th class="text-left">
                                  販售單位
                                </th>
                                <th class="text-left">
                                  販售限制
                                </th>
                                <th class="text-left">
                                  價格
                                </th>
                                <th class="text-left">
                                  數量
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <!-- <tr v-for="item in desserts" :key="item.name">
                                <td>{{ item.name }}</td>
                                <td>{{ item.calories }}</td>
                              </tr> -->
                              <tr>
                                <td>placeholder</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>
                      </v-card>
                      <v-card class="mt-7">
                        <v-card-title class="subheading font-weight-bold">
                          報名條款與同意事項設定
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                          <v-list-item>
                            <v-list-item-content>
                              報名條款標題
                            </v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.報名條款標題 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>
                              條款內容說明
                            </v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.條款內容說明 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>
                              彈出視窗提醒
                            </v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.彈出視窗提醒 }}
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>

                <!-- <template v-slot:footer>
                  <v-toolbar class="mt-2" color="indigo" dark flat>
                    <v-toolbar-title class="subheading">
                      This is a footer
                    </v-toolbar-title>
                  </v-toolbar>
                </template> -->
              </v-data-iterator>
            </v-card-text>
          </v-card>
        </v-card-text>
        <v-card-actions style="border-top: 1px solid #eee;">
          <v-spacer></v-spacer>
          <v-btn
            color="default"
            class="ml-lg-4"
            @click="toggleModal = false"
            text
            large
          >
            回列表
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="toggleEditModal"
      width="800px"
      scrollable
      persistent
      retain-focus
      fullscreen
    >
      <v-card>
        <v-card-title class="primary white--text">
          新增/編輯活動
        </v-card-title>
        <v-card-text style="min-height: 200px; overflow: hidden;">
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">
                設定活動資料
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">
                設定票種與報名資料欄位設定
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="3">
                活動對象
              </v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content step="1">
                <v-btn color="primary" @click="e1 = 2">
                  下一步
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="2">
                <v-btn color="primary" @click="e1 = 3">
                  下一步
                </v-btn>
                <v-btn color="default" class="ml-lg-4" @click="e1 = 1">
                  上一步
                </v-btn>
              </v-stepper-content>
              <v-stepper-content step="3">
                <v-btn color="default" @click="e1 = 2">
                  上一步
                </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-card-text>
        <v-card-text color="#fff" v-show="e1 === 1" class="mt-4">
          <div class="d-flex">
            <div style="flex: 0 0 70%;">
              <v-card outlined>
                <v-card-title>基本資料設定</v-card-title>
                <v-card-text color="#fff">
                  <v-container>
                    <v-row>
                      <v-col cols="12" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="活動名稱"
                          hint="限 20 字"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
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
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              label="活動舉辦開始時間"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false"
                              >Cancel</v-btn
                            >
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(date)"
                              >OK</v-btn
                            >
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
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
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              label="活動舉辦結束時間"
                            ></v-text-field>
                          </template>
                          <v-date-picker v-model="date" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false"
                              >Cancel</v-btn
                            >
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(date)"
                              >OK</v-btn
                            >
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-checkbox
                          v-model="selected"
                          label="活動置頂顯示"
                          :value="true"
                        ></v-checkbox>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="活動地點"
                          hint="限 20 字"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="活動地址"
                          hint="限 150 字"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="主辦單位"
                          hint="限 150 字"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="協辦單位"
                          hint="限 150 字"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
              <v-card outlined class="mt-7">
                <v-card-title>販售與報名機制設定</v-card-title>
                <v-card-text color="#fff">
                  <v-container>
                    <v-row>
                      <v-col cols="12" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="使用STAYFUN金流"
                          disabled
                          hint="付款方式"
                          persistent-hint
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-tooltip left>
                          <template v-slot:activator="{ on, attrs }">
                            <div v-bind="attrs" v-on="on">
                              <v-checkbox
                                v-model="selected"
                                label="報名後須等待管理員審核"
                                :value="true"
                              ></v-checkbox>
                            </div>
                          </template>
                          <span
                            >開啟審核機制後，請至訂單列表中管理審核狀態</span
                          >
                        </v-tooltip>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="票種多選"
                          disabled
                          hint="販售模式"
                          persistent-hint
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="單人報名次數限制"
                          hint="限正整數，若不填寫則不限制"
                          type="number"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="單人取消次數限制"
                          hint="限正整數，若不填寫則不限制"
                          type="number"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="是"
                          disabled
                          hint="是否開放備取"
                          persistent-hint
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="6" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="總報名人數限制"
                          hint="限正整數，若不填寫則不限制"
                          type="number"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="6" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="總備取人數限制"
                          hint="限正整數，若不填寫則不限制"
                          type="number"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="6" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="售出張數總限制"
                          hint="限正整數，若不填寫則不限制"
                          type="number"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="6" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="備取張數總限制"
                          hint="限正整數，若不填寫則不限制"
                          type="number"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
              <v-card outlined class="mt-7">
                <v-card-title>活動簡介與描述</v-card-title>
                <v-card-text color="#fff">
                  <v-container>
                    <v-row>
                      <v-col cols="12" class="mt-n5">
                        <v-text-field
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="活動簡介"
                          hint="限 28 字"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-textarea
                          v-model="model"
                          :counter="max"
                          :rules="rules"
                          label="活動描述"
                        >
                        </v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
              <v-card outlined class="mt-7">
                <v-card-title>報名條款與同意事項設定</v-card-title>
                <v-card-text color="#fff">
                  <v-card>
                    <v-card-subtitle>條款標題</v-card-subtitle>
                    <v-card-text color="#fff">
                      <v-container>
                        <v-row>
                          <v-col cols="12" class="mt-n5">
                            <v-text-field
                              v-model="model"
                              :counter="max"
                              :rules="rules"
                              label="報名條款標題"
                              hint="若不填寫則為預設值之'活動報名條款'"
                            >
                            </v-text-field>
                          </v-col>
                          <v-col cols="12" class="mt-n5">
                            <v-textarea
                              v-model="model"
                              :counter="max"
                              :rules="rules"
                              label="條款內容說明"
                            >
                            </v-textarea>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                  </v-card>
                  <v-card class="mt-7">
                    <v-card-subtitle>彈出視窗設定</v-card-subtitle>
                    <v-card-text color="#fff">
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-tooltip left>
                              <template v-slot:activator="{ on, attrs }">
                                <div v-bind="attrs" v-on="on">
                                  <v-checkbox
                                    v-model="selected"
                                    label="需彈出視窗提醒"
                                    :value="true"
                                  ></v-checkbox>
                                </div>
                              </template>
                              <span
                                >此內容將於送出報名前，再次彈出視窗提醒</span
                              >
                            </v-tooltip>
                          </v-col>

                          <v-col cols="12" class="mt-n5">
                            <v-textarea
                              v-model="model"
                              :counter="max"
                              :rules="rules"
                              label="需彈出視窗內容"
                              hint="限 30 字"
                            >
                            </v-textarea>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                  </v-card>
                </v-card-text>
              </v-card>
            </div>
            <div style="flex: 0 0 28.5%;" class="ml-7">
              <v-card outlined>
                <v-card-title>活動海報</v-card-title>
                <v-card-text color="#fff">
                  <v-container>
                    <v-row>
                      <v-col cols="12" class="mt-n5">
                        <v-file-input
                          small-chips
                          multiple
                          label="上傳附件"
                          placeholder="點擊上傳"
                          prepend-icon=""
                          hint="格式限制為大小限制 2MB，750*1334px 【最小寬度限制: 750px】 的 JPG、PNG"
                          persistent-hint
                        ></v-file-input>
                      </v-col>
                      <v-col cols="12" class="mt-n5">
                        <v-img height="445" width="250"></v-img>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </div>
          </div>
        </v-card-text>
        <v-card-text color="#fff" v-show="e1 === 2" class="mt-4">
          <div>
            <v-btn color="primary" @click="toggleEditCouponBanner = true">
              <v-icon>mdi-plus</v-icon>
              新增票種
            </v-btn>
          </div>
          <v-banner
            class="mt-4 pt-7"
            color="rgba(60, 141, 188, 0.05)"
            v-if="toggleEditCouponBanner"
          >
            <v-card>
              <v-card-title>票種設定</v-card-title>
              <v-card-text color="#fff">
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="票券名稱"
                        hint="限 60 字"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="價格 (TWD $)"
                        hint="限正整數"
                        type="number"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="model"
                        :counter="max"
                        :rules="rules"
                        label="數量"
                        hint="限正整數，無填寫代表不限定數量"
                        type="number"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
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
                            label="販售開始時間"
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
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(date)"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12">
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
                            label="販售結束時間"
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
                          <v-btn
                            text
                            color="primary"
                            @click="$refs.menu.save(date)"
                            >OK</v-btn
                          >
                        </v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <div v-bind="attrs" v-on="on">
                            <v-select
                              :items="items"
                              label="販售單位(張)"
                            ></v-select>
                          </div>
                        </template>
                        <span>
                          限定一次必須購買販售單位之倍數，如雙人套票，其販售單位則為2張，亦即此票種一次最少需購買兩張
                        </span>
                      </v-tooltip>
                    </v-col>
                    <v-col cols="6">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <div v-bind="attrs" v-on="on">
                            <v-select
                              :items="items"
                              label="販售最低限制(張)"
                            ></v-select>
                          </div>
                        </template>
                        <span>
                          購買此票種的最少需購買張數
                        </span>
                      </v-tooltip>
                    </v-col>
                    <v-col cols="6">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                          <div v-bind="attrs" v-on="on">
                            <v-select
                              :items="items"
                              label="販售最高限制(張)"
                            ></v-select>
                          </div>
                        </template>
                        <span>
                          購買此票種的最多可購買張數
                        </span>
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
            </v-card>
            <v-card class="mt-7">
              <v-card-title>報名資料欄位設定</v-card-title>
              <v-card-text color="#fff">
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          報名人需填寫欄位 - 設定
                        </th>
                        <th class="text-left">
                          是否必填
                        </th>
                        <th class="text-left">
                          標題
                        </th>
                        <th class="text-left">
                          設定
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in couponInputTableData" :key="item.name">
                        <td>{{ item.name }}</td>
                        <td>
                          <v-radio-group v-model="radios" row>
                            <v-radio value="aaa">
                              <template v-slot:label>
                                <div>
                                  是
                                </div>
                              </template>
                            </v-radio>
                            <v-radio value="Duckduckgo" class="ml-lg-4">
                              <template v-slot:label>
                                <div>
                                  否
                                </div>
                              </template>
                            </v-radio>
                          </v-radio-group>
                        </td>
                        <td v-if="item.custom">
                          <v-text-field
                            v-model="model"
                            :counter="max"
                            :rules="rules"
                            label="標題"
                            hint="限 25 字"
                          >
                          </v-text-field>
                        </td>
                        <td v-if="item.customSelect">
                          <v-text-field
                            v-model="model"
                            :counter="max"
                            :rules="rules"
                            label="選項名稱"
                            hint="請以半型【,】逗號分離"
                          >
                          </v-text-field>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card-text>
            </v-card>
            <div class="mt-4 mb-4">
              <v-btn color="primary">
                <v-icon>mdi-checkbox-marked-outline</v-icon>
                暫存
              </v-btn>
              <v-btn
                color="default"
                class="ml-lg-4"
                @click="toggleEditCouponBanner = false"
              >
                取消
              </v-btn>
            </div>
          </v-banner>
          <v-banner class="mt-4" color="rgba(255, 82, 82, .3)">
            <div class="px-4 py-4 text-center error--text">
              已上架的票種不可編輯與刪除
            </div>
          </v-banner>
          <v-data-table
            v-model="selected"
            :headers="couponTypeTableHeaders"
            :items="desserts"
            :single-select="singleSelect"
            item-key="name"
            show-select
            class="elevation-1 mt-4"
          >
          </v-data-table>
        </v-card-text>
        <v-card-text color="#fff" v-show="e1 === 3" class="mt-4">
          <v-container>
            <v-row>
              <v-col cols="12" class="mt-n5">
                <v-radio-group v-model="radios" row>
                  <template v-slot:label>
                    <div>收件對象</div>
                  </template>
                  <v-radio value="Duckduckgo">
                    <template v-slot:label>
                      <div>
                        STAYFUN 全體會員
                      </div>
                    </template>
                  </v-radio>
                  <v-radio value="aaa" class="ml-lg-4">
                    <template v-slot:label>
                      <div>
                        指定企業
                      </div>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" class="mt-n5">
                <v-combobox
                  v-model="select"
                  :items="items"
                  label="指定企業"
                  multiple
                  chips
                  clearable
                  hide-selected
                  open-on-clear
                  :allow-overflow="false"
                  deletable-chips
                ></v-combobox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions style="border-top: 1px solid #eee;">
          <v-btn color="default" @click="toggleEditModal = false" text large>
            取消
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text large>
            <v-icon>mdi-checkbox-marked-outline</v-icon>
            <span> 儲存</span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { sysStore } from '~/store'

@Component({
  layout: 'default',
  middleware: 'auth'
})
export default class FunActivityIndex extends Vue {
  private headers: Array<any> = [
    { text: '活動名稱', value: 'fat', align: 'start', sortable: true },
    {
      text: '活動開始時間',
      value: 'fat',
      align: 'start',
      sortable: true
    },
    { text: '報名人數', value: 'fat', align: 'start', sortable: false },
    { text: '活動狀態操作', value: 'fat', align: 'start', sortable: false },
    { text: '活動資料操作', value: 'fat', align: 'start', sortable: false }
  ]

  private couponTypeTableHeaders: Array<any> = [
    { text: '票種狀態', value: 'fat', align: 'start', sortable: false },
    {
      text: '票種名稱',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '販售時間', value: 'fat', align: 'start', sortable: false },
    { text: '販售單位', value: 'fat', align: 'start', sortable: false },
    { text: '販售限制', value: 'fat', align: 'start', sortable: false },
    { text: '價格', value: 'fat', align: 'start', sortable: false },
    { text: '數量', value: 'fat', align: 'start', sortable: false },
    { text: '更新時間', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private couponInputTableData: Array<any> = [
    { name: '姓名 (系統預設為必填)' },
    { name: '工號' },
    { name: '手機號碼' },
    { name: '聯絡電話' },
    { name: 'Email' },
    { name: '地址' },
    { name: '生日' },
    { name: '證號' },
    { name: '期望到貨日' },
    { name: '匯款帳號後五碼' },
    { name: '發票統一編號' },
    { name: '部門名稱' },
    { name: '部門代碼' },
    { name: '部門人數' },
    { name: '性別' },
    { name: '衣服尺寸' },
    { name: '飲食偏好' },
    { name: '自定義文字問題(1)', custom: true },
    { name: '自定義文字問題(2)', custom: true },
    { name: '自定義下拉選項(1)', custom: true, customSelect: true },
    { name: '自定義下拉選項(2)', custom: true, customSelect: true },
    { name: '自定義下拉選項(3)', custom: true, customSelect: true },
    { name: '備註' }
  ]

  private toggleModal: boolean = true

  private toggleEditModal: boolean = false

  private toggleEditCouponBanner: boolean = false

  private currentTab: number = 0

  private e1: number = 1

  private get activityInfo(): Array<any> {
    return [
      {
        活動名稱: '【SF 金流】黑長直齊劉海最棒了',
        活動舉辦時間: '2020-09-01 02:54 pm ~ 2024-09-28 02:54 pm',
        付款方式: '使用STAYFUN金流',
        活動地點: '你家',
        活動地址: '你家',
        活動簡介: 'aaa',
        活動描述: 'bbb',
        主辦單位: 'ccc',
        協辦單位: 'ddd',
        審核機制: '不需',
        備取機制: '2020-09-01 02:54 pm ~ 2024-09-28 02:54 pm',
        總報名人數: '你家',
        單人報名次數限制: '你家',
        販售模式: '票券多選',
        總售出張數: 'bbb',
        活動宣傳照片: 'https://aaa.com/pic/1',
        報名條款標題: 'aaa',
        條款內容說明: 'bbb',
        彈出視窗提醒: 'ccc'
      }
    ]
  }

  private async created() {}
}
</script>
