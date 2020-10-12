import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import AuthModule from '~/store/auth'
import SysModule from '~/store/sys'
import DialogModule from '~/store/dialog'

let authStore: AuthModule
let sysStore: SysModule
let dialogStore: DialogModule

function initialiseStores(store: Store<any>): void {
  authStore = getModule(AuthModule, store)
  sysStore = getModule(SysModule, store)
  dialogStore = getModule(DialogModule, store)
}

export { initialiseStores, authStore, sysStore, dialogStore }
