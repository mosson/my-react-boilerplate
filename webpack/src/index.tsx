import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/app';

import * as Relation from './relation';

ReactDOM.render((<App />), document.getElementById('app'));;

console.log(Relation.Question.collection());

const question = Relation.Question.collection().find(question => {
  return question.id == 1;
});

console.log(question);

if(question) {
  console.log(question.answerItems);
  question.sentence = 'hoge';
}

console.log(Relation.db);

