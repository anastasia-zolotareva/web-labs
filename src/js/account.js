class User {
    constructor() {
        this.authorised = false;
    }
    clear() {
        this.id = undefined;
        this.name = undefined;
        this.userName = undefined;
        this.addressCity = undefined;
        this.addressStreet = undefined;
        this.addressSuite = undefined;
        this.addressZipcode = undefined;
        this.phone = undefined;
        this.authorised = false;
    }
    async load(userPageURL) {
        if (this.authorised == true) {
            throw Error("user is already authorised");
        }
        await fetch(userPageURL)
            .then(response => response.json())
            .then(user => {
                this.name = String(user.name);
                this.userName = String(user.username);
                this.addressCity = String(user.address.city);
                this.addressStreet = String(user.address.street);
                this.addressSuite = String(user.address.suite);
                this.addressZipcode = String(user.address.zipcode);
                this.phone = String(user.phone);
                this.authorised = true;
                console.log("loaded user info");
            })
            .catch(() => {
                throw Error("smth went wrong while load");
            });
    }
    setInfo(id,
            name, 
            userName, 
            addressCity,
            addressStreet, 
            addressSuite, 
            addressZipcode,
            phone) {
        this.id = id;
        this.name = name;
        this.userName = userName;
        this.addressCity = addressCity;
        this.addressStreet = addressStreet;
        this.addressSuite = addressSuite;
        this.addressZipcode = addressZipcode;
        this.phone = phone;
        this.authorised = true;
    }
}

class UserCardCreater {
    constructor() {
    }
    create(curUser) {
        if (curUser.authorised == false) {
            throw Error("cant create non authorised user");
        }
        let curUserCard = document.createElement("section");
        curUserCard.className = "user_card";
            
        curUserCard.innerHTML = "<h3>Имя</h3><p>" + curUser.name + " (" +
            curUser.userName + ")</p>" +
            "<h3>Адрес</h3><p>" + curUser.addressCity + " " +
            curUser.addressStreet + " " +
            curUser.addressSuite + " " +
            curUser.addressZipcode +
            "</p><h3>Телефон</h3><p>" + curUser.phone + "</p>";
        return curUserCard;
    }
}

class UserCardPresenter {
    constructor(user, userCardCreater, printBlockClassName) {
        this.curUser = user;
        this.userCardCreater = userCardCreater;
        this.printBlock = document.getElementsByClassName(printBlockClassName)[0];
        this.printBlockClassName = printBlockClassName;
    }
    showUserCard() {
        console.log("create user card");
        let domObject = this.userCardCreater.create(this.curUser);

        this.printBlock.appendChild(domObject);
    
        this.printBlock.className = this.printBlockClassName;
    }
    hideUserCard() {
        console.log("hide user card");
    
        document.getElementsByClassName('user_card')[0].remove();
        this.printBlock.className = `${this.printBlockClass} hide`;
    }
}
class PageFieldsControler {
    constructor(user, singInFieldName, singOutFieldName) {
        this.user = user;
        this.domSingIn = document.getElementById(singInFieldName);
        this.domSingOut = document.getElementById(singOutFieldName);
    }
    changeToSingOut() {
        document.getElementById('userId').className = "hide";
        document.getElementById('userPassword').className = "hide";
        this.domSingIn.className = "hide";
        this.domSingOut.className = "";
    }
    changeToSingIn() {
        document.getElementById('userId').className = "";
        document.getElementById('userPassword').className = "";
        this.domSingIn.className = "";
        this.domSingOut.className = "hide";
    }
    changeFields() {
        if (this.user.authorised == true) {
            this.changeToSingOut();
        } else {
            this.changeToSingIn();
        }
    }
}

