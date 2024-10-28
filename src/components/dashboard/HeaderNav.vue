<template>
    <header :class="{ expanded: !isSidebarVisible }">
        <button class="toggle-btn" @click="toggleSidebar">☰</button>
        <div class="header-content">
            <div class="search-bar-container">
                <input type="text" v-model="search" placeholder="Search" class="search-bar" />
            </div>
            <div class="role-selection">
                <button @click="selectRole('admin')" :class="{ active: currentRole === 'admin' }">Admin</button>
                <button @click="selectRole('user')" :class="{ active: currentRole === 'user' }">User</button>
            </div>
        </div>
    </header>
</template>

<script>
import { EventBus } from '@/utils/EventBus'; // Pastikan menggunakan huruf besar/kecil yang sesuai

export default {
    data() {
        return {
            search:""
        };
    },
    props: {
        currentRole: {
            type: String,
            required: true
        },
        isSidebarVisible: {
            type: Boolean,
            required: true
        }
    },
    watch: {
        search(newQuery) {
            EventBus.$emit('search', newQuery);
        }
    },
    methods: {
        selectRole(role) {
            this.$emit('update-role', role);
        },
        toggleSidebar() {
            this.$emit('toggle-sidebar');
        }
    }
};
</script>

<style scoped>
header {
    background-color: #4b3f6b;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    height: 60px;
    width: calc(100% - 180px);
    position: fixed;
    top: 0;
    left: 160px;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: width 0.3s ease, left 0.3s ease;
}
header.expanded {
    width: 100%;
    left: 0;
}
.toggle-btn {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    margin-right: 10px;
}
.header-content {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px;
    align-items: center;
}
.search-bar-container {
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
    margin-right: 8px;
}
.search-bar {
    padding: 8px 12px;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 250px;
    font-size: 14px;
    outline: none;
}
.role-selection {
    display: flex;
    justify-content: center;
    background-color: #4b3f6b;
    padding: 10px;
}
button {
    margin: 0 10px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    border: none;
    background-color: #4b3f6b;
    color: white;
    transition: background-color 0.3s ease;
}
button:hover {
    background-color: #6b5bb8;
}
button.active {
    background-color: #6b5bb8;
}
@media (max-width: 768px) {
    header {
        width: 100%;
        left: 0;
    }
    .header-content {
        flex-direction: column;
    }
    .search-bar-container {
        margin-right: 0;
        margin-bottom: 10px;
        margin-top: 16px;
    }
    .toggle-btn {
        display: block;
    }
}
</style>