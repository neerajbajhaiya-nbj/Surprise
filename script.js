/* =========================================
   LOADING SCREEN
========================================= */

window.addEventListener("load", function () {

    const loadingScreen =
        document.getElementById("loadingScreen");


    setTimeout(function () {

        loadingScreen.classList.add("hide");

    }, 2000);

});


/* =========================================
   BIRTHDAY TEXT
========================================= */

const birthdayText =
    "Happy Birthday Babyyy😚🎀";

const birthdayElement =
    document.getElementById("birthdayText");

const birthdaySubtitle =
    document.getElementById("birthdaySubtitle");


let currentCharacter = 0;


/* =========================================
   TYPEWRITER
========================================= */

function typeBirthdayText() {

    if (
        currentCharacter <
        birthdayText.length
    ) {

        birthdayElement.textContent +=
            birthdayText.charAt(
                currentCharacter
            );

        currentCharacter++;


        setTimeout(
            typeBirthdayText,
            110
        );

    } else {


        const cursor =
            document.querySelector(
                ".cursor"
            );


        if (cursor) {
            cursor.style.display = "none";
        }


        setTimeout(function () {

            birthdaySubtitle.classList.add(
                "show"
            );

        }, 400);


        setTimeout(function () {

            startFireworks();

        }, 300);

        setTimeout(function () {

            showLoveLetter();

        }, 3000);

    }
}


/* =========================================
   START BIRTHDAY TYPING
========================================= */

setTimeout(function () {

    typeBirthdayText();

}, 5000);


/* ==================================================
   FIREWORK SYSTEM
================================================== */

const canvas =
    document.getElementById(
        "fireworksCanvas"
    );

const ctx =
    canvas.getContext("2d");


let fireworks = [];

let particles = [];

let fireworksStarted = false;


/* =========================================
   CANVAS SIZE
========================================= */

function resizeCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;
}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================
   FIREWORK CLASS
========================================= */

class Firework {

    constructor(
        startX,
        startY,
        targetX,
        targetY
    ) {

        this.x = startX;

        this.y = startY;

        this.targetX = targetX;

        this.targetY = targetY;

        this.speed = 7;

        this.angle =
            Math.atan2(
                targetY - startY,
                targetX - startX
            );

        this.velocityX =
            Math.cos(this.angle)
            * this.speed;

        this.velocityY =
            Math.sin(this.angle)
            * this.speed;

        this.exploded = false;
    }


    update() {

        this.x +=
            this.velocityX;

        this.y +=
            this.velocityY;


        const distance =
            Math.hypot(
                this.targetX - this.x,
                this.targetY - this.y
            );


        if (distance < 10) {

            this.explode();

            this.exploded = true;
        }
    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            2.5,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            "#b77aff";

        ctx.shadowBlur = 15;

        ctx.shadowColor =
            "#b77aff";

        ctx.fill();

        ctx.shadowBlur = 0;
    }


    explode() {

        const particleCount = 70;


        for (
            let i = 0;
            i < particleCount;
            i++
        ) {

            particles.push(
                new Particle(
                    this.x,
                    this.y
                )
            );
        }
    }
}


/* =========================================
   PARTICLE CLASS
========================================= */

class Particle {

    constructor(x, y) {

        this.x = x;

        this.y = y;


        const angle =
            Math.random()
            * Math.PI
            * 2;


        const speed =
            Math.random() * 5 + 2;


        this.velocityX =
            Math.cos(angle)
            * speed;


        this.velocityY =
            Math.sin(angle)
            * speed;


        this.life = 1;

        this.gravity = 0.04;

        this.size =
            Math.random() * 2.5 + 1;
    }


    update() {

        this.x +=
            this.velocityX;

        this.y +=
            this.velocityY;


        this.velocityY +=
            this.gravity;


        this.life -= 0.015;
    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            "rgba(183, 122, 255, "
            + this.life +
            ")";


        ctx.shadowBlur = 12;

        ctx.shadowColor =
            "#c89aff";

        ctx.fill();

        ctx.shadowBlur = 0;
    }
}


/* =========================================
   CREATE FIREWORK
========================================= */

