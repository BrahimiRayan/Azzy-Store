<template>

    <USkeleton class="w-64 h-8 bg-gray-700 mt-4" />

    <div class="grid grid-cols-3 gap-2">
        <USkeleton v-for="_ in 3" class="w-full h-48 bg-gray-700 mt-4" />
    </div>

    <USkeleton class="w-full h-64 bg-gray-700 mt-4" />
</template>