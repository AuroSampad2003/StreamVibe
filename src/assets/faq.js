export const faq = [
    {
        number: '01',
        heading: 'What is StreamVibe?',
        paragraph: 'StreamVibe is a streaming service that allows you to watch movies and shows on demand.'
    },
    {
        number: '02',
        heading: 'How much does StreamVibe cost?',
        paragraph: 'StreamVibe is a streaming service that allows you to watch movies and shows on demand.'
    },
    {
        number: '03',
        heading: 'What content is available on StreamVibe?',
        paragraph: 'StreamVibe is a streaming service that allows you to watch movies and shows on demand.'
    },
    {
        number: '04',
        heading: 'How can I watch StreamVibe?',
        paragraph: 'StreamVibe is a streaming service that allows you to watch movies and shows on demand.'
    },
    {
        number: '05',
        heading: 'How do I sign up for StreamVibe?',
        paragraph: 'StreamVibe is a streaming service that allows you to watch movies and shows on demand.'
    },
    {
        number: '06',
        heading: 'What is the StreamVibe free trial?',
        paragraph: 'StreamVibe is a streaming service that allows you to watch movies and shows on demand.'
    },
    {
        number: '07',
        heading: 'How do I contact StreamVibe customer support?',
        paragraph: 'StreamVibe is a streaming service that allows you to watch movies and shows on demand.'
    },
    {
        number: '08',
        heading: 'What are the StreamVibe payment methods?',
        paragraph: 'StreamVibe is a streaming service that allows you to watch movies and shows on demand.'
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
