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
                  <v-icon>{{ child.icon }}</v-icon>
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
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">STAYFUN</span>
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
        v-model="value"
        :disabled="menuSetting.disabled"
        :absolute="menuSetting.absolute"
        :open-on-hover="menuSetting.openOnHover"
        :close-on-click="menuSetting.closeOnClick"
        :close-on-content-click="menuSetting.closeOnContentClick"
        :offset-x="menuSetting.offsetX"
        :offset-y="menuSetting.offsetY"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            depressed
            class="mr-5"
            v-bind="attrs"
            v-on="on"
            large
          >
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
                    <v-col cols="8" class="px-0">
                      <span>{{ username }}</span>
                      <br />
                      <span>{{ companyName }}</span>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-title>
              <v-card-actions>
                <v-btn class="warning">修改密碼</v-btn>
                <v-btn class="defualt">登出</v-btn>
              </v-card-actions>
            </v-card>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-avatar size="32px" item>
        <v-img
          src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
          alt="Vuetify"
        ></v-img
      ></v-avatar>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-btn bottom color="pink" dark fab fixed right @click="dialog = !dialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey darken-2">
          Create contact
        </v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col class="align-center justify-space-between" cols="12">
              <v-row align="center" class="mr-0">
                <v-avatar size="40px" class="mx-3">
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  />
                </v-avatar>
                <v-text-field placeholder="Name"></v-text-field>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field
                prepend-icon="mdi-account-card-details-outline"
                placeholder="Company"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field placeholder="Job title"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-mail"
                placeholder="Email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="tel"
                prepend-icon="mdi-phone"
                placeholder="(000) 000 - 0000"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-text"
                placeholder="Notes"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { authStore } from '~/store'

@Component
export default class DefaultLayout extends Vue {
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
      icon: 'mdi-chevron-up',
      'icon-alt': 'mdi-cog',
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
          icon: 'mdi-checkbox-blank-circle-outline'
        },
        {
          text: '系統人員帳號管理',
          icon: 'mdi-checkbox-blank-circle-outline'
        },
        {
          text: '重置密碼',
          icon: 'mdi-checkbox-blank-circle-outline'
        },
        {
          text: '問卷題型維護',
          icon: 'mdi-checkbox-blank-circle-outline'
        }
      ]
    },
    { icon: 'mdi-history', text: 'Frequently contacted' },
    { icon: 'mdi-content-copy', text: 'Duplicates' },
    {
      icon: 'mdi-chevron-up',
      'icon-alt': 'mdi-chevron-down',
      text: 'Labels',
      model: true,
      children: [{ icon: 'mdi-plus', text: 'Create label' }]
    },
    {
      icon: 'mdi-chevron-up',
      'icon-alt': 'mdi-chevron-down',
      text: 'More',
      model: false,
      children: [
        { text: 'Import' },
        { text: 'Export' },
        { text: 'Print' },
        { text: 'Undo changes' },
        { text: 'Other contacts' }
      ]
    },
    { icon: 'mdi-cog', text: 'Settings' },
    { icon: 'mdi-message', text: 'Send feedback' },
    { icon: 'mdi-help-circle', text: 'Help' },
    { icon: 'mdi-cellphone-link', text: 'App downloads' },
    { icon: 'mdi-keyboard', text: 'Go to the old version' }
  ]

  private created() {
    this.currentTabName = this.$route.name ? this.$route.name : ''
  }
}
</script>
