<template>
  <v-main>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>STAYFUN 登入</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-icon>mdi-code-tags</v-icon>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  label="帳號"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                  v-model="form.username"
                ></v-text-field>

                <v-text-field
                  id="password"
                  label="密碼"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  v-model="form.password"
                  @keydown.enter="handleSignIn"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="handleSignIn">登入</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { authStore } from '~/store'

@Component({
  layout: 'login'
})
export default class AccountIndex extends Vue {
  private form: any = {
    username: '',
    password: ''
  }

  private usernameValid: boolean = true

  private passwordValid: boolean = true

  private usernameHint: string = '請輸入帳號'

  private passwordHint: string = '請輸入密碼'

  private async handleSignIn(): Promise<any> {
    try {
      this.$nuxt.$loading.start()
      const result = await authStore.getAccessToken(this.form)
      if (result === 40102) {
        this.passwordValid = false
        this.passwordHint = '密碼輸入錯誤'
      } else if (result === 406) {
        this.usernameValid = false
        this.usernameHint = '帳號輸入錯誤'
      } else if (result === 400) {
        this.passwordValid = false
        this.usernameValid = false
        this.usernameHint = '帳號輸入錯誤'
      } else if (result) {
        const {
          AccessToken,
          ProfileInfo: { isfirstlogin }
        } = result
        this.$cookies.set('accessToken', AccessToken, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7,
          sameSite: true
        })
        this.$router.push({ name: 'index' })
      }
    } catch (e) {
      // console.log(e)
    } finally {
      this.$nuxt.$loading.finish()
    }
  }
}
</script>
