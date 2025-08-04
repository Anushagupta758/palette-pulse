# PLAN.md – Palette Pulse Website Build with Cursor AI

This plan outlines the step-by-step creation of the "Palette Pulse" art e-commerce website. It is designed to be used with Cursor AI, with a strong focus on explaining fundamental HTML and CSS concepts for a university project.

### 0 │ Project Goals & Core Principles

- **Objective:** Build a lightweight, responsive, and aesthetically pleasing homepage for an art website named "Palette Pulse," inspired by `dessineart.com`.
- **Branding:** Use the name "Palette Pulse" and a placeholder logo.
- **File Structure:** Maintain strict separation between content (`index.html`), styling (`styles.css`), and functionality (`scripts.js`).
- **Learning Focus:** Cursor AI must provide clear, commented explanations for all HTML tags, CSS properties, and structural decisions.
- **Color Palette:** Use a neutral and light theme to emphasize the artwork. The primary background will be white (`#FFFFFF`), text will be a dark grey (`#222222`), and accents will be a soft, light color.
- **Technology:** Pure HTML5, Vanilla CSS3, and minimal, vanilla JavaScript (only for the slider and mobile navigation). No frameworks (like Bootstrap or React) are to be used.

### 1 │ Project Folder Structure

Create the following directory and file structure.

/palette-pulse
│
├── index.html # Main homepage content
├── styles.css # All styling rules
├── scripts.js # For hero slider and mobile menu interactivity
│
├── /assets/
│ ├── logo-placeholder.png # A blank 120x50px PNG for the logo
│ ├── hero-1.jpg # Placeholder for the first slider image
│ ├── hero-2.jpg # Placeholder for the second slider image
│ ├── hero-3.jpg # Placeholder for the third slider image
│ ├── painting-1.jpg # Placeholder for featured painting 1
│ ├── painting-2.jpg # Placeholder for featured painting 2
│ ├── painting-3.jpg # Placeholder for featured painting 3
│ └── painting-4.jpg # Placeholder for featured painting 4
│
└── PLAN.md # This file

### 2 │ Global HTML Boilerplate (`index.html`)

- **Document Setup:** Start with `<!DOCTYPE html>` and `<html lang="en">`.
- **Head Section (`<head>`):**
  - `<meta charset="UTF-8">`
  - `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
  - `<title>Palette Pulse | Curated Art Prints & Original Paintings</title>`
  - `<meta name="description" content="Discover and buy unique art prints, original paintings, and more from talented artists at Palette Pulse.">`
  - Link to Google Fonts for "Poppins": `<link rel="preconnect" ...>`
  - Link to the stylesheet: `<link rel="stylesheet" href="styles.css">`
- **Body Section (`<body>`):** Use semantic HTML5 tags.

  - `<header>`: A container for the top-most elements of the site.
    - `#top-bar`: Will contain the logo and utility icons (search, account, etc.).
    - `#main-nav`: The main navigation bar with links and dropdowns.
  - `<main>`: The main content of the page.
    - `#hero-slider`: The full-width image carousel.
    - `#featured-paintings`: The grid of 4 featured artworks.
  - `<footer>`: The footer section.
  - Link to the JavaScript file just before the closing `</body>` tag: `<script src="scripts.js"></script>`

- **Cursor AI Instruction:** Embed detailed HTML comments explaining the purpose of each semantic tag (e.g., ``).

### 3 │ Header Section Part 1: Top Bar (`#top-bar`)

- **Layout:** Use CSS Flexbox.
- **Elements:**
  - **Logo:** An `<a>` tag linking to `index.html`. Inside, an `<img>` with `src="assets/logo-placeholder.png"` and `alt="Palette Pulse Logo"`. Set a fixed width of `120px` in CSS.
  - **Utility Navigation:** A `<div>` containing the right-side icons. This `div` will be pushed to the right using `margin-left: auto;` on the Flexbox container.
    - **Search Bar:** A `<form>` with a text `<input>` and a search icon `<button>`.
    - **Icons:** Use anchor `<a>` tags for Favorites (♥), Account (user icon), and Cart (shopping cart icon). Use placeholder text/icons for now. Each icon should have screen-reader-only text for accessibility (see section 8).

### 4 │ Header Section Part 2: Main Navigation (`#main-nav`)

- **Layout:** A `<nav>` element containing an unordered list `<ul>`. It should be positioned below the `#top-bar`.
- **Styling:**
  - The bar should have a light background and a subtle bottom border.
  - On scroll, it should become "sticky" (`position: sticky; top: 0;`).
  - Links should use the "Poppins" font, be colored `#222`, and have a soft pastel underline (`#b0c4de`) on hover/focus.
- **Navigation Links & Dropdowns:**
  - The main links are: **Home, Artists, Prints, Paintings, Blogs, About Us**.
  - Only **Prints** and **Paintings** will have dropdown menus. The other items are direct links.
  - The dropdown `<ul>` will be nested inside the list item (`<li>`) of its parent. It will be hidden by default (`display: none;`) and appear on hover (`li:hover > .dropdown { display: block; }`).
  - **Cursor AI Instruction:** Explain how `position: relative;` on the `<li>` and `position: absolute;` on the nested dropdown `<ul>` work together. Also, explain why `z-index` is needed to ensure the dropdown appears above other page content.
  - **Dropdown Content:**
    - **Prints →** Wall Art, Vintage, Photography.
    - **Paintings →** Abstract Art, Indian Art, Black & White, Modern Art, Landscape, Nature.
