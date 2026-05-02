/* ============================================================
   DEVASAYA — shared script for all pages
   - injects shared header & footer
   - per-page logic: shop grid + filters, product detail, contact form, video loop
   ============================================================ */

const WHATSAPP_NUMBER = "919340853746";
const buildWhatsAppLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
const inr = (n) => "₹ " + n.toLocaleString("en-IN");

const LOGO_URL = "https://customer-assets.emergentagent.com/job_ajrakh-artistry/artifacts/f8iwx5x9_ChatGPT_Image_Apr_20__2026__12_35_22_AM-removebg-preview.png";

/* ============= Product catalogue (edit here to add/remove pieces) ============= */
const PRODUCTS = [
  // SAREES
  { id: "p1", name: "Indigo Sky Ajrakh Saree", category: "Sarees", price: 8500,
    fabric: "Hand-block printed Modal Silk", sizes: ["Free Size"],
    desc: "A meditation in indigo and madder. Each motif is hand-stamped with carved teakwood blocks across sixteen stages of natural dyeing.",
    img: "https://images.unsplash.com/photo-1768803968260-3dab844c1476?crop=entropy&cs=srgb&fm=jpg&w=900" },
  { id: "p2", name: "Madder Earth Saree", category: "Sarees", price: 9200,
    fabric: "Pure Cotton", sizes: ["Free Size"],
    desc: "Earthy madder root and pomegranate rind lend this saree its warm, sun-baked palette. A homage to the Kutch desert at dusk.",
    img: "https://images.unsplash.com/photo-1766043071333-5d82991da1ea?crop=entropy&cs=srgb&fm=jpg&w=900" },

  // SHIRTS — ₹2500 · L–XXXL
  { id: "s1", name: "Madder Oversized Shirt", category: "Shirts", price: 2500,
    fabric: "Hand-block printed Cotton", sizes: ["L","XL","XXL","XXXL"],
    desc: "A relaxed oversized shirt in madder red and ivory — hand-block printed with mandala, paisley and polka-dot motifs.",
    img: "https://customer-assets.emergentagent.com/job_ajrakh-artistry/artifacts/mp9s0ko8_WhatsApp%20Image%202026-05-01%20at%206.36.30%20PM%20%281%29.jpeg" },
  { id: "s2", name: "Ivory Mandala Shirt", category: "Shirts", price: 2500,
    fabric: "Hand-block printed Cotton", sizes: ["L","XL","XXL","XXXL"],
    desc: "Crisp ivory ground layered with indigo mandalas, madder medallions and onyx dots — heritage meets modern.",
    img: "https://customer-assets.emergentagent.com/job_ajrakh-artistry/artifacts/704vq4t4_WhatsApp%20Image%202026-05-01%20at%206.36.30%20PM.jpeg" },
  { id: "s3", name: "Indigo Feather Shirt", category: "Shirts", price: 2500,
    fabric: "Hand-block printed Cotton", sizes: ["L","XL","XXL","XXXL"],
    desc: "Deep indigo shirt with feather-leaf panels and classic Ajrakh geometry. An heirloom every-season piece.",
    img: "https://customer-assets.emergentagent.com/job_ajrakh-artistry/artifacts/fo8pusp7_WhatsApp%20Image%202026-05-01%20at%206.36.29%20PM%20%281%29.jpeg" },
  { id: "s4", name: "Saffron Medallion Shirt", category: "Shirts", price: 2500,
    fabric: "Hand-block printed Cotton", sizes: ["L","XL","XXL","XXXL"],
    desc: "Teal and saffron medallions on an indigo ground — a shirt that carries the warmth of a Kutch afternoon.",
    img: "https://customer-assets.emergentagent.com/job_ajrakh-artistry/artifacts/4ad8h0w2_WhatsApp%20Image%202026-05-01%20at%206.36.29%20PM.jpeg" },
  { id: "s5", name: "Onyx Heritage Shirt", category: "Shirts", price: 2500,
    fabric: "Hand-block printed Cotton", sizes: ["L","XL","XXL","XXXL"],
    desc: "A grounding onyx-and-ivory shirt printed with classical Sindhi motifs and feather borders.",
    img: "https://customer-assets.emergentagent.com/job_ajrakh-artistry/artifacts/luutj7r8_WhatsApp%20Image%202026-05-01%20at%206.36.28%20PM.jpeg" },

  // CORDSETS — ₹3500 · XL & XXL
  { id: "c1", name: "Saffron Ochre Cordset", category: "Cordsets", price: 3500,
    fabric: "Hand-block printed Cotton", sizes: ["XL","XXL"],
    desc: "Hand-block printed cotton cordset in radiant ochre and emerald — co-ordinated kurta with relaxed wide-leg pant.",
    img: "https://customer-assets.emergentagent.com/job_ajrakh-artistry/artifacts/7f2rh6z6_Gemini_Generated_Image_h7t3rxh7t3rxh7t3.png" },
  { id: "c2", name: "Charcoal Bloom Cordset", category: "Cordsets", price: 3500,
    fabric: "Hand-block printed Cotton", sizes: ["XL","XXL"],
    desc: "A grounding charcoal-and-madder cordset with three-quarter sleeves and flared palazzo.",
    img: "https://customer-assets.emergentagent.com/job_ajrakh-artistry/artifacts/1tewv3fz_Gemini_Generated_Image_27hjdi27hjdi27hj.png" },
  { id: "c3", name: "Midnight Leaf Cordset", category: "Cordsets", price: 3500,
    fabric: "Hand-block printed Cotton", sizes: ["XL","XXL"],
    desc: "Indigo and madder leaves on a deep ink ground — V-neck kurta paired with breezy wide-leg pant.",
    img: "https://customer-assets.emergentagent.com/job_ajrakh-artistry/artifacts/dzvp649z_Gemini_Generated_Image_d257txd257txd257%20%281%29.png" },
  { id: "c4", name: "Ivory Vine Cordset", category: "Cordsets", price: 3500,
    fabric: "Hand-block printed Cotton", sizes: ["XL","XXL"],
    desc: "Ivory ground laced with indigo paisley vines — an heirloom cordset for sun-warmed afternoons.",
    img: "https://customer-assets.emergentagent.com/job_ajrakh-artistry/artifacts/99qn0c3x_Gemini_Generated_Image_npgu4cnpgu4cnpgu.png" },
  { id: "c5", name: "Teal Garden Cordset", category: "Cordsets", price: 3500,
    fabric: "Hand-block printed Cotton", sizes: ["XL","XXL"],
    desc: "Teal botanical block-print on soft cotton — a cordset that moves with the breeze of a courtyard.",
    img: "https://customer-assets.emergentagent.com/job_ajrakh-artistry/artifacts/jhwxgnps_Gemini_Generated_Image_phpuf6phpuf6phpu.png" },

  // KAFTANS — ₹2500 · Free Size
  { id: "k1", name: "Mihrab Indigo Kaftan", category: "Kaftans", price: 2500,
    fabric: "Hand-block printed Cotton", sizes: ["Free Size"],
    desc: "A regal indigo kaftan with a mihrab-bordered hem and madder tassels — endlessly elegant for courtyard afternoons.",
    img: "https://customer-assets.emergentagent.com/job_ajrakh-artistry/artifacts/jnqacpwu_Gemini_Generated_Image_bs1tnsbs1tnsbs1t.png" },
  { id: "k2", name: "Teal Medallion Kaftan", category: "Kaftans", price: 2500,
    fabric: "Hand-block printed Cotton", sizes: ["Free Size"],
    desc: "Deep teal block-printed kaftan finished with crimson tassels — a quiet statement in slow luxury.",
    img: "https://customer-assets.emergentagent.com/job_ajrakh-artistry/artifacts/3dd2o54t_Gemini_Generated_Image_5cz8ih5cz8ih5cz8.png" },
  { id: "k3", name: "Onyx Ochre Kaftan", category: "Kaftans", price: 2500,
    fabric: "Hand-block printed Cotton", sizes: ["Free Size"],
    desc: "Charcoal and ochre geometry with honey-toned tassels — a kaftan that reads like a North African courtyard.",
    img: "https://customer-assets.emergentagent.com/job_ajrakh-artistry/artifacts/e1y12507_Gemini_Generated_Image_ue69c5ue69c5ue69.png" },
  { id: "k4", name: "Azure Atelier Kaftan", category: "Kaftans", price: 2500,
    fabric: "Hand-block printed Cotton", sizes: ["Free Size"],
    desc: "An indigo-and-ivory kaftan patterned with feathered mandalas — soft, flowing, heirloom-grade.",
    img: "https://customer-assets.emergentagent.com/job_ajrakh-artistry/artifacts/w8mbht4t_Gemini_Generated_Image_ruuvpuruuvpuruuv.png" },
  { id: "k5", name: "Crimson Courtyard Kaftan", category: "Kaftans", price: 2500,
    fabric: "Hand-block printed Cotton", sizes: ["Free Size"],
    desc: "A madder-red kaftan with onyx borders and sea-blue tassels — made for long afternoons in the shade of a bougainvillea.",
    img: "https://customer-assets.emergentagent.com/job_ajrakh-artistry/artifacts/6uwqx28b_Gemini_Generated_Image_61p0fs61p0fs61p0.png" },

  // MODAL 3 PIECE SUITS
  { id: "m1", name: "Saanjh Modal 3-Piece Suit", category: "Modal 3 Piece Suits", price: 12500,
    fabric: "Hand-block printed Modal Silk", sizes: ["S","M","L","XL"],
    desc: "A complete three-piece ensemble — kurta, pant and dupatta — in lustrous modal silk, hand-block printed in classic indigo and madder.",
    img: "https://images.unsplash.com/photo-1764583473949-4645bbb6a2d0?crop=entropy&cs=srgb&fm=jpg&w=900" },
  { id: "m2", name: "Heritage Modal 3-Piece Suit", category: "Modal 3 Piece Suits", price: 13800,
    fabric: "Modal Silk", sizes: ["S","M","L","XL"],
    desc: "An heirloom-grade modal silk three-piece suit — kurta, churidar and dupatta — finished with hand-knotted tassels and traditional Khatri motifs.",
    img: "https://images.unsplash.com/photo-1766043071333-5d82991da1ea?crop=entropy&cs=srgb&fm=jpg&w=900" },
];

