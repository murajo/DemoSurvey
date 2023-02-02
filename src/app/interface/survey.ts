export interface Survey {
    id: number;
    title: string;
    question: string;
    created: string;
    updated: string;
}

export class SurveyInitialize {
    id: number;
    title: string;
    question: string;
    created: string;
    updated: string;

    constructor() {
        this.id = 0;
        this.title = "";
        this.question = "";
        this.created = "";
        this.updated = "";
    }
}