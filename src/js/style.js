(function() {
    var cur_item = document.getElementsByClassName("item");
    for (let i = 0; i < document.getElementsByClassName('item').length; i++) {
        var cur_item = document.getElementsByClassName('item');
        cur_item[i].addEventListener("click", function() {
        cur_item[i].className = "active_item";});
    }
})();