- **Mobile View:** At a breakpoint of `max-width: 768px`, the navigation links will be hidden and replaced by a "hamburger" menu icon. The JavaScript in `scripts.js` will handle toggling the mobile menu's visibility.

### 5 │ Main Content Part 1: Hero Slider (`#hero-slider`)

- **Structure:** A container `div` holding three "slide" `div`s.
- **Images:** Use placeholder images (`hero-1.jpg`, etc.) as background images for the slides. Ensure they cover the entire slide area (`background-size: cover;`).
- **Overlay:** Each slide will have a semi-transparent dark overlay to ensure the text is readable, and a heading like `"Discover Art that Speaks"`.
- **Animation:**
  1.  **CSS First:** Attempt a pure CSS animation using keyframes to cycle through the slides. Explain how `@keyframes` and `animation` properties work.
  2.  **JavaScript Fallback:** If the CSS approach is too complex or rigid, use `scripts.js` to create a simple slider. Explain DOM manipulation (`querySelector`), event listeners (`DOMContentLoaded`), and timing functions (`setInterval`).

### 6 │ Main Content Part 2: Featured Paintings (`#featured-paintings`)

- **Layout:** Use CSS Grid to create a responsive 4-column grid. On smaller screens (`max-width: 992px`), it should become a 2-column grid, and on mobile (`max-width: 576px`), a 1-column grid.
- **Structure:** A section containing a `<h2>Featured Paintings</h2>` and a container `div` with four `<article>` elements, one for each painting card.
- **Card Styling:**
  - Each `<article>` (card) will have a white background, a very soft `box-shadow` (e.g., `box-shadow: 0 4px 15px rgba(0,0,0,0.05);`), and some padding.
  - Inside each card: an `<img>` (using placeholder `painting-*.jpg`), a `<h3>` for the artwork title, and a `<p>` for the artist's name.
  - **Hover Effect:** When hovering over a card's image, the image should smoothly scale up (`transform: scale(1.05);`). This should be contained within the card's boundaries (`overflow: hidden;` on the image container).

### 7 │ Typography & Color Scheme

- **Cursor AI Instruction:** Define these as CSS variables in the `:root` selector for easy management and explanation.
- **Tokens:**
  | Variable Name | Value | Usage |
  | -------------------- | ----------------------------- | --------------------------------------------- |
  | `--font-primary` | `"Poppins", sans-serif` | To be imported from Google Fonts |
  | `--color-text` | `#222222` | Body text, headings, general content |
  | `--color-background` | `#FFFFFF` | Main body background |
  | `--color-accent` | `#b0c4de` | Link hover underlines, subtle highlight lines |
  | `--color-light-grey` | `#f4f4f4` | Light backgrounds, like the footer |
  | `--shadow-soft` | `0 4px 15px rgba(0,0,0,0.05)` | Box shadow for cards |

### 8 │ Accessibility (A11y) & SEO Checklist

This is non-negotiable for a high-quality project.

- **Semantic HTML:** Use `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`, `<article>` correctly.
- **Image Alt Text:** All `<img>` tags must have descriptive `alt` attributes (e.g., `alt="An abstract painting with blue and gold swirls"`). For the placeholder logo, use `alt="Palette Pulse Logo"`.
- **ARIA Roles:** Add `aria-label` to navigation elements (e.g., `<nav aria-label="Main navigation">`).
- **Icons:** All interactive icons must have screen-reader-only text inside them, e.g., `<a><i class="icon-heart"></i><span class="sr-only">View Favourites</span></a>`. The `.sr-only` class will visually hide the text but keep it available for assistive technologies.
- **Focus States:** Ensure all interactive elements (links, buttons) have a clear `:focus` state.

### 9 │ Cursor AI Execution & Interaction Plan

1.  **Setup:** Create the file/folder structure from section 1.
2.  **HTML Foundation:** Generate the full `index.html` boilerplate from section 2, including all empty semantic tags and detailed comments.
3.  **CSS Foundation:** Create `styles.css` and add the CSS variables (`:root`) and basic body styles (font, color) from section 7.
4.  **Component Styling (Step-by-Step):**
    - Style the `#top-bar` using Flexbox. Explain `display: flex`, `justify-content`, `align-items`, and `margin-left: auto`.
    - Style the `#main-nav` and its links.
    - Implement the dropdown CSS using `position`, `display`, and `z-index`, explaining each concept.
    - Build the `#hero-slider` (CSS first, then JS if needed), commenting on the animation/logic.
    - Build the `#featured-paintings` grid, explaining `display: grid`, `grid-template-columns`, and `gap`.
