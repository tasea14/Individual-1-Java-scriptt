const transactions = require('./transaction (1).json');

class TransactionAnalyzer {
    constructor(transactions) {
        this.transactions = transactions.map(transaction => {
          transaction.string = function() {
            return JSON.stringify(this);
          };
          return transaction;
        });
    }
 
    /**
     * Add transaction to array
     * @param {object} transaction - Объект транзакции для добавления
     */
    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    /**
     * Get all transactions
     * @returns {Array} - Массив всех транзакций
     */
    getAllTransactions() {
        return this.transactions;
    }

    /**
     * Get unique transaction types
     * @returns {Array} - Массив уникальных типов транзакций
     */
    getUniqueTransactionTypes() {
        return [...new Set(this.transactions.map(transaction => transaction.transaction_type))];
    }

    /**
     * Calculate total amount of all transactions
     * @returns {number} - Общая сумма всех транзакций
     */
    calculateTotalAmount() {
        return this.transactions.reduce((sum, t) => sum + parseFloat(t.transaction_amount), 0);
    }

    /**
     * Calculate total amount by specific date
     * @param {number} year - Год транзакций
     * @param {number} month - Месяц транзакций (1-12)
     * @param {number} day - День транзакций
     * @returns {number} - Общая сумма транзакций за указанный день
     */
    calculateTotalAmountByDate(year, month, day) {
        let totalAmount = 0;
        for (const transaction of this.transactions) {
            const transactionDate = new Date(transaction.transaction_date);
            if (
                transactionDate.getFullYear() === year &&
                transactionDate.getMonth() === month - 1 &&
                transactionDate.getDate() === day
            ) {
                totalAmount += transaction.transaction_amount;
            }
        }
        return totalAmount;
    }

    /**
     * Get transactions by type
     * @param {string} type - Тип транзакции (например, 'debit', 'credit')
     * @returns {Array} - Массив транзакций указанного типа
     */
    getTransactionByType(type) {
        return this.transactions.filter(t => t.transaction_type === type);
    }

    /**
     * Get transactions in date range
     * @param {string} startDate - Начальная дата диапазона (формат 'YYYY-MM-DD')
     * @param {string} endDate - Конечная дата диапазона (формат 'YYYY-MM-DD')
     * @returns {Array} - Массив транзакций в указанном диапазоне дат
     */
    getTransactionsInDateRange(startDate, endDate) {
        let transactionsInDateRange = [];
        let start = new Date(startDate).getTime();
        let end = new Date(endDate).getTime();
        for (const transaction of this.transactions) {
            let transactionDate = new Date(transaction.transaction_date).getTime();
            if (transactionDate >= start && transactionDate <= end) {
                transactionsInDateRange.push(transaction);
            }
        }
        return transactionsInDateRange;
    }

    /**
     * Get transactions by merchant name
     * @param {string} merchantName - Название продавца
     * @returns {Array} - Массив транзакций указанного продавца
     */
    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(transaction => transaction.merchant_name === merchantName);
    }

    /**
     * Calculate average transaction amount
     * @returns {number} - Средняя сумма транзакции
     */
    calculateAverageTransactionAmount() {
        const totalAmount = this.calculateTotalAmount();
        return totalAmount / this.transactions.length;
    }

    /**
     * Get transactions by amount range
     * @param {number} minAmount - Минимальная сумма транзакции
     * @param {number} maxAmount - Максимальная сумма транзакции
     * @returns {Array} - Массив транзакций в указанном диапазоне сумм
     */
    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.transactions.filter(transaction =>
            transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount);
    }

    /**
     * Calculate total debit amount
     * @returns {number} - Общая сумма дебетовых транзакций
     */
    calculateTotalDebitAmount() {
        let totalDebit = 0;
        for (const transaction of this.transactions) {
            if (transaction.transaction_type === "debit") {
                totalDebit += transaction.transaction_amount;
            }
        }
        return totalDebit;
    }

    /**
     * Find the month with the most transactions
     * @returns {number} - Номер месяца (1-4), в котором больше всего транзакций
     */
    findMostTransactionsMonth() {
        const counter = [0, 0, 0, 0];
        let mostTransactionsMonth = 0;

        for (let i = 0; i < this.transactions.length; i++) {
            const month = parseInt(this.transactions[i].transaction_date.split('-')[1]);
            if (month >= 1 && month <= 4) {
                counter[month - 1]++;
                if (counter[month - 1] > counter[mostTransactionsMonth]) {
                    mostTransactionsMonth = month - 1;
                }
            }
        }

        return mostTransactionsMonth + 1;
    }

    /**
     * Determine which type of transaction is more frequent
     * @returns {string} - 'debit', 'credit' или 'equal' в зависимости от частоты типов транзакций
     */
    mostTransactionTypes() {
        const debitCount = this.getTransactionByType("debit").length;
        const creditCount = this.getTransactionByType("credit").length;
        if (debitCount > creditCount) {
            return 'debit';
        } else if (debitCount < creditCount) {
            return 'credit';
        } else {
            return 'equal';
        }
    }

    /**
     * Get transactions before a specific date
     * @param {string} date - Дата в формате 'YYYY-MM-DD'
     * @returns {Array} - Массив транзакций до указанной даты
     */
    getTransactionsBeforeDate(date) {
        const transactionsBeforeDate = [];
        const endDate = new Date(date);

        for (let i = 0; i < this.transactions.length; i++) {
            const transactionDate = new Date(this.transactions[i].transaction_date);
            if (endDate > transactionDate) {
                transactionsBeforeDate.push(this.transactions[i]);
            }
        }
        return transactionsBeforeDate;
    }

    /**
     * Find transaction by ID
     * @param {string} id - Идентификатор транзакции
     * @returns {object|null} - Объект транзакции или null, если не найден
     */
    findTransactionById(id) {
        const transaction = this.transactions.find(t => t.transaction_id === id);
        return transaction || null;
    }

    /**
     * Map transaction descriptions
     * @returns {Array} - Массив описаний транзакций
     */
    mapTransactionDescriptions() {
        return this.transactions.map(t => t.transaction_description);
    }
}

// Пример использования класса TransactionAnalyzer
const analyzer = new TransactionAnalyzer(transactions);

console.log(analyzer.getUniqueTransactionTypes());
console.log(analyzer.calculateTotalAmount());
console.log(analyzer.calculateTotalAmountByDate(2019, 1, 1));
console.log(analyzer.getTransactionByType('credit'));
console.log(analyzer.getTransactionsInDateRange("2019-01-01", "2019-01-02"));
console.log(analyzer.getTransactionsByMerchant('FashionStoreUSM'));
console.log(analyzer.calculateAverageTransactionAmount());
console.log(analyzer.getTransactionsByAmountRange(100, 150));
console.log(analyzer.calculateTotalDebitAmount());
console.log(analyzer.findMostTransactionsMonth());
console.log(analyzer.mostTransactionTypes());
console.log(analyzer.getTransactionsBeforeDate('2019-01-03'));
console.log(analyzer.findTransactionById('121'));
console.log(analyzer.mapTransactionDescriptions());
