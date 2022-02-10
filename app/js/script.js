/* Routing */

const routes = {
    '/': 'Home',
    '/about': 'About',
    '/p/:id': 'PostShow',
    '/register': 'Register'
};

const router = async () => {
    //Lazy load
    const content = null || document.getElementById('page_container');

    let request = Utils.parseRequestURL();
}