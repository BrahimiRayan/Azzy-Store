<template>
<div v-if="isAuthpending || isOnlinePending || isShopidReady " class="text-3xl">
    <SkeletoneSettings />
</div>
<main v-else class="max-w-4xl mx-auto p-4">

    <!-- Titre principal amélioré -->
    <div class="flex items-center gap-3 my-6">
        <UIcon name="i-lucide-settings" size="26" class="text-green-500 animate-pulse"/>
        <h1 class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">Paramètres généraux</h1>
    </div>

    <!-- Section Profil - Style amélioré -->
    <section class="p-6 border border-cyan-500/30 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm">
        <div class="flex items-center gap-3 mb-4">
            <UIcon name="i-line-md-account" size="26" class="text-cyan-400"/>
            <h2 class="text-xl font-bold text-cyan-100">Informations du profil</h2>
        </div>

        <!-- Carte d'informations remodelée -->
        <div class="p-4 bg-gray-800/40 rounded-lg mb-6 grid grid-cols-1 gap-4 border border-gray-700">
            <div class="flex items-center gap-2">
                <UIcon name="i-lucide-calendar" class="text-cyan-400"/>
                <p v-if="createdAt" class="text-cyan-100">Créé le : <span class="font-medium text-cyan-300">{{ NormalDateformat(createdAt) }}</span></p>
            </div>

            <div class="flex items-center gap-2">
                <UIcon name="i-lucide-clock" class="text-cyan-400"/>
                <p v-if="updatedAt" class="text-cyan-100">MAJ : <span class="font-medium text-cyan-300">{{ NormalDateformat(updatedAt) }}</span></p>
            </div>

            <div class="flex items-center gap-2" v-if="shopid">
                <UIcon name="i-lucide-id-card-lanyard" class="text-cyan-400"/>
                <p class="text-cyan-100">ID boutique : <span class="font-mono text-cyan-300">{{ shopid.idShop }}</span></p>
            </div>

            <div class="flex items-center gap-2" v-if="shopid && isOnline && isOnline.res.isOnline">
                <UIcon name="i-lucide-link" class="text-cyan-400"/>
                <p class="text-cyan-100">Lien : 
                    <a :href="`https://azze-store.vercel.app/boutique/${shopid.idShop}`" target="_blank" 
                       class="font-medium text-cyan-300 underline hover:text-cyan-200 transition-colors">
                        azze-store.vercel.app/boutique/{{shopid.idShop}}
                    </a>
                </p>
            </div>
        </div>

        <!-- Formulaires avec meilleur espacement -->
        <div class="space-y-4">
            <!-- Champ Nom -->
            <form @submit.prevent="modifyOldName" class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <label for="name" class="w-32 text-cyan-100">Votre nom</label>
                <div class="flex-1 flex items-center gap-2">
                    <input id="name" type="text" required v-model="name" minlength="6" placeholder="Votre nom complet" 
                           :disabled="!modifyName"
                           :class="modifyName 
                                ? 'border-2 border-cyan-500/50 focus:ring-2 focus:ring-cyan-500' 
                                : 'border-0'"
                           class="px-4 py-2 text-base rounded-lg bg-gray-800 w-full max-w-md placeholder:text-gray-400">
                    
                    <div v-if="!modifyName">
                        <button type="button" @click="toggleModifyName" 
                                class="p-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 transition-colors duration-200">
                            <UIcon name="i-lucide-pen" />
                        </button>
                    </div>
                    <div v-else class="flex gap-2 ml-2">
                        <button type="submit" class="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-sm transition-colors">
                            Valider
                        </button>
                        <button type="button" @click="toggleModifyName" 
                                class="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-sm transition-colors">
                            Annuler
                        </button>
                    </div>
                </div>
            </form>

            <!-- Champ Email -->
            <form @submit.prevent="modifyOldEmail" class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <label for="email" class="w-32 text-cyan-100">Votre e-mail</label>
                <div class="flex-1 flex items-center gap-2">
                    <input type="email" v-model="email" required minlength="10" placeholder="email@exemple.com" 
                           :disabled="!modifyEmail"
                           :class="modifyEmail 
                                ? 'border-2 border-cyan-500/50 focus:ring-2 focus:ring-cyan-500' 
                                : 'border-0'"
                           class="px-4 py-2 text-base rounded-lg bg-gray-800 w-full max-w-md placeholder:text-gray-400">
                    
                    <div v-if="!modifyEmail">
                        <button type="button" @click="toggleModifyEmail" 
                                class="p-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 transition-colors duration-200">
                            <UIcon name="i-lucide-pen" />
                        </button>
                    </div>
                    <div v-else class="flex gap-2 ml-2">
                        <button type="submit" class="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-sm transition-colors">
                            Valider
                        </button>
                        <button type="button" @click="toggleModifyEmail" 
                                class="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-sm transition-colors">
                            Annuler
                        </button>
                    </div>
                </div>
            </form>
        </div>

        
        <div class="border border-amber-500/40 p-4 bg-gradient-to-r from-amber-900/30 to-transparent rounded-lg mt-6">
            <div class="flex items-center gap-2 text-lg text-amber-200 font-medium">
                <UIcon name="i-solar-danger-bold" size="24" class="text-amber-400"/>
                Note importante
            </div>
            <p class="text-sm text-amber-100 mt-2">
                Modifier votre adresse e-mail entraînera une déconnexion immédiate et nécessitera une nouvelle vérification par email.
            </p>
        </div>
    </section>

    
    <section class="p-6 border border-emerald-500/30 rounded-xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm mt-6">
        <div class="flex items-center gap-3 mb-4">
            <UIcon name="i-lucide-lock-open" size="26" class="text-emerald-400"/>
            <h2 class="text-xl font-bold text-emerald-100">Sécurité</h2>
        </div>

        
        <form @submit.prevent="modifyOldPassword" class="space-y-5 max-w-2xl">
            <div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] items-center gap-4">
                <label for="oldpass" class="text-emerald-100">Ancien mot de passe</label>
                <UInput id="oldpass" v-model="passwords.old" type="password" icon="i-lucide-lock" 
                        minlength="8" placeholder="••••••••" required
                        :ui="{ 
                            base: 'bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500',
                        }"/>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] items-center gap-4">
                <label for="newpass" class="text-emerald-100">Nouveau mot de passe</label>
                <UInput id="newpass" v-model="passwords.new" type="password" icon="i-material-symbols-password" 
                        minlength="8" placeholder="••••••••" required
                        :ui="{ 
                            base: 'bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500',
                        }"/>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-[1fr_2fr] items-center gap-4">
                <label for="repeat" class="text-emerald-100">Confirmation</label>
                <UInput id="repeat" v-model="repeatedNewPaas" type="password" icon="i-material-symbols-password" 
                        minlength="8" placeholder="••••••••" required
                        :ui="{ 
                            base: 'bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-emerald-500',
                        }"/>
            </div>

            <div class="flex justify-center pt-2 items-center">
                <button type="submit" 
                    class="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 rounded-lg font-medium text-white shadow-lg transition-all duration-300 ">
                    Mettre à jour le mot de passe
                </button>
            </div>
        </form>
        
        <!-- Avertissement sécurité -->
        <div class="border border-amber-500/40 p-4 bg-gradient-to-r from-amber-900/30 to-transparent rounded-lg mt-6">
            <div class="flex items-center gap-2 text-lg text-amber-200 font-medium">
                <UIcon name="i-solar-danger-bold" size="24" class="text-amber-400"/>
                Note importante
            </div>
            <p class="text-sm text-amber-100 mt-2">
                Le changement de mot de passe entraînera une déconnexion immédiate.
            </p>
        </div>
    </section>

    <!-- Zone dangereuse - Style plus impactant -->
    <section class="p-6 border border-red-500/40 rounded-xl bg-gradient-to-br from-red-900/30 to-gray-900/50 backdrop-blur-sm mt-6">
        <div class="flex items-center gap-3 mb-4">
            <UIcon name="i-solar-danger-bold" size="26" class="text-red-400 animate-pulse"/>
            <h2 class="text-xl font-bold text-red-100">Zone dangereuse</h2>
        </div>
        
        <!-- Suppression boutique -->
        <div class="p-4" v-if="isOnline && isOnline.res.isOnline">
            <section class="border border-red-500/50 rounded-xl p-4 bg-red-900/20">
                <h3 class="text-lg font-semibold text-red-100 mb-2 flex items-center gap-2">
                    <UIcon name="i-lucide-trash-2" class="text-red-400"/> 
                    Supprimer ma e-boutique
                </h3>
                <p class="text-sm text-red-200 mb-4">
                    Cette action est <span class="font-bold text-white">irréversible</span> et supprimera définitivement toutes vos données boutique.
                </p>

                <UModal :ui="{
                    content : 'bg-gradient-to-r from-red-800 to-red-700',
                    title : 'text-white text-xl font-bold',
                    close : 'border rounded-full'
                    }"
                    title="Confirmer la suppression de votre e-boutique"
                >
                    <button class="px-4 py-2.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white rounded-lg flex items-center gap-2 transition-all" label="Open">
                            <UIcon name="i-lucide-trash" />
                            Supprimer ma e-boutique
                     </button>

                    <template #body>
                        <div>

                            <p class="text-sm text-white font-bold mb-6">
                                Êtes-vous sûr de vouloir supprimer votre e-boutique ? Cette action est <span class="font-black underline">irréversible</span> et entraînera la perte de toutes vos données boutique.

                                <span class="text-gray-300 text-sm block mt-3">Note : la suppression de votre e-boutique n'affectera pas la suppression de votre compte utilisateur.</span>
                            </p>

                                <button @click="DeleteEshop" 
                                    class="px-4 py-2.5 text-red-800 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center gap-2 transition-all">
                                    <UIcon name="i-lucide-trash" />
                                    Confirmer la suppression
                                </button>

                        </div>
                    </template>
                </UModal>

            </section>
        </div>

        <!-- Suppression compte -->
        <div class="p-4 mt-4">
            <section class="border border-red-500/50 rounded-xl p-4 bg-red-900/20">
                <h3 class="text-lg font-semibold text-red-100 mb-2 flex items-center gap-2">
                    <UIcon name="i-lucide-user-x" class="text-red-400"/>
                    Supprimer mon compte
                </h3>
                <p class="text-sm text-red-200 mb-4">
                    Suppression <span class="font-bold text-white">définitive</span> de toutes vos données personnelles.
                </p>

                <UModal :ui="{
                    content : 'bg-gradient-to-r from-red-800 to-red-700',
                    title : 'text-white text-xl font-bold',
                    close : 'border rounded-full'
                    }"

                    title="Confirmer la suppression de votre compte"
                >
                    <button class="px-4 py-2.5 bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 text-white rounded-lg flex items-center gap-2 transition-all" label="Open">
                            <UIcon name="i-lucide-trash" />
                            Supprimer mon compte
                     </button>

                    <template #body>
                        <div>

                            <p class="text-sm text-white font-bold mb-6">
                                Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est <span class="font-black underline">irréversible</span> et entraînera la perte de toutes vos données.
                            </p>

                                <button  @click="DeleteAccount"
                                    class="px-4 py-2.5 text-red-800 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center gap-2 transition-all">
                                    <UIcon name="i-lucide-trash" />
                                    Confirmer la suppression
                                </button>

                        </div>
                    </template>
                </UModal>

            </section>
        </div>
    </section>

