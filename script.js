const socialsContainer = document.querySelector(".socials");
const socials = document.querySelectorAll(".socials > *");

const socialWindow = document.querySelector(".social-window");
const socialIcon = document.querySelector(".social-window .social-icon");
const socialName = document.querySelector(".social-window .title");
const socialDesc = document.querySelector(".social-window .description");

const visit = document.querySelector(".social-window .visit");

const pages = document.querySelector(".selection-menu > a");
// const selectedArrow = document.querySelector(".selection-menu .arrow");

// Move the arrow above a category when it is hovered
// pages.forEach(page => {
//     page.addEventListener("mouseover", e => {
//         page.appendChild(selectedArrow);
//     }) 
// });


// Social media icons redirecting on click, changing icon/category on hover
// let currentSocial = "Facebook"

let descriptions = {
    "Facebook": "Najnowsze info i materiały - najlepsze miejsce do kontaktu z nami!",
    "Instagram": "Info, materiały, zdjęcia i nowości!",
    "Tiktok": "Filmiki zawierające najnowsze info, materiały, i wkrótce klipy!",
    "Pinterest": "Materiały i informacje!"
}

let clicked = false;
let currentLink = "";

visit.addEventListener("click", e => {
    window.open(currentLink, '_blank');
})



function disableSocial() {
    console.log(clicked);
    if (clicked) return;

    visit.classList.add("hidden");

    // Set border to disabled (transparent)
    socialWindow.style.border = "0.35rem solid rgba(255,255,255,0.1)";
    socialWindow.style.backgroundColor = "rgba(244,244,244, 0.1)"
}

socials.forEach(social => {
    if (social.classList.contains("arrow")) return;

    let link = social.dataset.link;

    social.addEventListener("dblclick", e => {
        window.open(link, '_blank');
    })
    

    // social.addEventListener("click", e => {
    //     window.open(link, '_blank');
    // })

    let image = social.getAttribute("src");
    let title = social.getAttribute("alt");
    // currentSocial = title;

    function setSocial() {
        visit.classList.remove("hidden");
        currentLink = link;

        // Set icon and text
        socialIcon.src = image;
        socialName.innerText = `nasz ${title}`;
        socialDesc.innerText = descriptions[title];

        // Set border to enabled (less transparent)
        socialWindow.style.border = "0.35rem solid rgba(255,255,255, 0.9)";
        socialWindow.style.backgroundColor = "rgba(255,255,255, 0.45)"
    }

    social.addEventListener("mouseover", setSocial);
    social.addEventListener("click", e => {
        setSocial();
        clicked = true;
    }); // mobilka

    social.addEventListener("mouseleave", disableSocial);

})

// Close (mobile)
document.addEventListener("click", e => {
    if (!socialWindow.contains(e.target) && !socialsContainer.contains(e.target)) {
        clicked = false;
        disableSocial();
    }
});