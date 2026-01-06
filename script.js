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
    function gererMenu(bouton, menu) {

        if (!bouton || !menu) {
            return
        }

        let mouseOnButton = false
        let mouseOnMenu = false

        const ouvrirMenu = () => {
            menu.classList.add('showMegaMenuShop')
            bouton.setAttribute('aria-expanded', 'true')
            
            if (navBarPrincipal) {
                navBarPrincipal.classList.add('showMegaMenuShop')
            }
            if (navBar) {
                navBar.classList.add('modeLogoVisible')
            }
        }

        const fermerMenu = () => {

            setTimeout(() => {
                const focusIsInside = menu.contains(document.activeElement) || document.activeElement == bouton
                
                if (!mouseOnButton && !mouseOnMenu && !focusIsInside) {
                    menu.classList.remove('showMegaMenuShop')
                    bouton.setAttribute('aria-expanded', 'false')
                    if (navBarPrincipal) {
                        navBarPrincipal.classList.remove('showMegaMenuShop')
                    }
                }
            }, 50)
        }

        bouton.addEventListener('mouseenter', () => {
            mouseOnButton = true
            ouvrirMenu()
        })
        bouton.addEventListener('mouseleave', () => {
            mouseOnButton = false
            fermerMenu()
        })

        menu.addEventListener('mouseenter', () => {
            mouseOnMenu = true
            ouvrirMenu()
        })
        menu.addEventListener('mouseleave', () => {
            mouseOnMenu = false
            fermerMenu()
        })
        
        // Clavier
        bouton.addEventListener('click', (e) => {
            e.preventDefault()
            const isOpen = bouton.getAttribute('aria-expanded') == 'true'
            
            if (isOpen) {
                mouseOnButton = false
                mouseOnMenu = false
                menu.classList.remove('showMegaMenuShop')
                bouton.setAttribute('aria-expanded', 'false')
                if (navBarPrincipal) {
                    navBarPrincipal.classList.remove('showMegaMenuShop')
                }
            } else {
                ouvrirMenu()
            }
        })

        bouton.addEventListener('keydown', (e) => {
            if (e.key == 'Tab' && !e.shiftKey && bouton.getAttribute('aria-expanded') == 'true') {
                e.preventDefault()
                const premierLien = menu.querySelector('a')
                if (premierLien) {
                    premierLien.focus()
                }
            }
        })

        bouton.addEventListener('focusout', fermerMenu)
        menu.addEventListener('focusout', fermerMenu)
    }

    gererMenu(btnBoutiqueNav, megaMenuShop)


    // PAGE ARTICLE

    // Carousel
    const imgCarousel = document.getElementById("ImgCarousel")
    const prevBtn = document.getElementById("prevBtn")
    const nextBtn = document.getElementById("nextBtn")
    
    if (imgCarousel && prevBtn && nextBtn) { 
        const imagesData = [
        { src: "./img/knit.jpg", alt: "Knit 'The last duel' vu de face et posé" },
        { src: "./img/knitDetailBroderie.jpg", alt: "Knit 'The last duel' détail broderie" },
        { src: "./img/knitPorte.jpg", alt: "Knit 'The last duel' vue de face et porté" },
        { src: "./img/knitPorteDos.jpg", alt: "Knit 'The last duel' vue de dos et porté" }
    ]
    let indexCarousel = 0

    function updateCarousel() {
    imgCarousel.setAttribute("src", imagesData[indexCarousel].src)
    imgCarousel.setAttribute("alt", imagesData[indexCarousel].alt)
    }

    nextBtn.addEventListener('click', () => {
        indexCarousel = (indexCarousel + 1) % imagesData.length
        updateCarousel()
    })

    prevBtn.addEventListener('click', () => {
        indexCarousel = (indexCarousel - 1 + imagesData.length) % imagesData.length
        updateCarousel()
    })
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
        if (e.key == 'Escape' || e.key == 'Esc') {
            fermerPopup()
        }
        
        if (e.key == 'Tab') {
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
            const regexTexte = /^[a-zA-ZÀ-ÿ\s-]+$/

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
            if (prenom.value.trim() == "" || regexTexte.test(prenom.value) == false) {
                prenom.classList.add('input-error')
                prenom.setAttribute('aria-invalid', 'true')

                if (prenom.value.trim() == "") {
                    prenom.nextElementSibling.textContent = "Le prénom est obligatoire"
                } else {
                    prenom.nextElementSibling.textContent = "Caractères interdits (chiffres ou symboles)"
                }
                formValide = false
            } else {
                prenom.setAttribute('aria-invalid', 'false')
            }

            // Validation Nom
            var nom = document.getElementById('lastname')
            if (nom.value.trim() == "" || regexTexte.test(nom.value) == false) {
                nom.classList.add('input-error')
                nom.setAttribute('aria-invalid', 'true')

                if (nom.value.trim() == "") {
                    nom.nextElementSibling.textContent = "Le nom est obligatoire"
                } else {
                    nom.nextElementSibling.textContent = "Caractères interdits (chiffres ou symboles)"
                }
                formValide = false
            } else {
                nom.setAttribute('aria-invalid', 'false')
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