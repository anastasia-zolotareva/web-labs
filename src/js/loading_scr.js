(function() {
    start_t = (new Date).getTime();
    window.addEventListener('load', function() {
        page_load = "Page was loaded in " + (((new Date).getDate() - start_t) / 1000) + "seconds";
        console.log(page_load);

        var load_block = document.createElement("div");
        load_block.className = "load_block";
        load_block.textContent = page_load;

        const close_button = document.createElement("BUTTON");
        close_button.className = "close_button";
        close_button.textContent = "Close";
        load_block.appendChild(close_button);

        //add it on the page
        var print_block = document.getElementsByClassName("footer")[0];
        print_block.appendChild(load_block);

        close_button.addEventListener("click", (event) => { 
            close_button.parentElement.remove();
        });

    });
})();