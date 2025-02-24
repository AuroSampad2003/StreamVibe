import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { faq } from "../assets/faq";
import { ThemeProvider } from "@material-tailwind/react";

// eslint-disable-next-line react/prop-types
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

function Faq() {
  const [open, setOpen] = React.useState(null);
  const [showForm, setShowForm] = useState(false);
  const [question, setQuestion] = useState("");

  const handleOpen = (value) => setOpen(open === value ? null : value);
  const handleSubmit = () => {
    console.log("User Question:", question);
    setQuestion("");
    setShowForm(false);
  };

  const theme = {
    accordion: {
      defaultProps: {
        icon: undefined,
        className: "",
        animate: {
          unmount: {
            opacity: 0,
            height: 0,
          },
          mount: {
            opacity: 1,
            height: "auto",
          },
        },
        disabled: false,
      },
      styles: {
        base: {
          container: {
            display: "",
            position: "relative",
            width: "w-full",
          },
          header: {
            initial: {
              display: "flex",
              justifyContent: "justify-between",
              alignItems: "items-center",
              width: "w-full",
              py: "py-4",
              borderWidth: "",
              color: "text-blue-gray-700",
              fontSmoothing: "antialiased",
              fontFamily: "font-sans",
              fontSize: "text-xl",
              textAlign: "text-left",
              fontWeight: "font-semibold",
              lineHeight: "leading-snug",
              userSelect: "select-none",
              hover: "",
              transition: "transition-colors",
            },
            active: { color: "text-blue-gray-900" },
            icon: {
              ml: "ml-4",
            },
          },
          body: {
            display: "block",
            width: "",
            py: "pb-2",
            mx: "mx-20",
            color: "text-gray-700",
            fontSmoothing: "antialiased",
            fontFamily: "font-sans",
            fontSize: "text-sm",
            fontWeight: "font-light",
            lineHeight: "leading-normal",
          },
          disabled: {
            pointerEvents: "pointer-events-none",
            opacity: "opacity-10",
          },
        },
      },
    },
  };

  return (
    <div className="text-white px-20 xl-max:px-10 sm-max:px-3 pb-16 ">
      <div className="pt-24 flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-4xl xl-max:text-3xl sm-max:text-2xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-5 text-lg xl-max:text-base sm-max:text-sm text-gray1">
            Got questions? We&apos;ve got answers! Check out our FAQ section to find
            answers to the most common questions about StreamVibe.
          </p>
        </div>
        <button
          className="bg-red1 text-white px-4 py-2 rounded-lg hover:bg-red-900"
          onClick={() => setShowForm(!showForm)}
        >
          Ask a Question
        </button>
      </div>

      {showForm && (
        <div className="mt-4 p-4 bg-black2 rounded-lg flex items-center gap-4">
          <textarea
            className="w-full p-2 bg-black3 text-white border border-black4 rounded-lg"
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
          <button
            className="mt-2 bg-red1 text-white px-4 py-2 rounded-lg hover:bg-red-900"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}

      <div className="mt-8 grid grid-cols-2 gap-6 md-max:grid-cols-1 md-max:grid-rows-1">
        {faq.map((item, index) => {
          return (
            <ThemeProvider value={theme} key={index}>
              <div>
                <Accordion
                  open={open === index}
                  icon={<Icon id={index} open={open} />}
                >
                  <AccordionHeader
                    onClick={() => handleOpen(index)}
                    className="text-white"
                  >
                    <div className="flex items-center gap-3 mx-5">
                      {/* number */}
                      <div className="border border-black5 bg-black4 p-2 inline text-center rounded-lg">
                        {item.number}
                      </div>
                      {/* Heading */}
                      <div>
                        {item.heading}
                      </div>
                    </div>
                  </AccordionHeader>
                  {/* paragraph */}
                  <AccordionBody
                    className="text-gray1"
                  >
                    {item.paragraph}
                  </AccordionBody>
                </Accordion>
                <hr className="w-[86%] mx-2 hr-gradient" />
              </div>

            </ThemeProvider>
          );
        })}
      </div>
    </div>
  );
}

export default Faq;
