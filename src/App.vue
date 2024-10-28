<template>
  <div id="app">
    <HeaderNav
      :currentRole="currentRole"
      @update-role="updateRole"
      @toggle-sidebar="toggleSidebar"
      :isSidebarVisible="isSidebarVisible"
    />
    <div class="app-content">
      <SidebarNav
      :currentRole="currentRole"
      :isSidebarVisible="isSidebarVisible"
      @showComponent="navigateTo"
    />
      <div class="main-content" :class="{ expanded: isSidebarVisible }">
        <component
          :is="currentView"
          :currentComponent="currentComponent"
          @add-user="handleAddUser"
          @edit-user="handleEditUser"
          @delete-user="handleDeleteUser"
          @add-item="handleAddItem"
          @edit-item="handleEditItem"
          @delete-item="handleDeleteItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from "./components/dashboard/HeaderNav.vue";
import SidebarNav from "./components/dashboard/SidebarNav.vue";
import AdminView from "./views/AdminView.vue";
import UserView from "./views/UserView.vue";
import { EventBus } from '@/utils/EventBus'; 

export default {
  components: {
    HeaderNav,
    SidebarNav,
    AdminView,
    UserView,
  },
  data() {
    const params = new URLSearchParams(window.location.search);
    return {
      currentRole: params.get("role") || "admin",
      currentComponent: params.get("component") || "items",
      isSidebarVisible: params.get("sidebar") !== "hidden",
    };
  },
  computed: {
    currentView() {
      return this.currentRole === "admin" ? AdminView : UserView;
    },
  },
  methods: {
    updateRole(role) {
      this.currentRole = role;
      this.navigateTo("items");
    },
    navigateTo(component ){
      this.currentComponent = component;
      this.updateURLParams();
    },
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
      this.updateURLParams();
    },
    updateURLParams() {
      const params = new URLSearchParams();
      params.set("role", this.currentRole);
      params.set("component", this.currentComponent);
      params.set("sidebar", this.isSidebarVisible ? "visible" : "hidden");
      window.history.replaceState(
      {}, 
      "", 
      `${window.location.pathname}?${params}`
      );
    },
  },
  mounted() {
    EventBus.on('search', this.handleSearch);
  },
  beforeUnmount() {
    EventBus.off('search', this.handleSearch);
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
  padding: 20px;
  background-color: #ffffff;
  transition: margin-left 0.3s ease;
}
.main-content.expanded {
  margin-left: 200px;
}
</style>