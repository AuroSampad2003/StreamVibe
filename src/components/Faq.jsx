import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { faq } from "../assets/faq";
import { ThemeProvider } from "@material-tailwind/react";
import { BsChevronDown } from "react-icons/bs";

// eslint-disable-next-line react/prop-types
function Icon({ id, open }) {
  return (
    <BsChevronDown
  className={`h-5 w-5 transition-transform ${id === open ? "rotate-180" : ""}`}
/>
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
            active: { color: "text-[#999999]" },
            icon: {
              ml: "ml-4",
            },
          },
          body: {
            display: "block",
            width: "",
            py: "pb-2",
            mx: "mx-12",
            color: "text-[#999999]",
            fontSmoothing: "antialiased",
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
    <div className="text-white px-20 xl-max:px-10 sm-max:px-3 pb-16 mt-16">
      <h1 className="font-semibold text-4xl xl-max:text-3xl sm-max:text-2xl mb-4">
        Frequently Asked Questions
      </h1>
      <div className="flex flex-wrap gap-4 justify-between items-start mb-10">
        <div className="flex-1 min-w-[250px]">
          <p className="text-base xl-max:text-sm md-max:text-xs text-[#999999]">
            Got questions? We&apos;ve got answers! Check out our FAQ section to find
            answers to the most common questions about StreamVibe.
          </p>
        </div>
        <button
          className="bg-[#E50000] text-white text-base xl-max:text-sm md-max:text-sm px-4 py-2 rounded-md hover:bg-red-900 self-start md:self-center"
          onClick={() => setShowForm(!showForm)}
        >
          Ask a Question
        </button>
      </div>

      {showForm && (
        <div className="mt-4 p-4 rounded-lg flex items-center gap-4">
          <textarea
            className="w-full p-2 bg-[#1F1F1F] text-white text-base xl-max:text-sm md-max:text-xs border border-[#262626] rounded-md"
            placeholder="Type your question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></textarea>
          <button
            className="mt-2 bg-[#E50000] text-white text-base xl-max:text-sm md-max:text-sm px-4 py-2 rounded-lg hover:bg-red-900"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      )}

      <div className="mt-8 grid grid-cols-2 gap-x-20 gap-y-6 md-max:grid-cols-1 md-max:grid-rows-1">
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
                    <div className="flex items-center gap-3">
                      {/* number */}
                      <div className="border border-[#262626] bg-[#1F1F1F] p-2 inline text-center text-xl xl-max:text-lg md-max:text-base rounded-lg">
                        {item.number}
                      </div>
                      {/* Heading */}
                      <div className="text-xl xl-max:text-lg md-max:text-base font-medium">
                        {item.heading}
                      </div>
                    </div>
                  </AccordionHeader>
                  {/* paragraph */}
                  <AccordionBody
                    className="text-[#999999] text-base xl-max:text-sm md-max:text-xs"
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
