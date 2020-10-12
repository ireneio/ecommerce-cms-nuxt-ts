<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <h2 class="mb-4">兌換查詢</h2>
          <v-card outlined>
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
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-select :items="items" label="商品類型"></v-select>
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
                            label="活動開始日期"
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
                            label="活動結束日期"
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
                    <v-col cols="3" class="mt-n7">
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
                            label="期望到貨開始日期"
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
                    <v-col cols="3" class="mt-n7">
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
                            label="期望到貨結束日期"
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
                    <v-col cols="3" class="mt-n7">
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
                            label="兌換開始日期"
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
                    <v-col cols="3" class="mt-n7">
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
                            label="兌換結束日期"
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
                    <v-col cols="6" class="mt-n3">
                      <v-btn color="primary">
                        <v-icon>mdi-magnify</v-icon> 搜尋
                      </v-btn>
                      <v-btn color="default" class="ml-lg-4">
                        清除
                      </v-btn>
                      <v-btn color="success" class="ml-lg-4">
                        匯出 Excel
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-banner>
            </v-card-text>

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
          兌換明細
        </v-card-title>
        <v-card-text class="mt-4">
          <v-card outlined>
            <v-card-text color="#fff">
              <v-data-iterator
                :items="details"
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
                            <v-list-item-content>訂單編號 </v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.訂單編號 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>商品編號</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.商品編號 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>商品類型</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.商品類型 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>商品名稱</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.商品名稱 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>市價</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.市價 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>公司名稱</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.公司名稱 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>帳號</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.帳號 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>姓名</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.姓名 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>Email</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.Email }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>手機</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.手機 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>聯絡電話</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.聯絡電話 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>地址</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.地址 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>兌換日期</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.兌換日期 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content
                              >期望到貨日</v-list-item-content
                            >
                            <v-list-item-content class="align-end">
                              {{ item.期望到貨日 }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>備註</v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.備註 }}
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
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" @click="toggleModal = false" text large>
            回列表
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
export default class GiftExchangeDetail extends Vue {
  private headers: Array<any> = [
    { text: '活動名稱', value: 'fat', align: 'start', sortable: false },
    {
      text: '商品編號',
      value: 'fat',
      align: 'start',
      sortable: false
    },
    { text: '組合商品', value: 'fat', align: 'start', sortable: false },
    { text: '商品類型', value: 'fat', align: 'start', sortable: false },
    { text: '商品名稱', value: 'fat', align: 'start', sortable: false },
    { text: '帳號', value: 'fat', align: 'start', sortable: false },
    { text: '姓名', value: 'fat', align: 'start', sortable: false },
    { text: '手機', value: 'fat', align: 'start', sortable: false },
    { text: '聯絡電話', value: 'fat', align: 'start', sortable: false },
    { text: '期望到貨日', value: 'fat', align: 'start', sortable: false },
    { text: '操作', value: 'fat', align: 'start', sortable: false }
  ]

  private get details(): Array<any> {
    return [
      {
        活動名稱: '【SF 金流】黑長直齊劉海最棒了',
        訂單編號: '2020-09-01 02:54 pm ~ 2024-09-28 02:54 pm',
        商品編號: '使用STAYFUN金流',
        商品類型: '你家',
        商品名稱: '你家',
        市價: 'aaa',
        公司名稱: 'bbb',
        帳號: 'ccc',
        姓名: 'ddd',
        Email: '不需',
        手機: '2020-09-01 02:54 pm ~ 2024-09-28 02:54 pm',
        聯絡電話: '你家',
        地址: '你家',
        兌換日期: '票券多選',
        期望到貨日: 'bbb',
        備註: 'https://aaa.com/pic/1'
      }
    ]
  }

  private toggleModal: boolean = true

  private async created() {}
}
</script>
