# How to write JS* in 2020

With the advent of NodeJS, TypeScript and many competing frameworks over the past 10 years, the frontend landscape has changed drastically.

JavaScript is no longer just a set of basic commands for running incidental scripts to add trivial interactivity, but rather a fully fledged programning language that requires you to think like a software engineer! (hype! hype! hype!)

In this session we are going to run through a rough crash course to modern JavaScript, TypeScript, NodeJS and React.

### Disclaimer
I make a lot of claims about why things are the way they are, but none of this is reserched and is basically 100% conjecture, observation and oppinion... So don't quote me on any of the history!

### Requirements
* A basic understanding of git
* A computer and a command line (unix preferred)
* A basic understanding of programning in any language

## 01. NodeJS
Back at some point in 2009 people tarted talking about how JS could be brought to the server side. In it's original state, JavaScript simply wouldn't work and so, a new standard emerged named CommonJS (formerly ServerJS).

NodeJS was built ontop of this standard.

### Install NodeJS
If you don't already have it installed, go to https://nodejs.org/en/ and download the latest LTS version.

### Generate a package
With Node, comes the command line tool `npm`, so open up your command line and run
```
$ npm init -y
```
in the project folder.

### Write some code
Now we have a NodeJS app ready to go, let's create our first file, `index.js` in the root of our application and write some really basic code.

```JS
const answer = 42;
console.log(`The Answer is ${answer}`);
```

### Run the application
Now we have written our code we can run it with NodeJS...

```sh
node index.js
```

## 02. Modular code
### Writing our first module
One of the improvements CommonJS brought was the ability to write true modular code in JavaScript. In this world, ever single file is considered a module, and ever module is inherently loaded as a singleton.

Let's create a new mew module called `answers.js` and add the following code.

```js
module.exports = { getAnswer };

function getAnswer() {
  return 42;
}
```

Here we have created a new function called `getAnswer` and then added it to this module's exports so that it can be used in other place. With this setup we can go back to our index page and import our exported module. To do this add the following...
```js
const { getAnswer } = require("./answers");
```

`getAnswer` can now be executed as though it was included in this file so go ahead and replace the hard coded `42` with `getAnswer()`

### Modules are Singletons
As mentioned before, each module is treated more or less as a singleton. This means, once the initial scripts have been executed the result is cached and that cached response is returned for subsequent imports and uses.

To illustrate this point let's give our answers module a slight update.
```js
module.exports = { getAnswer };

let answer = 41;
function getAnswer() {
  answer++;
  return answer;
}

```

Then update our index.js file to get the answer multiple times...
```js
const { getAnswer } = require('./answers');

const answer = getAnswer();
const answer2 = getAnswer();
const answer3 = getAnswer();
console.log(`The Answers are ${answer}, ${answer2} and ${answer3}`);
```

## 03. Typing in JS
### Yes, there are types in JS
Even in vanilla JavaScript there is a concept of types. Just as a quick example of this you can run...

```js
console.log(typeof "this"); console.log(typeof 1); console.log(typeof {});
```

And you will get back the result of `string`, `number`, `object`.

### No, they aren't always useful
As with any typed language, values of the wrong type can't be used in place of each other, however JavaScript brought in a "novel" solution to this problem called coercion. What this means is when you use a value in a context where a different type is expected, it will attempt to convert the value into the expected type.

This is why `("1" + 1) / 2` is `5.5`, and `"b" + "a" + +"a" + "a"` is `"baNaNa"`.

There are lots of rules around how coercion works but we won't waste our time on those. Suffice to say, it means in JavaScript it's tricky to write invalid code, but it's easy to write bad and confusing code.

## 04. Enter TypeScript
### Improve, not replace
TypeScript is a superset of JavaScript that compiles back down to standard JavaScript. The main purpose of the language is to add strict typing to the language. It is not the first language that added typing to JavaScript, however one thing it does differently is that it tries to make the absolute minimal changes to the language to add types.

### Add TypeScript
One of the other things that Node gave us is NPM, Node Package Manager. This gives JavaScript a way to define external dependencies and a place to go find them.

Let's go ahead and add TypeScript to our package. To do that we will use node package manager to install `typescript` and `ts-node` as developer dependencies. (TS Node is a helper that will compile into memory and then run NodeJS)

```sh
npm i typescript ts-node -D
```

Next we will setup our typescript configuration. The later versions of npm come with a tool called npx which allows you to execute node library commands very easily, so we will use this to initialise our typescript project.

