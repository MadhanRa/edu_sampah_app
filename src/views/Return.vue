<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { store } from '@/store';

const router = useRouter();
const responseMsg = ref('');
const questionCount = ref(0);

const finishedAudio = new Audio('/audio/complete.wav');

onMounted(async () => {
    questionCount.value = store.questionCount
    finishedAudio.play()

    if (store.answerHistory.length < 10) {
        console.error('Not enough answers in history')
        return
    }

    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
        console.error('User data not found')
        return
    }

    // sorting store.answerHistory using answerHistory.id
    store.answerHistory.sort((a, b) => a.id - b.id)

    // prepare data to send
    const resultData = {
        finishedTime: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }),
        userName: userData.username,
        kelas: userData.kelas,
        tingkat: userData.tingkat,
        level: store.lastLevel,
        score: store.score,
        jawaban1: `${store.answerHistory[0].status} : ${store.answerHistory[0].answer}`,
        jawaban2: `${store.answerHistory[1].status} : ${store.answerHistory[1].answer}`,
        jawaban3: `${store.answerHistory[2].status} : ${store.answerHistory[2].answer}`,
        jawaban4: `${store.answerHistory[3].status} : ${store.answerHistory[3].answer}`,
        jawaban5: `${store.answerHistory[4].status} : ${store.answerHistory[4].answer}`,
        jawaban6: `${store.answerHistory[5].status} : ${store.answerHistory[5].answer}`,
        jawaban7: `${store.answerHistory[6].status} : ${store.answerHistory[6].answer}`,
        jawaban8: `${store.answerHistory[7].status} : ${store.answerHistory[7].answer}`,
        jawaban9: `${store.answerHistory[8].status} : ${store.answerHistory[8].answer}`,
        jawaban10: `${store.answerHistory[9].status} : ${store.answerHistory[9].answer}`,
    }

    try {
        const data = await postData(scriptURL, resultData)
        if (data.result === 'success') {
            responseMsg.value = 'Data berhasil disimpan'
        } else {
            responseMsg.value = 'Data gagal disimpan'
        }
    } catch (e) {
        console.error('Error in posting data:', e)
    }
})


const scriptURL = 'https://script.google.com/macros/s/AKfycbzKNu0rUevvTIdThjTIPlkBzDadVYDu03cWe0lDCBGoSUEFUaLPJ5Bo7XF8cmgTR9Mm4g/exec'

async function postData(url = '', data) {
    try {
        const formData = new FormData()
        for (const key in data) {
            formData.append(key, data[key])
        }

        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error in fetch:', error);
    }
}


const handleReturn = () => {
    router.push('/')
}

</script>

<template>
    <div class="h-full flex flex-col justify-center mx-auto w-11/12 sm:max-w-80 md:max-w-96">
        <div class="flex flex-col items-center gap-y-5">
            <!-- success save modal -->
            <div
                class="p-4 bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-gray-200">
                <h1 class="text-center text-lg font-medium">Anda mendapatkan {{ store.score }} pertanyaan benar dari
                    {{ questionCount }} pertanyaan.</h1>
                <h5>Selesaikan 10 pertanyaan dengan benar untuk ke level berikutnya</h5>
            </div>
            <div v-if="responseMsg"
                class="p-4 bg-green-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border border-green-200">
                <h1 class="text-center text-lg font-medium">{{ responseMsg }}</h1>
            </div>

            <button v-if="responseMsg" @click="handleReturn"
                class="w-full h-16 hover:bg-green-600  disabled:hover:bg-gray-200 disabled:backdrop-blur-sm disabled:text-gray-400 disabled:border-gray-300 hover:text-slate-200 bg-gray-200 rounded-full bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 border-2 border-green-600 transition duration-300 ease-out">
                <span>Kembali ke Menu Utama</span> <i class="fa-solid fa-rotate-left"></i>
            </button>
        </div>
    </div>
</template>