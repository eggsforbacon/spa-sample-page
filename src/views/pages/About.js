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
            </section>
        `

        return view;
    },

    after_render : async () => {
        document.getElementById('header__btn-register').addEventListener("click", OnRegister());
    }
}

export default About;