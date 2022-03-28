function apply() {
    var userName = document.getElementById('userName');
    var applDescription = document.getElementById('applDescription');
    if (userName.value == "" || applDescription.value == "") {
        alert("Заполните поля!");
    } else {
        var appl = JSON.parse(localStorage.getItem('appl'));
        if (appl) {
            appl.queue.push({user: userName.value, applDes: applDescription.value});
            localStorage.setItem('appl', JSON.stringify(appl));
        } else {
            var application = {
                queue:
                [
                    {user: userName.value, applDes: applDescription.value}
                ]
            };
            localStorage.setItem('appl', JSON.stringify(application));

            document.getElementsByClassName("items_board")[0].lastChild.remove();
        }
        var output = "<h3>" + String(userName.value) + "</h3>" + "<p>" + String(applDescription.value) + "</p>";
        var application = document.createElement("div");
        application.className = "comment_item";
        application.innerHTML = output;

        var print_block = document.getElementsByClassName("items_board");
        print_block[0].appendChild(application);
    }
}

window.addEventListener('load', () => {
    var applInfo = JSON.parse(localStorage.getItem('appl'));
    output = "";
    if (applInfo) {
        for (let i = 0; i < applInfo.queue.length; i++) {
            output = "<h3>" + String(applInfo.queue[i].user) + "</h3>" + "<p>" + String(applInfo.queue[i].applDes) + "</p>";

            var application = document.createElement("div");
            application.className = "comment_item";
            application.innerHTML = output;

            var print_block = document.getElementsByClassName("items_board");
            print_block[0].appendChild(application);
        }
    }
})

function clearApplications() {
    localStorage.removeItem('appl');
    var applications = document.getElementsByClassName('comment_item');
    if (applications) {
        for (let i = 0; i < applications.length; i++) {
            applications[i].remove();
        }
        var print_block = document.getElementsByClassName('items_board');
        print_block[0].innerHTML = "<h3>Заявок нет</h3>";
    }
}

function onSubmitFunction() {
    apply();
}