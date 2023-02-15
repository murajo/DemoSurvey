export class Survey {
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