<template>
    <div class="flex items-center gap-3 my-3">
        <UIcon name="i-lucide-settings" size="26" class="text-green-500"/>
        <h1 class="text-3xl font-extrabold text-white/70">Paramètres généraux</h1>
    </div>
    <section class="p-8 border-3 mt-3 border-white/40 rounded">
        <div class="flex items-center gap-3">
            <UIcon name="i-line-md-account" size="26" class="text-green-500"/>
            <h2 class="text-xl font-bold ">Informations du profil</h2>
        </div>

        <div class="p-4">
            <div class="flex items-center gap-2">
                <UIcon name="i-lucide-calendar" />
                <p class="text-lg text-white/80">Créé le : <span class="text-sm font-extrabold text-green-600">{{createdAt}}</span></p>
            </div>

            <div class="flex items-center gap-2">
                <UIcon name="i-lucide-clock" />
                <p class="text-lg text-white/80">Dernière mise à jour : <span class="text-sm font-extrabold text-green-600">23/03/2025 22:30:30</span></p>
            </div>

            <div class="flex items-center gap-2">
                <UIcon name="i-lucide-id-card-lanyard" />
                <p class="text-lg text-white/80">Identifiant de la boutique : <span class="text-sm font-extrabold text-green-600">4b2c2b45-af09-4bcd-a78e-5a60c6e7ee90</span></p>
            </div>

            <div class="flex items-center gap-2">
                <UIcon name="i-lucide-link" />
                <p class="text-lg text-white/80">Lien de votre E-boutique : <a class="text-sm font-extrabold text-green-600">https://azze-store.vercel.app/boutique/4b2c2b45-af09-4bcd-a78e-5a60c6e7ee90</a></p>
            </div>
        </div>

        <form action="" @submit.prevent="modifyOldName" class="flex items-center gap-2 mb-2">
            <label for="name">Votre nom</label>
            <input id="name" type="text" v-model="name" placeholder="Votre nom"  class="border-2 px-2 py-1 text-sm rounded w-78 placeholder:text-white/70">
            <div v-if="!modifyName">
                <button type="button" @click="toggleModifyName" class=" p-1 w-12 rounded bg-green-600">
                    <UIcon name="i-lucide-pen" />
                </button>
            </div>

            <div v-else class="flex items-center gap-x-2 text-sm">
                <button type="submit" class=" p-1 rounded bg-green-600"> Modifier</button>
                <button type="button"  @click="toggleModifyName" class=" p-1 rounded bg-red-600"> Annuler</button>
            </div>
        </form>

        <form action="" class="flex items-center gap-2 mb-2">
            <label for="email">Votre e-mail</label>
            <input type="email" placeholder="Votre e-mail" value="zzaza7291@gmail.com" class="border-2 px-2 py-1 text-sm rounded w-78 placeholder:text-white/70">

            <div v-if="!modifyEmail">
                <button  @click="toggleModifyEmail" class=" p-1 w-12 rounded bg-green-600">
                    <UIcon name="i-lucide-pen" />
                </button>
            </div>

            <div v-else class="flex items-center gap-x-2 text-sm">
                <button  class=" p-1 rounded bg-green-600"> Modifier</button>
                <button  @click="toggleModifyEmail" class=" p-1 rounded bg-red-600"> Annuler</button>
            </div>
        </form>

        <div class="border-2 p-2 border-yellow-500/40 rounded-lg">
            <div class="flex items-center gap-2 text-xl text-yellow-500">
                <UIcon name="i-solar-danger-bold" size="26" class="text-red-500"/>
                Note importante
            </div>
            Modifier votre adresse e-mail entraînera une déconnexion immédiate et vous serez redirigé vers la page d’authentification. Vous devrez alors saisir votre nouvelle adresse e-mail et votre mot de passe, puis vérifier votre boîte mail pour confirmer le changement via un lien de validation.
        </div>
    </section>

    <section class="p-8 border-3 mt-3 border-red-600/40 rounded">
        <div class="flex items-center gap-3">
            <UIcon name="i-solar-danger-bold" size="26" class="text-red-500"/>
            <h2 class="text-xl font-bold ">Zone dangereuse</h2>
        </div>
        
        <div class="p-4 ">
            <section class="border-2 rounded-lg border-white/60 p-2">
                <h3 class="text-xl text-white">Supprimer ma e-boutique</h3>
                <p class="text-md bg-red-500/50 p-1 rounded">
                    Attention : Cette action est <u>irréversible</u>. La suppression de votre e-boutique entraînera la perte définitive de toutes les données associées. Veuillez confirmer uniquement si vous êtes certain(e) de vouloir supprimer votre e-boutique de façon permanente.
                </p>
                <button class="p-2 bg-red-600 text-white/90 mt-4 rounded-lg flex items-center gap-2">
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
</template>
    
<script setup lang='ts'>
import { authClient } from '~/lib/auth/auth-client';

    const modifyName = ref(false);
    const modifyEmail = ref(false);
    const toast = useToast();
    function toggleModifyName(){
        modifyName.value = !modifyName.value
    }

        function toggleModifyEmail(){
        modifyEmail.value = !modifyEmail.value
    }

    const auth = await authClient.getSession()
    let name = ref(auth.data?.user.name);
    let email = ref(auth.data?.user.email);
    let createdAt = ref(auth.data?.user.createdAt);
    let updatedAt = ref(auth.data?.user.updatedAt);

    function modifyOldName(){
        if(!auth.data || !auth.data.user || !name.value ){
            return
        }
        console.log(name.value)
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

    }
</script>
    
<style>
    
</style>