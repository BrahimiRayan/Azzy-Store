<template>

    <div class="p-6 space-y-6 max-w-md mx-auto border rounded-lg bg-white/5 mt-6">

        <div class="text-center space-y-2">
            <div class="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
                <Icon name="lucide-home" class="w-8 h-8 text-green-600" />
            </div>
            <h2 class="text-2xl font-bold">Boutique prête à l'emploi !</h2>
            <p class="text-muted-foreground">Partagez votre boutique avec vos clients</p>
        </div>


        <div class="space-y-2">
            <label class="text-sm font-medium bg-white/5 p-1 rounded-lg">Lien public</label>
            <div class="flex gap-2 w-[80%] mx-auto mt-2">
                <input readonly :value="storeUrl" class="flex-1 font-mono text-sm bg-white/10 p-1 rounded" />
                <button size="icon" @click="copyToClipboard(storeUrl)">
                    <Icon name="lucide-copy" class="w-4 h-4" />
                </button>
            </div>

            <a :href="storeUrl" target="_blank" rel="noopener noreferrer" 
                class="px-2 py-1 bg-green-500 text-black rounded-lg lg:w-42 w-max mt-8 mx-auto flex items-center justify-center">
                Ouvrir le lien 
                <UIcon name="lucide:arrow-up-right" size="18"/>
            </a>
        </div>


        <div class="flex flex-col items-center space-y-3 pt-4 border-t">
            <p class="text-sm text-muted-foreground">Ou scannez ce QR Code</p>

            <div class="border-5 border-green-500 bg-green-500">
                <Qrcode :value="storeUrl" ref="qrcode" class="w-40 h-40" />
            </div>
            
        </div>

        
        <!-- Partage social -->
        <div class="space-y-2 pt-4 border-t">
            
            <p class="text-sm font-medium bg-white/5 p-1 rounded-lg w-max">Partager via</p>
            <div class="flex justify-center items-center gap-3">
                <!-- WhatsApp -->
                <button size="icon" class="text-green-600 bg-white/10 py-1 px-2 flex items-center justify-center rounded-lg hover:bg-green-500 hover:text-white hover:translate-y-1 transition-all duration-300 ease-in-out"
                    @click="shareOnWhatsApp(storeUrl)">
                    <Icon name="lucide-message-circle" class="w-5 h-5" />
                </button>

                <!-- Email -->
                <button size="icon" @click="shareOnEmail(storeUrl)" class="text-red-500 bg-white/10 py-1 px-2 flex items-center justify-center rounded-lg hover:bg-red-500 hover:text-white hover:translate-y-1 transition-all duration-300 ease-in-out">
                    <Icon name="lucide-mail" class="w-5 h-5" />
                </button>

                <!-- Facebook -->
                <button size="icon" class="text-blue-500 bg-white/10 py-1 px-2 flex items-center justify-center rounded-lg hover:bg-blue-500 hover:text-white hover:translate-y-1 transition-all duration-300 ease-in-out"
                    @click="shareOnFacebook(storeUrl)">
                    <Icon name="lucide-facebook" class="w-5 h-5" />
                </button>

                <button size="icon" class="text-pink-500 bg-white/10 py-1 px-2 flex items-center justify-center rounded-lg hover:bg-pink-500 hover:text-white hover:translate-y-1 transition-all duration-300 ease-in-out"
                    @click="shareOnInstagram(storeUrl)">
                    <Icon name="lucide-instagram" class="w-5 h-5" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { copyToClipboard, shareOnEmail, shareOnFacebook, shareOnInstagram, shareOnWhatsApp } from '~/Utils/generalUIhelpers';

defineProps<{
    storeUrl: string
}>()



</script>

<style></style>