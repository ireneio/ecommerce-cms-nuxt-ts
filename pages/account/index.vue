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
            <validation-observer v-slot="{ invalid }">
              <v-card-text>
                <v-form>
                  <validation-provider v-slot="{ errors }" rules="required">
                    <v-text-field
                      label="帳號"
                      name="login"
                      prepend-icon="mdi-account"
                      type="text"
                      :error="errors.length > 0"
                      :hint="errors.length ? errors[0] : ''"
                      v-model="form.username"
                    ></v-text-field>
                  </validation-provider>
                  <validation-provider v-slot="{ errors }" rules="required">
                    <v-text-field
                      id="password"
                      label="密碼"
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      v-model="form.password"
                      :error="errors.length > 0"
                      :hint="errors.length ? errors[0] : ''"
                      @keydown.enter="handleSignIn(invalid ? false : true)"
                    ></v-text-field>
                  </validation-provider>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  :disabled="invalid"
                  @click="handleSignIn"
                >
                  登入
                </v-btn>
              </v-card-actions>
            </validation-observer>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="primary white--text">
          提示
        </v-card-title>
        <v-card-text class="mt-4">
          <h2>{{ dialogMessage || '帳號或密碼錯誤' }}</h2>
          <div class="mt-4">
            {{
              dialogMessage ? '' : '密碼為 8-12 碼，包含英文大小寫字母與數字'
            }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="handleDialogClose" large>
            <strong>關閉</strong>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { User } from 'SignIn'
import { authStore } from '~/store'

@Component({
  layout: 'login',
  components: {
    ValidationObserver,
    ValidationProvider
  }
})
export default class AccountIndex extends Vue {
  private dialog: boolean = false

  private dialogMessage: User | string | number | null = ''

  private handleDialogClose(): void {
    this.dialog = false
  }

  private form: any = {
    username: '',
    password: ''
  }

  private async handleSignIn(valid?: boolean): Promise<any> {
    if (!valid) return
    try {
      this.$nuxt.$loading.start()
      const result = await authStore.getAccessToken(this.form)
      if (result === 40102) {
        this.dialog = true
      } else if (result === 406) {
        this.dialog = true
      } else if (result === 400) {
        this.dialog = true
      } else if (result === 40101) {
        this.dialogMessage = authStore.errorMessage
        this.dialog = true
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
