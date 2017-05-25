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
  private records: T[];

  constructor(...args: T[]) {
    this.records = args;
  }

  each(block: (i: T) => any) {
    return _.each<T>(this.records, block);
  }

  map<TResult>(block: (i: T) => TResult) {
    return _.map<T, TResult>(this.records, block);
  }

  find(block: (i: T) => boolean): T | undefined {
    return _.find<T>(this.records, block);
  }

  where(block: (i: T) => boolean): T[] {
    return _.filter<T>(this.records, block);
  }
}

export interface QuestionProps {
  readonly id: number;
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

  constructor(private props: QuestionProps) {
    
  }
  
  get id(): number {
    return this.props.id;
  }

  get sentence(): string {
    return this.props.sentence;
  }

  set sentence(value: string) {
    this.props.sentence = value;
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

  constructor(private props: AnswerItemProps) {
    
  }

  get id(): number {
    return this.props.id;
  }

  get question_id(): number {
    return this.props.question_id;
  }

  get sentence(): string {
    return this.props.sentence;
  }

  set sentence(value: string) {
    this.props.sentence = value;
  }
}