```sh
npx tsc --init
```

We now have a `tsconfig.json` file that contains our typescript configuration.
Let's convert all our files to TypeScript.

With TS we have access ES6 module export syntax, so let's go into `answers.js` and delete the existing export block, and instead just add the keyword `export` infront of the `getAnswer` function.

Next we can change our import syntax in `index.js` to `import { getAnswer } from "./answers";`.

Finally, let's name our files properly by changing their extensions to `.ts`.

If your IDE supports the TypeScript you should be able to mouse over values and see their types.

Now let's create a simple start script to run our application. Open up `package.json` and you will find a script's block. In here we are going to add the following...

```json
"scripts": {
    "start": "ts-node ./index.ts"
}
```

This creates an NPM script which we can easily execute from the command line. These scripts are useful as they grant you access to executables within your package without them needing to be part of your `path`.

Go ahead and run `npm run start` just to check everything still works.

### Strict Mode
There are a lot of options in the `tsconfig.json` file, but for now I will only mention one that is enabled by default. `strict`.

This is a short hand for several different options but basically it means every variable needs an explicit, or implicit type, AND it enables strict null checking.

Let's jump into `answers.ts` again and remove the default value for `answers` (i.e. `let answers;`). You will see that as soon as you do this you start getting syntax errors across your file.

First we get `Variable 'answer' implicitly has type 'any' in some locations where its type cannot be determined.` This is because the compiler now has no way of knowing what type answers is and it would have to treat the value as a variant to run. This is not allowed in strict mode.

To fix this, lets add a type that properly describes our answer. Right now it is either undefined, or a number so we can write...
```ts
let answer: number | undefined;
```

Great, but now there's a new error `Object is possibly 'undefined'`. This is because the compiler can not know if answer has been set yet or not. Let's add a null check before we use the value.

```ts
  if (answer) {
    answer++;
  } else {
    answer = 42;
  };
```

The compile error has gone away, and what's more, if you  mouse over the function to see it's return type, you can see that the compiler is aware the null check has been performed and says that the function only returns a `number`, not a `number | undefined`.

## 05. Running in a browser
### NodeJS in the browser?
Cool, NodeJS has modules, TypeScript has types... but I can't do that in a browser can I? Correct, once you get into the browser can't use our fancy scripts and tricks. TypeScript does come with the ability to export to JS but that leaves lots of questions about browser support, module support and the fact that you will have lots of JS files loaded on the client.

### Packaging your code, Webpack
This is where packaging tools come in. There are many tools out there which can bundle up JavaScript into something nice for the browser, but we are going to just talk about Webpack. Even Webpack is so big it could be an entire lecture so for now we are just going to say, Webpack takes a JS/TS entry point, then spiders out through all the imports and runs any loaders (processors) you tell it to against these files.

I have included a webpack configuration file in this project, along with a html file. Let's install the things we need. Webpack, the webpack CLI, webpack dev server and a TypeScript loader.

```sh
npm i webpack webpack-cli webpack-dev-server ts-loader -D
```

Now let's change our start script to run our dev server.

```json
"start": "webpack serve"
```

