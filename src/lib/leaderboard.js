const observer = new InteractionObsever((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add(".show");
        }
    });
}

)
const hiddenSections = document.querySelectorAll('.hidden')

hiddenSections.forEach((el) => observer.observe(el));