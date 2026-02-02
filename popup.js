document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('text-input');

    const brandInput = document.createElement('textarea');
    brandInput.placeholder = "Image text";
    brandInput.style.width = "100%";
    brandInput.style.marginBottom = "10px";
    brandInput.style.padding = "6px";
    brandInput.style.boxSizing = "border-box";
    brandInput.rows = 2;
    document.body.insertBefore(brandInput, document.getElementById('qrcode-container'));

    const container = document.getElementById('qrcode-container');

    const urlParams = new URLSearchParams(window.location.search);
    const customUrl = urlParams.get('customUrl');

    const displaySize = 250; 
    const exportSize = 1000; 

    const getBrandText = () => brandInput.value.trim();

    function debounce(fn, delay) {
        let timer;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    const debouncedGenerate = debounce(generatePreviewQR, 400);

    if (customUrl) {
        textInput.value = customUrl;
        debouncedGenerate();
    } else {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs && tabs.length > 0) {
                textInput.value = tabs[0].url;
                debouncedGenerate();
            } else {
                document.getElementById("status").innerText = "Error";
            }
        });
    }

    textInput.addEventListener('input', debouncedGenerate);
    brandInput.addEventListener('input', debouncedGenerate);

    function generatePreviewQR() {
        const url = textInput.value.trim();
        const brandText = getBrandText();
        if (!url) return;

        container.innerHTML = "";
        const canvas = document.createElement('canvas');
        canvas.width = displaySize;
        canvas.height = displaySize;
        const ctx = canvas.getContext('2d');

        const tempContainer = document.createElement('div');
        new QRCode(tempContainer, {
            text: url,
            width: exportSize,
            height: exportSize,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        setTimeout(() => {
            const qrCanvas = tempContainer.querySelector('canvas');
            if (!qrCanvas) return;

            ctx.drawImage(qrCanvas, 0, 0, displaySize, displaySize);

            if (brandText) drawBrand(ctx, displaySize, brandText);

            container.appendChild(canvas);
        }, 50);
    }

    function drawBrand(ctx, size, text) {
        const lines = text.split('\n').map(l => l.trim()).filter(l => l);
        if (lines.length === 0) return;

        ctx.font = `${size * 0.09}px Arial, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const textWidths = lines.map(l => ctx.measureText(l).width);
        const maxWidth = Math.max(...textWidths);
        const padding = size * 0.04;
        const rectWidth = Math.min(maxWidth + padding*2, size*0.6);
        const rectHeight = lines.length * size*0.08 + padding*2;

        const x = (size - rectWidth)/2;
        const y = (size - rectHeight)/2;

        ctx.fillStyle = "#ffffff";
        ctx.fillRect(x, y, rectWidth, rectHeight);

        ctx.fillStyle = "#000000";
        const lineHeight = rectHeight / lines.length;
        lines.forEach((line, i) => {
            ctx.font = `bold ${lineHeight*0.75}px "Roboto Mono", monospace`;
            ctx.fillText(line, size/2, y + lineHeight/2 + i*lineHeight);
        });
    }

    function generateHighResCanvas(callback) {
        const url = textInput.value.trim();
        const brandText = getBrandText();
        if (!url) return;

        const tempContainer = document.createElement('div');
        new QRCode(tempContainer, {
            text: url,
            width: exportSize,
            height: exportSize,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        setTimeout(() => {
            const canvas = tempContainer.querySelector('canvas');
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (brandText) drawBrand(ctx, exportSize, brandText);
            callback(canvas);
        }, 50);
    }

    document.getElementById('btn-download').addEventListener('click', () => {
        generateHighResCanvas((canvas) => {
            const link = document.createElement('a');
            link.download = 'qr_code.png';
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    });

    document.getElementById('btn-copy').addEventListener('click', () => {
        const status = document.getElementById('status');
        generateHighResCanvas((canvas) => {
            canvas.toBlob((blob) => {
                try {
                    const item = new ClipboardItem({ "image/png": blob });
                    navigator.clipboard.write([item]);
                    status.innerText = "Copied!";
                    setTimeout(() => status.innerText = "", 2000);
                } catch (err) {
                    status.innerText = "Error";
                }
            });
        });
    });
});
