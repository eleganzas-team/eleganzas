export const mockUserDataEthereal = {
  opening: {
    title: "Undangan Pernikahan",
    subtitle: "Kami mengundang Anda untuk merayakan momen bahagia kami",
    buttonText: "Buka Undangan",
  },
  groom: {
    fullName: "Muhammad Rizky Al-Farabi",
    nickname: "Rizky",
    father: "Bapak Prof. Dr. Ahmad Dahlan",
    mother: "Ibu Hj. Siti Khadijah",
    image: "/images/groom.jpg",
    instagram: "@rizky.alfarabi",
  },
  bride: {
    fullName: "Aisyah Nuraini Putri",
    nickname: "Aisyah",
    father: "Bapak H. Hasan Basri",
    mother: "Ibu Hj. Fatimah Az-Zahra",
    image: "/images/bride.jpg",
    instagram: "@aisyah.putri",
  },
  event: {
    date: "Sabtu, 20 Desember 2025",
    dateHijri: "29 Jumada al-Akhirah 1447 H",
    location: "Hotel Mulia, Jakarta",
    latitude: "-6.2088",
    longitude: "106.8456",
  },
  akad: {
    date: "Sabtu, 20 Desember 2025",
    time: "08:00 - 10:00 WIB",
    location: "Masjid Istiqlal",
    address: "Jl. Taman Wijaya Kusuma, Jakarta Pusat",
    mapUrl: "https://maps.google.com/?q=Masjid+Istiqlal",
  },
  resepsi: {
    date: "Sabtu, 20 Desember 2025",
    time: "11:00 - 15:00 WIB",
    location: "Ballroom Hotel Mulia",
    address: "Jl. Asia Afrika No. 10, Jakarta",
    mapUrl: "https://maps.google.com/?q=Hotel+Mulia+Jakarta",
  },
  story: {
    title: "Kisah Kami",
    meet: "Pertama kali bertemu di kampus, saat studi banding ke Yogyakarta tahun 2019.",
    date: "Mulai berpacaran setelah 2 tahun berteman, di bulan Ramadhan 2021.",
    proposal: "Lamaran dilaksanakan di rumah keluarga dengan khidmat, dibantu oleh keluarga besar.",
    wedding: "Hari bahagia akan kami laksanakan dengan penuh syukur dan keberkahan.",
  },
  gallery: {
    images: [
      "/images/gallery-1.jpg",
      "/images/gallery-2.jpg",
      "/images/gallery-3.jpg",
      "/images/gallery-4.jpg",
      "/images/gallery-5.jpg",
      "/images/gallery-6.jpg",
    ],
  },
  gift: {
    title: "Kado Digital",
    message: "Doa restu Anda adalah kado terindah. Bagi yang ingin memberikan tanda kasih, dapat melalui:",
    accounts: [
      { bank: "Bank Mandiri", number: "123-456-7890", name: "Muhammad Rizky Al-Farabi" },
      { bank: "Bank BCA", number: "098-765-4321", name: "Aisyah Nuraini Putri" },
    ],
    qrisUrl: "/images/qris.png",
  },
  rsvp: {
    title: "Konfirmasi Kehadiran",
    subtitle: "Mohon konfirmasi kehadiran Anda untuk membantu kami dalam persiapan acara",
    maxGuests: 2,
  },
  wishes: {
    title: "Ucapan & Doa",
    subtitle: "Tulis doa dan harapan untuk kami",
  },
  closing: {
    message: "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan do'a restu kepada kedua mempelai.",
    thankYou: "Atas kehadiran dan doa restunya, kami ucapkan terima kasih.",
    coupleNames: "Rizky & Aisyah",
  },
  music: {
    url: "/music/background.mp3",
    title: "Beautiful in White",
    artist: "Shane Filan",
  },
  decorative: {
    heroImage: "/images/hero-bg.jpg",
    ornamentStyle: "floral",
    accentColor: "#d4af37",
    animation: "fade",
  },
};

export type MockUserDataEthereal = typeof mockUserDataEthereal;

