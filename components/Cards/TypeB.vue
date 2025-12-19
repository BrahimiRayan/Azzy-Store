<template>
    <div class="">
	  <div class="relative ">
        <span v-if="shipping" class="absolute top-2 right-20 z-20 bg-green-600 px-2 py-1 rounded-lg">
            <UIcon name="i-carbon-delivery" class="text-white"/>
        </span>
		<div class="card-item mx-auto shadow-lg shadow-black hover:shadow-white/90 transition-all duration-500 ease-in-out">
		<figure class="card-image ">
			<img :src="product.image" alt="...">
                
            <UModal  
                 :title="product.name || 'Product name' "
                 :description="product.description?.slice(0 , 400) || 'No descreption'"
                 fullscreen
                :ui="{
                    overlay: 'bg-black/80',
                    body: 'bg-black/90 border-none outline-none ',
                    header: 'bg-black/90 border border-none ',
                    close : 'bg-red-500 hover:bg-red-600',
                    content: 'border-0 rounded-sm text-white',
                    description : 'whitespace-pre-line max-h-30 overflow-scroll p-2 rounded-lg bg-white/10',
                    title : 'text-2xl font-extrabold',
                    wrapper:'border-0'
                }"
                >
                    <UButton class="absolute top-2 right-4 z-10 hover:bg-black/90 text-white bg-black/80 cursor-pointer" icon="i-majesticons-open" />

                    <template #body>
                        <div class="w-[100%] h-[100%] flex justify-center items-center">
                            <img v-if="product.image" :src="product.image" :alt="product.name" class="w-[90%] h-[90%] object-contain" />
                        </div>
                    </template>
            </UModal>
            
		</figure>

        <div class="w-full h-full z-1 absolute top-0 p-8 flex flex-col justify-end gap-5">

			<span class="rounded-xl text-white/80 text-sm bg-green-500 px-2 py-1 w-max">{{ product.type }}</span>
				<div>
                    <p v-if="product.description" class="text-sm text-white/80 w-full h-22 overflow-scroll p-2 rounded-lg bg-black/20">{{ product.description }}</p>
                    <p v-else class="text-md text-center text-white/70 w-full h-22 p-2 rounded-lg bg-black/20"> No descreption...</p>
                </div>
				<footer>
                    <p class="font-extrabold text-white/80">{{ product.name }}</p>
                    <p class="text-green-500/80 text-xl text-shadow-2xs text-shadow-amber-50/50 font-extrabold font-mono">{{product.puv}} <span class="text-xs text-white/50">DZD</span></p>

                    <ul class="flex gap-3 align-center text-white justify-center  mt-3">

                    <li v-if="fb">
                        <a :href="fb" target="_blank" class="flex items-center gap-2 py-1 px-2 bg-white/20 rounded-md hover:-translate-y-1 transition-all duration-300 ease-in-out">
                            <UIcon name="i-mdi-facebook" class="text-2xl" />                            
                        </a>
                    </li>

                    <li v-if="ig">
                        <a :href="ig" target="_blank" class="flex items-center gap-2 py-1 px-2 bg-white/20 rounded-md hover:-translate-y-1.5 transition-all duration-300 ease-in-out">
                           <UIcon name="i-hugeicons-instagram" class="text-2xl" />                                                        
                        </a>
                    </li>

                     <li >
                        <a :href="`mailto:${email}`" target="_blank" class="flex items-center gap-2 py-1 px-2 bg-white/20 rounded-md hover:-translate-y-2 transition-all duration-300 ease-in-out">
                           <UIcon name="i-material-symbols-mail" class="text-2xl" />
                        </a>
                    </li>

                    <li >
                        <a :href="`tel:${phone}`" target="_blank" class="flex items-center gap-2 py-1 px-2 bg-white/20 rounded-md hover:-translate-y-2 transition-all duration-300 ease-in-out">
                           <UIcon name="i-lucide-phone" class="text-2xl" />
                        </a>
                    </li>
                </ul>
				</footer>
			</div>
		</div>
	  </div>
	</div>





</template>
    
<script setup lang='ts'>
import type { productsCards } from '~/types/GeneraleT';


    const props = defineProps<{
        product :productsCards,
        fb : string | null,
        ig : string | null,
        email : string,
        phone : string,
        address : string | null,
        shipping : boolean,
    }>()
</script>
    
<style scoped >

.card-item {
  width: 380px;
  height: 440px;
  position: relative;
  border-radius: 32px;
  overflow: hidden;
  
}

.card-item:hover .card-image:after {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.55) 100%);
}

.card-item:hover .card-image img {
  transform: scale(1.03);
}

.card-image {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.card-image:after {
  content: "";
  width: 100%;
  height: 100%;
  display: block;
  position: absolute;
  top: 0;
  background: rgb(0, 0, 0);
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 10%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.7) 100%);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.4s;
}

/* .card-content {
  width: 100%;
  height: 100%;
  z-index: 1;
  position: absolute;
  top: 0;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  row-gap: 20px;
}

.card-content .card-tags {
  padding: 10px 20px;
  background-color: #ff099f;
  border-radius: 100px;
  color: #fff;
  font-size: 12px;
  width: max-content;
  letter-spacing: 0.6px;
}

.card-content .card-title {
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  line-height: 1.4;
}

.card-footer {
  display: flex;
  align-items: center;
  column-gap: 20px;
  font-size: 14px;
  color: #fff;
}

.card-user {
  display: flex;
  align-items: center;
  column-gap: 8px;
}

.card-user-img {
  width: 36px;
  height: 36px;
  min-width: 36px;
  max-width: 36px;
  overflow: hidden;
  border-radius: 100px;
}

.card-user-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-time,
.card-comment {
  display: flex;
  align-items: center;
  column-gap: 8px;
}

.card-time .icon,
.card-comment .icon {
  color: #e1a00f;
} */
</style>