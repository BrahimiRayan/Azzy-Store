<template>
    <nav class="sticky z-50 top-0 h-[64px] light:bg-[var(--pale-moon)] dark:bg-[var(--deep-dark-blue)] border-b light:border-black/10 dark:border-white/10 flex items-center text-primary justify-between w-full mx-auto py-2 px-5">
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
              icon: isDark ? 'bg-white' : 'bg-black ml-[2px] ', 
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
                content: 'dark:bg-[var(--deep-dark-blue)] dark:text-[var(--creamy-white)  bg-[var(--green-grace)] text-[var(--deep-dark-blue)]]', 
            }"
           >   
          <UChip color="success" :show="true">  
            <UButton :class="['h-7 w-7 flex  justify-center text-black bg-transparent dark:text-[var(--green-grace)] dark:bg-transparent']" icon="i-lucide-mail" color="neutral" variant="subtle" />
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