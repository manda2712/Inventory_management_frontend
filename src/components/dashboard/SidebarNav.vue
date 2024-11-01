<template>
    <div :class="['sidebar', { 'd-none': !isSidebarVisible }]">
      <div class="logo-baru">
        <a class="logo">Simbok</a>
      </div>
      <div class="baru">
        <ul>
        <li v-if="currentRole === 'admin'">
          <a href="#" @click.prevent="showComponent('users')" class="nav-link">
            <i class="bi bi-house-door"></i> Users
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="showComponent('items')" class="nav-link">  
            <i class="bi bi-box"></i> Items
          </a>
        </li>
        <li>
          <a href="#" @click.prevent="showComponent('transactions')" class="nav-link">
            <i class="bi bi-cash"></i> Transactions
          </a>
        </li>
        <li v-if="currentRole == 'user'">
          <a href="#" @click.prevent="showComponent('history')" class="nav-link">
            <i class="bi bi-clock-history"></i> History
          </a>
        </li>
      </ul>
        
      </div>
     
    </div>
  </template>  

<script>
export default {
    props: {
        currentRole: {
            type: String,
            required: true,
        },
        isSidebarVisible: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        showComponent(component) {
            this.$emit("showComponent", component);
        },
    },
    emits: ["showComponent"],
};
</script>

<style scoped>
.sidebar {
  width: 200px;
  background: #4b3f6b;
  color: white;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  font-size: 18px;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center; /* Menyusun konten di tengah secara horizontal */
  justify-content: start; /* Mengatur konten berada di bagian atas */
  transition: transform 0.3s ease;
}

.logo-baru {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 18px 0;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: white;
}

.d-none {
  display: none;
}
.sidebar.hidden {
    transform: translateX(-100%);
}

ul {
    list-style: none;
    padding: 10px 0;
    margin: 0;
}
li {
    margin-bottom: 30px;
    text-align: center;
}
.baru{
  margin-top: 5px;
}
.nav-link{
  color: white;
  text-decoration: none;
  cursor: pointer;
  margin: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  transition: background color 0.3s ease;
}

.nav-link:hover {
  text-decoration: underline;
  background-color: rgba(255, 255, 255, 0.1);

}
</style>