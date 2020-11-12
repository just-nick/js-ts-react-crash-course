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

interface PageState {
    answer: number;
}
class PageComponent extends React.Component<{}, PageState> {
    constructor() {
        super({});

        this.state = {
            answer: getAnswer()
        }
    }

    public render() {
        return <div>
            <h1>The best app</h1>
            <AnswerComponent answer={this.state.answer} />
            <button onClick={() => this.updateAnswer()}>Button</button>
        </div>
    }

    public updateAnswer() {
        this.setState({
            answer: getAnswer()
        });
    }
}

render(
    <PageComponent />,
    document.getElementById("app")
)
