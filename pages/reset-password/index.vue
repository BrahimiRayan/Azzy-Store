<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-900 p-4">

        <div class="w-full max-w-md">

            <div
                class="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl shadow-green-900/20 hover:shadow-green-900/30 transition-all duration-500">

                <!-- Logo/Header -->
                <div class="text-center mb-8">
                    <div
                        class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
                        <UIcon name="i-lucide-key-round" class="text-white size-8" />
                    </div>
                    <h1 class="text-3xl font-bold text-white mb-2">Nouveau mot de passe</h1>
                    <p class="text-gray-400 text-sm">
                        Créez un mot de passe fort et sécurisé
                    </p>
                </div>

                <!-- Form -->
                <form @submit.prevent="handleSubmit" class="space-y-6">
                    <!-- New Password -->
                    <div class="space-y-2">
                        <label for="newPassword" class="block text-sm font-medium text-gray-300">
                            Nouveau mot de passe
                        </label>
                        <div class="relative group">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UIcon name="i-lucide-lock"
                                    class="text-gray-500 group-hover:text-green-500 transition-colors size-5" />
                            </div>
                            <input :type="showNewPassword ? 'text' : 'password'" id="newPassword" v-model="newPassword"
                                required placeholder="••••••••"
                                class="w-full pl-10 pr-10 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all group-hover:border-green-500/50" />
                            <button type="button" @click="showNewPassword = !showNewPassword"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <UIcon :name="showNewPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                    class="text-gray-500 hover:text-green-500 transition-colors size-5" />
                            </button>
                        </div>
                    </div>

                    <!-- Confirm Password -->
                    <div class="space-y-2">
                        <label for="confirmPassword" class="block text-sm font-medium text-gray-300">
                            Confirmer le mot de passe
                        </label>
                        <div class="relative group">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <UIcon name="i-lucide-lock"
                                    class="text-gray-500 group-hover:text-green-500 transition-colors size-5" />
                            </div>
                            <input :type="showConfirmPassword ? 'text' : 'password'" id="confirmPassword"
                                v-model="confirmPassword" required placeholder="••••••••"
                                class="w-full pl-10 pr-10 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all group-hover:border-green-500/50" />
                            <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <UIcon :name="showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                    class="text-gray-500 hover:text-green-500 transition-colors size-5" />
                            </button>
                        </div>

                        <!-- Password Match Indicator -->
                        <div v-if="confirmPassword" class="flex items-center gap-2 text-sm">
                            <div class="w-3 h-3 rounded-full" :class="passwordsMatch ? 'bg-green-500' : 'bg-red-500'">
                            </div>
                            <span :class="passwordsMatch ? 'text-green-400' : 'text-red-400'">
                                {{ passwordsMatch ? 'Les mots de passe correspondent' : 'Les mots de passe ne correspondent pas' }}
                            </span>
                        </div>
                    </div>

                    <!-- Password Requirements -->
                    <div class="bg-gray-900/30 rounded-xl p-4 border border-gray-700/50">
                        <h3 class="text-sm font-medium text-gray-300 mb-3">Exigences du mot de passe :</h3>
                        <ul class="space-y-2">
                            <li class="flex items-center gap-2">
                                <UIcon name="i-lucide-check" class="size-4"
                                    :class="passwordRequirements.minLength ? 'text-green-500' : 'text-gray-500'" />
                                <span class="text-sm"
                                    :class="passwordRequirements.minLength ? 'text-green-400' : 'text-gray-400'">
                                    Au moins 8 caractères
                                </span>
                            </li>
                            <li class="flex items-center gap-2">
                                <UIcon name="i-lucide-check" class="size-4"
                                    :class="passwordRequirements.hasNumber ? 'text-green-500' : 'text-gray-500'" />
                                <span class="text-sm"
                                    :class="passwordRequirements.hasNumber ? 'text-green-400' : 'text-gray-400'">
                                    Au moins un chiffre
                                </span>
                            </li>
                            <li class="flex items-center gap-2">
                                <UIcon name="i-lucide-check" class="size-4"
                                    :class="passwordRequirements.hasUppercase ? 'text-green-500' : 'text-gray-500'" />
                                <span class="text-sm"
                                    :class="passwordRequirements.hasUppercase ? 'text-green-400' : 'text-gray-400'">
                                    Au moins une majuscule
                                </span>
                            </li>
                            <li class="flex items-center gap-2">
                                <UIcon name="i-lucide-check" class="size-4"
                                    :class="passwordRequirements.hasLowercase ? 'text-green-500' : 'text-gray-500'" />
                                <span class="text-sm"
                                    :class="passwordRequirements.hasLowercase ? 'text-green-400' : 'text-gray-400'">
                                    Au moins une minuscule
                                </span>
                            </li>
                        </ul>
                    </div>

                    <!-- Strength Indicator -->
                    <div v-if="newPassword" class="space-y-2">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-300">Force du mot de passe :</span>
                            <span class="font-medium" :class="strengthColor">
                                {{ strengthText }}
                            </span>
                        </div>
                        <div class="h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div class="h-full transition-all duration-300" :class="strengthBarColor"
                                :style="{ width: strengthPercentage + '%' }"></div>
                        </div>
                    </div>

                    <button type="submit" :disabled="!isFormValid || isDisabled"
                        class="w-full py-3 px-4 bg-gradient-to-r disabled:opacity-40 from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-xl shadow-lg hover:shadow-green-900/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:hover:from-green-600 disabled:hover:to-emerald-600">
                        Réinitialiser le mot de passe
                    </button>

                    <div class="text-center">
                        <NuxtLink to="/signIn"
                            class="inline-flex items-center gap-2 text-gray-400 hover:text-white hover:underline transition-colors text-sm">
                            <UIcon name="i-lucide-x" class="size-4" />
                            Annuler et retourner à la connexion
                        </NuxtLink>
                    </div>
                </form>
            </div>

            <div class="mt-6 p-4 bg-gray-900/30 rounded-xl border border-gray-700/50">
                <div class="flex items-center gap-3">
                    <UIcon name="i-lucide-shield-check" class="text-green-500 size-5 flex-shrink-0" />
                    <p class="text-sm text-gray-400">
                        Votre sécurité est notre priorité. Votre mot de passe est chiffré de bout en bout.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { authClient } from '~/lib/auth/auth-client'
