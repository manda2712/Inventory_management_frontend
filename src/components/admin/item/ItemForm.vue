<template>
    <div>
        <form @submit.prevent="submitForm" class="mb-3">
            <div class="mb-3">
                <tbody>
                <label for="kode" class="form-label">Kode Barang</label>
                    <input 
                        type="text" 
                        v-model="form.kode" 
                        id="kode" 
                        :disabled="isEdit" 
                        class="form-control"
                        required
                    />       
                <div class="mb-3">
                    <label for="kode" class="form-label">Nama Barang</label>
                    <input 
                        type="text" 
                        v-model="form.nama" 
                        id="nama" 
                        class="form-control"
                        required
                    />
                </div>
               <div class="mb-3">
                    <label for="kode" class="form-label">Deskripsi</label>
                    <input 
                        type="text" 
                        v-model="form.deskripsi" 
                        id="deskripsi"
                        class="form-control"
                        required 
                    />
                </div>
                <div class="mb-3">
                    <label for="kode" class="form-label">Stok</label>
                    <input 
                        type="number" 
                        v-model="form.stok" 
                        id="stok" 
                        class="form-control"
                        required />
                </div>
                <button type="submit" class="btn btn-success"> 
                    {{ isEdit ? "Simpan Perubahan" : "Tambah Barang" }} 
                </button>
                </tbody>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => ({}),
        },
        isEdit: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            form: {
                kode:"",
                nama:"",
                deskripsi:"",
                stok: 0,
            },
        };
    },
    watch: {
        item: {
            immediate: true,
            handler(newItem) {
                if (this.isEdit) {
                    this.form = { ...newItem };
                } else {
                    this.form = {
                        kode: "",
                        nama: "",
                        deskripsi: "",
                        stok: 0,
                    };
                }
            },
        },
    },
    methods: {
        submitForm() {
            if (
                this.form.kode &&
                this.form.nama &&
                this.form.deskripsi &&
                this.form.stok !== null &&
                this.form.stok !== undefined
            ) {
                this.$emit("submit", this.form);
            }
        },
    },
    emits:["submit"],
};
</script>

<style scoped>
.form{
    background-color: white;
    border-radius: 80px;
    padding: 200px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.mb-3{
    margin-bottom: 1rem;
}

.form label {
    font-weight: bold;
    color : #4b3f6b;

}
.form-control{
    border: 1px solid #ced4da;
    border-radius: 0.25;
    width: 200%;  
}

.form-control:focus{
    border-color: #4b3f6b;
    box-shadow: 0 0 0 0.25rem rgba(75, 63, 107, 0.25);
}

.btn-succes {
    background-color: #4caf50;
    border-color: #4caf50;
}

.btn-success:hover{
    background-color: #45a049;
    border-color: #45a049;
}

</style>