5.  **Responsiveness:** Add the media queries (`@media`) at the end of `styles.css` to handle mobile layouts for the navigation and grids.
6.  **JavaScript:** Write the `scripts.js` file for the mobile menu toggle and (if necessary) the slider. Explain event listeners (`addEventListener`) and class toggling (`classList.toggle`).
7.  **Review & Refine:** Ask Cursor to validate the HTML and CSS using the W3C validator and fix any reported errors.

### 10 │ Stretch Goals (For Future Enhancement)

- **Performance:** Add `loading="lazy"` to all `<img>` tags below the fold (i.e., the featured paintings).
- **Advanced CSS:** Use the `<picture>` element for art-direction on responsive images.
- **Accessibility:** Add a `prefers-reduced-motion` media query to disable animations for users who have that setting enabled.

# PLAN.md - Phase 2: Site Expansion

## 11 │ Page Template Creation

- **Goal:** Create a reusable `template.html` file to avoid code duplication.
- **Action:** Create `template.html` containing the full site structure: `<html>`, `<head>`, `<header>`, `<footer>`, and script links. The `<main>` element should be empty.

## 12 │ Static Page Development

- **Goal:** Build simple, static content pages using the template.
- **Pages:**
  - **`about.html`:** Copy `template.html`. In `<main>`, add "About Us" and "Contact Us" sections.
  - **`blogs.html`:** Copy `template.html`. In `<main>`, add a title and a "coming soon" message.
- **Action:** Update the `href` attributes in the main navigation to point to these new files.

## 13 │ Category Page Development (Two-Column Layout)

**Goal:** Build a category page template with a filter sidebar and a product grid, as inspired by the provided reference image. This template will be used for `paintings.html`, `prints.html`, and other listing pages.

---

### **A. HTML Structure (`<main>` Section)**

The `<main>` section for these pages will be structured into a primary two-column grid.

1.  **Promotional Banner (Optional):**

    - Just below the `<header>`, add a `<div>` with a class like `.promo-banner`.
    - Content: "✨ EXTRA 20% OFF Orders Over ₹5000 | Ends in: <span id='countdown'>15:04:48</span> ✨"
    - The countdown `<span>` will be updated by `scripts.js`.

2.  **Main Content Container:**

    - Create a container `<div>` with a class like `.category-container`. This will be the CSS Grid container for the sidebar and product grid.
    - Inside, add a `<h1>` for the page title (e.g., "All Paintings").

3.  **Filter Sidebar (`<aside>`):**

    - Create an `<aside>` element with a class like `.filter-sidebar`. This is the left column.
    - Inside the sidebar, use the `<details>` and `<summary>` HTML elements to create collapsible filter sections. This is accessible and requires no JavaScript for the open/close functionality.
    - **Structure for each filter group:**
      ```html
      <details open>
        <summary>Style / Theme</summary>
        <ul>
          <li>
            <label
              ><input type="checkbox" name="theme" value="abstract" />
              Abstract</label
            >
          </li>
          <li>
            <label
              ><input type="checkbox" name="theme" value="modern" />
              Modern</label
            >
          </li>
          <li>
            <label
              ><input type="checkbox" name="theme" value="landscape" />
              Landscape</label
            >
          </li>
        </ul>
      </details>
      ```
    - Create filter groups for **"Style / Theme"** and **"Size"**.

4.  **Product Display Area (`<section>`):**
    - Create a `<section>` element with a class like `.product-display`. This is the right column.
    - **Sorting Dropdown:** At the top, add a `div` with a class `.sort-container`.
      - Inside, include a `<label for="sort-by">Sort by:</label>` and a `<select name="sort-by" id="sort-by">` element with options like "Featured", "Newest", "Price: Low to High", "Price: High to Low".
    - **Product Grid:** Create a `div` with a class `.product-grid`.
      - Populate this grid with numerous `<article>` cards, reusing the same structure and styling from the homepage's featured section.
      - Add a `<span>` with a class like `.badge` inside the product card's image container to display text like "New" or "15% Off".

---

### **B. CSS & JavaScript**

1.  **Layout (`styles.css`):**

    - **`.category-container`**:
      - Apply `display: grid;`.
      - Set `grid-template-columns: 280px 1fr;` to create a fixed-width sidebar (`280px`) and a flexible main content area (`1fr`).
      - Add a `gap: 30px;` for spacing.
    - **Responsiveness:** Use a media query (`@media (max-width: 768px)`) to change the `grid-template-columns` to `1fr`, making the sidebar stack on top of the product grid on mobile devices.

2.  **Filter Sidebar Styling:**

    - Style the `<details>` and `<summary>` elements to match the reference (e.g., fonts, borders).
    - The default triangle marker can be styled using `summary::marker`.
    - Style the `ul` and `li` elements to be clean and readable.

3.  **Product Badge Styling:**

    - The image container inside the product card should have `position: relative;`.
    - The `.badge` span should have `position: absolute;` with `top` and `right` properties to place it correctly on the image. Style it with a background color and padding.

4.  **Countdown Timer (`scripts.js`):**
    - Write a simple JavaScript function that targets the `<span id='countdown'>` element.
    - Use `setInterval()` to update the time every second, creating a countdown effect. This adds a dynamic element to the page.
