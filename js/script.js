// Gestion de la navigation "À propos"
const buttons = document.querySelectorAll(".about-nav button");
const text = document.getElementById("about-text");

const contents = {
    about: "Actuellement étudiant en BUT Informatique, je souhaite me spécialiser dans le développement logiciel et l'intelligence artificielle. J'oriente mes études dans ce domaine, porté par ma curiosité et mon envie constante d'apprendre. Passionné par l'informatique, j'apprécie particulièrement le travail en groupe lors des situations professionnalisantes, tout en développant des projets personnels afin de renforcer et d'élargir mes compétences. Le développement logiciel et l'IA se sont imposés comme une évidence lorsque j'ai compris qu'ils me permettraient de créer des outils utiles au quotidien, aussi bien pour moi que pour les autres. Concevoir des solutions à des problèmes techniques, automatiser ou simplifier des tâches répétitives, tout en recherchant des solutions durables et performantes, représente un enjeu majeur pour l'avenir. L'informatique transforme profondément notre quotidien et occupe une place toujours plus importante dans la société : je souhaite pleinement prendre part à cette évolution.",

    languages: " - <strong>Français</strong> : langue maternelle.<br><br>- <strong>Anglais</strong> : niveau technique, compréhension de documentation et échanges simples.<br><br>- <strong>Espagnol</strong> : notions.",

    soft: "- Rigueur dans le travail.<br><br>- Autonomie dans l'apprentissage.<br><br>- Esprit d'analyse pour résoudre des problèmes complexes.<br><br>- Bonne capacité à travailler en équipe.",

    passions: "<strong>Création de jeux vidéo</strong> – Passionné par la conception de jeux vidéo, j'aime imaginer des univers, concevoir des mécaniques de jeu et développer des projets complets.<br><br> <strong>Sport</strong> – Le sport occupe une place importante dans mon quotidien. Basketball, badminton, musculation et judo font partie des disciplines que j'ai pratiquées ou que je pratique encore.<br><br> <strong>Jeux de rôle</strong> – Pratiquant et créateur de jeux de rôle, j'apprécie particulièrement la création de scénarios et d'univers, ainsi que le travail d'équipe et la réflexion stratégique nécessaires au bon déroulement d'une campagne.."
};

buttons.forEach(button => {
    button.addEventListener("click", () => {

        // Gestion du bouton actif
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        // Changement du texte avec effet de fade
        text.style.opacity = 0;
        setTimeout(() => {
            const key = button.dataset.content;
            text.innerHTML = contents[key];
            text.style.opacity = 1;
        }, 150);
    });
});

// Gestion de la navigation des compétences
const skillsData = {
    languages: [
        { title: "Python", description: "Flask, analyse de données, Tkinter" },
        { title: "HTML / CSS", description: "Structure et style web moderne" },
        { title: "JavaScript", description: "Interactions dynamiques" },
        { title: "C, C#, Java", description: "Programmation orientée objet" },
        { title: "SQL", description: "SQLite, requêtes et gestion de bases de données" }
    ],
    web: [
        { title: "Applications web Python / Flask", description: "Développement backend avec Flask" },
        { title: "Architecture MVC", description: "Séparation modèle-vue-contrôleur" },
        { title: "Visualisation de données", description: "Graphiques et tableaux interactifs" }
    ],
    database: [
        { title: "Conception de bases relationnelles", description: "Modélisation de données structurées" },
        { title: "Modélisation et normalisation", description: "Optimisation des schémas de base de données" },
        { title: "Requêtes SQL avancées", description: "Jointures, agrégations, sous-requêtes" },
        { title: "Création de vues analytiques", description: "Vues matérialisées pour analyse" }
    ],
    games: [
        { title: "Jeux 2D avec Unity (C#)", description: "Développement de jeux complets" },
        { title: "Gestion des scènes, animations et UI", description: "Interface utilisateur et expérience de jeu" },
        { title: "Inputs, collisions, scores", description: "Mécanique de jeu et système de points" },
        { title: "Sauvegarde des données", description: "Persistance des progressions" }
    ],
    tools: [
        { title: "Visual Studio Code", description: "Éditeur de code principal" },
        { title: "Git / GitHub", description: "Gestion de versions et collaboration" },
        { title: "Configuration de serveurs", description: "Déploiement et maintenance" },
        { title: "Plugins et datapacks Minecraft", description: "Développement de modifications personnalisées" }
    ],
};

const skillButtons = document.querySelectorAll(".skills-nav button");
const skillsGrid = document.getElementById("skills-grid");

function displaySkills(category) {
    const skills = skillsData[category];
    
    // Effet de fade out
    skillsGrid.style.opacity = 0;
    
    setTimeout(() => {
        skillsGrid.innerHTML = "";
        
        if (category === "soft") {
            // Affichage spécial pour les soft skills
            skillsGrid.className = "soft-skills-grid";
            skills.forEach(skill => {
                const skillItem = document.createElement("div");
                skillItem.className = "soft-skill-item";
                skillItem.innerHTML = `
                    <div class="icon">${skill.icon}</div>
                    <h4>${skill.title}</h4>
                    <p>${skill.description}</p>
                `;
                skillsGrid.appendChild(skillItem);
            });
        } else {
            // Affichage normal pour les compétences techniques
            skillsGrid.className = "skills-grid";
            skills.forEach(skill => {
                const skillCard = document.createElement("div");
                skillCard.className = "skill-card";
                skillCard.innerHTML = `
                    <h4>${skill.title}</h4>
                    <p>${skill.description}</p>
                `;
                skillsGrid.appendChild(skillCard);
            });
        }
        
        // Effet de fade in
        skillsGrid.style.opacity = 1;
    }, 300);
}

// Écouteurs d'événements pour les boutons de compétences
skillButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Gestion du bouton actif
        skillButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");
        
        // Affichage des compétences
        const category = button.dataset.skill;
        displaySkills(category);
    });
});

// Affichage initial des langages
if (skillButtons.length > 0) {
    displaySkills("languages");
}

// Gestion de la navigation des projets
const projectButtons = document.querySelectorAll(".projects-nav button");
const projectCards = document.querySelectorAll(".project-card");

if (projectButtons.length > 0 && projectCards.length > 0) {
    
    // Fonction pour afficher les projets d'une catégorie
    function showProjects(category) {
        projectCards.forEach(card => {
            if (card.dataset.category === category) {
                card.classList.remove("hidden");
                card.classList.add("visible");
            } else {
                card.classList.remove("visible");
                card.classList.add("hidden");
            }
        });
    }
    
    // Écouteurs d'événements sur les boutons
    projectButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Gestion du bouton actif
            projectButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // Affichage des projets de la catégorie
            const category = button.dataset.category;
            showProjects(category);
        });
    });

    // Affichage initial des projets professionnels
    showProjects("pro");
}
