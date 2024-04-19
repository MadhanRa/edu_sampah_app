<script setup>
import { ref, computed } from 'vue';
import { store } from '../store';

const clickedButton = ref(null)

const props = defineProps({
    text: String,
    isValidAnswer: Boolean,
    isInvalidAnswer: Boolean,
    handleCorrectAnswer: Function,
    handleIncorrectAnswer: Function,
})

const checkAnswer = () => {
    store.checkAnswer(props.text)

    clickedButton.value = props.text

    if (props.isValidAnswer) {
        props.handleCorrectAnswer();
    }

    if (props.isInvalidAnswer) {
        props.handleIncorrectAnswer();
    }
}

const isDisabled = ref(store.showAnswer)
const buttonClass = computed(() => ({
    'bg-green-500': store.showAnswer && props.isValidAnswer && clickedButton.value === props.text,
    'bg-red-500': store.showAnswer && props.isInvalidAnswer && clickedButton.value === props.text,
    'hover:bg-slate-400': !store.showAnswer,
}))
</script>

<template>
    <button class="px-1 py-2 sm:py-4 border-solid border tracking-widest rounded-lg transition sm:hover:text-black
    bg-gray-200 sm:hover:bg-opacity-55 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border-gray-200"
        @click="checkAnswer" v-html="props.text" :disabled="isDisabled" :class="buttonClass">
    </button>
</template>