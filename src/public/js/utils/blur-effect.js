const applyBlur = () => {
    console.log('applyBlur');
    const divs = document.querySelectorAll('div');
    const form = document.querySelectorAll('form');
    divs.forEach(div => {
        // Kecuali dengan id="overlay-info" dan id="form-overlay"
        if (div.id !== 'overlay-info' && div.id !== 'form-overlay') {
            div.classList.add('blur');
        }
    });
}

// Fungsi untuk menghapus kelas blur dari semua elemen
const removeBlur = () => {
    const divs = document.querySelectorAll('div');
    divs.forEach(div => {
        div.classList.remove('blur');
    });
}

export { applyBlur, removeBlur };

