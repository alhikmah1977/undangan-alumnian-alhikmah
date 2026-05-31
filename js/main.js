document.addEventListener('DOMContentLoaded', () => {
    
    // 1. KUNCI SCROLL: Biar tamu nggak bisa scroll sebelum amplop dibuka
    document.body.style.overflow = 'hidden';

    // 2. INIT ANIMASI: Biarin dia ngebaca posisi karena web udah nggak disembunyiin
    AOS.init({
        duration: 1000, 
        once: true,
        offset: 50 
    });

    // ==========================================
    // 3. LOGIKA NAMA TAMU OTOMATIS
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
    // 4. LOGIKA BUKA UNDANGAN
    // ==========================================
    const btnOpen = document.getElementById('btn-open');
    const envelope = document.getElementById('opening-wrapper');
    const bgMusic = document.getElementById('bg-music');
    const bgVideo = document.getElementById('bg-video');

    btnOpen.addEventListener('click', () => {
        // Hilangkan amplop (geser ke atas)
        envelope.classList.add('open');
        
        // BUKA KUNCI SCROLL: Sekarang tamu bisa scroll ke bawah
        document.body.style.overflow = 'auto';

        // Refresh AOS dikit biar makin presisi
        setTimeout(() => {
            AOS.refresh();
        }, 500);

        // Putar musik & video
        try {
            bgMusic.play();
            if (bgVideo) bgVideo.play();
        } catch (error) {
            console.log("Autoplay dicegah browser:", error);
        }

        // Hapus amplop dari background setelah 1 detik
        setTimeout(() => {
            envelope.style.display = 'none';
        }, 1000);
    });

    // ==========================================
    // 5. LOGIKA COUNTDOWN TIMER
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
    // 6. COPY NOMOR REKENING
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