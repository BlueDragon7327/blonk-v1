const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Expanded greetings list with slang like "wsp shawty"
const greetings = [
    'Hello', 'Hi', 'Hey', 'What’s up', 'Howdy', 'Greetings', 'Good morning', 'Good afternoon',
    'Good evening', 'How are you', 'How’s it going', 'What’s good', 'What’s happening', 'What’s popping',
    'Yo', 'Sup', 'Wassup', 'Wsg', 'Wsp', 'Wsp shawty', 'How’s everything', 'How’s life', 'What’s cracking',
    'What’s new', 'How you doing', 'Salutations', 'Hey there', 'Hiya', 'Welcome', 'Yo, what’s up',
    'Long time no see', 'Hey, how’s it going', 'Yo, how you been', 'Hi there, how are you', 'What’s the word',
    'Sup, fam', 'What’s the deal', 'What’s good, bro', 'Sup dude', 'Hey yo', 'Holla', 'What’s the vibe',
    'What’s the haps', 'What’s the 411', 'What’s cracking, homie', 'How’s your day going', 'Sup, homie',
    'What’s up, man', 'What’s up, girl', 'What’s the mood', 'Hi, stranger', 'Welcome back', 'Look who it is',
    'How you doing, buddy', 'What’s going on', 'Yo, fam', 'What’s happening, fam', 'How’s it hanging',
    'What’s the scoop', 'What’s the lowdown', 'Waddup', 'How you been', 'What’s the buzz', 'What’s new, fam',
    'Yo, what’s up with you', 'W’sup', 'How’s your day treating you', 'How’s tricks', 'What’s the situation',
    'What’s the word on the street', 'G’morning', 'What’s up with you today', 'What’s up, homie',
    'What’s poppin’, bro', 'Good to see you', 'Nice to meet you', 'What’s the news', 'Sup with you',
    'Howdy, partner', 'Yo, what’s going on', 'What’s shaking', 'What’s cookin’,', 'What’s on the go',
    'What’s up, fam', 'Hi there, stranger', 'Yo, what it do', 'Wsp shawty', 'Yo shawty', 'Wassup shawty'
];

// Helper function to remove punctuation from a string
function removePunctuation(str) {
    return str.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").toLowerCase();
}

// Map common slang to their standard form
function normalizeInput(input) {
    const slangMapping = {
        "wsp": "what’s up",
        "wsg": "what’s good",
        "wassup": "what’s up",
        "yo": "hey",
        "shawty": ""  // We'll just remove 'shawty' for now as it doesn't change the greeting
    };

    // Replace slang with standardized phrases
    let normalizedInput = input.toLowerCase();
    Object.keys(slangMapping).forEach(slang => {
        const regex = new RegExp(`\\b${slang}\\b`, 'g');
        normalizedInput = normalizedInput.replace(regex, slangMapping[slang]);
    });

    return normalizedInput;
}

// Route to check user input for a greeting
app.get('/detectGreeting', (req, res) => {
    const userInput = req.query.input || "";
    const normalizedInput = removePunctuation(userInput); // Remove punctuation from the input
    const normalizedInputWithSlang = normalizeInput(normalizedInput); // Normalize slang

    // Check if any greeting matches the normalized input
    const foundGreeting = greetings.find(greeting => normalizedInputWithSlang.includes(removePunctuation(greeting)));

    if (foundGreeting) {
        res.json({ message: `Greeting detected: ${foundGreeting}!` });
    } else {
        res.json({ message: "No greeting detected." });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
