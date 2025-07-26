export const faq = [
    {
        number: '01',
        heading: 'What is StreamVibe?',
        paragraph: 'StreamVibe is a streaming service that allows you to watch movies and shows on demand.'
    },
    {
        number: '02',
        heading: 'How much does StreamVibe cost?',
        paragraph: 'The cost of StreamVibe depends on the subscription plan you choose. Visit "Subscriptions" or "Plans" section for the latest pricing information.'
    },
    {
        number: '03',
        heading: 'What content is available on StreamVibe?',
        paragraph: 'StreamVibe offers a wide variety of movies, TV shows, and possibly exclusive originals. Content availability may vary by region.'
    },
    {
        number: '04',
        heading: 'How can I watch StreamVibe?',
        paragraph: 'You can stream StreamVibe on our website, mobile app, smart TVs, and supported streaming devices. Just log in to your account to start watching.'
    },
    {
        number: '05',
        heading: 'How do I sign up for StreamVibe?',
        paragraph: 'Sign up by visiting the StreamVibe website or downloading the app. Simply follow the prompts to create an account and select your subscription plan.'
    },
    {
        number: '06',
        heading: 'What is the StreamVibe free trial?',
        paragraph: 'New users may be eligible for a free trial period to explore StreamVibe before subscribing. Details on duration and availability are provided during signup.'
    },
    {
        number: '07',
        heading: 'How do I contact StreamVibe customer support?',
        paragraph: 'Contact customer support via the "Support" section on the StreamVibe website or app. Simply fill out the contact-form with your inquiry, and our support team will get back to you as soon as possible.'
    },
    {
        number: '08',
        heading: 'What are the StreamVibe payment methods?',
        paragraph: 'We accept major credit and debit cards, digital wallets, and selected regional payment options. The full list of available payment methods is displayed during signup.'
    },
]

// Assuming this is part of your main JS file handling the FAQ section

document.addEventListener("DOMContentLoaded", () => {
    const askButton = document.getElementById("askQuestionBtn");
    const questionForm = document.getElementById("questionForm");
    const submitQuestion = document.getElementById("submitQuestion");
    const questionInput = document.getElementById("questionInput");

    askButton.addEventListener("click", () => {
        questionForm.style.display = questionForm.style.display === "none" ? "block" : "none";
    });

    submitQuestion.addEventListener("click", () => {
        const question = questionInput.value.trim();
        if (question) {
            console.log("User Question:", question);
            questionInput.value = ""; // Clear input after submission
        } else {
            alert("Please enter a question before submitting.");
        }
    });
});
