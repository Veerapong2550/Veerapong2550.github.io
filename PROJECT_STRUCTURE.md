# Sweet Gypsy Design – Project Structure

## 📁 Directory Layout
```
Project01/
├── index.html                 # Main HTML file
├── css/                       # Stylesheets (all linked in index.html)
│   ├── variables.css         # CSS custom properties & colors
│   ├── base.css              # Base typography & resets
│   ├── animations.css        # Keyframe animations
│   ├── nav.css               # Navigation bar styling
│   ├── hero.css              # Hero section
│   ├── collections.css       # Product collections
│   ├── sections.css          # Story, inspiration, reviews sections
│   ├── contact.css           # Contact form styling
│   ├── modal.css             # Product detail modal
│   ├── responsive.css        # Mobile/tablet breakpoints
│   └── style.css             # Additional styles
├── js/                        # JavaScript modules (all loaded in index.html)
│   ├── i18n.js               # Internationalization strings (Thai, EN, 中文, 日本語)
│   ├── lang.js               # Language switching logic
│   ├── nav.js                # Navigation hamburger & scroll behavior
│   ├── catalog.js            # Product catalog - fetches from Google Sheets
│   ├── modal.js              # Product detail modal interactions
│   ├── contact.js            # Contact form validation
│   ├── main.js               # Main entry point - initializes all modules
│   └── web3forms.js          # Web3Forms integration for form submission
└── img/                       # Product images
    ├── ring.png
    ├── necklace.png
    ├── earrings.png
    └── bracelet.png
```

## 🔗 How Everything Connects

### HTML → CSS (lines 52-61 in index.html)
All CSS files are imported in order:
1. `variables.css` – Define color, spacing, font variables
2. `base.css` – Typography and element resets
3. `animations.css` – Smooth animations/transitions
4. `nav.css`, `hero.css`, `collections.css`, etc. – Section-specific styles
5. `responsive.css` – Mobile/tablet adaptations (loaded last to override)

### HTML → JavaScript (lines 534-541 in index.html)
Scripts load in dependency order:
1. `i18n.js` – Provides `i18n` translation object
2. `nav.js` – Navigation functions used by main.js
3. `catalog.js` – Product fetching & rendering
4. `lang.js` – Language switching function `setLang()`
5. `modal.js` – Product modal functions
6. `contact.js` – Form validation
7. `main.js` – Initializes everything on DOMContentLoaded
8. `web3forms.js` – External form submission handler

### HTML → Images (lines 208, 212, 216, 220)
Collection tab images reference `img/` folder:
```html
<img src="img/ring.png" alt="Rings">
<img src="img/necklace.png" alt="Necklace">
<img src="img/earrings.png" alt="Earrings">
<img src="img/bracelet.png" alt="Bracelets">
```

## 📊 Data Flow

```
index.html
  ↓
  ├─→ CSS (styling)
  ├─→ i18n.js (translations)
  ├─→ lang.js (setLang)
  ├─→ nav.js (navigation)
  ├─→ catalog.js (fetches Google Sheets)
  │   └─→ Google Sheets API
  │       └─→ Renders product cards
  │           └─→ img/ (product images)
  ├─→ modal.js (show/hide product details)
  ├─→ contact.js (form validation)
  ├─→ main.js (DOMContentLoaded orchestrator)
  └─→ web3forms.js (form submission → Web3Forms API)
```

## 🎯 Key Integration Points

| Component | Connects To | Purpose |
|-----------|-----------|---------|
| `i18n.js` | `lang.js`, `main.js` | Provides `currentLang` and `i18n[lang]` object |
| `catalog.js` | Google Sheets | Fetches product data dynamically |
| `modal.js` | `catalog.js` | Opens product details when card is clicked |
| `contact.js` | `web3forms.js` | Validates form before Web3Forms submission |
| `nav.js` | HTML anchors | Smooth scrolling between sections |
| `lang.js` | All modules | `setLang()` switches language globally |

## ✅ All Files Connected
- ✓ 11 CSS files properly cascaded
- ✓ 8 JavaScript modules in correct load order  
- ✓ 4 Product images in img/ folder
- ✓ HTML references all assets with correct paths
- ✓ No broken dependencies
