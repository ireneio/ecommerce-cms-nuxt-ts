import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import AuthModule from '~/store/auth'
import SysModule from '~/store/sys'

let authStore: AuthModule
let sysStore: SysModule

function initialiseStores(store: Store<any>): void {
  authStore = getModule(AuthModule, store)
  sysStore = getModule(SysModule, store)
}

export { initialiseStores, authStore, sysStore }
