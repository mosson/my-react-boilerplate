import * as _ from 'lodash';

// TODO build relation function to decorator

export const db = {
  Question: [
    { id: 1, sentence: 'Q1' },
    { id: 2, sentence: 'Q2' },
  ],
  AnswerItem: [
    { id: 1, question_id: 1, sentence: 'Q1-A1' },
    { id: 2, question_id: 1, sentence: 'Q1-A2' },
    { id: 3, question_id: 2, sentence: 'Q2-A1' },
    { id: 4, question_id: 2, sentence: 'Q2-A2' },
  ]
};

export class Relation<T> {
  private buffer: T[];

  constructor(...args: T[]) {
    this.buffer = args;
  }

  each(block: (i: T) => any) {
    return _.each<T>(this.buffer, block);
  }

  map<TResult>(block: (i: T) => TResult) {
    return _.map<T, TResult>(this.buffer, block);
  }

  find(block: (i: T) => boolean): T | undefined {
    return _.find<T>(this.buffer, block);
  }

  where(block: (i: T) => boolean): T[] {
    return _.filter<T>(this.buffer, block);
  }
}

export interface QuestionProps {
  id: number;
  sentence: string;
}

export class Question implements QuestionProps {
  static collection(): Relation<Question> {
    return new Relation<Question>(
      ..._.map<QuestionProps, Question>(db.Question, (props: QuestionProps) => {
        return new Question(props);
      })
    );
  }

  public readonly id: number;
  public readonly sentence: string;

  constructor(props: QuestionProps) {
    this.id = props.id;
    this.sentence = props.sentence;
  }

  get answerItems() {
    return AnswerItem.collection().where(answerItem => {
      return answerItem.question_id === this.id;
    });
  }
}

export interface AnswerItemProps {
  readonly id: number;
  readonly question_id: number;
  sentence: string;
}

export class AnswerItem implements AnswerItemProps {
  static collection(): Relation<AnswerItem> {
    return new Relation<AnswerItem>(
      ..._.map<AnswerItemProps, AnswerItem>(db.AnswerItem, (props: AnswerItemProps) => {
        return new AnswerItem(props);
      })
    );
  }

  public readonly id: number;
  public readonly question_id: number;
  public readonly sentence: string;

  constructor(props: AnswerItemProps) {
    this.id = props.id;
    this.question_id = props.question_id;
    this.sentence = props.sentence;
  }
}
