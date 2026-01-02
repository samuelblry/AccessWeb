document.addEventListener('DOMContentLoaded', () => {

    const navBar = document.getElementById('navBar')
    const navBarPrincipal = document.getElementById('navBarPrincipal')
    
    const megaMenuShop = document.getElementById('megaMenuShop')
    const btnBoutiqueNav = document.getElementById('btnBoutiqueNav')

    // Gestion logo navBar
    if (navBar) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY

            if (scrollY > 60) {
                navBar.classList.add('modeWhite')
            } else {
                navBar.classList.remove('modeWhite')
            }

            if (scrollY > 200) {
                navBar.classList.add('modeLogoVisible')
            } else {
                navBar.classList.remove('modeLogoVisible')
            }
        })
    }

    // Gestion mega menu
    function gererMenu(btn, menu) {

        if (!btn || !menu) {
            return
        }

        const showMenu = () => {
            menu.classList.add('showMegaMenuShop')
            if (navBarPrincipal) {
                navBarPrincipal.classList.add('showMegaMenuShop')
            }
            if (navBar) {
                navBar.classList.add('modeLogoVisible')
            }
        }

        const hideMenu = () => {
            setTimeout(() => {
                if (!menu.matches(':hover') && !btn.matches(':hover') && !menu.matches(':focus-within')) {
                    menu.classList.remove('showMegaMenuShop')
                    if(navBarPrincipal) navBarPrincipal.classList.remove('showMegaMenuShop')
                }
            }, 200)
        }

        btn.addEventListener('mouseenter', showMenu)
        btn.addEventListener('mouseleave', hideMenu)
        menu.addEventListener('mouseenter', showMenu)
        menu.addEventListener('mouseleave', hideMenu)

        btn.addEventListener('focus', showMenu)
    }

    gererMenu(btnBoutiqueNav, megaMenuShop)


    // PAGE ARTICLE

    // Carousel
    const ImgCarousel = document.getElementById("ImgCarousel")
    
    if (ImgCarousel) { 
        const listeNameImgCarousel = ["./img/knit.jpg", "./img/knitDetailBroderie.jpg", "./img/knitPorte.jpg", "./img/knitPorteDos.jpg"]
        let indexCarousel = 0

        // Fonction image suivante
        window.nextImgCarousel = function() {
            indexCarousel = (indexCarousel + 1) % listeNameImgCarousel.length
            ImgCarousel.setAttribute("src", listeNameImgCarousel[indexCarousel])
        }

        // Fonction image précédente
        window.previousImgCarousel = function() {
            indexCarousel = (indexCarousel - 1 + listeNameImgCarousel.length) % listeNameImgCarousel.length
            ImgCarousel.setAttribute("src", listeNameImgCarousel[indexCarousel])
        }
    }
    
    // taille
    window.selectSize = function(elementClique) {
        const tousLesBoutons = document.querySelectorAll('.sizeArticle')
        
        // reset
        tousLesBoutons.forEach(bouton => {
            bouton.classList.remove('selected')
            bouton.setAttribute('aria-pressed', 'false')
        })

        elementClique.classList.add('selected')
        elementClique.setAttribute('aria-pressed', 'true')
    }
})


// PAGE FORMULAIRE

document.addEventListener('DOMContentLoaded', function() {
    
    var Formulaire = document.getElementById('contactForm')
    var popup = document.getElementById('successPopup')
    var btnFermer = document.getElementById('closePopupBtn')
    
    var elementPrecedent = null 

    function gererClavierModale(e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            fermerPopup()
        }
        
        if (e.key === 'Tab') {
            e.preventDefault() 
            btnFermer.focus()
        }
    }

    // Fonction pour fermer la modale proprement
    function fermerPopup() {
        popup.classList.add('isHidden')
        
        // On arrête d'écouter le clavier
        document.removeEventListener('keydown', gererClavierModale)
        
        // Retour du focus à l'élément précédent (Critère requis)
        if (elementPrecedent) {
            elementPrecedent.focus()
        }
    }

    if (Formulaire) {
        
        Formulaire.addEventListener('submit', function(e) {
            e.preventDefault()
            
            var formValide = true

            // reset des erreurs
            var champs = document.querySelectorAll('input, textarea')
            champs.forEach(function(champ) {
                champ.classList.remove('input-error')
            })

            var messagesErreur = document.querySelectorAll('.errorMsg')
            messagesErreur.forEach(function(msg) {
                msg.textContent = ""
            })

            // Validation Prénom
            var prenom = document.getElementById('firstname')
            if (prenom.value.trim() == "") {
                prenom.classList.add('input-error')
                prenom.nextElementSibling.textContent = "Le prénom est obligatoire"
                formValide = false
            }

            // Validation Nom
            var nom = document.getElementById('lastname')
            if (nom.value.trim() == "") {
                nom.classList.add('input-error')
                nom.nextElementSibling.textContent = "Le nom est obligatoire"
                formValide = false
            }

            // Validation Date
            var dateInput = document.getElementById('birthdate')
            var regexDate = /^\d{2}\/\d{2}\/\d{4}$/
            if (regexDate.test(dateInput.value) == false) {
                dateInput.classList.add('input-error')
                dateInput.nextElementSibling.textContent = "Format attendu : JJ/MM/AAAA"
                formValide = false
            }

            // Validation Email
            var emailInput = document.getElementById('email')
            var regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (regexEmail.test(emailInput.value) == false) {
                emailInput.classList.add('input-error')
                emailInput.nextElementSibling.textContent = "Email invalide"
                formValide = false
            }

            // Validation Téléphone
            var phoneInput = document.getElementById('phone')
            var regexTel = /^0[1-9]([-. ]?[0-9]{2}){4}$/
            if (regexTel.test(phoneInput.value) == false) {
                phoneInput.classList.add('input-error')
                phoneInput.nextElementSibling.textContent = "Numéro invalide"
                formValide = false
            }

            // Validation Message
            var messageInput = document.getElementById('message')
            if (messageInput.value.trim() == "") {
                messageInput.classList.add('input-error')
                messageInput.nextElementSibling.textContent = "Écrivez un message"
                formValide = false
            }

            // Validation Radio Boutons
            var radios = document.querySelectorAll('input[name="time"]')
            var uneOptionEstCochee = false
            
            radios.forEach(function(radio) {
                if (radio.checked) {
                    uneOptionEstCochee = true
                }
            })

            if (uneOptionEstCochee == false) {
                document.querySelector('.timeFormular .errorMsg').textContent = "Veuillez choisir un horaire"
                formValide = false
            }

            if (formValide == true) {
                elementPrecedent = document.activeElement

                popup.classList.remove('isHidden')
                Formulaire.reset()

                btnFermer.focus()

                document.addEventListener('keydown', gererClavierModale)
            }
        })
    }

    // Gestion du clic sur fermer
    if (btnFermer) {
        btnFermer.addEventListener('click', fermerPopup)
    }
})