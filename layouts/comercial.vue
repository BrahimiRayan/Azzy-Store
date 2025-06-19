<template>
     <header class="border-b border-white/20 flex justify-between items-center px-2">
        <div class="flex items-center gap-8">
           <div class="w-[62px] h-[62px]">
              <img src="../assets/pics/Logo-dark.webp" class="w-full h-full" alt="">
           </div>

                <ul class="flex items-center gap-3">
                        <Nuxtlink>
                        <li>
                                <p>somthing</p>
                        </li>
                        </Nuxtlink>

                        <Nuxtlink>
                        <li>
                                <p>somthing</p>
                        </li>
                        </Nuxtlink>

                        <Nuxtlink>
                        <li>
                        <p>somthing</p>
                        </li>
                        </Nuxtlink>
                </ul>
   </div>

      <div class="flex items-center gap-3">
        <p>github link</p>
        <NuxtLink to="/Dashboard" class="bg-green-500 p-2 text-xs text-black">sign in/up</NuxtLink>
      </div>
</header>

        <slot />
</template>

<script setup lang='ts'>

</script>

<style></style>