function createFirework() {

    const startX =
        Math.random()
        * canvas.width;


    const startY =
        canvas.height + 10;


    const targetX =
        Math.random()
        * canvas.width;


    const targetY =
        Math.random()
        * (canvas.height * 0.55)
        + 80;


    fireworks.push(
        new Firework(
            startX,
            startY,
            targetX,
            targetY
        )
    );
}


/* =========================================
   FIREWORK ANIMATION
========================================= */

function animateFireworks() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /* Fireworks */

    for (
        let i = fireworks.length - 1;
        i >= 0;
        i--
    ) {

        const firework =
            fireworks[i];


        firework.update();

        firework.draw();


        if (firework.exploded) {

            fireworks.splice(i, 1);
        }
    }


    /* Particles */

    for (
        let i = particles.length - 1;
        i >= 0;
        i--
    ) {

        const particle =
            particles[i];


        particle.update();

        particle.draw();


        if (particle.life <= 0) {

            particles.splice(i, 1);
        }
    }


    requestAnimationFrame(
        animateFireworks
    );
}


/* =========================================
   START FIREWORKS
========================================= */

function startFireworks() {

    if (fireworksStarted) {
        return;
    }


    fireworksStarted = true;


    animateFireworks();


    /* Initial fireworks */

    for (
        let i = 0;
        i < 5;
        i++
    ) {

        setTimeout(
            createFirework,
            i * 350
        );
    }


    /* Continuous fireworks */

    setInterval(function () {

        createFirework();

    }, 1200);
}


/* ==================================================
   LOVE LETTER SECTION
================================================== */

function showLoveLetter() {

    const loveLetterSection =
        document.getElementById(
            "loveLetterSection"
        );


    if (!loveLetterSection) {
        return;
    }


    loveLetterSection.classList.add(
        "visible"
    );

    setTimeout(function () {

        loveLetterSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 500);

}


/* ==================================================
   ENVELOPE CLICK
================================================== */

const envelopeContainer =
    document.getElementById(
        "envelopeContainer"
    );


if (envelopeContainer) {

    envelopeContainer.addEventListener(
        "click",
        function () {

            envelopeContainer.classList.toggle(
                "open"
            );


            const hint =
                document.getElementById(
                    "letterHint"
                );


            if (
                envelopeContainer.classList.contains(
                    "open"
                )
            ) {

                if (hint) {

                    hint.textContent =
                        "With all my love ❤️";
                }

            } else {

                if (hint) {

                    hint.textContent =
                        "Tap the envelope 💌";
                }
            }

          setTimeout(function () {

    showMemories();

}, 1800);
        }
    );
}

/* =========================================
   PHOTO ELEMENTS
========================================= */

const memoriesSection =
    document.getElementById(
        "memoriesSection"
    );

const photoFrame =
    document.querySelector(
        ".photo-frame"
    );

const memoryPhoto =
    document.getElementById(
        "memoryPhoto"
    );

const currentPhoto =
    document.getElementById(
        "currentPhoto"
    );

const memoryNextButton =
    document.getElementById(
        "memoryNextButton"
    );


/* =========================================
   PHOTO SETTINGS
========================================= */

const totalPhotos = 31;

let photoIndex = 1;

let photoChanging = false;


/* =========================================
   SHOW PHOTO SECTION
========================================= */

function showMemories() {

    if (!memoriesSection) {
        return;
    }


    memoriesSection.classList.add(
        "visible"
    );


    setTimeout(function () {

        memoriesSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 500);
}


/* =========================================
   NEXT PHOTO
========================================= */

function nextMemory() {

    if (
        photoChanging ||
        !memoryPhoto ||
        !photoFrame
    ) {
        return;
    }


    photoChanging = true;


    /* Start exit animation */

    photoFrame.classList.add(
        "changing"
    );


    setTimeout(function () {

        /*
         * 30 ke baad
         * photo 1 par wapas
         */

        photoIndex++;


        if (
            photoIndex >
            totalPhotos
        ) {

            photoIndex = 1;
        }


        memoryPhoto.src =
            "images/photo"
            + photoIndex
            + ".jpg";


        currentPhoto.textContent =
            photoIndex;


        /* Remove old animation */

        photoFrame.classList.remove(
            "changing"
        );


        /*
         * New photo animation
         */

        photoFrame.classList.add(
            "enter"
        );


        setTimeout(function () {

            photoFrame.classList.remove(
                "enter"
            );

            photoChanging = false;

        }, 650);

    }, 450);
}


/* =========================================
   PHOTO CLICK
========================================= */

if (photoFrame) {

    photoFrame.addEventListener(
        "click",
        nextMemory
    );
}


/* =========================================
   BUTTON CLICK
========================================= */

if (memoryNextButton) {

    memoryNextButton.addEventListener(
        "click",
        nextMemory
    );
}


/* =========================================
   IMAGE LOAD ERROR
========================================= */

if (memoryPhoto) {

    memoryPhoto.addEventListener(
        "error",
        function () {

            console.warn(
                "Photo not found:",
                memoryPhoto.src
            );

        }
    );
}
/* ==================================================
   
   SHAYARI SECTION
================================================== */

const shayariSection =
    document.getElementById(
        "shayariSection"
    );


/* =========================================
   SHOW SHAYARI
========================================= */

function showShayari() {

    if (!shayariSection) {
        return;
    }


    shayariSection.classList.add(
        "visible"
    );

}


/* =========================================
   SHAYARI SCROLL DETECTION
========================================= */

if (shayariSection) {

    const shayariObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            showShayari();

                        }

                    }
                );

            },

            {
                threshold: 0.25
            }

        );


    shayariObserver.observe(
        shayariSection
    );

}
/* ==================================================
   
   FINAL BIRTHDAY MESSAGE
================================================== */


