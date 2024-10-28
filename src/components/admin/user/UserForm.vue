<template>
    <div>
        <form @submit.prevent="submitForm">
            <table>
                <tbody>
                <tr>
                    <td>ID Pengguna</td>
                    <td>
                        <input type="text" v-model="form.id" id="id" :disabled="isEdit" required/>
                    </td>
                </tr>
                <tr>
                    <td>Nama Pengguna</td>
                    <td>
                        <input type="text" v-model="form.nama" id="nama" required />
                    </td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>
                        <input type="email" v-model="form.email" id="email" required />
                    </td>
                </tr>
                <tr>
                    <td>Role</td>
                    <td>
                        <select v-model="form.role" required>
                            <option value="" disabled>Pilih role</option>
                            <option value="Admin">Admin</option>
                            <option value="User">User</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td>
                        <input type="password" v-model="form.password" id="password" required />
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="submit">{{ isEdit ? "Simpan Perubahan" : "Tambah Pengguna" }}</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        user: {
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
                id: "",
                nama: "",
                email: "",
                password: "",
                role: "",
            },
        };
    },
    watch: {
        user: {
            immediate: true,
            handler(newUser) {
                if (this.isEdit) {
                    this.form = { ...newUser };
                } else {
                    this.form = {
                        id: "",
                        nama: "",
                        email: "",
                        password: "",
                        role: "",
                    };
                }
            },
        },
    },
    methods: {
        submitForm() {
            if (
                this.form.id &&
                this.form.nama &&
                this.form.email &&
                this.form.password &&
                this.form.role
            ) {
                this.$emit("submit", this.form);
            }
        },
    },
    emits: ["submit"],
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}
td {
    padding: 10px;
    border: 1px solid #ddd;
}
input[type="text"],
input[type="email"],
input[type="password"] {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}
button[type="submit"] {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
button[type="submit"]:hover {
    background-color: #45a049;
}
</style>
