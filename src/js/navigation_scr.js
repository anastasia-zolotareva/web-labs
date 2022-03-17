document.addEventListener("DOMContentLoaded", function() {
    let this_url = document.URL;
    for (let i = 0; i < document.getElementsByClassName('nav_element').length; i++) {
        if (document.getElementsByClassName('nav_element')[i]["href"] === this_url) {
            active_element = document.getElementsByClassName('nav_element')[i];
            active_element.className = 'current_nav_element';
            active_element.removeAttribute('href');
            break;
        }
    }
})