
function generateRandomWord(length = 7) {
    const symbols = "qwertyuiopasdfghjklzxcvbnm";
    let result = "";
    for (let i=0;i<length;i++) {
        result += symbols[
            Math.round(Math.random() * (symbols.length - 1))
        ];
    }
    return result;
}

const generateRandomText = (words = 50) => {
    return new Array(words)
            .fill(null)
            .map(() => generateRandomWord(Math.round(5 + 5 * Math.random())))
            .join(" ");
}

const generateRandomPage = (id) => {
    return {
        id,	
        title: `#${id} ${generateRandomText(3)}`,
        content: generateRandomText(700),
        linkTitle: `#${id} ${generateRandomText(3)}`,
        bgImg: null,	
        bgTheme: "light",
    };
}

/**
 * Just for testing.
 * Please replace with real one 
 */
export
function getPages() {
    return Promise.resolve(
        new Array(5)
            .fill(null)
            .map((v,i) => i + 1)
            .map(id => generateRandomPage(id))
    );
}