</main>
</template>
    
<script setup lang='ts'>
import { authClient } from '~/lib/auth/auth-client';
import { NormalDateformat } from '~/Utils/dateFormat';

    const passwords = reactive({
        new : '',
        old : ''
    })
    let repeatedNewPaas = ref<string>('');
    
    const modifyName = ref(false);
    const modifyEmail = ref(false);
    let isAuthpending = ref(true)
    const toast = useToast();
    function toggleModifyName(){
        modifyName.value = !modifyName.value
    }

    function toggleModifyEmail(){
        modifyEmail.value = !modifyEmail.value
    }

    const auth = await authClient.getSession().finally(()=>{
        isAuthpending.value = false
    })
    isAuthpending.value = false;
    let name = ref(auth.data?.user.name);
    let email = ref(auth.data?.user.email);
    let createdAt = ref(auth.data?.user.createdAt);
    let updatedAt = ref(auth.data?.user.updatedAt);
    const {data : shopid , pending : isShopidReady } = useFetch<{idShop : boolean}>('/api/shop/id',{
        lazy: true,
        server : false
    });

    const {data : isOnline , pending : isOnlinePending , refresh} = useFetch<{ res : { isOnline : boolean } }>('/api/shop/isOnline',{
        lazy: true,
        server : false
    })
    
    
