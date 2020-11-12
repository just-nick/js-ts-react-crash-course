import React from "react";
import { render } from "react-dom";
import { getAnswer } from "./answers";

interface AnswerProps {
    answer: number;
}
const AnswerComponent: React.FunctionComponent<AnswerProps> = (prop) => {
    return <div>
        Answer: <strong>{prop.answer}</strong>
    </div>
};

render(
    <AnswerComponent answer={getAnswer()} />,
    document.getElementById("app")
)
