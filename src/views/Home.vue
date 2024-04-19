<template>
    <Loader v-if="store.loading"></Loader>
    <div v-else class="w-11/12 mx-auto h-full flex flex-col gap-y-6 justify-around sm:justify-center sm:max-w-3xl">
        <div class="flex flex-col p-2 justify-center items-center">
            <img src="@/assets/images/Logo Icon.png" alt="Icon Image" class="object-cover w-28 sm:w-40 animate-bounce">
            <div class="text-center mb-2 sm:mb-4 text-gray-700">
                <h3 class="text-xl sm:text-2xl font-bold">Selamat datang <span class="text-green-500">{{ username
                        }}</span>!</h3>
                <h4>Pilih level mu</h4>
            </div>
        </div>

        <div class="flex flex-col gap-y-2 min-h-10">
            <button v-for="level in levels" :key="level" :disabled="!isLevelEnabled(level)" @click="startQuiz(level)"
                class="text-green-600 px-8 py-3 sm:py-4 border-solid tracking-widest hover:bg-green-600  disabled:hover:bg-gray-200 disabled:backdrop-blur-sm disabled:text-gray-400 disabled:border-gray-300 hover:text-slate-200 bg-gray-200 rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border-2 border-green-600 transition duration-300 ease-out">
                Level {{ level }} <span class="" v-show="isLevelEnabled(level)">- {{ descLevel[level] }}</span>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Loader from '@/components/Loader.vue';
import { store } from '@/store';

const router = useRouter();

store.restartQuiz();

const username = ref(localStorage.getItem("username"));
const levels = ref([5, 4, 3, 2, 1]);
const descLevel = ref({
    1: "Kesadaran Awal Terhadap Sampah",
    2: "Memilah dan Mengelola Sampah",
    3: "Membuat dan Menggunakan Eco-Enzhyme",
    4: "Membuat dan Menggunakan Kompos",
    5: "Islam dan Kebersihan Lingkungan"
});
const currentLevels = ref([1]);

const isLevelEnabled = (level) => {
    return currentLevels.value.includes(level); // Enable next level if the previous is current
}

const startQuiz = (level) => {
    router.push(`/quiz/${level}`); // Redirect to quiz page
}
const savedLevels = localStorage.getItem("currentLevels");
if (savedLevels) {
    currentLevels.value = JSON.parse(savedLevels);
}

if (store.lastScore === 10 && currentLevels.value.includes(store.lastLevel)) {
    if (!currentLevels.value.includes(store.lastLevel + 1) && currentLevels.value.length < 3) {
        currentLevels.value.push(store.lastLevel + 1);
        localStorage.setItem("currentLevels", JSON.stringify(currentLevels.value));
    }
}

store.loading = false;

</script>