<template>
  <div v-if="isAppReady" class="min-h-full font-Poppins box-border">
    <Navigation/>
    <router-view />
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import { ref } from 'vue';
import { supabase } from './supabase/init';
import store from './store';

export default {
  components: {
    Navigation
  },
  setup() {
    const isAppReady = ref(false)
    const user = supabase.auth.user()
    if(!user) {
      isAppReady.value = true
    }
    supabase.auth.onAuthStateChange((_, session) => {
      store.methods.setUser(session)
      isAppReady.value = true
    })
    return { isAppReady };
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap");
</style>