const finalMessageSection =
    document.getElementById(
        "finalMessageSection"
    );


/* =========================================
   SHOW FINAL MESSAGE
========================================= */

function showFinalMessage() {

    if (!finalMessageSection) {
        return;
    }


    finalMessageSection.classList.add(
        "visible"
    );

}


/* =========================================
   FINAL MESSAGE OBSERVER
========================================= */

if (finalMessageSection) {

    const finalMessageObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            showFinalMessage();

                            finalMessageObserver.unobserve(
                                finalMessageSection
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.25
            }

        );


    finalMessageObserver.observe(
        finalMessageSection
    );

}




/* ==================================================

   TOTAL RELATIONSHIP TIME
================================================== */


/* =========================================
   START DATE & TIME
========================================= */

const relationshipStart = new Date(
    2024,
    3,
    25,
    12,
    0,
    0
);



/* =========================================
   TIMER ELEMENTS
========================================= */

const timerSection =
    document.getElementById("timerSection");

const timerYears =
    document.getElementById("timerYears");

const timerMonths =
    document.getElementById("timerMonths");

const timerWeeks =
    document.getElementById("timerWeeks");

const timerDays =
    document.getElementById("timerDays");

const timerHours =
    document.getElementById("timerHours");

const timerMinutes =
    document.getElementById("timerMinutes");

const timerSeconds =
    document.getElementById("timerSeconds");


/* =========================================
   TOTAL TIME CALCULATION
========================================= */

function updateRelationshipTimer() {

    const now = new Date();

    const difference =
        now.getTime()
        -
        relationshipStart.getTime();


    /* Safety check */

    if (difference < 0) {

        timerYears.textContent = "0";
        timerMonths.textContent = "0";
        timerWeeks.textContent = "0";
        timerDays.textContent = "0";
        timerHours.textContent = "0";
        timerMinutes.textContent = "0";
        timerSeconds.textContent = "0";

        return;
    }


    /* =====================================
       TOTAL SECONDS
    ====================================== */

    const totalSeconds =
        Math.floor(
            difference / 1000
        );


    /* =====================================
       TOTAL MINUTES
    ====================================== */

    const totalMinutes =
        Math.floor(
            totalSeconds / 60
        );


    /* =====================================
       TOTAL HOURS
    ====================================== */

    const totalHours =
        Math.floor(
            totalMinutes / 60
        );


    /* =====================================
       TOTAL DAYS
    ====================================== */

    const totalDays =
        Math.floor(
            totalHours / 24
        );


    /* =====================================
       TOTAL WEEKS
    ====================================== */

    const totalWeeks =
        Math.floor(
            totalDays / 7
        );


    /* =====================================
       TOTAL MONTHS
       
       Average Gregorian month:
       365.2425 / 12 days
    ====================================== */

    const totalMonths =
        Math.floor(
            totalDays /
            (365.2425 / 12)
        );


    /* =====================================
       TOTAL YEARS
       
       Average Gregorian year
    ====================================== */

    const totalYears =
        Math.floor(
            totalDays / 365.2425
        );


    /* =====================================
       UPDATE HTML
    ====================================== */

    timerYears.textContent =
        totalYears.toLocaleString();

    timerMonths.textContent =
        totalMonths.toLocaleString();

    timerWeeks.textContent =
        totalWeeks.toLocaleString();

    timerDays.textContent =
        totalDays.toLocaleString();

    timerHours.textContent =
        totalHours.toLocaleString();

    timerMinutes.textContent =
        totalMinutes.toLocaleString();

    timerSeconds.textContent =
        totalSeconds.toLocaleString();
}


