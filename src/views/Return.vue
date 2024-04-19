<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { store } from '@/store';

const router = useRouter();
const questionCount = ref(0);

const finishedAudio = new Audio('/audio/complete.wav');

onMounted(() => {
    questionCount.value = store.questionCount
    finishedAudio.play()
})

const handleReturn = () => {
    router.push('/')
}

</script>

<template>
    <div class="h-full flex flex-col justify-center mx-auto w-11/12 sm:max-w-80 md:max-w-96">
        <div class="flex flex-col items-center gap-y-5">
            <div
                class="p-4 bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-200">
                <h1 class="text-center text-lg font-medium">Anda mendapatkan {{ store.score }} pertanyaan benar dari
                    {{ questionCount }} pertanyaan.</h1>
            </div>

            <button @click="handleReturn"
                class="w-full h-16 hover:bg-green-600  disabled:hover:bg-gray-200 disabled:backdrop-blur-sm disabled:text-gray-400 disabled:border-gray-300 hover:text-slate-200 bg-gray-200 rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border-2 border-green-600 transition duration-300 ease-out">
                <span>Kembali ke Menu Utama</span> <i class="fa-solid fa-rotate-left"></i>
            </button>
        </div>
    </div>
</template>