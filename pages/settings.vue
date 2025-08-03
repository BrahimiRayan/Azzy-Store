<template>
<div v-if="isAuthpending || isOnlinePending || isShopidReady " class="text-3xl">
    Charging ....
</div>
<main v-else >

    <div class="flex items-center gap-3 my-3">
        <UIcon name="i-lucide-settings" size="26" class="text-green-500"/>
        <h1 class="text-3xl font-extrabold text-white/70">Paramètres généraux</h1>
    </div>

    <section class="p-8 border-3 mt-3 border-white/40 rounded">
        <div class="flex items-center gap-3">
            <UIcon name="i-line-md-account" size="26" class="text-green-500"/>
            <h2 class="text-xl font-bold ">Informations du profil</h2>
        </div>

        <div class="p-4 bg-white/5 rounded-lg my-4">
            <div class="flex items-center gap-2">
                <UIcon name="i-lucide-calendar" />
                <p v-if="createdAt" class="text-lg text-white/80">Créé le : <span class="text-sm font-extrabold text-green-600">{{ NormalDateformat(createdAt) }}</span></p>
            </div>

            <div class="flex items-center gap-2">
                <UIcon name="i-lucide-clock" />
                <p v-if="updatedAt" class="text-lg text-white/80">Dernière mise à jour : <span class="text-sm font-extrabold text-green-600">{{ NormalDateformat(updatedAt) }}</span></p>
            </div>

            <div class="flex items-center gap-2" v-if="shopid">
                <UIcon name="i-lucide-id-card-lanyard" />
                <p class="text-lg text-white/80">Identifiant de la boutique : <span class="text-sm font-extrabold text-green-600">{{ shopid.idShop }}</span></p>
            </div>

            <div class="flex items-center gap-2" v-if="shopid && isOnline && isOnline.res.isOnline">
                <UIcon name="i-lucide-link" />
                <p class="text-lg text-white/80">Lien de votre E-boutique : <a :href="`https://azze-store.vercel.app/boutique/${shopid.idShop}`" target="_blank" class="text-sm font-extrabold text-green-600 underline">https://azze-store.vercel.app/boutique/{{shopid.idShop}}</a></p>
            </div>
        </div>

        <form @submit.prevent="modifyOldName" class="flex items-center gap-2 mb-2">
            <label for="name" class="w-32">Votre nom</label>
            <input id="name" type="text" required v-model="name" minlength="6" placeholder="Votre nom" :disabled="!modifyName" :class="modifyName ? 'border-2' : 'border-0'" class="px-2 py-1 text-sm rounded bg-white/10  w-78 placeholder:text-white/70">
            <div v-if="!modifyName">
                <button type="button" @click="toggleModifyName" class=" p-1 w-12 rounded bg-green-600 hover:bg-green-700 hover:scale-95 transition-all duration-300 ease-in-out ">
                    <UIcon name="i-lucide-pen" />
                </button>
            </div>

            <div v-else class="flex items-center gap-x-2 text-sm">
                <button type="submit" class=" p-1 rounded bg-green-600"> Modifier</button>
                <button type="button"  @click="toggleModifyName" class=" p-1 rounded bg-red-600"> Annuler</button>
            </div>
        </form>

        <form @submit.prevent="modifyOldEmail" class="flex items-center gap-2 mb-2">
            <label for="email" class="w-32">Votre e-mail</label>
            <input type="email" v-model="email" required minlength="10" placeholder="Votre e-mail" :disabled="!modifyEmail" :class="modifyEmail ? 'border-2' : 'border-0'" class="px-2 py-1 text-sm bg-white/10 rounded w-78 placeholder:text-white/70">

            <div v-if="!modifyEmail">
                <button type="button" @click="toggleModifyEmail" class=" p-1 w-12 rounded bg-green-600 hover:bg-green-700 hover:scale-95 transition-all duration-300 ease-in-out">
                    <UIcon name="i-lucide-pen" />
                </button>
            </div>

            <div v-else class="flex items-center gap-x-2 text-sm">
                <button type="submit" class=" p-1 rounded bg-green-600"> Modifier</button>
                <button type="button" @click="toggleModifyEmail" class=" p-1 rounded bg-red-600"> Annuler</button>
            </div>
        </form>

        <div class="border-2 p-2 bg-yellow-500/40 rounded-lg lg:w-[70%] mx-auto mt-6">
            <div class="flex items-center gap-2 text-xl text-white/80 font-black">
                <UIcon name="i-solar-danger-bold" size="26" class="text-red-500"/>
                Note importante
            </div>
            <p class="text-sm">
                Modifier votre adresse e-mail entraînera une déconnexion immédiate et vous serez redirigé vers la page d’authentification. Vous devrez alors saisir votre nouvelle adresse e-mail et votre mot de passe, puis vérifier votre boîte mail pour confirmer le changement via un lien de validation.
            </p>
        </div>
    </section>

    <section class="p-8 border-3 mt-3 border-white/40 rounded">
        <div class="flex items-center gap-3">
            <UIcon name="i-lucide-lock-open" size="26" class="text-green-500"/>
            <h2 class="text-xl font-bold ">Sécurité</h2>
        </div>

        <form @submit.prevent="modifyOldPassword" class="flex flex-col gap-6 my-12">
            <div class="flex items-center">
            <label for="oldpass" class="w-70">Ancien mot de passe</label>
            <UInput id="oldpass" v-model="passwords.old" type="text" icon="i-lucide-lock" minlength="8" placeholder="Ancien mot de passe" required
            :ui="{
                base : 'bg-white/10 w-80 placeholder:text-sm placeholder:text-white/70'
            }"/>
            </div>

            <div class="flex items-center">
            <label for="newpass" class="w-70">Nouveau mot de passe</label>
            <UInput id="newpass" v-model="passwords.new" type="text" icon="i-material-symbols-password" minlength="8" placeholder="Nouveau mot de passe" required
             :ui="{
                base : 'bg-white/10 w-80 placeholder:text-sm placeholder:text-white/70'
            }"
            />
            </div>

            <div class="flex items-center">
            <label for="repeat" class="w-70">Répéter le nouveau mot de passe</label>
            <UInput id="repeat" v-model="repeatedNewPaas" type="text" icon="i-material-symbols-password" minlength="8" placeholder="Nouveau mot de passe" required
             :ui="{
                base : 'bg-white/10 w-80 placeholder:text-sm placeholder:text-white/70'
            }"
            />
            </div>

            <button type="submit" class="bg-green-500 hover:bg-green-600 rounded-lg p-2 w-max mx-auto text-sm text-black/90">Changer le mot de passe</button>
        </form>
        
                <div class="border-2 p-2 bg-yellow-500/40 rounded-lg lg:w-[70%] mx-auto mt-6">
            <div class="flex items-center gap-2 text-xl text-white/80 font-black">
                <UIcon name="i-solar-danger-bold" size="26" class="text-red-500"/>
                Note importante
            </div>
            <p class="text-sm">
                Changer votre mot de passe entraînera une déconnexion immédiate. Vous devrez vous reconnecter avec votre nouveau mot de passe pour accéder à votre compte.
            </p>
        </div>
    </section>

    <section class="p-8 border-3 mt-3 border-red-600/40 rounded">
        <div class="flex items-center gap-3">
            <UIcon name="i-solar-danger-bold" size="26" class="text-red-500"/>
            <h2 class="text-xl font-bold ">Zone dangereuse</h2>
        </div>
        
        <div class="p-4 " v-if="isOnline && isOnline.res.isOnline">
            <section class="border-2 rounded-lg border-white/60 p-2">
                <h3 class="text-xl text-white">Supprimer ma e-boutique</h3>
                <p class="text-md bg-red-500/50 p-1 rounded">
                    Attention : Cette action est <u>irréversible</u>. La suppression de votre e-boutique entraînera la perte définitive de toutes les données associées. Veuillez confirmer uniquement si vous êtes certain(e) de vouloir supprimer votre e-boutique de façon permanente.
                </p>
                <button @click="DeleteEshop" class="p-2 bg-red-600 hover:bg-red-500 text-white/90 mt-4 rounded-lg flex items-center gap-2">
                    <UIcon name="i-lucide-trash" />
                    Supprimer ma e-boutique
                </button>
            </section>
        </div>

        <div class="p-4">
            <section class="border-2 rounded-lg border-white/60 p-2">
                <h3 class="text-xl text-white">Supprimer mon compte Azze-store</h3>
                <p class="text-md bg-red-500/50 p-1 rounded">
                    Attention : La suppression de votre compte est <u>irréversible</u>. Toutes vos informations personnelles, commandes et données associées seront définitivement perdues. Veuillez confirmer uniquement si vous êtes certain(e) de vouloir supprimer votre compte de façon permanente.
                </p>
                <button class="p-2 bg-red-600 text-white/90 mt-4 rounded-lg flex items-center gap-2">
                    <UIcon name="i-lucide-trash" />
                    Supprimer mon compte
                </button>
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
</script>
    
<style>
    
</style>