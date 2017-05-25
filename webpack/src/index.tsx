import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/app';

import * as Relation from './relation';

ReactDOM.render((<App />), document.getElementById('app'));;

const question = Relation.Question.collection().find(question => {
  return question.id == 1;
});

console.log(question);

if(question) {
  console.log(question.answerItems);
}
