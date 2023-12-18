document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    textInput.addEventListener('input', updateParagraphs);
});

function updateParagraphs() {
    const text = document.getElementById('textInput').value;
    const paragraphs = text.split('\n');

    let paragraphsHTML = '';
    paragraphs.forEach((paragraph, index) => {
        if (paragraph.trim() === '') {
            return;
        }

        const words = paragraph.split(' ').filter(Boolean);
        const letters = countLetters(paragraph);
        const gematria = words.reduce((acc, word) => acc + calculateGematria(word), 0);
        paragraphsHTML += `
            <div class="paragraphContainer">
                <div class="paragraph colors">${paragraph}</div>
                <div class="countDisplay">מילים: ${words.length}, אותיות: ${letters}, גימטריה: ${gematria}</div>
            </div>`;
    });

    document.getElementById('paragraphsContainer').innerHTML = paragraphsHTML;
}

function countLetters(paragraph) {
    return (paragraph.match(/[\u0590-\u05FF]/g) || []).length;
}

function calculateGematria(word) {
    const letterValues = {
        א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9,
        י: 10, כ: 20, ך: 20, ל: 30, מ: 40, ם: 40, נ: 50, ן: 50,
        ס: 60, ע: 70, פ: 80, ף: 80, צ: 90, ץ: 90, ק: 100, ר: 200,
        ש: 300, ת: 400
    };
    return Array.from(word).reduce((sum, letter) => sum + (letterValues[letter] || 0), 0);
}

