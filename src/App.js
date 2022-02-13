parseRequestURL : () => {
    let url = location.hash.slice(1).toLowerCase() || '/';
    let r = url.split("/");

    let request = {
        resource: null,
        id: null,
        verb: null
    }

    request[resource] = r[1];
    request[id] = r[2];
    request[verb] = r[3];

    return request;
}
/* Routing */

const routes = {
    '/': 'Home',
    '/about': 'About',
    '/p/:id': 'PostShow',
    '/register': 'Register'
};

const router = async () => {
    //Lazy load view elemtents
    const content = null || document.getElementById('page__container');
    const header = null || document.getElementById('header__container');
    const footer = null || document.getElementById('footer__container');

    //Render components in page (header and footer) <- no matter what url is requested, header and footer always render
    header.innerHTML = await Header.render();
    await Header.after_render();
    footer.innerHTML = await Footer.render();
    await Footer.after_render();

    // get the url with the split '/'
    let request = Utils.parseRequestURL();

    // Parse the URL - we fill the url according to split
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    //With the parsedURL we ask if the route exist, if no exist launch 404 page
    let page = routes[parsedURL] ? routes[parsedURL] : Error404;

    // await is to manipulate sync
    content.innerHTML = await page.render();
    await page.after_render();   
}

let OnRegister = () => {
    console.log("ayo");
    alert("ayo");
}

let About = {
    render : async () => {
        let view = /*html*/`
            <section class="about__hero">
                <h1>About</h1>
                <p>This is the about page</p>
                <button id ="header__btn-register">Button</button>
            </section>
        `

        return view;
    },

    after_render : async () => {
        document.getElementById('header__btn-register').addEventListener("click", OnRegister());
    }
}

let Header = {
    render : async () => {
        let view = /*html*/`
        <header class="header">
            <div class="header__content has-text-centered">
                <p>This is a header, we could make it useful. We won't</p>
            </div>
        </header>
        `

        return view;
    },

    after_render : async () => {/* Put events in here */}
}

let Footer = {
    render : async () => {
        let view = /*html*/`
        <footer class="footer">
            <div class="footer__content has-text-centered">
                <p>This is a footer, we could make it prettier. We won't</p>
            </div>
        </footer>
        `

        return view;
    },

    after_render : async () => {/* Put events in here */}
}
// Listen on hash change #, we pass the function to launch
window.addEventListener('hashchange',router);

//Listen load
window.addEventListener('load',router);
