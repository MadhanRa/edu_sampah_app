import { reactive } from 'vue'
import { shuffle } from './helpers'

export const store = reactive({
    score: 0,
    lastLevel: 0,
    lastScore: 0,
    questionCount: 0,
    quizEnded: false,
    data: null,
    loading: true,
    currentQuestion: 0,
    showAnswer: false,
    incrementScore() {
        this.score++
    },
    restartQuiz() {
        this.score = 0
        this.questionCount = 0
        this.quizEnded = false
        this.data = null
        this.loading = true
    },
    setQuestionCount(count) {
        this.questionCount = count
    },
    async getData(level) {
        this.lastLevel = parseInt(level)
        // this.loading = true;
        try {
            const response = await fetch(`/data/quiz_${this.lastLevel}.json`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const res = await response.json();
            res.results = shuffle(res.results)
            res.results.map((item) => {
                item.shuffled_answers = shuffle([item.correct_answer, ...item.incorrect_answers])
                delete item.incorrect_answers
            })
            this.data = res
            this.showAnswer = false
            this.currentQuestion = 0
            this.questionCount = res.results.length
            // this.loading = false
        } catch (error) {
            console.error('Error fetching data:', error);
            // this.loading = false;
        }
    },
    checkAnswer(answer) {
        if (this.data.results[this.currentQuestion].correct_answer === answer) {
            this.incrementScore()
            this.data.results[this.currentQuestion].guessedRight = true;
            this.lastScore = this.score
            this.showAnswer = true
            return
        } else {
            this.data.results[this.currentQuestion].guessedRight = false
            this.showAnswer = true
        }

    },
    getNextQuestion() {
        if (this.currentQuestion == this.data.results.length - 2) {
            this.quizEnded = true
        }
        this.currentQuestion++
        this.showAnswer = false
    },
})