<template>
    <div class="item-list container py-4">
        <div class="header d-flex justify-content-between align-items-center mb-3">
            <h2>Daftar Barang</h2>
            <button class="btn btn-primary" @click="showAddForm">Tambah Item</button> 
        </div>
        <div class="item-cards rows d-flex">
            <ItemCard 
                v-for="item in items" 
                :key="item.kode" 
                :item="item" 
                @edit-item="editItem" 
                @delete-item="confirmDeleteItem" 
                class="col-md-6 col-lg-4"
            />
        </div>
        <AllModal :visible="showForm" @close="cancelEditForm">
            <ItemForm
                :item="selectedItem"
                :isEdit="isEdit"
                @submit="handleSubmit"
                @cancel="cancelEditForm"
            />
        </AllModal>
    </div>

</template>

<script>
import ItemCard from "./ItemCard.vue";
import AllModal from "@/components/AllModal.vue";
import ItemForm from "./ItemForm.vue";

export default {
    components: {
        ItemCard,
        AllModal,
        ItemForm,
    },
    data() {
        return {
            items: [
                {
                    kode: "2024001",
                    nama: "Acer Nitro 15 AN515-58",
                    deskripsi: "Intel Core i5 12500H, RTX 3050, RAM 8GB DDR4, LAYAR 15.6",
                    stok: 80,
                },
                {
                    kode: "2024002",
                    nama: "Lenovo LOQ 15 15IRH8",
                    deskripsi: "Intel Core i5 13450H, RTX 3050, RAM 8GB DDR4, LAYAR 15.6",
                    stok: 80,
                },
               
            ],
            showForm: false,
            selectedItem: null,
            isEdit: false,
        };
    },
    methods: {
        showAddForm() {
            this.selectedItem = { kode: "", nama: "", deskripsi: "", stok: 0 };
            this.isEdit = false;
            this.showForm = true;
        },
        editItem(item) {
            this.selectedItem = { ...item };
            this.isEdit = true;
            this.showForm = true;
        },
        handleSubmit(item) {
            if (
                item.kode &&
                item.nama &&
                item.deskripsi &&
                item.stok !== null &&
                !isNaN(item.stok) 
            ) {
                if (this.isEdit) {
                    const index = this.items.findIndex(i => i.kode === item.kode);
                    this.items[index] = item;
                } else {
                    this.items.push(item);
                }
            }
            this.showForm = false;
        },
        cancelEditForm() {
            this.showForm = false;
        },
        confirmDeleteItem(item) {
            if (confirm(`Apakah Anda yakin ingin menghapus ${item.nama}?`)) {
                this.deleteItem(item.kode);
            }
        },
        deleteItem(kode) {
            this.items = this.items.filter(item => item.kode !== kode);
        },
    },
};
</script>

<style scoped>
.item-list{
    background-color: white;
    border-radius: 8px;
    margin: 50px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1)
}

.header h2{
    color: #4b3f6b;
    font-size: 24px;

}
</style>
