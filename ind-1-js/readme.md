# Отчет по индивидуальной работе номер 1
#### Выполнила : Дяконица Наталья I2302
#### Проверил : Нартя Никита

## Цель

Понимание основных функций и синтаксиса Java Script и создание консольного приложения для консольного для анализа транзакций

## Ход работы 

### Создание класса


```js
const transactions = require('./transaction (1).json');
```

Эта строка импортирует все транзакции из файла `transaction (1).json` в переменную `transactions`

```js
class TransactionAnalyzer {
    constructor(transactions) {
        this.transactions = transactions.map(transaction => {
            transaction.string = function() {
                return JSON.stringify(this);
            };
            return transaction;
        });
    }

```
В этой части кода мы объявили класс `TransactionAnalyzer`, у которого есть конструктор, принимающий массив транзакций в качестве аргумента. Массив транзакций сохраняется как свойство класса `TransactionAnalyzer`. Мы также добавляем метод `string`для каждого объекта транзакции, чтобы легко преобразовывать его в строку JSON.


### Методы класса
#### addAllTransactions()
```js
addTransaction(transaction) {
        this.transactions.push(transaction);
    }
```
Этот метод позволяет добавлять транзакции в массив, благодаря методу `push`. В раздел параметров вписываем `transaction` 

#### getAllTransactions()
```js
getAllTransactions() {
        return this.transactions;
    }
```
Этот метод возвращает все транзаеции, хранящиеся в массиве

#### getUniqueTransactionTypes()
```js
getUniqueTransactionTypes() {
    return [...new Set(this.transactions.map(transaction => transaction.transaction_type))];
}

```
Этот метод возвращает массив уникальных типов транзакций.

#### calculateTotalAmount() 
```js
calculateTotalAmount() {
    return this.transactions.reduce((sum, t) => sum + parseFloat(t.transaction_amount), 0);
}

```
Этот метод вычисляет общую сумму всех транзакций.

#### calculateTotalAmountByDate()
```js
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
 
```
Этот метод вычисляет общую сумму всех транзакций за указанную дату.

#### getTransactionByType()
```js
getTransactionByType(type) {
    return this.transactions.filter(t => t.transaction_type === type);
}

```
Этот метод возвращает все транзакции указанного типа.

#### getTransactionInDateRange()
```js
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

```
Этот метод возвращает все транзакции в указанном диапазоне дат.

#### getTransactionsByMerchant()
```js
getTransactionsByMerchant(merchantName) {
    return this.transactions.filter(transaction => transaction.merchant_name === merchantName);
}

```
Этот метод возвращает все транзакции указанного продавца.

#### calculateAverageTransactionAmount()
```js
calculateAverageTransactionAmount() {
    const totalAmount = this.calculateTotalAmount();
    return totalAmount / this.transactions.length;
}

```
Этот метод вычисляет среднюю сумму всех транзакций.

#### getTransactionsByAmountRange()
```js
getTransactionsByAmountRange(minAmount, maxAmount) {
    return this.transactions.filter(transaction =>
        transaction.transaction_amount >= minAmount && transaction.transaction_amount <= maxAmount);
}

```
Этот метод возвращает все транзакции в указанном диапазоне сумм.

#### calculateTotalDebitAmount()
```js
calculateTotalDebitAmount() {
    let totalDebit = 0;
    for (const transaction of this.transactions) {
        if (transaction.transaction_type === "debit") {
            totalDebit += transaction.transaction_amount;
        }
    }
    return totalDebit;
}

```
Этот метод вычисляет общую сумму всех дебетовых транзакций.

#### findMostTransactionMonth()
```js
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

```
Этот метод находит месяц с наибольшим количеством транзакций (в пределах первых четырех месяцев года).

#### mostTransactionTypes()
```js
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

```
Этот метод определяет, какой тип транзакций (дебет или кредит) встречается чаще.

#### getTransactionBeforeDate()
```js
getTransactionsBeforeDate(date) {
    const transactionsBeforeDate = [];
    const targetDate = new Date(date);

    for (let i = 0; i < this.transactions.length; i++) {
        const transactionDate = new Date(this.transactions[i].transaction_date);
        if (transactionDate < targetDate) {
            transactionsBeforeDate.push(this.transactions[i]);
        }
    }
    return transactionsBeforeDate;
}

```
Этот метод возвращает все транзакции, произошедшие до указанной даты.

