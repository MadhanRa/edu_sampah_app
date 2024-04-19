<template>
    <Loader v-if="isLoading"></Loader>
    <div v-else class="h-full flex flex-col justify-between mx-auto w-11/12 gap-y-2 sm:w-10/12 md:w-8/12">
        <div class="flex my-4 justify-center">
            <div v-for="(item, index) in store.data.results" :key="index"
                class="w-3 h-3 rounded text-white mx-1 text-center text-xs flex items-center justify-center" :class="{
                    'bg-green-300': item.guessedRight,
                    'bg-red-300': item.guessedRight == false,
                    'bg-gray-300': !item.guessedRight,
                }"></div>
        </div>
        <!-- Image Area -->
        <div
            class="flex grow overflow-hidden justify-center items-center bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-100">
            <div v-if="store.showAnswer" class="text-center transitio p-2">
                <div v-if="store.data.results[store.currentQuestion].guessedRight">
                    <h4 v-html="store.data.results[store.currentQuestion].feedback_correct"></h4>
                </div>
                <div v-else>
                    <h4 v-html="store.data.results[store.currentQuestion].feedback_incorrect"></h4>
                </div>

            </div>
            <div v-else class="max-w-2xl">
                <img :src="store.data.results[store.currentQuestion].image_path" alt="Quiz Image"
                    class="object-cover w-full h-full">
            </div>

        </div>
        <!-- Quiz area -->
        <div class="p-0">
            <div class="text-center mt-2 p-2 bg-gray-100 rounded-md border border-gray-100">
                <h4 class="my-2" v-html="store.data.results[store.currentQuestion].question"></h4>
            </div>
            <div class="grid grid-cols-1 gap-2 sm:grid-cols-2  mt-2">
                <Answer v-for="answer in store.data.results[store.currentQuestion]
                    .shuffled_answers" :text="answer"
                    :is-valid-answer="answer == store.data.results[store.currentQuestion].correct_answer"
                    :is-invalid-answer="answer != store.data.results[store.currentQuestion].correct_answer"
                    :show-answer="store.showAnswer" @check-answer="store.checkAnswer"
                    :handle-correct-answer="handleCorrectAnswer" :handle-incorrect-answer="handleIncorrectAnswer">
                </Answer>
            </div>
        </div>
        <div class="flex items-center justify-center mb-4">
            <button @click="handleNext()"
                class="px-12 py-3 bg-green-500 text-white p-4 rounded-full hover:bg-green-600 transition duration-300 ease-out w-full md:w-1/3"
                :class="{ invisible: !store.showAnswer }">Next</button>
        </div>
        <!-- End Quiz area -->
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Answer from '@/components/Answer.vue';
import Loader from '@/components/Loader.vue';
import { store } from '@/store';


const router = useRouter();
const route = useRoute();

const correctAudio = new Audio('/audio/correct.wav');
const incorrectAudio = new Audio('/audio/incorrect.wav');

// Access the level value from route parameters
let level = ref(route.params.level);

let isLoading = ref(true)

onMounted(() => {
    store.getData(level.value).then(() => {
        isLoading.value = false;

        watch(() => store.currentQuestion, (newVal, oldVal) => {
            if (store.data.results[newVal + 1]) {
                const nextImage = new Image();
                nextImage.src = store.data.results[newVal + 1].image_path;
            }
        }, { immediate: true })
    });
})

const handleNext = () => {
    if (store.quizEnded) {
        router.push('/return')
    } else {
        store.getNextQuestion()
    }
}

const handleCorrectAnswer = () => {
    correctAudio.play().catch(error => console.error("Failed to play correct audio:", error));
}

const handleIncorrectAnswer = () => {
    incorrectAudio.play().catch(error => console.error("Failed to play incorrect audio:", error));
}

</script>
