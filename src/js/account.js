function loadPage(userPageUrl) {
    document.getElementsByClassName("preloader")[0].className = "preloader";

    fetch(userPageUrl)
        .then((response) => response.json())
        .then(userInfo => {
            var userName = String(userInfo.name) + " " + String(userInfo.username);
            var userAdress = String(userInfo.adress.city) 
                + " " + String(userInfo.address.street) 
                + " " + String(userInfo.address.suite)
                + " " + String(userInfo.address.zipcode);
            var userPhone = String(userInfo.phone);

            var print_block = getElementsByClassName("user_info");
            print_block.innerHTML = "<h3>Имя</h3><p>" + userName + "</p>" + 
                "<h3>Адрес</h3><p>" + userAdress + "</p><h3>Телефон</h3><p>" +
                userPhone + "</p>";
                
        })
        .then(() => {
            document.getElementsByClassName("preloader")[0].className = "preloader hide";
            document.getElementsByClassName("user_info")[0].className = "user_info";
        })
        .catch(() => {
            document.getElementsByClassName("preloader")[0].className = "preloader hide";
            document.getElementsByClassName("warning")[0].className = "warning";
        })
        
}

function showAccount() {
    var userId = document.getElementById("userId");
    if (userId.value == "") {
        var userPage = document.getElementsByClassName("user_info");
        userPage[0].className = "user_info";
        userPage[0].innerHTML = "<h3>Вы не ввели id</h3>";
    } else {
        const userUrl = "https://jsonplaceholder.typicode.com/users/" + String(userId.value);
        loadPage(userUrl);
    }
}