async function modifyOldName(){
        if(!auth.data || !auth.data.user || !name.value || !name.value.trim() || name.value.length < 6 ){
                toast.add({
                    title: 'Echéc',
                    description: "Le nouveau nom n'est pas valide !",
                    color: 'error',
                    icon: 'lucide-alert-triangle',
                    ui: {
                        root: 'bg-gray-800 rounded-lg p-4',
                        progress : 'text-red-500'
                    },
                });
            return
        }

        if(auth.data.user.name === name.value.trim()){
                toast.add({
                    title: 'Echéc',
                    description: "Le nom d'utilisateur na pas changer !",
                    color: 'error',
                    icon: 'lucide-alert-triangle',
                    ui: {
                        root: 'bg-gray-800 rounded-lg p-4',
                        progress : 'text-red-500'
                    },
                });
      return
    }

    try {
        await $fetch('/api/params/name' , {
            method : 'POST',
            body : {
                name : name.value.trim()
            }
        })

        toast.add({
                    title: 'Succès',
                    description: `Le nom d'utilisateur est bien etre modifier a ${name.value} !`,
                    color: 'success',
                    icon: 'lucide-check-circle',
                    ui: {
                    root: 'bg-gray-800 rounded-lg p-4',
                    progress : 'text-green-500'
                    },
            });
            window.location.reload();
            return
    } catch (error) {
        toast.add({
                title: 'Echéc',
                description: "Le nom d'utilisateur na pas changer !",
                color: 'error',
                icon: 'lucide-alert-triangle',
                ui: {
                    root: 'bg-gray-800 rounded-lg p-4',
                    progress : 'text-red-500'
                },
        });
        throw error
    }
    
}

