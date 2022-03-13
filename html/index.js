window.addEventListener('load', async () => {
    try{
        const navBarContent = await (await fetch('./nav-bar/nav-bar.html')).text();
        const header = document.querySelector('header');
        header.innerHTML = navBarContent;
    }catch (e){
        `<nav> uh oh </nav>`
    }
})