document.addEventListener('DOMContentLoaded', () => {
    
    // Inisialisasi AOS
    AOS.init({
        duration: 800, 
        once: true,
        offset: 0 
    });

    // ==========================================
    // 0. LOGIKA NAMA TAMU OTOMATIS (DARI LINK WA)
    // ==========================================
    const urlParams = new URLSearchParams(window.location.search);
    const namaTamu = urlParams.get('to');
    const guestNameElement = document.getElementById('guest-name');

    if (namaTamu) {
        guestNameElement.innerText = namaTamu;
    } else {
        guestNameElement.innerText = "Segenap Alumni & Simpatisan";
    }

    // ==========================================
    // 1. LOGIKA BUKA UNDANGAN
    // ==========================================
    const btnOpen = document.getElementById('btn-open');
    const envelope = document.getElementById('opening-wrapper');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');
    const bgVideo = document.getElementById('bg-video');

    btnOpen.addEventListener('click', () => {
        envelope.classList.add('open');
        mainContent.style.display = 'block';

        setTimeout(() => {
            AOS.refresh();
        }, 100);

        try {
            bgMusic.play();
            if (bgVideo) bgVideo.play();
        } catch (error) {
            console.log("Autoplay dicegah browser:", error);
        }

        setTimeout(() => {
            envelope.style.display = 'none';
        }, 1000);
    });

    // ==========================================
    // 2. LOGIKA COUNTDOWN TIMER
    // ==========================================
    const targetDate = new Date("June 27, 2026 08:00:00").getTime();

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("hari").innerText = days < 10 ? "0" + days : days;
        document.getElementById("jam").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("menit").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("detik").innerText = seconds < 10 ? "0" + seconds : seconds;
        
    }, 1000);

    // ==========================================
    // 3. COPY NOMOR REKENING
    // ==========================================
    const btnCopy = document.getElementById('btn-copy');
    const norek = document.getElementById('norek').innerText;

    btnCopy.addEventListener('click', () => {
        navigator.clipboard.writeText(norek).then(() => {
            btnCopy.innerHTML = '<i class="fas fa-check"></i> Berhasil Disalin!';
            setTimeout(() => {
                btnCopy.innerHTML = '<i class="far fa-copy"></i> Salin No. Rekening';
            }, 3000);
        });
    });

});