document.addEventListener("DOMContentLoaded", function() {
    let this_url = document.URL;
    nav_element = document.getElementsByClassName('nav_element');
    user_nav_element = document.getElementsByClassName('user_nav_element');
    for (let i = 0; i < nav_element.length; i++) {
        if (nav_element[i]["href"] === this_url) {
            active_element = nav_element[i];
            active_element.className = 'nav_element current_nav_element';
            active_element.removeAttribute('href');
            break;
        }
    }
    for (let i = 0; i < user_nav_element.length; i++) {
        if (user_nav_element[i]["href"] === this_url) {
            active_element = user_nav_element[i];
            active_element.className = 'user_nav_element current_user_nav_element';
            active_element.removeAttribute('href');
            break;
        }
    }
})