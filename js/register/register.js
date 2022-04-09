
function User(fname, lName, uName, pass){
    this.firstName = fname;
    this.lastName = lName;
    this.userName = uName;
    this.password = pass;
    this.orders = []

    this.getOrders = function() {
        return this.orders;
    }

    this.addOrders = function(order) {
        this.orders.push(order)
    }
    this.removeOrders = function(order) {
        const index = this.orders.findIndex((o) => o.orderNumber = order.orderNumber)
        const deletedItems = this.orders.splice(index, 1);
        console.table(deletedItems);
    }

    this.printUser = function() {
        console.log(this.firstName, this.lastName, this.userName, this.orders)
    }
}

const controller = (() => {
    const users = []
    const doesUserExist = (users, user) => {
        return users.some(u => user.userName = u.userName);
    }

    const addUser = () => {
        console.log("add user called");
        const fname = document.querySelector('.first-name').value;
        const lname = document.querySelector('.last-name').value;
        const userName = document.querySelector('.user-name').value;
        const password = document.querySelector('.password').value;
        const user = new User(fname, lname, userName,password);
        if (doesUserExist(users, user)) {
            showErrorMessage("User already exists.")
        } else {
            users.push(user);
            showSuccessMessage(`User ${user.userName} was added successfully`)
        }
    }

    const getAllUsers = () => {
        return users
    }
    const showErrorMessage = message => {
        const errorParagraph = document.querySelector('.message');
        errorParagraph.innerHTML = message;
        errorParagraph.classList.add('error');
        errorParagraph.classList.remove('success','hidden');
    }
    const showSuccessMessage = message => {
        const errorParagraph = document.querySelector('.message');
        errorParagraph.innerHTML = message;
        errorParagraph.classList.add('success');
        errorParagraph.classList.remove('error','hidden');
    }
    return {
        addUser,
        getAllUsers
    }
})();
