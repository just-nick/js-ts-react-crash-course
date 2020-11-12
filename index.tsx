import React from "react";
import { render } from "react-dom";
import { getAnswer } from "./answers";

const answer = getAnswer();
const answer2 = getAnswer();
const answer3 = getAnswer();

render(
    <div>The answers are {answer}, {answer2} and {answer3}!</div>,
    document.getElementById("app")
)