async function modifyOldEmail(){
        if(!auth.data || !auth.data.user || !email.value || email.value.trim().length < 10){
                toast.add({
                    title: 'Echéc',
                    description: "Le nouveau Email n'est pas valide !",
                    color: 'error',
                    icon: 'lucide-alert-triangle',
                    ui: {
                        root: 'bg-gray-800 rounded-lg p-4',
                        progress : 'text-red-500'
                    },
                });
            return
        }
        
        if(auth.data.user.email === email.value.trim()){
                toast.add({
                    title: 'Echéc',
                    description: "L'Email d'utilisateur na pas changer !",
                    color: 'error',
                    icon: 'lucide-alert-triangle',
                    ui: {
                        root: 'bg-gray-800 rounded-lg p-4',
                        progress : 'text-red-500'
                    },
                });
      return
    }

    try {
        await $fetch('/api/params/email' , {
            method : 'POST',
            body : {
                email : email.value.trim()
            }
        })

        toast.add({
                    title: 'Succès',
                    description: `L'Email d'utilisateur est bien etre modifier a ${email.value} !`,
                    color: 'success',
                    icon: 'lucide-check-circle',
                    ui: {
                    root: 'bg-gray-800 rounded-lg p-4',
                    progress : 'text-green-500'
                    },
            });
        await authClient.revokeSessions();
        return await navigateTo('/logOut');
    } catch (error) {
        toast.add({
                title: 'Echéc',
                description: "L'Email d'utilisateur na pas changer , email deja exister !",
                color: 'error',
                icon: 'lucide-alert-triangle',
                ui: {
                    root: 'bg-gray-800 rounded-lg p-4',
                    progress : 'text-red-500'
                },
        });
        throw error
    }
    
}

