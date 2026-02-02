# High Quality QR Generator – Chrome Extension

A lightweight Chrome extension that generates high‑quality QR codes (1000×1000 px) for the current page URL or any custom text. Copy the QR image to clipboard or download it as a PNG with a single click.


## ✨ Features

- **High‑resolution QR codes** – generates 1000×1000 px images, crisp and scalable.
- **Brand text overlay** – optionally add custom text (logo, slogan) centered over the QR code.
- **Real‑time preview** – see the QR code instantly as you type, with debounced updates.
- **Two‑action output** – copy the QR image to clipboard or download it as a PNG file.
- **Auto‑fill current page URL** – the pop‑up pre‑fills the active tab’s address.
- **Clean, minimal UI** – a compact pop‑up (320px) with intuitive buttons.
- **No external requests** – uses the pure‑JavaScript [qrcode.js](https://github.com/davidshimjs/qrcodejs) library, works entirely offline.

## 🚀 Installation

### From Chrome Web Store (when published)

*(Link will be added after publication)*

### Manual / Developer install

1. **Download or clone** this repository:
   ```bash
   git clone https://github.com/Rostezkiy/qr-code-extension.git
   ```
2. Open **Chrome** and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top‑right corner).
4. Click **Load unpacked** and select the **folder** containing the extension files (`manifest.json`, `popup.html`, etc.).
5. The extension icon will appear in your toolbar; pin it for quick access.

## 🛠 How to Use

1. Click the extension icon in the Chrome toolbar.
2. The pop‑up opens with a textarea pre‑filled with the current page URL.
   - You can edit the text or paste any other content (URL, plain text, contact info, etc.).
3. The QR code updates automatically as you type.
4. Use the buttons below the QR:
   - **Copy** – copies the QR image to the clipboard (ready to paste into documents, chats, etc.).
   - **Download** – saves the QR code as a PNG file named `qrcode.png`.

## 📁 Project Structure

```
qr‑chrome/
├── manifest.json          # Extension manifest (Chrome API configuration)
├── popup.html             # Pop‑up UI (HTML structure)
├── popup.js               # Core logic: QR generation, copy/download handlers
├── style.css              # Styling for the pop‑up (optional, currently inline)
└── qrcode.min.js          # Minified QR‑code library (qrcode.js v1.0.0)
```

### File details

- **manifest.json** – defines the extension’s name, version, permissions (`activeTab`), and pop‑up entry point.
- **popup.html** – contains the textarea, QR container, buttons, and status message.
- **popup.js** – handles:
  - Reading the current tab’s URL and populating the textarea.
  - Instantiating the QR‑code library with a 1000‑pixel canvas.
  - Binding the **Copy** button to copy the canvas image to clipboard.
  - Binding the **Download** button to trigger a PNG download.
- **qrcode.min.js** – third‑party library (≈50 KB) that performs the actual QR encoding.

## 🔧 Permissions

The extension requests only one permission:

- `activeTab` – to read the URL of the currently active tab and pre‑fill the input field.

No data is sent to any external server; everything stays locally in your browser.

## 🧩 Development / Customization

If you want to modify the extension:

1. Edit `popup.html` to change the layout or add new UI elements.
2. Adjust styles directly in the `<style>` block inside `popup.html` (or link `style.css`).
3. Modify `popup.js` to alter the QR size, add new output formats, or integrate with other APIs.
4. Update `manifest.json` if you change the extension’s name, version, or permissions.
5. **Reload the extension** on `chrome://extensions/` after each change.

### Building from source (optional)

The project uses no build system; all files are plain HTML/JS. You can replace `qrcode.min.js` with a newer version from [qrcodejs](https://github.com/davidshimjs/qrcodejs) if needed.

## 📄 License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing‑feature`).
3. Commit your changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing‑feature`).
5. Open a Pull Request.

## 🙏 Acknowledgements

- **[qrcode.js](https://github.com/davidshimjs/qrcodejs)** – the JavaScript QR‑code library used under the MIT license.
- Chrome Extensions API documentation.

---

**Enjoy generating QR codes effortlessly!** 🎉

If you find this extension useful, consider giving it a star ⭐ on GitHub.
