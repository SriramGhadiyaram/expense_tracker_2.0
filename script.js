function Expense(description, amount, category, date, paymentMethod) {
    this.description = description;
    this.amount = parseFloat(amount);
    this.category = category;
    this.date = date || new Date().toLocaleDateString();
    this.paymentMethod = paymentMethod || "Cash";
}

function ExpenseTrackerViewModel() {
    const self = this;

    self.newDescription = ko.observable('');
    self.newAmount = ko.observable('');
    self.newCategory = ko.observable('Food');
    self.newDate = ko.observable('');
    self.newPaymentMethod = ko.observable('Cash');

    self.expenses = ko.observableArray([]);

    self.totalExpenses = ko.computed(() => {
        return self.expenses().reduce((sum, expense) => sum + expense.amount, 0).toFixed(2);
    });

    self.filterExpenses = ko.observable({
        category: ko.observable(''),
        date: ko.observable(''),
        paymentMethod: ko.observable('')
    });

    self.filteredExpenses = ko.computed(() => {
        let filtered = self.expenses();
        if (self.filterExpenses().category()) {
            filtered = filtered.filter(exp => exp.category === self.filterExpenses().category());
        }
        if (self.filterExpenses().date()) {
            filtered = filtered.filter(exp => exp.date === self.filterExpenses().date());
        }
        if (self.filterExpenses().paymentMethod()) {
            filtered = filtered.filter(exp => exp.paymentMethod === self.filterExpenses().paymentMethod());
        }
        return filtered;
    });

    self.addExpense = () => {
        if (self.newDescription() && self.newAmount()) {
            self.expenses.push(new Expense(self.newDescription(), self.newAmount(), self.newCategory(), self.newDate(), self.newPaymentMethod()));
            self.newDescription('');
            self.newAmount('');
            self.newCategory('Food');
            self.newDate('');
            self.newPaymentMethod('Cash');
        }
    };
}

window.onload = () => {
    ko.applyBindings(new ExpenseTrackerViewModel());
};
