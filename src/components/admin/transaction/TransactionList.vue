<template>
    <div class="transaction-list">
        <div class="header">
            <h2>Daftar Transaksi</h2>
            <button class="add-btn" @click="showAddForm">Tambah Transaksi</button> 
        </div>
        <div class="transaction-cards">
            <TransactionCard 
                v-for="transaction in transactions" 
                :key="transaction.id" 
                :transaction="transaction" 
                @edit-transaction="editTransaction" 
                @delete-transaction="confirmDeleteTransaction" 
            />
        </div>
        <AllModal :visible="showForm" @close="cancelEditForm">
            <TransactionForm
                :transaction="selectedTransaction"
                :isEdit="isEdit"
                @submit="handleSubmit"
                @cancel="cancelEditForm"
            />
        </AllModal>
    </div>
</template>

<script>
import TransactionCard from "./TransactionCard.vue";
import AllModal from "@/components/AllModal.vue";
import TransactionForm from "./TransactionForm.vue";

export default {
    components: {
        TransactionCard,
        AllModal,
        TransactionForm,
    },
    data() {
        return {
            transactions: [
                { id: 1, user: "John Doe", item: "Acer Nitro 15 AN515-58", amount: 800 },
                { id: 2, user: "Jane Smith", item: "Lenovo LOQ 15 15IRH8", amount: 800 }
            ],
            showForm: false,
            selectedTransaction: null,
            isEdit: false,
        };
    },
    methods: {
        showAddForm() {
            this.selectedTransaction = { id: null, user: "", item: "", amount: 0 };
            this.isEdit = false;
            this.showForm = true;
        },
        editTransaction(transaction) {
            this.selectedTransaction = { ...transaction };
            this.isEdit = true;
            this.showForm = true;
        },
        handleSubmit(transaction) {
            if (transaction.user && transaction.item && transaction.amount !== null) {
                if (this.isEdit) {
                    const index = this.transactions.findIndex(t => t.id === transaction.id);
                    this.transactions[index] = transaction;
                } else {
                    transaction.id = this.transactions.length + 1; // Generate a simple ID
                    this.transactions.push(transaction);
                }
            }
            this.showForm = false;
        },
        cancelEditForm() {
            this.showForm = false;
        },
        confirmDeleteTransaction(transaction) {
            if (confirm(`Apakah Anda yakin ingin menghapus transaksi untuk ${transaction.user}?`)) {
                this.deleteTransaction(transaction.id);
            }
        },
        deleteTransaction(id) {
            this.transactions = this.transactions.filter(transaction => transaction.id !== id);
        },
    },
};
</script>

<style scoped>
.transaction-list {
    padding: 24px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 20px 0;
}
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}
h2 {
    color: #4b3f6b;
    font-size: 24px;
}
.add-btn {
    background-color: #754bc5;
    color: white;
    padding: 6px 12px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 14px;
}
.add-btn:hover {
    background-color: #5a37a0;
}
.transaction-cards {
    display: flex;
    flex-direction: column;
}
</style>
