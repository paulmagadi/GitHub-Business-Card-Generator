# GitHub Business Card Generator 🧑‍💻

A lightweight web app that lets you generate a stylish business card from any GitHub username or profile URL. You can download the card as a PDF , PNG or share it directly along with the GitHub link. Includes dark mode support!

![Preview](preview.png)

---

## 🚀 Features

- 🔍 Fetch GitHub profile data (name, avatar, bio, stats, etc.)
- 📦 Calculate total public repositories and stars
- 🌐 Generate a QR code linking to the GitHub profile
- 📄 Download the business card as a PDF (via [jsPDF](https://github.com/parallax/jsPDF))
- 📄 Download the business card as a png (via [html2canvas](https://github.com/niklasvh/html2canvas))
- 📤 Share the card image + GitHub link (via Web Share API)
- 🌙 Toggle between Light and Dark mode
- 📱 Mobile-friendly layout

---

## 🔧 How It Works

1. Enter a GitHub username or full profile URL.
2. Click **Generate Card**.
3. The app fetches profile data using the GitHub REST API.
4. A visually styled business card is rendered.
5. You can:
   - Click **Download PDF** or Click **Download PNG** to save it.
   - Click **Share** to send the card image and link.
   - Toggle between light/dark mode.

---

## 🛠️ Tech Stack

- Vanilla JavaScript (ES6)
- HTML5 + CSS3
- [GitHub REST API](https://docs.github.com/en/rest)
- [jsPDF](https://github.com/parallax/jsPDF)
- [html2canvas](https://github.com/niklasvh/html2canvas)
- [QR Server API](https://goqr.me/api/)

---

## 📷 Screenshots

| Light Mode | Dark Mode |
|------------|-----------|
| ![light](screenshots/light.png) | ![dark](screenshots/dark.png) |

---

## 📂 Project Structure

```
📁 github-business-card/
├── index.html # Main web page
├── style.css # Embedded CSS styles
├── script.js # JavaScript logic (if separated)
├── preview.png # Preview image for README
└── README.md # You're here!
```


---

## 📦 Installation

No installation required! Just open the `index.html` in your browser.

---

## Deploy it with GitHub Pages:

```bash
git clone https://github.com/paulmagadi/github-business-card-generator.git
cd github-business-card
```
Then open index.html or host it.

---

## 📤 Share and Download Limitations
Sharing uses the Web Share API, which is supported on most modern mobile browsers.

If unsupported, the image is automatically downloaded instead.

---

## 🔒 Privacy & Limitations
The app only fetches public GitHub profile and repository data.

GitHub API rate limits may apply for unauthenticated requests (60/hour).

---

## 📃 License
MIT License. Use freely, modify, and share!

## 🙋‍♂️ Author
**Paul Magadi**
💼 LinkedIn
📂 Portfolio
💻 GitHub

## ⭐️ Support
If you find this useful, star the repo and share it with fellow devs!