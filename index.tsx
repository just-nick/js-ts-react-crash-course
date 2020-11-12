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

const PageComponent: React.FunctionComponent = () => {
    const [answer, setAnswer] = React.useState(() => getAnswer());

    return <div>
        <h1>The best app</h1>
        <AnswerComponent answer={answer} />
        <button onClick={() => updateAnswer()}>Button</button>
    </div>

    function updateAnswer() {
        setAnswer(getAnswer());
    }
}

render(
    <PageComponent />,
    document.getElementById("app")
)