definePageMeta({
  layout: 'comercial',
})
const newPassword = ref('')
const confirmPassword = ref('')
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const passwordRequirements = computed(() => ({
    minLength: newPassword.value.length >= 8,
    hasNumber: /\d/.test(newPassword.value),
    hasUppercase: /[A-Z]/.test(newPassword.value),
    hasLowercase: /[a-z]/.test(newPassword.value),
    hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword.value)
}))

const passwordsMatch = computed(() => {
    return newPassword.value === confirmPassword.value && newPassword.value.length > 0
})

const passwordStrength = computed(() => {
    let strength = 0
    const password = newPassword.value

    if (password.length >= 8) strength += 1
    if (/\d/.test(password)) strength += 1
    if (/[a-z]/.test(password)) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    return strength
})

const strengthPercentage = computed(() => {
    return (passwordStrength.value / 5) * 100
})

const strengthText = computed(() => {
    const strength = passwordStrength.value
    if (strength <= 1) return 'Très faible'
    if (strength === 2) return 'Faible'
    if (strength === 3) return 'Moyen'
    if (strength === 4) return 'Fort'
    return 'Très fort'
})

const strengthColor = computed(() => {
    const strength = passwordStrength.value
    if (strength <= 1) return 'text-red-400'
    if (strength === 2) return 'text-orange-400'
    if (strength === 3) return 'text-yellow-400'
    if (strength === 4) return 'text-green-400'
    return 'text-emerald-400'
})

const strengthBarColor = computed(() => {
    const strength = passwordStrength.value
    if (strength <= 1) return 'bg-red-500'
    if (strength === 2) return 'bg-orange-500'
    if (strength === 3) return 'bg-yellow-500'
    if (strength === 4) return 'bg-green-500'
    return 'bg-emerald-500'
})


const isFormValid = computed(() => {
    return passwordsMatch.value &&
        passwordRequirements.value.minLength &&
        passwordRequirements.value.hasNumber &&
        passwordRequirements.value.hasUppercase &&
        passwordRequirements.value.hasLowercase
})

const toast = useToast();
const isDisabled = ref(false)
const handleSubmit = async () => {
    if (isFormValid.value) {
     isDisabled.value = true;   
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
        console.log('problem with token');
        return ; 
    }

    const { data, error } = await authClient.resetPassword({
        newPassword: newPassword.value,
        token, 
    });

    if (error) {
        toast.add({
            title: "Erreur",
            description: "La réinitialisation du mot de passe a échoué. Veuillez réessayer.",
            color: 'error',
            icon: 'lucide-alert-triangle',
            ui: {
                root: 'bg-gray-800 rounded-lg p-4',
                progress : 'text-red-500'
            },
        });
        isDisabled.value = false;
        return await navigateTo('/');
    }

    console.log('Password reset successful', data);
    toast.add({
        title: "Succès",
        description: "Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter.",
        color: 'success',
        icon: 'lucide-check-circle',
        ui: {
            root: 'bg-gray-800 rounded-lg p-4',
            progress : 'text-green-500'
        },
    });
    isDisabled.value = false;
    return await navigateTo('/signIn');
}
}
</script>

<style scoped>

input:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25);
}

* {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}
</style>