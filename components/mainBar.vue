<template>
    <nav class="sticky z-50 top-0 h-[64px] border-b border-amber-50/60 flex items-center backdrop-blur-md text-primary justify-between w-full mx-auto py-2 px-5">
      <div class="flex gap-8">
        <UButton 
          :class="[isDark ?'bg-transparent text-secondary font-extrabold' : 'bg-light-primary text-light-primary']" 
          color="neutral" 
          variant="subtle" 
          icon="i-ic-round-menu-open"  
          @click="toggleDrawer"
          
        />
        <h1>Logo</h1>
      </div>
     
      
      <Transition name="fade">
        <ProductSearchBar v-if="$route.path ==='/Produits'" :isDark="isDark"/>
        
      </Transition>
      
      <ul class="flex items-center gap-8">
        <li class="border-l border-r px-2.5 light:border-l-black light:border-r-black">
          <USwitch 
            @click="isDark = !isDark"
            :color="'neutral'"
            unchecked-icon="i-circum-dark"
            checked-icon="i-circum-light"
            :class="[isDark ? 'costumDark' : 'costumLight' ]"
            variant ='outline'
            
            :ui="{
              base: 'bg-red-500',
              icon: isDark ? 'bg-white' : 'bg-black', 
              thumb: !isDark ? 'bg-yellow-500' : 'bg-primary',
              label: 'text-xs mt-1 ',
              
            }"
            size="xl"
          />
        </li>

        <li>
          <!-- manipulate the show fieled to when he didn't mark a note as done to be shown -->
          <USlideover
           title="🔔 Mes notes "
           icon="i-lucide-bell"
           :ui="{
                overlay: 'bg-black/50',
                content: 'bg-[var(--deep-dark-blue)] text-[var(--creamy-white)]', 
            }"
           >   
          <UChip color="success" :show="true">  
            <UButton :class="['bg-primary' , 'h-7 w-7 flex  justify-center text-black bg-white dark:text-[var(--green-grace)] dark:bg-transparent border-yellow-400 ']" icon="i-lucide-mail" color="neutral" variant="subtle" />
          </UChip>
            <template #body>
              <NontificationNoteCard />
            </template>
          </USlideover>
          
        
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    isOpen: Boolean
  });
  
  const emit = defineEmits(['update-open']);
  
  const toggleDrawer = () => {
    emit('update-open', !props.isOpen);
  };

  
const colorMode = useColorMode()
 const isDark = ref<boolean>(true);

 watch(isDark, (newValue) => {
    if(newValue) colorMode.value = 'dark';
    else colorMode.value = 'light'; 
  });
  </script>

  <style scoped>
    .fade-enter-active, .fade-leave-active {
      opacity: 0;
      transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to {
      transition: opacity 0.5s ease-in;

      opacity: 0;
    }
    

  </style>