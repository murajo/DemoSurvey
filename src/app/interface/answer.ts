export interface Answer {
    id: number;
    surveyId: number;
    surveyItemId: number;
    created: string;
    updated: string;
}

export class AnswerInitialize {
    id: number;
    surveyId: number;
    surveyItemId: number;
    created: string;
    updated: string;

    constructor() {
        this.id = 0;
        this.surveyId = 0;
        this.surveyItemId = 0;
        this.created = "";
        this.updated = "";
    }
}