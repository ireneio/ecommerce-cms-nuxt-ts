import Vue from 'vue'
import Vuetify from 'vuetify'
import { TiptapVuetifyPlugin, TiptapVuetify } from 'tiptap-vuetify'

// don't forget to import CSS styles
import 'tiptap-vuetify/dist/main.css'
// Vuetify's CSS styles
import 'vuetify/dist/vuetify.min.css'

// use Vuetify's plugin
Vue.use(Vuetify)

// use this package's plugin
Vue.use(TiptapVuetifyPlugin, {
  // the next line is important! You need to provide the Vuetify Object to this place.
  vuetify: Vuetify, // same as "vuetify: vuetify"
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: 'md'
})

Vue.component('tiptap-vuetify', TiptapVuetify)
