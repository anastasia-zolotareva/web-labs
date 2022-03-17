function saveChanges() {
    var array = document.getElementsByClassName("comment_item");
    var size = array.length;
    var applInfo = [];
    for (let i = 0; i < size; i++) {
        applInfo[i] = array[i]['innerText'];
    }
    localStorage.setItem('applInfo', JSON.stringify(applInfo));
}

function onSubmitFunction() {
    var keyBox = document.search.key;
    var value = keyBox.value;
    keyBox.value = "";
    if (value.length > 0) {
        const curElement = document.getElementsByClassName("tmp_items_board");
        var clone = curElement.content.cloneNode(true);
        clone.querySelector[0].textContent = value;
        
        var printBlock = document.getElementsByClassName("items_board");
        printBlock.appendChild(clone);
    }
    saveChanges();
}

function clearApplications() {
    var array = document.getElementsByClassName("comment_item");
    while (array.length > 0) {
        array[0].remove();
    }
    saveChanges();
}

window.addEventListener('load', () => {
    var applInfo = JSON.parse(localStorage.getItem('applInfo'));
    clearApplications();
    for (let i = 0; i < applInfo.length; i++) {
        value = applInfo[i];
        const curElement = document.getElementsByClassName("tmp_items_board");
        var clone = curElement.content.cloneNode(true);
        clone.querySelector[0].textContent = value;
        
        var printBlock = document.getElementsByClassName("items_board");
        printBlock.appendChild(clone);
    }
    saveChanges();
});

function apply() {
    var array = document.getElementsByClassName("items_board");
    var size = array.length;

    var textArray = [];
    for (let i = 0; i < size; i++) {
        textArray[i] = array[i]['innerText'];
    }
    localStorage.setItem('textArray', JSON.stringify(textArray));
}

function loadApplications() {
    if (localStorage.getItem('textArray') != null) {
        clearApplications();
        var textArray = JSON.parse(localStorage.getItem('textArray'));
        for (let i = 0; i < textArray.length; i++) {
            value = textArray[i];
            const curElement = document.getElementsByClassName("tmp_items_board");
            var clone = curElement.content.cloneNode(true);
            clone.querySelector[0].textContent = value;
            
            var printBlock = document.getElementsByClassName("items_board");
            printBlock.appendChild(clone);
        }
    } else {
        alert("Заявки отсутствуют");
    }
    saveChanges();
}