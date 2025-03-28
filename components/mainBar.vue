<template>
    <nav class="flex shadow-xs shadow-blue-600 justify-between w-full mx-auto py-2 px-5">
      <div class="flex gap-8">
        <UButton 
          :class="[isDark ?'bg-secondary' : 'bg-accent-primary-300']" 
          color="neutral" 
          variant="subtle" 
          icon="i-ic-round-menu-open"  
          @click="toggleDrawer"
        />
        <h1>Logo</h1>
      </div>
      <div>
        <input
          type="text"
          class="p-2 cursor-pointer border-b-2 bg-primary text-primary text-[1rem] indent-1 input-bg w-xs"
          placeholder="Rechercher un produit"
        />
      </div>
      <ul class="flex gap-4">
        <li>
          <USwitch 
            @click="isDark = !isDark"
            color="neutral"
            label="dark/light"
            unchecked-icon="i-circum-dark"
            checked-icon="i-circum-light"
            
            
            :ui="{
              base: 'bg-red-500',
              icon: isDark ? 'bg-white' : 'bg-black', 
              thumb: !isDark ? 'bg-yellow-500' : 'bg-primary',
              label: 'text-xs text-center',
              description : 'bg-yellow-500'
            }"
            size="xl"
          />
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

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

  </script>