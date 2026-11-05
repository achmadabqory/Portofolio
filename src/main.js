// Email tujuan. Ganti dengan Gmail kamu.
const EMAIL = "achmadabqoryafif@gmail.com";

// 1) Tandai menu yang sedang aktif saat halaman di-scroll.
//    CSS (class .nav-link) membaca atribut aria-current="page" untuk memberi warna putih dan garis bawah.
const navLinks = document.querySelectorAll(".nav-link");
const sections = Array.from(navLinks).map((a) => document.querySelector(a.getAttribute("href")));

function setActive() {
  let current = sections[0].id;
  const y = window.scrollY + 140;

  sections.forEach((section) => {
    if (section.offsetTop <= y) current = section.id;
  });

  // Di dasar halaman, paksa menu terakhir (Contact) aktif.
  const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 4;
  if (atBottom) current = sections[sections.length - 1].id;

  navLinks.forEach((a) => {
    if (a.getAttribute("href") === "#" + current) {
      a.setAttribute("aria-current", "page");
    } else {
      a.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("scroll", setActive, { passive: true });
window.addEventListener("load", setActive);
setActive();

// 2) Tombol "Kirim lewat Gmail": buka Gmail dengan pesan yang sudah terisi.
document.getElementById("sendBtn").addEventListener("click", () => {
  const name = document.getElementById("cName").value.trim();
  const message = document.getElementById("cMsg").value.trim();

  const subject = "Pesan dari portofolio" + (name ? " - " + name : "");
  const body = (message || "Halo,") + (name ? "\n\nSalam,\n" + name : "");

  const url =
    "https://mail.google.com/mail/?view=cm&fs=1" +
    "&to=" + encodeURIComponent(EMAIL) +
    "&su=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);

  window.open(url, "_blank", "noopener");
});

// 3) Tahun otomatis di footer.
document.getElementById("year").textContent = new Date().getFullYear();
