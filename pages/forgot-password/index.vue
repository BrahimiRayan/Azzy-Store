<template>
    <div class="lg:min-h-screen flex items-center justify-center bg-gray-900 p-4">
        <!-- Main Container -->
        <div class="w-full max-w-md">
            <!-- Card -->
            <div
                class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl shadow-green-900/20 hover:shadow-green-900/30 transition-all duration-500">

                <!-- Logo/Header -->
                <div class="text-center mb-8">
                    <div
                        class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
                        <UIcon name="i-lucide-lock-keyhole" class="text-white size-8" />
                    </div>
                    <h1 class="text-3xl font-bold text-white mb-2">Réinitialisation</h1>
                    <p class="text-gray-400 text-sm">
                        Entrez votre email pour recevoir un lien de réinitialisation
                    </p>
                </div>

                <!-- Form -->
                <form @submit.prevent="onsubmit" class="space-y-6">
                    <!-- Email Input -->
                    <div class="space-y-2">
                        <label for="email" class="block text-sm font-medium text-gray-300">
                            Adresse email
                        </label>
                        <div class="relative group">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UIcon name="i-lucide-mail"
                                    class="text-gray-500 group-hover:text-green-500 transition-colors size-5" />
                            </div>
                            <input type="email" id="email" v-model="email" required placeholder="votre@email.com"
                                class="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all group-hover:border-green-500/50" />
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit"
                        :disabled="isDisabled"
                        class="w-full py-3 px-4 bg-gradient-to-r disabled:opacity-40 from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-xl shadow-lg hover:shadow-green-900/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900">
                        Envoyer le lien
                    </button>

                    <!-- Links -->
                    <div class="pt-4 border-t border-gray-700/50">
                        <div class="flex items-center justify-between text-sm">
                            <NuxtLink to="/signIn"
                                class="text-green-500 hover:text-green-400 hover:underline transition-colors inline-flex items-center gap-1">
                                <UIcon name="i-lucide-arrow-left" class="size-4" />
                                Retour à la connexion
                            </NuxtLink>
                            <NuxtLink to="/signUp"
                                class="text-gray-400 hover:text-white hover:underline transition-colors">
                                S'inscrire
                            </NuxtLink>
                        </div>
                    </div>
                </form>

                <!-- Info Message -->
                <div class="mt-8 p-4 bg-gray-900/50 rounded-xl border border-gray-700/50">
                    <div class="flex items-start gap-3">
                        <UIcon name="i-lucide-info" class="text-green-500 mt-0.5 size-5" />
                        <p class="text-sm text-gray-400">
                            Un lien de réinitialisation vous sera envoyé par email.
                            Il expirera dans 1 heure pour des raisons de sécurité.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Footer Note -->
            <p class="text-center text-gray-500 text-xs mt-6">
                Vous rencontrez des problèmes ?
                <a href="mailto:support@example.com" class="text-green-500 hover:text-green-400 hover:underline">
                    Contactez le support
                </a>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { is } from 'drizzle-orm';
import { authClient } from '~/lib/auth/auth-client';
definePageMeta({
    layout: 'comercial',
})
const toast = useToast();

const email = ref<string>('')
const isDisabled = ref<boolean>(false)
async function onsubmit() {
    isDisabled.value = true;
    if (!email.value || email.value.trim() === '') {
        toast.add({
            title: "Erreur",
            description: "Veuillez entrer une adresse e-mail valide.",
            color: 'error',
            icon: 'lucide-alert-triangle',
            ui: {
                root: 'bg-gray-800 rounded-lg p-4',
                progress: 'text-red-500'
            },
        })
        isDisabled.value = false;
        return
    }

    const { data, error } = await authClient.requestPasswordReset({
        email: email.value,
        redirectTo: "/reset-password"
    });

    if (error) {
        toast.add({
            title: "Erreur",
            description: 'Esaiez de nouveau plus tard.!',
            color: 'error',
            icon: 'lucide-alert-triangle',
            ui: {
                root: 'bg-gray-800 rounded-lg p-4',
                progress: 'text-red-500'
            },
        })
        email.value = ''
        isDisabled.value = false;
        return
    }

    toast.add({
        title: "Succès",
        description: 'Un e-mail de réinitialisation du mot de passe a été envoyé à votre adresse e-mail.',
        color: 'success',
        icon: 'lucide-check-circle',
        ui: {
            root: 'bg-gray-800 rounded-lg p-4',
            progress: 'text-green-500'
        },
    })
    email.value = ''
    isDisabled.value = false;
}
</script>
