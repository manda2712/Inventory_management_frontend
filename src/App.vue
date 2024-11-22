<template>
  <div id="app">
    <HeaderNav
      v-if = "showHeader"
      :currentRole="currentRole"
      @update-role="updateRole"
      @toggle-sidebar="toggleSidebar"
      :isSidebarVisible="isSidebarVisible"
    />
    <div class="app-content" :class="{ noHeader: !showHeader}">
      <SidebarNav
        v-if="showSidebar"
        :currentRole="currentRole"
        :isSidebarVisible="isSidebarVisible"
        @showComponent="navigateTo"
      />
      <div class="main-content" :class="{ expanded: isSidebarVisible }">
        <!-- Tetap menggunakan <route-view> -->
        <router-view 
        :key="$route.fullPath" 
        :currentComponent="$route.params.component"
        />

      </div>
    </div>
  </div>
</template>

<script>


import HeaderNav from "./components/dashboard/HeaderNav.vue";
import SidebarNav from "./components/dashboard/SidebarNav.vue";
import { EventBus } from '@/utils/EventBus'; 

export default {
  components: {
    HeaderNav,
    SidebarNav,
  },
  data() {
    return {
      currentRole: this.$route.name || "admin",
      isSidebarVisible: true,
      searchTerm: "",
    };
  },
  computed: {
    showHeader() {
      return !this.$route.meta.hideHeader;
    },
    showSidebar() {
      return !this.$route.meta.hideSidebar;
    },
  },
  watch: {
    "$route.name"(newRole) {
      this.currentRole = newRole;
    },
  },
  methods: {
    updateRole(role) {
      this.currentRole = role;
      this.navigateTo("item");
    },
    navigateTo(component) {
      this.$router.push({ name: this.currentRole, params: { component } });
    },
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    handleSearch(newQuery) {
      console.log("Search term:", newQuery);
      if (this.currentRole === "admin") {
        console.log("Search in admin items");
      } else if (this.currentRole === "user") {
        console.log("Search in user items");
      }
    },
  },
  mounted() {
    EventBus.on("search", this.handleSearch);
  },
  beforeUnmount() {
    EventBus.off("search", this.handleSearch);
  },
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.app-content {
  display: flex;
  height: 100%;
}
.main-content {
  flex: 1;
  
  background-color: #ffffff;
  transition: margin-left 0.3s ease;
}

</style>