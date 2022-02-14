"use strict";

let parseRequestURL = () => {
    let url = location.hash.slice(1).toLowerCase() || '/';
    let r = url.split("/");

    let request = {
        resource: null,
        id: null,
        verb: null
    }

    request.resource = r[1];
    request.id = r[2];
    request.verb = r[3];

    return request;
}

/* Views */

let Header = {
    render : async () => {
        let view = /*html*/`
        <nav class="navbar header" role="navigation" aria-label="main navigation">
                <div class="container header">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="/#/">
                            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
                        </a>
                        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>
                    </div>
                    <div id="navbarBasicExample" class="navbar-menu is-active" aria-expanded="false">
                        <div class="navbar-start">
                            <a class="navbar-item header__link" href="/#/">
                                Home
                            </a>
                            <a class="navbar-item header__link" href="/#/about">
                                About
                            </a>
                            <a class="navbar-item header__link" href="/#/secret">
                                Secret
                            </a>
                        </div>
                        <div class="navbar-end">
                            <div class="navbar-item">
                                <div class="buttons">
                                    <a class="button is-primary" href="/#/register">
                                        <strong>Sign up</strong>
                                    </a>
                                    <a class="button is-light" href="/#/login">
                                        Log in
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        `
        return view;
    },

    after_render : async () => {}
}

let Footer = {
    render : async () => {
        let view = /*html*/`
        <footer class="footer">
            <div class="footer__content content has-text-centered">
                <p>This is a footer, we could make it prettier. We won't</p>
            </div>
        </footer>
        `

        return view;
    },

    after_render : async () => {/* Put events in here */}
}

let About = {
    render : async () => {
        let view = /*html*/`
            <section class="about section">
                <h1>About</h1>
                <hr/>
                <p>This is the about page</p>
                <button id ="header__btn-register">Button</button>
            </section>
        `

        return view;
    },

    after_render : async () => {
        
    }
}

let Home = {
   render : async () => {
       let posts = await getPostsList()
       let view =  /*html*/`
           <section class="section">
               <h1> Home </h1>
               <hr/>
               <ul>
                   ${ posts.map(post => 
                       /*html*/`<li><a href="#/p/${post.id}">${post.title}</a></li>`
                       ).join('\n ')
                   }
               </ul>
           </section>
       `
       return view
   }
   , after_render: async () => {
   }

}

let Register = {

    render: async () => {
        return /*html*/ `
            <section class="section register">
                <h1> Sign Up </h1>
                <hr/>
                <div class="register__wrapper flex flex-dir-col flex-ai-c">
                    <input class="input register__input" id="email_input" type="email" placeholder="Enter your Email">
                    <input class="input register__input" id="pass_input" type="password" placeholder="Enter a Password">
                    <input class="input register__input" id="repeat_pass_input" type="password" placeholder="Enter the same Password again">
                    <button class="button is-primary register__submit-btn" id="register__submit-btn"> Register </button>
                </div>
            </section>
        `
    }
    // All the code related to DOM interactions and controls go in here.
    // This is a separate call as these can be registered only after the DOM has been painted
    , after_render: async () => {
        document.getElementById("register__submit-btn").addEventListener ("click",  () => {
            let email       = document.getElementById("email_input");
            let pass        = document.getElementById("pass_input");
            let repeatPass  = document.getElementById("repeat_pass_input");
            if (pass.value != repeatPass.value) {
                alert (`The passwords dont match`)
            } else if (email.value =='' | pass.value == '' | repeatPass == '') {
                alert (`The fields cannot be empty`)
            } 
            else {
                alert(`User with email ${email.value} was successfully submitted!`);
            }    
        })
    }
}

let Login = {
    render : async () => {
        let view = `
            <section class="section login">
                <h1>Log In</h1>
                <hr/>
                <div class="login__wrapper flex flex-dir-col flex-ai-c">
                    <input class="input login__input" id="email_input" type="email" placeholder="Enter your Email">
                    <input class="input login__input" id="pass_input" type="password" placeholder="Enter your Password">
                    <div class="login__submit-container flex flex-jc-sb">
                        <button class="button is-primary login__btn login__btn__confirm" id="login__confirm-btn"> Login </button>
                        <button class="button is-light login__btn login__btn__cancel" id="login__cancel-btn" href="/#/"> Cancel </button>
                    </div>
                </div>
            </section>
        `
        return view;
    },
    after_render : async () => { 
        
    }
}

let Error404 = {

    render : async () => {
        let view =  /*html*/`
            <section class="error404 section">
                <h1> 404 Error :( </h1>
                <hr/>
                <p>The page you requested was not found. Try checking for any spelling mistakes, or if the page really does exist.</p>
            </section>
        `
        return view
    }
    , after_render: async () => {
    }
}

/* Posts */

let getPost = async (id) => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`https://5bb634f6695f8d001496c082.mockapi.io/api/posts/` + id, options)
       const json = await response.json();
       // console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

let PostShow = {

    render : async () => {
        let request = parseRequestURL()
        let post = await getPost(request.id)
        
        return /*html*/`
            <section class="post-show section">
                <h1> Post Id : ${post.id}</h1>
                <p> Post Title : ${post.title} </p>
                <p> Post Content : ${post.content} </p>
                <p> Post Author : ${post.name} </p>
            </section>
        `
    }
    , after_render: async () => {
    }
}

let getPostsList = async () => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
       const response = await fetch(`https://5bb634f6695f8d001496c082.mockapi.io/api/posts`, options)
       const json = await response.json();
       // console.log(json)
       return json
   } catch (err) {
       console.log('Error getting documents', err)
   }
}

/* Routing */
const routes = {
    '/': Home,
    '/about': About,
    '/p/:id': PostShow,
    '/register': Register,
    '/login' : Login
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
    let request = parseRequestURL();

    // Parse the URL - we fill the url according to split
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')

    //With the parsedURL we ask if the route exist, if no exist launch 404 page
    let page = routes[parsedURL] ? routes[parsedURL] : Error404;

    // await is to manipulate sync
    content.innerHTML = await page.render();
    await page.after_render();
}

// Listen on hash change #, we pass the function to launch
window.addEventListener('hashchange',router);

//Listen load
window.addEventListener('load',router);
