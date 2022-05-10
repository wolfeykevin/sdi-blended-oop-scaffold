/*
IOC-E
Inputs:


Outputs:
The credit() method should add the given amount of money into the account
The debit() method should take out the given amount of money from the account
The checkBalance() method should return the current balance of the account in a readable string
Anytime a transaction occurs, the amount credited or debited should be stored in a private property called transactions
There should be a static method of the BankAccount class that returns the private property transactions of the account passed in when called

Constraints:


Edge:


*/




class Bank {
  #bankAccounts
  #members
  constructor (name) {
    this.name = name;
    this.#bankAccounts = [];
    this.#members = [];
  }

  get getMembers() {
    return this.#members;
  }

  get getBankAccounts() {
    return this.#bankAccounts;
  }

  addMember(member) {
    this.#members.push(member);
  }

  addBankAccount(account) {
    this.#bankAccounts.push(account);
  }
}

class Member {
  #accounts
  #bank
  constructor(name, bank) {
      this.name = name;
      this.#bank = bank;
      this.#accounts = [];

      this.#bank.addMember(this);
  };

  get getBank() {
    return this.#bank;
  }

  get getAccounts () {
    return this.#accounts;
  }

  set setAccounts (accountName) {
    this.#accounts = accountName;
  }

  addAccount (accountName) {
    this.#accounts.push(accountName);
  }
};
class BankAccount {
  #balance
  #transactions
  #members
  #bank
  constructor(balance, member, bank) {
    this.#balance = balance;
    this.#bank = bank;
    this.#transactions = [];
    this.#members = [member];
    this.#bank.addBankAccount(this);
  };

  get getBalance () {
    return this.#balance;
  }

  set setBalance(newValue) {
    this.#balance = newValue;
  }

  get getTransactions () {
    return this.#transactions;
  }

  get getMembers () {
    return this.#members;
  }

  credit(addMoney) {
    this.#balance += addMoney;
    this.#transactions.push(`+${addMoney}`);
  };
  debit(takeMoney) {
    this.#balance -= takeMoney;
    this.#transactions.push(`-${takeMoney}`);
  };
  checkBalance() {
    return `The current balance is ${this.#balance}.`
  };

  static BankAccount (account) {
    return account.getTransactions;
  }

};
class CheckingAccount extends BankAccount {
  constructor (balance, member, bank) {
    super(balance, member, bank);
  }

  debit(takeMoney) {
    if (super.getBalance > takeMoney) {
      super.debit(takeMoney);
    }
    else {
      console.log('Insufficient funds');
    }
    console.log(this.checkBalance());
  }

  checkBalance () {
    if (super.getBalance < 50) {
      super.debit(40) ;
      return `You have been assessed a penalty of $40. Your new balance is $${super.getBalance}.`
    }
    else {
      return `The current balance is ${super.getBalance}.`
    }

  }
}
class SavingsAccount extends BankAccount {
  #linkedAccount
  constructor (balance, member, bank) {
    super(balance, member, bank);
  }

  get linkedAccount () {
    return this.#linkedAccount;
  }

  set linkedAccount (value) {
    this.#linkedAccount = value;
  }

  linkAccount(account) {
    this.#linkedAccount = account;
  }

  transferMoney (takeMoney) {
      if (super.getBalance > takeMoney && this.getTransactions.length < 10) {
        super.debit(takeMoney);
        this.linkedAccount.credit(takeMoney);
      }
      else if (this.getTransactions.length >= 10 ) {
        super.debit(50);
        console.log('You have exceeded 10 transactions.  You have been assessed a $50 fee.')
      }
      else {
        console.log('Insufficient funds');
      }
  }

  getInterest(monthsPassed) {
    let interestRate = 0.01;
    let appliedInterest = super.getBalance * interestRate;
    super.credit(monthsPassed * appliedInterest);
  }
}

class CreditCard extends SavingsAccount {
  #dayLeft
  constructor(balance, member, bank) {
    super(balance, member, bank);
    this.#dayLeft = 5;
  }

  credit (addMoney) {
    super.credit(addMoney);
    this.#dayLeft--;
    this.checkPaymentDate();
  }

  checkPaymentDate () {
    if (this.getBalance > 0 && this.#dayLeft === 0) {
      super.getInterest(2);
      super.credit(25);

      //super.credit(super.getInterest(1));
      console.log('There has been a late fee applied to your account.')
    }
  }

  makePayment(account, amount) {
    if (account instanceof BankAccount && !(account instanceof CreditCard)) {
      //Reduce credit card balance
      super.debit(amount)
      //Reduce Bank account balance
      account.debit(amount)
    }

    if (this.getBalance === 0) {
      this.#dayLeft = 5;
    }
    this.checkPaymentDate();
  }


}

const distributeEvenly = (arrayAccounts, distributeAmount) => {
  let itemsOfArray = arrayAccounts.length;
  let amount = distributeAmount / itemsOfArray;
  arrayAccounts.forEach(item => item.credit(amount));
};
const distributeToSavings = (arrayAccounts, distributeAmount) => {
  let itemsOfArray = 0;
  arrayAccounts.forEach(item => {
    if (item instanceof SavingsAccount) {
      itemsOfArray++;
    }
  });
  let amount = distributeAmount / itemsOfArray;
  arrayAccounts.forEach(item => {
    if (item instanceof SavingsAccount) {
      item.credit(amount)
    }
  });
};

let myBank = new Bank('BOA');
let me = new Member('Zim', myBank);
let myChecking = new CheckingAccount(20000, me, myBank);
let mySavings = new SavingsAccount(100000, me, myBank);
let secondSavings = new SavingsAccount(200000, me, myBank);
let myCredit = new CreditCard(0, me, myBank);

me.addAccount(myChecking);
me.addAccount(mySavings);
me.addAccount(secondSavings);

myCredit.credit(500);
myCredit.credit(500);
myCredit.credit(500);
myCredit.credit(500);

//myCredit.makePayment(myChecking, 2000);

console.log(myBank.getBankAccounts);









// console.log(mySavings.getBalance);
// mySavings.getInterest(24);
// console.log(mySavings.getBalance);

// console.log(me.getAccounts[0].getBalance, me.getAccounts[1].getBalance, me.getAccounts[2].getBalance)

// //distributeEvenly(me.getAccounts, 2000);
// distributeToSavings(me.getAccounts, 100);

// console.log(me.getAccounts[0].getBalance, me.getAccounts[1].getBalance, me.getAccounts[2].getBalance)


//mySavings.linkAccount(myChecking);