/* ============= Inject shared header & footer ============= */
const NAV = [
  ["index.html", "Home"],
  ["story.html", "The Ajrakh Story"],
  ["shop.html", "Shop"],
  ["customisation.html", "Customisation & Bulk"],
  ["sustainability.html", "Sustainability"],
  ["about.html", "About"],
  ["contact.html", "Contact"],
];

function injectShell() {
  const current = location.pathname.split("/").pop() || "index.html";

  const headerHTML = `
    <div class="announcement">Hand-block printed in Kutch · Natural dyes · Free shipping across India</div>
    <header class="site-header">
      <div class="container nav-wrap">
        <a href="index.html" class="brand">
          <img src="${LOGO_URL}" alt="Devasaya" class="brand-logo" />
        </a>
        <nav class="primary-nav" id="primary-nav">
          ${NAV.map(([href, label]) => `
            <a href="${href}" class="${current === href ? "active" : ""}">${label}</a>
          `).join("")}
        </nav>
        <button class="menu-toggle" id="menu-toggle" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>`;
  document.getElementById("header").innerHTML = headerHTML;

  const footerHTML = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <img src="${LOGO_URL}" alt="Devasaya" />
        </div>
        <div>
          <p class="eyebrow">Atelier</p>
          <ul>
            <li><a href="story.html">The Ajrakh Story</a></li>
            <li><a href="sustainability.html">Sustainability</a></li>
            <li><a href="customisation.html">Customisation &amp; Bulk</a></li>
            <li><a href="about.html">About Devasaya</a></li>
            <li><a href="shop.html">Shop</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <p class="eyebrow">Reach Us</p>
          <ul>
            <li>+91 93408 53746</li>
            <li>devasaya.24@gmail.com</li>
            <li><a href="https://instagram.com/_devasaya_" target="_blank" rel="noreferrer">Instagram — _devasaya_</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom container">
        <p>© ${new Date().getFullYear()} Devasaya · Handicraft Apparel · Kutch, Gujarat</p>
        <p class="muted">Reviving the heritage of Kutch through intricate block-printed textile.</p>
      </div>
    </footer>`;
  document.getElementById("footer").innerHTML = footerHTML;

  // mobile nav toggle
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("primary-nav");
  toggle?.addEventListener("click", () => nav.classList.toggle("open"));
}

/* ============= Page-specific bootstrap ============= */
document.addEventListener("DOMContentLoaded", () => {
  injectShell();

  // Story video — loop first 10 seconds
  const video = document.getElementById("story-video");
  if (video) {
    video.addEventListener("timeupdate", () => {
      if (video.currentTime >= 10) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    });
  }

  // SHOP page
  const grid = document.getElementById("product-grid");
  if (grid) {
    let activeCat = "All";
    const filterBtns = document.querySelectorAll(".filter");
    function renderGrid() {
      const list = activeCat === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCat);
      grid.innerHTML = list.map((p) => `
        <a class="product-card" href="product.html?id=${p.id}">
          <div class="product-img"><img src="${p.img}" alt="${p.name}" loading="lazy" /></div>
          <p class="eyebrow muted">${p.category}</p>
          <h3 class="serif">${p.name}</h3>
          <p class="fabric">${p.fabric}</p>
          <p class="price">${inr(p.price)}</p>
        </a>
      `).join("");
    }
    renderGrid();
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        activeCat = btn.dataset.cat;
        renderGrid();
      });
    });
  }

  // PRODUCT detail page
  const detail = document.getElementById("product-detail");
  if (detail) {
    const id = new URLSearchParams(location.search).get("id");
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) {
      detail.innerHTML = `<p class="center muted" style="padding:6rem 0">Piece not found. <a href="shop.html" class="link-arrow">← back to shop</a></p>`;
    } else {
      const wa = buildWhatsAppLink(`Namaste, I am interested in "${p.name}" (${inr(p.price)}). Could you share more details?`);
      document.title = `${p.name} — Devasaya`;
      detail.innerHTML = `
        <a href="shop.html" class="back-link">← Collection</a>
        <div class="detail-grid">
          <div class="detail-img"><img src="${p.img}" alt="${p.name}" /></div>
          <div class="detail-info">
            <p class="eyebrow">${p.category}</p>
            <h1 class="serif huge">${p.name}</h1>
            <p class="price-large">${inr(p.price)}</p>
            <div class="meta-block">
              <p class="eyebrow">Fabric</p>
              <p>${p.fabric}</p>
            </div>
            ${p.sizes && p.sizes.length ? `
              <div class="meta-block">
                <p class="eyebrow">Available Sizes</p>
                <div class="size-chips">${p.sizes.map((s) => `<span class="size-chip">${s}</span>`).join("")}</div>
              </div>` : ""}
            <div class="meta-block">
              <p class="eyebrow">The Story</p>
              <p>${p.desc}</p>
            </div>
            <div class="actions">
              <a class="btn btn-madder" href="${wa}" target="_blank" rel="noreferrer">Enquire on WhatsApp</a>
              <a class="btn btn-outline" href="contact.html">Enquire by Email</a>
            </div>
          </div>
        </div>`;
    }
  }

  // CONTACT form
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const subject = `Devasaya enquiry from ${data.name}`;
      const body = `${data.message}\n\n— ${data.name}\n${data.email}${data.phone ? "\n" + data.phone : ""}`;
      window.location.href = `mailto:devasaya.24@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const note = document.getElementById("form-note");
      if (note) { note.hidden = false; note.textContent = "Opening your mail client…"; }
    });
  }
});