/* =========================================
   START LIVE TIMER
========================================= */

updateRelationshipTimer();


setInterval(
    updateRelationshipTimer,
    1000
);


/* =========================================
   TIMER SECTION ANIMATION
========================================= */

if (timerSection) {

    const timerObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            timerSection.classList.add(
                                "visible"
                            );

                            timerObserver.unobserve(
                                timerSection
                            );
                        }

                    }
                );

            },

            {
                threshold: 0.2
            }

        );


    timerObserver.observe(
        timerSection
    );
}

/* ==================================================

   BACKGROUND MUSIC
================================================== */


/* =========================================
   MUSIC ELEMENT
========================================= */

const backgroundMusic =
    document.getElementById(
        "backgroundMusic"
    );


/* =========================================
   MUSIC SETTINGS
========================================= */

if (backgroundMusic) {

    

    backgroundMusic.volume = 0.65;


    window.addEventListener(
        "load",
        function () {

            startBackgroundMusic();

        }
    );


    const startOnInteraction =
        function () {

            startBackgroundMusic();

        };


    document.addEventListener(
        "click",
        startOnInteraction,
        {
            once: true
        }
    );


    document.addEventListener(
        "touchstart",
        startOnInteraction,
        {
            once: true,
            passive: true
        }
    );


    document.addEventListener(
        "keydown",
        startOnInteraction,
        {
            once: true
        }
    );

}


/* =========================================
   START MUSIC FUNCTION
========================================= */

function startBackgroundMusic() {

    if (!backgroundMusic) {
        return;
    }


    if (
        !backgroundMusic.paused
    ) {

        return;
    }


    const playPromise =
        backgroundMusic.play();

    if (
        playPromise !== undefined
    ) {

        playPromise.catch(
            function () {

            }
        );
    }
}
/* ==================================================
   INTERACTIVE BIRTHDAY CAKE
================================================== */


/* =========================================
   ELEMENTS
========================================= */

const cakeSection =
    document.getElementById(
        "cakeSection"
    );


const cakeStage =
    document.getElementById(
        "cakeStage"
    );


const micButton =
    document.getElementById(
        "micButton"
    );


const tapBlowButton =
    document.getElementById(
        "tapBlowButton"
    );


const blowStatus =
    document.getElementById(
        "blowStatus"
    );


const cutControl =
    document.getElementById(
        "cutControl"
    );


const cutCakeButton =
    document.getElementById(
        "cutCakeButton"
    );


/* =========================================
   STATE
========================================= */

let candlesAreOut = false;

let microphoneActive = false;

let audioContext = null;

let analyser = null;

let microphoneStream = null;

let microphoneSource = null;

let blowDetectionFrame = null;


/* =========================================
   SHOW CAKE SECTION
========================================= */

function showCakeSection() {

    if (!cakeSection) {
        return;
    }


    cakeSection.classList.add(
        "visible"
    );

}


/* =========================================
   OBSERVE CAKE SECTION
========================================= */

if (cakeSection) {

    const cakeObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            showCakeSection();

                            cakeObserver.unobserve(
                                cakeSection
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.2
            }

        );


    cakeObserver.observe(
        cakeSection
    );
}


/* ==================================================
   BLOW CANDLES
================================================== */

