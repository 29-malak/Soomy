
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. GET HTML ELEMENTS
    // =====================================

    const bubblesButton = document.getElementById("bubblesButton");
    const bubblesCharacter = document.getElementById("bubblesCharacter");

    const speechBubble = document.getElementById("speechBubble");
    const messageText = document.getElementById("messageText");

    const soupScene = document.getElementById("soupScene");
    const tapHint = document.getElementById("tapHint");

    const floatingHearts = document.querySelector(".floating-hearts");
    const sparkles = document.querySelector(".sparkles");

    const finalHearts = document.querySelector(".final-hearts");

    const progressDots = [
        document.getElementById("dotOne"),
        document.getElementById("dotTwo"),
        document.getElementById("dotThree")
    ];


    // =====================================
    // 2. INITIAL SETTINGS
    // =====================================

    let currentStep = 0;

    const characterImages = {
        idle: "assets/bubbles-idle.png",
        soup: "assets/bubbles-soup.png",
        heart: "assets/bubbles-heart.png"
    };


    // =====================================
    // 3. CREATE FLOATING HEARTS
    // =====================================

    function createHearts() {

        if (!floatingHearts) return;

        for (let i = 0; i < 18; i++) {

            const heart = document.createElement("span");

            heart.className = "heart";

            heart.style.left = `${Math.random() * 100}%`;

            heart.style.setProperty(
                "--size",
                `${14 + Math.random() * 20}px`
            );

            heart.style.setProperty(
                "--duration",
                `${7 + Math.random() * 8}s`
            );

            heart.style.setProperty(
                "--delay",
                `${Math.random() * 8}s`
            );

            heart.style.setProperty(
                "--drift",
                `${Math.random() * 80 - 40}px`
            );

            floatingHearts.appendChild(heart);
        }
    }


    // =====================================
    // 4. CREATE BACKGROUND SPARKLES
    // =====================================

    function createSparkles() {

        if (!sparkles) return;

        for (let i = 0; i < 22; i++) {

            const sparkle = document.createElement("span");

            sparkle.className = "sparkle";

            sparkle.textContent =
                Math.random() > 0.5 ? "✦" : "✧";

            sparkle.style.left = `${Math.random() * 100}%`;

            sparkle.style.top = `${Math.random() * 100}%`;

            sparkle.style.setProperty(
                "--sparkle-size",
                `${10 + Math.random() * 15}px`
            );

            sparkle.style.setProperty(
                "--delay",
                `${Math.random() * 4}s`
            );

            sparkles.appendChild(sparkle);
        }
    }


    // =====================================
    // 5. CHANGE BUBBLES CHARACTER
    // =====================================

    function changeCharacter(imagePath) {

        if (!bubblesCharacter) return;

        bubblesCharacter.style.opacity = "0";

        setTimeout(() => {

            bubblesCharacter.src = imagePath;

            bubblesCharacter.onload = () => {
                bubblesCharacter.style.opacity = "1";
            };

            // Show the image even if it is already cached
            if (bubblesCharacter.complete &&
                bubblesCharacter.naturalWidth > 0) {

                bubblesCharacter.style.opacity = "1";
            }

        }, 200);
    }


    // =====================================
    // 6. SHOW MESSAGE
    // =====================================

    function showMessage(message) {

        if (!speechBubble || !messageText) return;

        speechBubble.classList.remove("is-visible");

        setTimeout(() => {

            messageText.textContent = message;

            speechBubble.classList.add("is-visible");

        }, 200);
    }


    // =====================================
    // 7. UPDATE PROGRESS DOTS
    // =====================================

    function updateProgress(completedSteps) {

        progressDots.forEach((dot, index) => {

            if (!dot) return;

            dot.classList.toggle(
                "is-complete",
                index < completedSteps
            );

            dot.classList.toggle(
                "is-active",
                index === completedSteps && completedSteps < 3
            );

        });
    }


    // =====================================
    // 8. CHARACTER TAP ANIMATION
    // =====================================

    function animateCharacter() {

        if (!bubblesButton) return;

        bubblesButton.classList.remove("is-tapped");

        void bubblesButton.offsetWidth;

        bubblesButton.classList.add("is-tapped");

        setTimeout(() => {

            bubblesButton.classList.remove("is-tapped");

        }, 450);
    }


    // =====================================
    // 9. FIRST INTERACTION
    // =====================================

    function firstInteraction() {

        showMessage("hello Soomy I missed you 💗");

        if (tapHint) {
            tapHint.textContent = "Tap Bubbles one more time 💗";
        }

        updateProgress(1);
    }


    // =====================================
    // 10. SECOND INTERACTION
    // =====================================

    function secondInteraction() {

        // Change Bubbles pose
        changeCharacter(characterImages.soup);

        // Show vegetable soup scene
        if (soupScene) {

            soupScene.classList.add("is-visible");

            soupScene.setAttribute("aria-hidden", "false");
        }

        // Change message
        showMessage("i made this for you 🍲");

        if (tapHint) {
            tapHint.textContent = "One last tap ✨";
        }

        updateProgress(2);
    }


    // =====================================
    // 11. THIRD INTERACTION
    // =====================================

    function thirdInteraction() {

        // Change Bubbles to heart pose
        changeCharacter(characterImages.heart);

        // Final message
        showMessage("Get well soon, I love you so much 💗");

        if (tapHint) {
            tapHint.textContent = "Sending you lots of love! 💗";
        }

        // Update progress
        updateProgress(3);

        // Final character animation
        if (bubblesButton) {
            bubblesButton.classList.add("final-pose");

            bubblesButton.setAttribute(
                "aria-label",
                "Bubbles is sending you love"
            );
        }

        // Show decorative hearts
        if (finalHearts) {

            finalHearts.querySelectorAll("span").forEach(
                (heart, index) => {

                    heart.style.opacity = "1";

                    heart.style.animation =
                        `heart-beat ${1.2 + index * 0.3}s infinite`;
                }
            );
        }
    }


    // =====================================
    // 12. HANDLE USER CLICKS
    // =====================================

    function handleBubblesClick() {

        // Stop after the final interaction
        if (currentStep >= 3) return;

        animateCharacter();

        if (currentStep === 0) {

            firstInteraction();

        }

        else if (currentStep === 1) {

            secondInteraction();

        }

        else if (currentStep === 2) {

            thirdInteraction();

        }

        currentStep++;
    }


    // =====================================
    // 13. PRELOAD CHARACTER IMAGES
    // =====================================

    Object.values(characterImages).forEach((imagePath) => {

        const image = new Image();

        image.src = imagePath;

    });


    // =====================================
    // 14. INITIALIZE WEBSITE
    // =====================================

    createHearts();

    createSparkles();

    updateProgress(0);

    if (bubblesButton) {

        bubblesButton.addEventListener(
            "click",
            handleBubblesClick
        );

    }

});
