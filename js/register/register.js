window.addEventListener('DOMContentLoaded', () => {
    page.init();
});

const businessLogic = (() => {
    const users = [];

    function User(fName, lName, uName, pass) {
        this.firstName = fName;
        this.lastName = lName;
        this.userName = uName;
        this.password = pass;
        this.orders = []

        this.getOrders = function () {
            return this.orders;
        }

        this.addOrders = function (order) {
            this.orders.push(order)
        }
        this.removeOrders = function (order) {
            const index = this.orders.findIndex((o) => o.orderNumber = order.orderNumber)
            const deletedItems = this.orders.splice(index, 1);
            console.table(deletedItems);
        }

        this.printUser = function () {
            console.log(this.firstName, this.lastName, this.userName, this.orders)
        }
    }

    const createUser = ({fname, lname, userName, password}) => {
        return new User(fname, lname, userName, password);
    }

    const addUser = (user) => {
        return users.push(user);
    }

    const doesUserExist = (user) => {
        return users.some(u => user.userName = u.userName);
    }

    const isFormValid = ({fname, lname, userName, password}) =>  {
        return fname && lname && userName && password;
    }

    return {
        addUser,
        createUser,
        doesUserExist,
        isFormValid
    }
})();


const uiController = (() => {
    let firstName, lastName, userName, password, registerButton;


    const init = () => {
        registerButton = document.querySelector('.register-button');
        firstName = document.querySelector('.first-name');
        lastName = document.querySelector('.last-name');
        userName = document.querySelector('.user-name')
        password = document.querySelector('.password');
    };

    const addEventListenerToButton = (event, fn) => {
        registerButton.addEventListener(event, fn);
    }
    const addEventListenersToFName = (event, fn) => {
        firstName.addEventListener(event, fn);
    }
    const addEventListenersToLName = (event, fn) => {
        lastName.addEventListener(event, fn);
    }
    const addEventListenersToUserName = (event, fn) => {
        userName.addEventListener(event, fn);
    }
    const addEventListenersToPassword = (event, fn) => {
        password.addEventListener(event, fn);
    }
    const toggleDisableOnRegistration = (isFormValid) => {
        registerButton.disabled = !isFormValid;
    }

    const removeErrorField = (keyUpEvent) => {
        const errorFieldClass = keyUpEvent.target.className + '-message';
        const errorField = document.querySelector('.' + errorFieldClass);
        errorField.classList.add('hidden');
    }
    const showErrorField = (keyUpEvent) => {
        const errorFieldClass = keyUpEvent.target.className + '-message';
        const errorField = document.querySelector('.' + errorFieldClass);
        errorField.innerHTML = '* Required Field';
        errorField.classList.remove('hidden');
    }

    const getUserFieldValues = () => {
        return {
            fname: firstName.value,
            lname: lastName.value,
            userName: userName.value,
            password: password.value,
        }
    }

    const showErrorMessage = message => {
        const errorParagraph = document.querySelector('.message');
        errorParagraph.innerHTML = message;
        errorParagraph.classList.add('error');
        errorParagraph.classList.remove('success', 'hidden');
    }
    const showSuccessMessage = message => {
        const errorParagraph = document.querySelector('.message');
        errorParagraph.innerHTML = message;
        errorParagraph.classList.add('success');
        errorParagraph.classList.remove('error', 'hidden');
    }


    return {
        init,
        addEventListenerToButton,
        addEventListenersToFName,
        addEventListenersToLName,
        addEventListenersToUserName,
        addEventListenersToPassword,
        getUserFieldValues,
        showErrorMessage,
        showSuccessMessage,
        removeErrorField,
        showErrorField,
        toggleDisableOnRegistration
    }
})();

const page = ((uiController, businessLogic) => {
    const init = () => {
        uiController.init();
        const keyUpEventHandler = (keyUpEvent) => {
            if (keyUpEvent.target.value) {
                uiController.removeErrorField(keyUpEvent);
            } else {
                uiController.showErrorField(keyUpEvent);
            }
            uiController.toggleDisableOnRegistration(businessLogic.isFormValid(uiController.getUserFieldValues()));
        }
        uiController.addEventListenersToFName('keyup', keyUpEventHandler);
        uiController.addEventListenersToLName('keyup', keyUpEventHandler);
        uiController.addEventListenersToUserName('keyup', keyUpEventHandler);
        uiController.addEventListenersToPassword('keyup', keyUpEventHandler);

        uiController.addEventListenerToButton('click', () => {
            const user = businessLogic.createUser(uiController.getUserFieldValues());
            if (businessLogic.doesUserExist(user)) {
                uiController.showErrorMessage('User already Exists');
            } else {
                businessLogic.addUser(user);
                uiController.showSuccessMessage('User successfully registered');
            }
        });
    }
    return {
        init
    }
})(uiController, businessLogic);
