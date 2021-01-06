<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="center">
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col cols="6" class="text-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item-group color="primary">
              <v-list-item
                v-for="(child, i) in item.children"
                :key="i"
                link
                @click="handleUpdateRoute(child)"
                color="primary"
              >
                <v-list-item-action v-if="child.icon">
                  <v-icon x-small class="ml-2">{{ child.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ child.text }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list-group>
          <v-list-item v-else :key="item.text" link>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
      <!--Google Blue: color="blue darken-3" -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down" @click="$router.push('/')">
          STAYFUN
        </span>
      </v-toolbar-title>
      <!-- <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field> -->
      <v-spacer></v-spacer>
      <v-menu
        v-model="menuSetting.value"
        :disabled="menuSetting.disabled"
        :absolute="menuSetting.absolute"
        :open-on-hover="menuSetting.openOnHover"
        :close-on-click="menuSetting.closeOnClick"
        :close-on-content-click="menuSetting.closeOnContentClick"
        :offset-x="menuSetting.offsetX"
        :offset-y="menuSetting.offsetY"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" class="mr-5" v-bind="attrs" v-on="on" large>
            <v-icon>mdi-account-circle</v-icon>
            <span class="ml-2">{{ username }}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-card flat>
              <v-card-title>
                <v-container>
                  <v-row>
                    <v-col cols="4" class="px-0">
                      <v-img :src="dP" height="60" width="60"></v-img>
                    </v-col>
                    <v-col cols="8" class="px-0 pl-4">
                      <span>{{ username }}</span>
                      <br />
                      <span>{{ companyName }}</span>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-title>
              <v-card-actions>
                <v-btn
                  class="primary"
                  @click="$router.push('/account/updatePassword')"
                >
                  <v-icon>mdi-cog</v-icon>
                  <span> 修改密碼</span>
                </v-btn>
                <v-btn class="warning" @click="handleLogout">登出</v-btn>
              </v-card-actions>
            </v-card>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid class="pt-0">
        <v-row align="center" justify="center">
          <v-col cols="12" class="mt-n4">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <!-- <v-btn
      bottom
      color="primary"
      dark
      fab
      fixed
      left
      @click="$vuetify.theme.dark = !$vuetify.theme.dark"
    >
      <v-icon>mdi-toggle-switch</v-icon>
    </v-btn> -->
    <v-btn
      bottom
      :color="!$vuetify.theme.dark ? 'primary' : '#fb8c00'"
      fab
      fixed
      left
      @click="
        ;($vuetify.theme.dark = !$vuetify.theme.dark),
          (theme = !$vuetify.theme.dark)
      "
    >
      <v-icon v-show="$vuetify.theme.dark">mdi-white-balance-sunny</v-icon>
      <v-icon v-show="!$vuetify.theme.dark">mdi-moon-waning-crescent</v-icon>
    </v-btn>
    <v-btn
      bottom
      color="primary"
      dark
      fab
      fixed
      right
      @click="dialog = !dialog"
    >
      <v-icon>mdi-xml</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="primary white--text">
          當前版本
        </v-card-title>
        <v-card-text class="mt-4">
          STAYFUN Version 1.87.0 <br />
          <strong class="primary--text">更新時間： </strong>
          2020/9/25 上午7:33:10 <br />
          <div class="mt-7">
            Copyright © 2017
            <a
              class="primary--text text-decoration-none"
              href="https://www.mayohr.com/stayfun/"
              target="_blank"
            >
              MAYO Human Capital Inc.
            </a>
            鼎恒數位科技股份有限公司 All rights reserved.
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false" large>
            <strong>關閉</strong>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="errorDialog" width="800px">
      <v-card>
        <v-card-title class="primary white--text">
          提示
        </v-card-title>
        <v-card-text class="mt-4">
          <h2 class="mt-4">伺服器錯誤，請稍後再試。</h2>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="errorDialog = false" large>
            <strong>關閉</strong>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { authStore } from '~/store'

@Component
export default class DefaultLayout extends Vue {
  private errorDialog: boolean = true

  private get username() {
    return authStore.user ? authStore.user.username : ''
  }

  private get companyName() {
    // return authStore.user
    //   ? authStore.user.groups.length && authStore.user.mainGroup
    //     ? authStore.user.groups.find((item: any) => {
    //         if (authStore.user.mainGroup) {
    //           return item.groupname === authStore.user
    //             ? authStore.user.mainGroup
    //             : ''
    //         }
    //       }).groupname
    //     : ''
    //   : ''

    return authStore.user
      ? authStore.user.groups.length
        ? authStore.user.groups[0].groupname
        : ''
      : ''
  }

  private get dP() {
    return authStore.user ? authStore.user.photopath : ''
  }

  private menuSetting: any = {
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' }
    ],
    disabled: false,
    absolute: false,
    openOnHover: false,
    value: false,
    closeOnClick: true,
    closeOnContentClick: true,
    offsetX: false,
    offsetY: true
  }

  private source: string = ''

  private dialog: boolean = false

  private drawer: boolean | null = null

  private currentTabName: string = ''

  private handleUpdateRoute(item: any) {
    this.currentTabName = item.route
    this.$router.push({ name: item.route })
  }

  private items: Array<any> = [
    {
      icon: 'mdi-cog',
      'icon-alt': 'mdi-cog-outline',
      text: '系統管理',
      model: false,
      children: [
        {
          text: '功能表管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'sys'
        },
        {
          text: '權限群組管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'sys-permissionGroupSetting'
        },
        {
          text: '公司/群組管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'sys-groupSetting'
        },
        {
          text: '系統人員帳號管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'sys-accountSetting'
        },
        {
          text: '重置密碼',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'sys-resetPassword'
        },
        {
          text: '問卷題型維護',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'sys-questionnaireType'
        }
      ]
    },
    {
      icon: 'mdi-bell-alert',
      'icon-alt': 'mdi-bell-alert-outline',
      text: '訊息牆管理',
      model: false,
      children: [
        {
          text: '訊息牆列表',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'announcement'
        }
        // {
        //   text: '發送新訊息',
        //   icon: 'mdi-checkbox-blank-circle-outline',
        //   route: 'announcement-create'
        // }
      ]
    },
    {
      icon: 'mdi-flask',
      'icon-alt': 'mdi-flask-outline',
      text: '問卷管理',
      model: false,
      children: [
        {
          text: '問卷列表',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'questionnaire'
        }
        // {
        //   text: '新增問卷',
        //   icon: 'mdi-checkbox-blank-circle-outline',
        //   route: 'questionnaire-create'
        // }
      ]
    },
    {
      icon: 'mdi-store',
      'icon-alt': 'mdi-store-outline',
      text: '特約商家管理',
      model: false,
      children: [
        {
          text: '特約商家分類',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'store'
        },
        {
          text: '特約商家管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'store-store'
        },
        {
          text: '優惠類別管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'store-storeSpecialType'
        },
        {
          text: '特約商家匯入',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'store-storeImport'
        },
        {
          text: '特約商家通報',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'store-storeNotice'
        },
        {
          text: '特約商家圖片管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'store-storeImageManagement'
        },
        {
          text: '點擊紀錄',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'store-storeClick'
        },
        {
          text: '線下核銷紀錄',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'store-storeScore'
        },
        {
          text: '特約 Banner 管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'store-storeBanner'
        },
        {
          text: '首頁圖維護(暫用)',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'store-bannerImages'
        }
      ]
    },
    {
      icon: 'mdi-cash-multiple',
      'icon-alt': 'mdi-cash',
      text: '享樂金財務專區',
      model: false,
      children: [
        {
          text: '供應商資料',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'finance'
        },
        {
          text: '供應商對帳單',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'finance-merchantReport'
        },
        {
          text: '銷售報表',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'finance-salesReport'
        },
        {
          text: '消費者點數對帳單',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'finance-welfareReport'
        },
        {
          text: '點數餘額對帳單',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'finance-pointBalanceReport'
        },
        {
          text: '點數轉履保管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'finance-pointConversionEscrow'
        }
      ]
    },
    {
      icon: 'mdi-currency-usd-circle',
      'icon-alt': 'mdi-currency-usd-circle-outline',
      text: '享樂金點數專區',
      model: false,
      children: [
        {
          text: '點數類別管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'point'
        },
        {
          text: '點數匯入紀錄',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'point-pointImportRecord'
        },
        {
          text: '點數匯入作業',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'point-pointImportOperation'
        },
        {
          text: '帳號點數查詢',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'point-userPointDetail'
        }
      ]
    },
    {
      icon: 'mdi-bitcoin',
      'icon-alt': 'mdi-bitcoin',
      text: '旅遊金點數專區',
      model: false,
      children: [
        {
          text: '點數類別管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'travelPoint'
        },
        {
          text: '點數匯入紀錄',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'travelPoint-pointImportRecord'
        },
        {
          text: '點數匯入作業',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'travelPoint-pointImportOperation'
        }
      ]
    },
    {
      icon: 'mdi-cloud-sync',
      'icon-alt': 'mdi-cloud-sync-outline',
      text: '導入作業專區',
      model: false,
      children: [
        {
          text: '公司資料查看',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'sys-groupSetting'
        },
        {
          text: '人員資料查看',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'sys-accountSetting'
        },
        {
          text: '快速導入作業',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'sys-importTeam'
        }
      ]
    },
    {
      icon: 'mdi-credit-card',
      'icon-alt': 'mdi-credit-card-outline',
      text: '票券管理',
      model: false,
      children: [
        {
          text: '票券列表',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'coupon'
        },
        {
          text: '票券匯入',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'coupon-couponImport'
        },
        {
          text: '票券 Banner 管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'coupon-couponBanner'
        }
      ]
    },
    {
      icon: 'mdi-file-cog',
      'icon-alt': 'mdi-file-cog-outline',
      text: '享樂金訂單管理',
      model: false,
      children: [
        {
          text: '票券訂單查詢',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'order'
        },
        {
          text: '票券退貨單',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'order-refundOrder'
        },
        {
          text: '第三方訂單查詢',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'order-purchaseOrder'
        },
        {
          text: '第三方退貨單',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'order-refundPurchaseOrder'
        },
        {
          text: '出貨管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'order-shipping'
        }
      ]
    },
    {
      icon: 'mdi-vuejs',
      'icon-alt': 'mdi-language-javascript',
      text: '系統維護',
      model: false,
      children: [
        {
          text: '系統異常訊息',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'syslog'
        },
        {
          text: '人員資料異動紀錄',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'syslog-accountActivityRecord'
        },
        {
          text: '點數匯入資料異動紀錄',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'syslog-pointImportRecord'
        },
        {
          text: '報表下載紀錄',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'syslog-reportDownloadRecord'
        }
      ]
    },
    {
      icon: 'mdi-human-male-child',
      'icon-alt': 'mdi-human-male-boy',
      text: '揪團樂管理',
      model: false,
      children: [
        {
          text: '排行榜管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'joinClub'
        },
        {
          text: '下午茶揪團品牌維護',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'joinClub-brand'
        },
        {
          text: '下午茶揪團菜單維護',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'joinClub-menu'
        },
        {
          text: '下午茶揪團店家維護',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'joinClub-store'
        },
        {
          text: '下午茶揪團訂單列表',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'joinClub-order'
        }
      ]
    },
    {
      icon: 'mdi-map-marker-multiple',
      'icon-alt': 'mdi-map-marker-multiple-outline',
      text: '瘋活動管理',
      model: false,
      children: [
        {
          text: '活動列表',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'funActivity'
        },
        // {
        //   text: '建立活動',
        //   icon: 'mdi-checkbox-blank-circle-outline',
        //   route: 'funActivity-funActivityEvents'
        // },
        {
          text: '活動退貨單',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'funActivity-refundFunActivityOrder'
        }
      ]
    },
    {
      icon: 'mdi-gift',
      'icon-alt': 'mdi-gift-outline',
      text: '領好禮',
      model: false,
      children: [
        {
          text: '禮品維護',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'gift'
        },
        {
          text: '領好禮訊息牆',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'gift-messageList'
        },
        {
          text: '兌換查詢',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'gift-exchangeDetail'
        }
        // {
        //   text: '建立好禮訊息',
        //   icon: 'mdi-checkbox-blank-circle-outline',
        //   route: 'gift-message'
        // }
      ]
    },
    {
      icon: 'mdi-cart',
      'icon-alt': 'mdi-cart-outline',
      text: '好好買管理',
      model: false,
      children: [
        {
          text: 'Banner 管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'funMall'
        },
        {
          text: '熱門賣場管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'funMall-shops'
        },
        {
          text: '分頁商品列表管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'funMall-products'
        },
        {
          text: '副 Banner 管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'funMall-secondaryBanner'
        },
        {
          text: '主題行銷列表管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'funMall-advertisements'
        },
        {
          text: '排行榜管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'funMall-rankings'
        }
      ]
    },
    {
      icon: 'mdi-source-branch-sync',
      'icon-alt': 'mdi-source-branch-refresh',
      text: '版本管理',
      model: false,
      children: [
        {
          text: '版本列表',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'version'
        }
        // {
        //   text: '新增版本',
        //   icon: 'mdi-checkbox-blank-circle-outline',
        //   route: 'version-edit'
        // }
      ]
    },
    {
      icon: 'mdi-file-pdf',
      'icon-alt': 'mdi-file-pdf-outline',
      text: '津貼中心',
      model: false,
      children: [
        {
          text: '權限管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'welfare'
        },
        {
          text: '表單維護',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'welfare-categoryList'
        },
        {
          text: '紀錄查詢',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'welfare-reportList'
        },
        {
          text: '結案追蹤',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'welfare-traceList'
        }
      ]
    },
    {
      icon: 'mdi-cash-usd',
      'icon-alt': 'mdi-cash-usd-outline',
      text: '享樂金銀行專區',
      model: false,
      children: [
        {
          text: '信託點數對帳單',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'finance-ctcbPointReport'
        },
        {
          text: '水位警示管理',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'finance-escrowLowerLimit'
        },
        {
          text: '信託額度申請',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'finance-escrowDepositApply'
        },
        {
          text: '經辦放行設定',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'finance-escrowDepositReview'
        },
        {
          text: '主管放行設定',
          icon: 'mdi-checkbox-blank-circle-outline',
          route: 'finance-escrowDepositApprove'
        }
      ]
    }
  ]

  private async handleLogout(): Promise<any> {
    try {
      this.$nuxt.$loading.start()
      const result = await authStore.signOut({
        token: this.$cookies.get('accessToken')
      })
      this.$router.push('/account')
    } catch (e) {
      this.errorDialog = true
    } finally {
      this.$nuxt.$loading.finish()
    }
  }

  private theme: boolean = true

  @Watch('theme')
  private onThemeChange(newVal: boolean) {
    window.localStorage.setItem('theme', newVal ? 'light' : 'dark')
  }

  private created() {
    this.currentTabName = this.$route.name ? this.$route.name : ''
  }

  private mounted() {
    const theme = window.localStorage.getItem('theme')
    // if (theme && theme === 'light') {
    //   this.$vuetify.theme.dark = false
    // } else if (theme && theme === 'dark') {
    //   this.$vuetify.theme.dark = true
    // }
  }
}
</script>
