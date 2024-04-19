<template>
    <div class="flex w-full h-screen justify-center items-center">
        <div class="max-w-3xl mx-2 w-full flex flex-col gap-4 justify-around items-center ">
            <div>
                <div class="h-40 w-40 mx-auto">
                    <img src="@/assets/images/Logo Icon.png" alt="Icon Image" class="w-full h-full animate-bounce">
                </div>
                <h1 class="font-bold text-5xl text-center text-gray-700">
                    <span class="text-green-500">Eco</span>Quiz
                </h1>
                <h4 class="text-gray-700 text-2xl text-center">Belajar Sampah & Lingkungan</h4>
            </div>
            <!-- Input Name And Button -->
            <div class="p-6 flex flex-col gap-y-4 w-full sm:max-w-xl justify-center items-center">
                <input type="text" v-model="username"
                    class="w-full sm:w-4/6 border-2 border-gray-100 p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300 ease-in-out hover:border-gray-200 hover:shadow-md"
                    placeholder="Masukkan Nama Anda" />
                <button @click="submitUsername"
                    class="w-full sm:w-4/6 bg-green-500 text-white p-4 rounded-full hover:bg-green-600 transition duration-300 ease-out">
                    Mulai
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
        };
    },
    methods: {
        submitUsername() {
            localStorage.setItem("username", this.username);
            this.$router.push("/");
        },
    },
}
</script>