<template>

    <USkeleton class="w-64 h-8 bg-gray-700 mt-4" />

    <div class="grid grid-cols-3 gap-2">
        <USkeleton v-for="_ in 3" class="w-full h-48 bg-gray-700 mt-4" />
    </div>

    <div>
        <USkeleton class="w-42 h-8 bg-gray-700 mt-4" />
        <USkeleton class="w-32 h-8 bg-gray-700 mt-4" />
        <USkeleton class="w-32 h-8 bg-gray-700 mt-4" />

        <div>
            <USkeleton v-for="i in 10" :key="i" class="w-full h-22 bg-gray-700 mt-4" />
        </div>
    </div>
</template>