class LoadingProcessPresenter {
    constructor(warningClassName, preloaderClassName) {
        this.warningClassName = warningClassName;
        this.warningClass = document.getElementsByClassName(warningClassName)[0];
        this.preloaderClassName = preloaderClassName;
        this.preloaderClass = document.getElementsByClassName(preloaderClassName)[0];
    }
    showPreloader() {
        this.warningClass.className = `${this.warningClassName} hide`;
        this.preloaderClass.className = `${this.preloaderClassName}`;
    }
    showWarning() {
        this.warningClass.className = `${this.warningClassName}`;
        this.preloaderClass.className = `${this.preloaderClassName} hide`;
    }
    hideAll() {
        this.warningClass.className = `${this.warningClassName} hide`;
        this.preloaderClass.className = `${this.preloaderClassName} hide`;
    }
}

class UserStorage {
    constructor(curUser, nameInStorage) {
        this.user = curUser;
        this.nameInStorage = nameInStorage;
    }
    isSingIn() {
        let curUser = JSON.parse(localStorage.getItem(this.nameInStorage));
        if (curUser) {
            return true;
        }
        return false;
    }
    load() {
        if (!this.isSingIn()) {
            throw Error("you are trying to load unexisting info");
        }
        let curUser = JSON.parse(localStorage.getItem(this.nameInStorage));
        this.user.setInfo(
            curUser.id,
            curUser.name,
            curUser.userName,
            curUser.addressCity,
            curUser.addressStreet,
            curUser.addressSuite,
            curUser.addressZipcode,
            curUser.phone
        );
    }
    save() {
        if (!this.user) {
            throw Error("you are trying to save unexisting user");
        }
        let curUser = {
            id : this.user.id,
            name : this.user.name,
            userName : this.user.userName,
            addressCity : this.user.addressCity,
            addressStreet : this.user.addressStreet,
            addressSuite : this.user.addressSuite,
            addressZipcode : this.user.addressZipcode,
            phone : this.user.phone
        }
        localStorage.setItem(this.nameInStorage, JSON.stringify(curUser));
    }
    clear() {
        if (!this.isSingIn()) {
            throw Error("you are trying to clear unexisting info");
        }
        localStorage.removeItem(this.nameInStorage);
    }
}
let user;
let userCardPresenter;
let pageFieldsControler;
let loadingProcessPresenter;
let userStorage;

function initialiseClasses() {
    console.log("initialise classes");
    user = new User();
    userCardPresenter = new UserCardPresenter(user, new UserCardCreater(), "items_board");
    pageFieldsControler = new PageFieldsControler(user, "user_singin", "user_singout");
    loadingProcessPresenter = new LoadingProcessPresenter("warning", "preloader");
    userStorage = new UserStorage(user, "curUser");
}

window.addEventListener('load', function() {
    console.log("load page");
    initialiseClasses();
    if (userStorage.isSingIn()) {
        userStorage.load();
        pageFieldsControler.changeFields();
        userCardPresenter.showUserCard();
    }
});

async function loadUserCard(userUrl) {
    loadingProcessPresenter.showPreloader();

    try {
        await user.load(userUrl);

        userCardPresenter.showUserCard();

        pageFieldsControler.changeFields();

        console.log("try to show");

        userStorage.save();

        loadingProcessPresenter.hideAll();
    }
    catch(error) {
        loadingProcessPresenter.hideAll();
        console.log("smth went wrong");
        console.log(error);

        loadingProcessPresenter.showWarning();

        userStorage.clear();
        user.clear();
    }
}

async function singIn() {
    let userId = document.getElementById("userId");
    let userPassword = document.getElementById("userPassword");

    if (userId.value == "") {
        var userPage = document.getElementsByClassName("user_info");

        userPage[0].className = "user_info";
        userPage[0].innerHTML = "<h3>Вы не ввели id</h3>";
    } else {
        if (userPassword.value == "12345") {
            const userUrl = `http://jsonplaceholder.typicode.com/users/${String(userId.value)}`;

            await loadUserCard(userUrl);
        } else {
            var userPage = document.getElementsByClassName("user_info");

            userPage[0].className = "user_info";
            userPage[0].innerHTML = "<h3>Неверный пароль</h3>";
        }
    }
}

function singOut() {
    if (user.authorised == false) {
        throw Error("user is not authorised");
    }
    localStorage.clear();
    user.clear();

    pageFieldsControler.changeFields();

    userCardPresenter.hideUserCard();
}