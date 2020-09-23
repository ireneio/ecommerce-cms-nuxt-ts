import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import AuthModule from '~/store/auth'

let authStore: AuthModule

function initialiseStores(store: Store<any>): void {
  authStore = getModule(AuthModule, store)
}

export { initialiseStores, authStore }