#### findTransactionById()
```js
findTransactionById(id) {
    const transaction = this.transactions.find(t => t.transaction_id === id);
    return transaction || null;
}

```
Этот метод находит транзакцию по её ID.

#### mapTransactionDescriptions()
```js
mapTransactionDescriptions() {
    return this.transactions.map(t => t.transaction_description);
}

```
Этот метод возвращает массив описаний всех транзакций.

### Пример использования всех методов и вывод результата

```js
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

```
Этот пример кода демонстрирует использование всех методов класса `TransactionAnalyzer`.

## Заключение

`TransactionAnalyzer` предоставляет мощные инструменты для анализа данных транзакций. Он позволяет легко фильтровать, суммировать и находить транзакции по различным критериям, что делает его полезным инструментом для работы с финансовыми данными.

## Вывод на экран
```js
Node.js v20.12.0

D:\jsIND> node main.js
[ 'debit', 'credit' ]
8000
100
[
  {
    transaction_id: '2',
    transaction_date: '2019-01-02',
    transaction_amount: 50,
    transaction_type: 'credit',
    transaction_description: 'Refund for returned item',
    merchant_name: 'OnlineShop',
    card_type: 'MasterCard',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '5',
    transaction_date: '2019-01-05',
    transaction_amount: 25,
    transaction_type: 'credit',
    transaction_description: 'Returned defective product',
    merchant_name: 'ElectronicsShop',
    card_type: 'Visa',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '10',
    transaction_date: '2019-01-10',
    transaction_amount: 20,
    transaction_type: 'credit',
    transaction_description: 'Cashback reward',
    merchant_name: 'BankXYZ',
    card_type: 'Visa',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '12',
    transaction_date: '2019-01-12',
    transaction_amount: 30,
    transaction_type: 'credit',
    transaction_description: 'Returned books',
    merchant_name: 'BookstoreABC',
    card_type: 'Visa',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '17',
    transaction_date: '2019-01-17',
    transaction_amount: 55,
    transaction_type: 'credit',
    transaction_description: 'Refund for damaged item',
    merchant_name: 'OnlineStoreXYZ',
    card_type: 'Discover',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '20',
    transaction_date: '2019-01-20',
    transaction_amount: 35,
    transaction_type: 'credit',
    transaction_description: 'Cashback reward',
    merchant_name: 'BankXYZ',
    card_type: 'Visa',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '24',
    transaction_date: '2019-01-24',
    transaction_amount: 25,
    transaction_type: 'credit',
    transaction_description: 'Returned clothing item',
    merchant_name: 'FashionStore123',
    card_type: 'MasterCard',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '30',
    transaction_date: '2019-01-30',
    transaction_amount: 20,
    transaction_type: 'credit',
    transaction_description: 'Cashback reward',
    merchant_name: 'BankXYZ',
    card_type: 'Amex',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '34',
    transaction_date: '2019-02-03',
    transaction_amount: 25,
    transaction_type: 'credit',
    transaction_description: 'Returned gadget',
    merchant_name: 'ElectronicsStore123',
    card_type: 'Visa',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '39',
    transaction_date: '2019-02-08',
    transaction_amount: 30,
    transaction_type: 'credit',
    transaction_description: 'Returned shoes',
    merchant_name: 'ShoeStoreABC',
    card_type: 'Discover',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '43',
    transaction_date: '2019-02-12',
    transaction_amount: 35,
    transaction_type: 'credit',
    transaction_description: 'Cashback reward',
    merchant_name: 'BankXYZ',
    card_type: 'Amex',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '49',
    transaction_date: '2019-02-18',
    transaction_amount: 30,
    transaction_type: 'credit',
    transaction_description: 'Returned kitchenware',
    merchant_name: 'KitchenStore123',
    card_type: 'Amex',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '52',
    transaction_date: '2019-02-21',
    transaction_amount: 25,
    transaction_type: 'credit',
    transaction_description: 'Cashback reward',
    merchant_name: 'BankXYZ',
    card_type: 'Discover',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '60',
    transaction_date: '2019-03-01',
    transaction_amount: 35,
    transaction_type: 'credit',
    transaction_description: 'Cashback reward',
    merchant_name: 'BankXYZ',
    card_type: 'Discover',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '64',
    transaction_date: '2019-03-05',
    transaction_amount: 25,
    transaction_type: 'credit',
    transaction_description: 'Returned tool',
    merchant_name: 'HardwareStore123',
    card_type: 'Discover',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '69',
    transaction_date: '2019-03-10',
    transaction_amount: 30,
    transaction_type: 'credit',
    transaction_description: 'Cashback reward',
    merchant_name: 'BankXYZ',
    card_type: 'Amex',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '72',
    transaction_date: '2019-03-13',
    transaction_amount: 35,
    transaction_type: 'credit',
    transaction_description: 'Cashback reward',
    merchant_name: 'BankXYZ',
    card_type: 'Discover',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '78',
    transaction_date: '2019-03-19',
    transaction_amount: 30,
    transaction_type: 'credit',
    transaction_description: 'Returned clothing',
    merchant_name: 'ClothingStore456',
    card_type: 'Visa',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '81',
    transaction_date: '2019-03-22',
    transaction_amount: 35,
    transaction_type: 'credit',
    transaction_description: 'Cashback reward',
    merchant_name: 'BankXYZ',
    card_type: 'Amex',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '89',
    transaction_date: '2019-03-30',
    transaction_amount: 30,
    transaction_type: 'credit',
    transaction_description: 'Cashback reward',
    merchant_name: 'BankXYZ',
    card_type: 'Amex',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '92',
    transaction_date: '2019-04-02',
    transaction_amount: 35,
    transaction_type: 'credit',
    transaction_description: 'Cashback reward',
    merchant_name: 'BankXYZ',
    card_type: 'Discover',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '98',
    transaction_date: '2019-04-08',
    transaction_amount: 30,
    transaction_type: 'credit',
    transaction_description: 'Returned clothing',
    merchant_name: 'ClothingStore789',
    card_type: 'Visa',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '104',
    transaction_date: '2019-04-14',
    transaction_amount: 35,
    transaction_type: 'credit',
    transaction_description: 'Cashback reward',
    merchant_name: 'BankXYZ',
    card_type: 'Amex',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '109',
    transaction_date: '2019-04-19',
    transaction_amount: 30,
    transaction_type: 'credit',
    transaction_description: 'Returned item',
    merchant_name: 'RetailStore123',
    card_type: 'Visa',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '112',
    transaction_date: '2019-04-22',
    transaction_amount: 35,
    transaction_type: 'credit',
    transaction_description: 'Cashback reward',
    merchant_name: 'BankXYZ',
    card_type: 'Amex',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '118',
    transaction_date: '2019-04-28',
    transaction_amount: 30,
    transaction_type: 'credit',
    transaction_description: 'Returned item',
    merchant_name: 'RetailStore456',
    card_type: 'MasterCard',
    string: [Function (anonymous)]
  }
]
[
  {
    transaction_id: '1',
    transaction_date: '2019-01-01',
    transaction_amount: 100,
    transaction_type: 'debit',
    transaction_description: 'Payment for groceries',
    merchant_name: 'SuperMart',
    card_type: 'Visa',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '2',
    transaction_date: '2019-01-02',
    transaction_amount: 50,
    transaction_type: 'credit',
    transaction_description: 'Refund for returned item',
    merchant_name: 'OnlineShop',
    card_type: 'MasterCard',
    string: [Function (anonymous)]
  }
]
[]
66.66666666666667
[
  {
    transaction_id: '1',
    transaction_date: '2019-01-01',
    transaction_amount: 100,
    transaction_type: 'debit',
    transaction_description: 'Payment for groceries',
    merchant_name: 'SuperMart',
    card_type: 'Visa',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '4',
    transaction_date: '2019-01-04',
    transaction_amount: 120,
    transaction_type: 'debit',
    transaction_description: 'Shopping at Mall',
    merchant_name: 'FashionStoreXYZ',
    card_type: 'Discover',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '9',
    transaction_date: '2019-01-09',
    transaction_amount: 150,
    transaction_type: 'debit',
    transaction_description: 'Weekend getaway',
    merchant_name: 'ResortABC',
    card_type: 'Discover',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '15',
    transaction_date: '2019-01-15',
    transaction_amount: 110,
    transaction_type: 'debit',
    transaction_description: 'Electronics purchase',
    merchant_name: 'ElectronicsStoreXYZ',
    card_type: 'MasterCard',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '21',
    transaction_date: '2019-01-21',
    transaction_amount: 130,
    transaction_type: 'debit',
    transaction_description: 'Shopping spree',
    merchant_name: 'MallABC',
    card_type: 'Discover',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '31',
    transaction_date: '2019-01-31',
    transaction_amount: 110,
    transaction_type: 'debit',
    transaction_description: 'Home improvement supplies',
    merchant_name: 'HomeImprovementStore123',
    card_type: 'Discover',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '38',
    transaction_date: '2019-02-07',
    transaction_amount: 120,
    transaction_type: 'debit',
    transaction_description: 'Furniture purchase',
    merchant_name: 'FurnitureStoreXYZ',
    card_type: 'Visa',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '42',
    transaction_date: '2019-02-11',
    transaction_amount: 110,
    transaction_type: 'debit',
    transaction_description: 'Electronics accessories',
    merchant_name: 'AccessoriesStoreXYZ',
    card_type: 'Visa',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '51',
    transaction_date: '2019-02-20',
    transaction_amount: 110,
    transaction_type: 'debit',
    transaction_description: 'Birthday gift',
    merchant_name: 'GiftShop456',
    card_type: 'MasterCard',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '56',
    transaction_date: '2019-02-25',
    transaction_amount: 120,
    transaction_type: 'debit',
    transaction_description: 'Home decor',
    merchant_name: 'HomeDecorShop123',
    card_type: 'Discover',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '61',
    transaction_date: '2019-03-02',
    transaction_amount: 130,
    transaction_type: 'debit',
    transaction_description: 'Weekend trip',
    merchant_name: 'TravelAgencyXYZ',
    card_type: 'Amex',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '68',
    transaction_date: '2019-03-09',
    transaction_amount: 120,
    transaction_type: 'debit',
    transaction_description: 'Furniture',
    merchant_name: 'FurnitureStore456',
    card_type: 'Discover',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '71',
    transaction_date: '2019-03-12',
    transaction_amount: 110,
    transaction_type: 'debit',
    transaction_description: 'Tech gadgets',
    merchant_name: 'GadgetStoreXYZ',
    card_type: 'MasterCard',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '82',
    transaction_date: '2019-03-23',
    transaction_amount: 120,
    transaction_type: 'debit',
    transaction_description: 'Home decor',
    merchant_name: 'HomeDecorShop456',
    card_type: 'Visa',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '88',
    transaction_date: '2019-03-29',
    transaction_amount: 110,
    transaction_type: 'debit',
    transaction_description: 'Tech gadgets',
    merchant_name: 'TechGadgetStoreXYZ',
    card_type: 'Discover',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '91',
    transaction_date: '2019-04-01',
    transaction_amount: 110,
    transaction_type: 'debit',
    transaction_description: 'Home decor',
    merchant_name: 'HomeDecorShop789',
    card_type: 'MasterCard',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '103',
    transaction_date: '2019-04-13',
    transaction_amount: 110,
    transaction_type: 'debit',
    transaction_description: 'Home decor',
    merchant_name: 'HomeDecorShop789',
    card_type: 'Discover',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '111',
    transaction_date: '2019-04-21',
    transaction_amount: 120,
    transaction_type: 'debit',
    transaction_description: 'Home decor',
    merchant_name: 'HomeDecorStoreABC',
    card_type: 'Discover',
    string: [Function (anonymous)]
  }
] 
7180
1
debit
[
  {
    transaction_id: '1',
    transaction_date: '2019-01-01',
    transaction_amount: 100,
    transaction_type: 'debit',
    transaction_description: 'Payment for groceries',
    merchant_name: 'SuperMart',
    card_type: 'Visa',
    string: [Function (anonymous)]
  },
  {
    transaction_id: '2',
    transaction_date: '2019-01-02',
    transaction_amount: 50,
    transaction_type: 'credit',
    transaction_description: 'Refund for returned item',
    merchant_name: 'OnlineShop',
    card_type: 'MasterCard',
    string: [Function (anonymous)]
  }
]
null
[
  'Payment for groceries',
  'Refund for returned item',
  'Dinner with friends',
  'Shopping at Mall',
  'Returned defective product',
  'Gasoline refill',
  'Lunch with colleagues',
  'Movie tickets',
  'Weekend getaway',
  'Cashback reward',
  'Dinner with family',
  'Returned books',
  'Home appliances purchase',
  'Coffee and snacks',
  'Electronics purchase',
  'Car maintenance',
  'Refund for damaged item',
  'Dinner at fancy restaurant',
  'Grocery shopping',
  'Cashback reward',
  'Shopping spree',
  'Lunch with friends',
  'Health and wellness products',
  'Returned clothing item',
  'Online subscription renewal',
  'Date night dinner',
  'Concert tickets',
  'Home decor purchase',
  'Office supplies',
  'Cashback reward',
  'Home improvement supplies',
  'Brunch with family',
  'Sports equipment purchase',
  'Returned gadget',
  'Dinner at Italian restaurant',
  'Coffee and pastries',
  'Gift purchase',
  'Furniture purchase',
  'Returned shoes',
  'Haircut and styling',
  'Gym membership renewal',
  'Electronics accessories',
  'Cashback reward',
  'Dinner at Mexican restaurant',
  'Pet supplies',
  'Home cleaning service',
  'Dinner with colleagues',
  'Home entertainment purchase',
  'Returned kitchenware',
  'Concert tickets',
  'Birthday gift',
  'Cashback reward',
  'Dinner at seafood restaurant',
  'Coffee and muffins',
  'Book purchase',
  'Home decor',
  'Fitness equipment',
  'Car wash',
  'Electronics upgrade',
  'Cashback reward',
  'Weekend trip',
  'Lunch at diner',
  'Home improvement materials',
  'Returned tool',
  'Dinner at steakhouse',
  'Coffee and cake',
  'Home cleaning supplies',
  'Furniture',
  'Cashback reward',
  'Gym membership',
  'Tech gadgets',
  'Cashback reward',
  'Dinner with friends',
  'Pet grooming',
  'Car accessories',
  'Coffee and sandwiches',
  'Home security system',
  'Returned clothing',
  'Lunch at sushi bar',
  'Home office supplies',
  'Cashback reward',
  'Home decor',
  'Coffee and bagels',
  'Book purchase',
  'Electronics upgrade',
  'Car detailing',
  'Home cleaning service',
  'Tech gadgets',
  'Cashback reward',
  'Dinner with family',
  'Home decor',
  'Cashback reward',
  'Gym membership',
  'Pet supplies',
  'Auto repair',
  'Coffee and cookies',
  'Home entertainment purchase',
  'Returned clothing',
  'Lunch at pizza place',
  'Home office supplies',
  ... 20 more items
]
```

## Контрольные вопросы

1. Какие примитивные типы данных существуют в JavaScript? В JavaScript существуют следующие примитивные типы данных: Числа, Строки, Булевы значения, null, undefined, Символы.
2. Какие методы массивов вы используете для обработки и анализа данных в вашем приложении, и как они помогли при выполнении задач? В моем проекте я использовала следующие методы и функции: parseInt(превращает символ в члены числа), push(добавляет элемент в конец массива), split(раздел показывает текст по указанному в скобках символу), length(Использовала для количества элементов массива). Так же я использовала объект Date, однако его свойства я не затронул.
3. В чем состоит роль конструктора класса? Конструктор класса используется для создания объектов определенного класса, утснвановки начальных результатов свойств объекта и выполнения других операций, необходимых при создании экземпляра.
4. Каким образом вы можете создать новый экземпляр класса в JavaScript? Я могу придумать объект класса с помощью ключевого слова newс вызовом конструктора класса, например:const obj = new TransactionAnalyzer(transactions)

## Источники
[learn js](https://learn.javascript.ru/first-steps)