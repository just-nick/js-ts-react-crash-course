let answer: undefined | number;

export function getAnswer() {
    if (answer) {
        answer++;
    }
    else {
        answer = 42;
    }

    return answer;
}
