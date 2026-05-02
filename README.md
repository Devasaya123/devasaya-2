# DEVASAYA — Vanilla HTML / CSS / JS (multi-page)

A zero-build, drop-anywhere edition of the Devasaya site, with each page as its own HTML file — just like the live preview.

## Files

| File | Purpose |
|---|---|
| `index.html` | Home — hero, pillars, atelier strip, reach us, "Hands behind the cloth" callout |
| `story.html` | The Ajrakh Story (with looping 10s video) |
| `shop.html` | Product grid with category filter |
| `product.html` | Product detail page (uses `?id=` query param, e.g. `product.html?id=k1`) |
| `customisation.html` | Bulk Stitching & Customisation services |
| `sustainability.html` | Values & commitments |
| `about.html` | Brand story |
| `contact.html` | Contact form (mailto fallback) + WhatsApp |
| `style.css` | Shared styling (Cormorant Garamond + Manrope, indigo/ivory/madder/ochre) |
| `script.js` | Shared logic — header/footer injection, shop filter, product detail, video loop, contact mailto, mobile nav |

## Run locally
Open any HTML file directly, or serve the folder:
```bash
npx serve .            # any port
python3 -m http.server # localhost:8000
```

## Deploy to GitHub Pages
1. Push the contents of this folder to a GitHub repo's root.
2. **Settings → Pages → Source: Deploy from branch → `main` / `/ (root)`**.
3. Your site is live at `https://YOUR-USERNAME.github.io/REPO-NAME/`.

## Edit content
- **Add / remove products:** open `script.js` and edit the `PRODUCTS` array near the top. Each entry needs `id`, `name`, `category`, `price`, `fabric`, `sizes[]`, `desc`, `img`. Categories: `Sarees`, `Shirts`, `Cordsets`, `Kaftans`, `Modal 3 Piece Suits`.
- **Edit copy / images:** open the relevant `*.html` file.
- **Tweak colours / fonts / spacing:** edit the variables and rules at the top of `style.css`.
- **Header / Footer / Nav links:** edit the `NAV` array and the `injectShell()` function in `script.js`.

## Brand contact
- 📞 +91 93408 53746 · ✉️ devasaya.24@gmail.com
- 📷 Instagram — `_devasaya_`

*Hand-block printed in Kutch · Natural dyes · Made to last decades.*
