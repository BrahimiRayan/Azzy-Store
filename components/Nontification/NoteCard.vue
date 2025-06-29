<template>
        <div class="h-full ">
            <!-- Add a note modal -->
            <UModal
              v-model="open"
              title="Rediger une note"
              description="Remplissez les champs ci-dessous pour ajouter une note"
              :overlay='true'
              :dismissible="false"
              class="rounded-tr-2xl rounded-tl-2xl"
              :ui="{
                overlay: 'bg-black/60',
                header: 'bg-[var(--deep-dark-blue)] rounded-tr-2xl rounded-tl-2xl text-[var(--creamy-white)]', 
                body: 'rounded-br-2xl rounded-bl-2xl bg-[var(--deep-dark-blue)] text-[var(--creamy-white)] ',
             }">
                
                <div class="w-fit">
                <UButton
                    label="Ajouter une note"
                    icon="i-lucide-plus" 
                    class="bg-[var(--green-grace)] text-[var(--deep-dark-blue)] border-2 border-[var(--green-grace)] hover:bg-white text-sm mb-4 m"
                    size="sm"
                />
            </div>
                <template #body>
                    <form @submit.prevent="submitNote" defau>
                    <UFormField label="Titre" class="mb-5" required>
                        <UInput placeholder="Entrer un titre" v-model="addNote.title" class="w-[90%]" required/>
                    </UFormField>
                    <UFormField label="Description" class="mb-6" required>
                        <UTextarea placeholder="Entrer une description" v-model="addNote.content" class="w-[90%]" required/>
                    </UFormField>
                    <URadioGroup v-model="addNote.type" :items="NoteTypes" color="secondary"/>
                    <USeparator class="my-3 text-[var(--green-grace)] opacity-60" />
                    <UButton label="Submit" type="submit" class="mr-6 text-[var(--deep-dark-blue)] borde border-white bg-amber-200"/>
                    <UButton label="Fermer" class="bg-transparent border border-red-600 hover:bg-red-800" @click="open = false" />
                </form>
                </template> 
            </UModal>

            <!-- Notes , so what i should do is to display them by newest =>oldest then !important > repelle also make a distinct UI betwen the two -->
            <!-- notifcation card -->
            <!-- //TODO: TAKE THIS TO IT OWN SEPERATE COMPONENT ... -->
            <div class="flex items-center gap-4" v-if="pending">
                <USkeleton class="h-12 w-12 rounded-full bg-gray-500" />

                <div class="grid gap-2">
                <USkeleton class="h-4 w-[250px] bg-gray-500"/>
                <USkeleton class="h-4 w-[200px] bg-gray-500" />
                </div>
            </div>

            <div v-else-if="notedata">
            <div v-if="notedata.notes.length === 0" class="text-center text-gray-500 mt-10">
                <p>Aucune note disponible pour le moment.</p>
            </div >

            <div v-else >
                <div v-for="note in notedata.notes" :key="note.id" class="border-2 p-4 rounded-2xl mb-6 bg-amber-50/5" :class="note.type === 'Important' ? 'border-red-500' : 'border-blue-500'">
                <div class="flex justify-between items-center" >

                    <div class="flex items-center gap-3">
                        <span>
                            <UAvatar v-if="note.owner.image" size="xl" :src="note.owner.image" />
                            <UAvatar v-else size="xl" :alt="note.owner.name" class="bg-green-600 text-white"/>
                        </span>
                        <div class="text-sm">
                            <h1 class="font-extrabold mb-1" >{{note.owner.name}} </h1>
                            <p class="font-light text-xs ">Le : {{ note.date }}</p>
                        </div>    
                    </div>

                    <UButton
                        icon="i-lucide-trash" 
                        class="ml-auto bg-red-500 hover:bg-red-700 transition-colors duration-300 ease-in-out"
                        size="sm"
                    />
                </div>
                <USeparator class="my-3 text-[var(--green-grace)] opacity-25" />
                <div>
                    <h2 class="font-extrabold text-sm">Type : <span class="font-bold text-sm " :class="note.type === 'Important'? 'text-red-500' : 'text-blue-500' ">{{note.type === "Important"? "Important!" : "Rappele" }}</span></h2>
                    <h2 class="font-extrabold text-sm">Titre: <span class="text-sm font-medium">{{ note.title }}</span></h2>
                    <p class="p-2 text-sm">{{ note.content }} </p>
                </div>

            </div>

        </div>
    </div>
    </div>
     
</template>
    
<script setup lang='ts'>
import type { RadioGroupItem, RadioGroupValue } from '@nuxt/ui'
import type { notesTable } from '~/lib/db/schema';
const open = ref<boolean>(false) ;

type NoteFetchResponse = {
    notes: (typeof notesTable.$inferSelect & {owner : {image : string | null ,name : string}})[]
};

const NoteTypes = ref<RadioGroupItem[]>([
  {
    label: 'Important!',
    description: 'Note importante qui doit être traitée en priorité.',
    value: 'Important'
  },
  {
    label: 'Rappele',
    description: 'Note de rappel pour ne pas oublier une tâche.',
    value: 'Reminder'
  },
]);



const addNote = ref<{
    title: string;
    content: string;
    type: 'Important' | 'Reminder';
}>({
    title: '',
    content: '',
    type: 'Important'
});


const {data : notedata , pending , refresh} = useFetch<NoteFetchResponse>('/api/notes', {
    lazy: true,
});


    const submitNote = () => {
        $fetch("/api/notes", {
            method: "POST",
            body: {
                title: addNote.value.title,
                content: addNote.value.content,
                type: addNote.value.type
            }
        })
        open.value = false;
        refresh();
    }
</script>