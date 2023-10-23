interface IExplorerCareer {

}

export interface IMapQuizCategory {
    categoryId: number,
    categoryName: string,
    quizzes: {
        quizId: number,
        quizName: string,
    }[]
}

export interface IMyExplorerContent {
    lifestyle_content: string,
    family_content: string,
    wealth_content: string,
    health_content: string
}

export interface IContentPicture {
    pic_id: string,
    pic_url: string,
    pic_type: string,
    user_id: number
}