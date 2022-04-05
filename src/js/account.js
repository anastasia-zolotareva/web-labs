function loadPage(userPageUrl) {
    document.getElementsByClassName("warning")[0].className = "warning hide";
    document.getElementsByClassName("preloader")[0].className = "preloader";

    fetch(userPageUrl)
        .then(response => response.json())
        .then(userInfo => {
            var userName = String(userInfo.name) + " (" + String(userInfo.username) + ")";
            console.log(userName);
            var userAddress = String(userInfo.address.city) 
                + " " + String(userInfo.address.street) 
                + " " + String(userInfo.address.suite)
                + " " + String(userInfo.address.zipcode);
            console.log(userAddress);
            var userPhone = String(userInfo.phone);

            console.log(userPhone);

            var print_block = document.getElementsByClassName("user_info");
            print_block[0].innerHTML = "<h3>Имя</h3><p>" + userName + "</p>" + 
                "<h3>Адрес</h3><p>" + userAddress + "</p><h3>Телефон</h3><p>" +
                userPhone + "</p>";
            console.log("html added");
                
        })
        .then(() => {
            console.log("try to show");
            document.getElementsByClassName("preloader")[0].className = "preloader hide";
            document.getElementsByClassName("user_info")[0].className = "user_info";
        })
        .catch(() => {
            console.log("smth went wrong");
            document.getElementsByClassName("preloader")[0].className = "preloader hide";
            document.getElementsByClassName("warning")[0].className = "warning";
        });  
}

function showAccount() {
    var userId = document.getElementById("userId");
    if (userId.value == "") {
        var userPage = document.getElementsByClassName("user_info");
        userPage[0].className = "user_info";
        userPage[0].innerHTML = "<h3>Вы не ввели id</h3>";
    } else {
        const userUrl = 'http://jsonplaceholder.typicode.com/users/' + String(userId.value);
        loadPage(userUrl);
    }
}