function blowCandles() {

    if (candlesAreOut) {
        return;
    }


    candlesAreOut = true;


    cakeSection.classList.add(
        "candles-out"
    );


    blowStatus.textContent =
        "All candles are out! ❤️";


    stopMicrophone();


    setTimeout(
        function () {

            if (cutControl) {

                cutControl.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }

        },
        900
    );
}


/* ==================================================
   TAP FALLBACK
================================================== */

if (tapBlowButton) {

    tapBlowButton.addEventListener(
        "click",
        function () {

            blowCandles();

        }
    );
}


/* ==================================================
   MICROPHONE
================================================== */

if (micButton) {

    micButton.addEventListener(
        "click",
        startMicrophone
    );
}


/* =========================================
   START MICROPHONE
========================================= */

async function startMicrophone() {

    if (candlesAreOut) {
        return;
    }


    if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
    ) {

        blowStatus.textContent =
            "Microphone not supported. Use Tap to Blow 💨";

        return;
    }


    try {

        microphoneStream =
            await navigator.mediaDevices.getUserMedia({
                audio: true
            });


        microphoneActive = true;


        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();


        analyser =
            audioContext.createAnalyser();


        analyser.fftSize = 1024;

        analyser.smoothingTimeConstant =
            0.75;


        microphoneSource =
            audioContext.createMediaStreamSource(
                microphoneStream
            );


        microphoneSource.connect(
            analyser
        );


        blowStatus.textContent =
            "Now blow toward your microphone 💨";


        micButton.textContent =
            "Microphone Active";


        detectBlow();


    } catch (error) {

        console.log(
            "Microphone error:",
            error
        );


        blowStatus.textContent =
            "Mic permission denied. Use Tap to Blow 💨";
    }
}


/* ==================================================
   BLOW DETECTION
================================================== */

function detectBlow() {

    if (
        !microphoneActive ||
        candlesAreOut ||
        !analyser
    ) {

        return;
    }


    const dataArray =
        new Uint8Array(
            analyser.fftSize
        );


    analyser.getByteTimeDomainData(
        dataArray
    );


    let sum = 0;


    for (
        let i = 0;
        i < dataArray.length;
        i++
    ) {

        const normalized =
            (
                dataArray[i] - 128
            ) / 128;


        sum +=
            normalized
            * normalized;
    }


    const rms =
        Math.sqrt(
            sum /
            dataArray.length
        );


    if (rms > 0.12) {

        blowCandles();

        return;
    }


    blowDetectionFrame =
        requestAnimationFrame(
            detectBlow
        );
}


/* ==================================================
   STOP MICROPHONE
================================================== */

function stopMicrophone() {

    microphoneActive = false;


    if (blowDetectionFrame) {

        cancelAnimationFrame(
            blowDetectionFrame
        );

        blowDetectionFrame = null;
    }


    if (microphoneStream) {

        microphoneStream
            .getTracks()
            .forEach(
                function (track) {

                    track.stop();

                }
            );

        microphoneStream = null;
    }


    if (audioContext) {

        audioContext.close();

        audioContext = null;
    }


    analyser = null;

    microphoneSource = null;
}


/* ==================================================
   CAKE CUT
================================================== */

if (cutCakeButton) {

    cutCakeButton.addEventListener(
        "click",
        cutCake
    );
}


/* =========================================
   CUT CAKE FUNCTION
========================================= */

function cutCake() {

    if (!candlesAreOut) {
        return;
    }


    cakeSection.classList.add(
        "cutting"
    );


    cutCakeButton.disabled = true;

    cutCakeButton.textContent =
        "Cake Cut! ❤️";


    if (
        navigator.vibrate
    ) {

        navigator.vibrate(
            [80, 50, 80]
        );
    }
}
/* ==================================================
   
   DAISY BOUQUET
================================================== */


const bouquetSection =
    document.getElementById(
        "bouquetSection"
    );


/* =========================================
   BOUQUET OBSERVER
========================================= */

if (bouquetSection) {

    const bouquetObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            bouquetSection.classList.add(
                                "visible"
                            );


                            bouquetObserver.unobserve(
                                bouquetSection
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.2
            }

        );


    bouquetObserver.observe(
        bouquetSection
    );
}
