import { Suspense, useState } from "react";
import { ContentContainer } from "../../containers/contentContainer";
import React from "react";
import { Reveal } from "../../../util/reveal";
import { WindowDimensions } from "../../../util/windowDimensions";

const MdOutlineKeyboardArrowDown = React.lazy(() =>
  import("react-icons/md").then((module) => ({
    default: module.MdOutlineKeyboardArrowDown,
  }))
);

const MdOutlineKeyboardArrowUp = React.lazy(() =>
  import("react-icons/md").then((module) => ({
    default: module.MdOutlineKeyboardArrowUp,
  }))
);

const questionData = [
  {
    question: "Sa kushton sigurimi TPL për mjetin tim?",
    answer:
      "Çmimi i sigurimit TPL, varion bazuar në kategorizimin e mjetit, fuqinë motorrike, numrin e vendeve dhe vitin e prodhimit të mjetit.",
  },
  {
    question: "Sigurimi i makinës njihet edhe në Kosovë?",
    answer: "Sigurimi TPL përfshin territorin e Shqipërisë dhe të Kosovës.",
  },
  {
    question: "Çfare mbulon sigurimi TPL/KJ/Kufitar dhe ku ndryshojnë ata?",
    answer:
      "Sigurimi i detyrueshëm motorrik, mbulon përgjegjësinë e drejtuesit të mjetit, ndaj dëmeve që mund të mund t’u shkaktojë palëve të treta gjatë qarkullimit me mjetin e siguruar, si shkaktar i një aksidenti.",
  },
  {
    question:
      "Ku mund ta blej sigurimin e mjetit tim dhe a mund ta printoj sigurimin e mjetit tim nga faqja juaj online?",
    answer:
      "Ju mund të pajiseni me sigurimin TPL/KJ/Kufitare, ne çdo zyrë SIGAL UNIQA, duke paraqitur lejen e qarkullimit të mjetit dhe një mjet identifikimi.\nMund të pajiseni me sigurimin TPL/KJ/Kufitare, në aplikacionin për Samrt Phone apo PC, apo dhe duke vizituar faqen tonë të internetit SIGAL.com.al, në rubriken Bli Online.",
  },
  {
    question: "Çfarë duhet të bëj nëse humb siguracionin e makinës?",
    answer:
      "I siguruari duhet të njoftojë kompaninë e sigurimit për humbjen e siguracionit dhe të pajiset me një dublikatë pranë pikave të shitjes SIGAL UNIQA.",
  },
];

function groupByThree<T>(arr: T[]): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += 3) {
    result.push(arr.slice(i, i + 3));
  }
  return result;
}

const RowContainer = ({ children }: { children: JSX.Element }) => {
  return <div className="w-full">{children}</div>;
};

const QuestionContainer = ({
  question,
  answer,
  isMouseOver,
  setIsMouseOver,
}: {
  question: string;
  answer: string;
  isMouseOver: boolean;
  setIsMouseOver: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isCurrentMouseOver, setIsCurrentMouseOver] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      onMouseOver={() => {
        setIsMouseOver(true);
        setIsCurrentMouseOver(true);
      }}
      onMouseOut={() => {
        setIsMouseOver(false);
        setIsCurrentMouseOver(false);
      }}
      onClick={() => {
        setIsExpanded((prev) => {
          return !prev;
        });
      }}
      className={`w-full lg:h-full bg-white p-6 rounded-lg drop-shadow-md hover:lg:scale-110 flex flex-col gap-4 transition-all ${
        isMouseOver && !isCurrentMouseOver ? "lg:opacity-50" : "lg:opacity-100"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="text-presetgray text-lg font-semibold font-header">
          {question}
        </div>
        <div className="lg:hidden">
          {isExpanded ? (
            <Suspense
              fallback={<div style={{ height: "30px", width: "30px" }}></div>}
            >
              <MdOutlineKeyboardArrowUp size={30} />
            </Suspense>
          ) : (
            <Suspense
              fallback={<div style={{ height: "30px", width: "30px" }}></div>}
            >
              <MdOutlineKeyboardArrowDown size={30} />
            </Suspense>
          )}
        </div>
      </div>
      <div
        className={`text-presetgray ${
          isExpanded ? "block" : "hidden lg:block"
        }`}
      >
        {answer}
      </div>
    </div>
  );
};

export default function QnASection() {
  const [isMouseOver, setIsMouseOver] = useState(false);

  var windowDimensions = WindowDimensions();

  return (
    <div className="w-full flex items-center justify-center py-20 bg-gray-100">
      <ContentContainer>
        <Reveal width="100%">
          <div className="flex flex-col gap-10">
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="h2 text-presetgray">Pyetjet me te shpeshta</div>
                <div className="h5 font-semibold text-presetgray max-w-[800px] text-center">
                  Këtu do të gjeni përgjigje për disa nga pyetjet me te shpeshta
                  që lidhen me politikat, pretendimet, pagesat, shërbimet online
                  dhe të tjera.
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-7">
              {groupByThree(questionData).map((group) => {
                return (
                  <RowContainer>
                    <div className="flex flex-col lg:flex-row gap-7 justify-center w-full">
                      {group.map((question, index) => {
                        return (
                          <div className="lg:min-w-[27%] lg:max-w-[27%] min-h-full">
                            <Reveal
                              width="100%"
                              height="100%"
                              delay={
                                windowDimensions.width >= 1024 ? 0.5 * index : 0
                              }
                            >
                              <QuestionContainer
                                question={question.question}
                                answer={question.answer}
                                isMouseOver={isMouseOver}
                                setIsMouseOver={setIsMouseOver}
                              />
                            </Reveal>
                          </div>
                        );
                      })}
                    </div>
                  </RowContainer>
                );
              })}
            </div>
          </div>
        </Reveal>
      </ContentContainer>
    </div>
  );
}
