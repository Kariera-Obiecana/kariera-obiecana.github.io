const socials = document.querySelectorAll(".socials > *");

const socialWindow = document.querySelector(".social-window");
const socialIcon = document.querySelector(".social-window .social-icon");
const socialName = document.querySelector(".social-window .title");
const socialDesc = document.querySelector(".social-window .description");

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
    "Facebook": "opis co na Facebooku",
    "Instagram": "opis co na Instagramie",
    "Tiktok": "opis co na Tiktoku",
    "Pinterest": "opis co na Pintereście"
}

socials.forEach(social => {
    if (social.classList.contains("arrow")) return;

    let link = social.dataset.link;

    social.addEventListener("click", e => {
        window.open(link, '_blank');
    })

    let image = social.getAttribute("src");
    let title = social.getAttribute("alt");
    // currentSocial = title;

    social.addEventListener("mouseover", e => {
        // Set icon and text
        socialIcon.src = image;
        socialName.innerText = `nasz ${title}`;
        socialDesc.innerText = descriptions[title];

        // Set border to enabled (less transparent)
        socialWindow.style.border = "0.35rem solid rgba(255,255,255, 0.9)";
        socialWindow.style.backgroundColor = "rgba(255,255,255, 0.45)"
        // socialIcon.style.opacity = 1;
        
    })

    social.addEventListener("mouseleave", e => {
        // Set border to disabled (transparent)
        socialWindow.style.border = "0.35rem solid rgba(255,255,255,0.1)";
        socialWindow.style.backgroundColor = "rgba(244,244,244, 0.1)"
        // socialIcon.style.opacity = 0.3;
    })

})



// Switch 