async function modifyOldPassword(){
    if(!passwords.new.trim() || !passwords.old.trim() || !repeatedNewPaas.value.trim()){
        toast.add({
            title: 'Echéc',
            description: "Svpl , remplire tout les champs !",
            color: 'error',
            icon: 'lucide-alert-triangle',
            ui: {
                root: 'bg-gray-800 rounded-lg p-4',
                progress : 'text-red-500'
                },
        });
        return
    }

    if(passwords.new.trim() !== repeatedNewPaas.value.trim() || passwords.new.trim().length < 8){
        toast.add({
            title: 'Echéc',
            description: "Le mots de passe n'est pas valide !",
            color: 'error',
            icon: 'lucide-alert-triangle',
            ui: {
                root: 'bg-gray-800 rounded-lg p-4',
                progress : 'text-red-500'
                },
        });
        return
    }

    try {
        await $fetch('/api/params/password' , {
            method : 'POST',
            body : {
                newPassword : passwords.new.trim(),
                oldpassword : passwords.old.trim()
            }
        });
        
        toast.add({
                title: 'Succès',
                description: `Le mot de passe a bien été modifié !`,
                color: 'success',
                icon: 'lucide-check-circle',
                ui: {
                root: 'bg-gray-800 rounded-lg p-4',
                progress : 'text-green-500'
                },
        });
        return await navigateTo('/logOut');
    } catch (error) {
        toast.add({
            title: 'Echéc',
            description: "l'entien mot de pass n'est pas correct ou le nouveau mot de pass n'est pas valide!",
            color: 'error',
            icon: 'lucide-alert-triangle',
            ui: {
                root: 'bg-gray-800 rounded-lg p-4',
                progress : 'text-red-500'
            },
        });
        throw error
    }

}

async function DeleteEshop(){
    try {
        await $fetch('/api/params/shop' , {method : 'DELETE'});
        toast.add({
                    title: 'Succès',
                    description: `La E-boutique a été supprimée avec succès !`,
                    color: 'success',
                    icon: 'lucide-check-circle',
                    ui: {
                    root: 'bg-gray-800 rounded-lg p-4',
                    progress : 'text-green-500'
                    },
            });
         refresh()   
        return
    } catch (error) {
        toast.add({
            title: 'Echéc',
            description: "La suppression de la E-boutique a échoué !",
            color: 'error',
            icon: 'lucide-alert-triangle',
            ui: {
                root: 'bg-gray-800 rounded-lg p-4',
                progress : 'text-red-500'
            },
        });
        throw error;
    }
}

async function DeleteAccount(){
    try {
        await authClient.deleteUser();
        toast.add({
                    title: 'Succès',
                    description: `Le compte a été supprimé avec succès !`,
                    color: 'success',
                    icon: 'lucide-check-circle',
                    ui: {
                    root: 'bg-gray-800 rounded-lg p-4',
                    progress : 'text-green-500'
                    },
        });
        await authClient.revokeSessions();
        return await navigateTo('/logOut');
    } catch (error) {
        toast.add({
            title: 'Echéc',
            description: "La suppression du compte a échoué !",
            color: 'error',
            icon: 'lucide-alert-triangle',
            ui: {
                root: 'bg-gray-800 rounded-lg p-4',
                progress : 'text-red-500'
            },
        });
        throw error;
    }
}
</script>
    
<style>
    
</style>