Then visit [localhost:8080](http//:localhost:8080) and open your console. Wow!

## 06. React
Ok, let's get a SPA library in here so we can actually build something ontop of all this setup.

### Adding react
```sh
npm i react react-dom @types/react @types/react-dom -D
```

There are also a couple of final things we have to setup before this will work. We have to tell TypeScript how to deal with react syntax (jsx), so go into `tsconfig` and add the following line `"jsx": "react"`.

We also need to change our index file extension to `tsx` to idicate that it includes `jsx` syntax and as a result we need to change the `entry` value in our webpack config.

Now we can go back into our index file and add the following imports.
```ts
import React from 'react';
import { render } from 'react-dom';
```

Then replace our console.log with a react render. This is the one and only time we will ever need to touch the DOM.

```tsx
render(
    <div>The Answers are {answer}, {answer2} hello {answer3}</div>,
    document.getElementById("app")
);
```

### Stateless Function Components
Now we have a react app running, lets make some components. First we will go with a stateless component. These operate as pure functions, values are passed in as arguments and then html is rendered out. Any time the inputs (reffered to as props) change, the function fires again and the new html is generated.

```tsx
interface AnswerProps {
    answer: number;
}
const AnswerComponent: React.FunctionComponent<AnswerProps> = (props) => {
    return <div>
        Answer: <strong>{props.answer}</strong>
    </div>;
};
```

We can now use this component in our JSX block like this...

```tsx
render(
    <AnswerComponent answer={getAnswer()} />,
    document.getElementById("app")
);
```

Note that because we are using TypeScript, if you fail to add the `answer` property, you will get a compile error! Fantastic!

### Class Components
Now that stateless component is great and all, but we are building an application, we need to be able to click a button and have a value change.

React has class based, stateful components for this so let's wrap everything in a stateful component.

```tsx
interface PageState {
    answer: number;
}
class PageComponent extends React.Component<{}, PageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            answer: getAnswer()
        }
    }

    public render() {
        return <div>
            <h1>The best app</h1>
            <AnswerComponent answer={this.state.answer} />
            <button>Button</button>
        </div>
    }
}

render(
  <PageComponent />,
  document.getElementById("app")
);
```

Great this has state... but not really since it doesn't change, so let's look at updating state. React subscribes to the idea of uni-directional state flows. That means, no two way binding, no magic. You push changes into state, the component re-runs the render function. Essentially the same concept as in our stateless component.

Let's add a function to change the state.

```tsx
public updateAnswer() {
    this.setState({
        answer: getAnswer()
    });
}
```

Then we can dispatch this state change every time someone clicks on our button.

```tsx
return (
    <div>
        <h1>The best app</h1>
        <AnswerComponent answer={this.state.answer} />
        <button onClick={() => this.updateAnswer()}>Button</button>
    </div>
)
```

### Function Components with State (React Hooks)
Untill recently, building out that whole class was the only way to handle state in a component, however with React 16 a new concept called hooks was added. This basically gives you a one line way of adding state into a function component.

Here is how we could rewrite the previous component with hooks.

```tsx
const PageComponent: React.FunctionComponent = () => {
  const [answer, setAnswer] = React.useState(() => getAnswer());

  return (
    <div>
      <h1>The best app</h1>
      <AnswerComponent answer={answer} />
      <button onClick={() => updateAnswer()}>Button</button>
    </div>
  );

  function updateAnswer() {
    setAnswer(getAnswer());
  }
};
```

## 07. Redux (Bonus round)
### The need for shared state
In a real world application, you can't just pass state down from the parent to children, it gets unmanagable at some point, not to mention the fact that different pages may not share parents at all.

### The Flux pattern
For managing application state in React, the Flux pattern was created. In simple terms this pattern is that you have `actions` which are messages that describe the changes you want, these actions are handed over to a `dispatcher` which processes them and then updates your `store`. Your views then update when the store changes. Then finally, your views can dispatch new actions and the cycle repeats.
* Action -> Dispatcher -> Store -> View

### Redux
While Flux is just a concept, Redux is an implementation of this idea. Redux is made up of Actions, Reducers and the Store.

* Actions are simple POCOs that describe the state change you want. They can look however you want, the only restriction is that they must contain a `type` property which has a string value.
* Reducers are functions which take the current state of the application and an action, then produce a new version of the state. Every reducer in your application will always recieve every action, so if it does not care about a specific action it needs to return an unmodified state.
* The Store then holds the current state of the application.

Let's add redux to our application.

```sh
npm i redux react-redux @types/redux @types/react-redux -D
```

Now that we have real state management, let's blow up that old getAnswer function and do it the right way.

```tsx
import { createStore, Reducer } from "redux"

export interface AnswerState {
  answer: number;
}
const initialState: AnswerState = { answer: 42 };
const answerReducer: Reducer<AnswerState> = (state = initialState, action) => {
  switch (action.type) {
    case "updateAnswer":
      return { answer: state.answer + 1 }
  }

  return state;
}

export const store = createStore(answerReducer);
```

We are using a switch statement in our reducer function to find any action types we want to respond to, and the fall through is to just return an unmodified state.

Now in our index file we can swap out the old state hooks which handled internal state in the component for redux hooks.

```tsx
  const answer = useSelector<AnswerState, number>((state) => state.answer);
  const dispatch = useDispatch();
```

useDispatch gives you access to the redux dispatcher while useSelector allows you to pick a value out of your store. Any time the predicate function's output changes, your component will re-render. 

Now we just need to modify our `updateAnswer` function to dispatch rather than do the work itself.

```tsx
  function updateAnswer() {
    dispatch({ type: "updateAnswer" });
  }
```