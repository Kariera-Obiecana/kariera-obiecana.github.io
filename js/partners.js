// Partners
const partners = document.querySelectorAll(".partner-icon");

partners.forEach(partner => {
    partner.addEventListener("click", e => {
        window.open(partner.dataset.link, '_blank');
    })
})