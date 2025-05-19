<template>
    <div v-if="conf">
     <header class="border flex items-center justify-between h-18">
        <h1 :style="`color : ${conf.textColor};`">{{ conf.name }}</h1>

        <nav class="flex items-center justify-around gap-10">
            <UInput type="text"/>

            <ul class="flex items-center gap-3">
                <li>
                    <UButton label="email" to="/"/>
                </li>
                
                <li>
                    <UButton label="phone" to="/"/>
                </li>
            </ul>
        </nav>
     </header>

    <main>
        <section>
            <!-- carosel and description-->
        </section>

        <section>
            <div id="products_holder">
                <div v-for="product in conf.Products">
                    <div v-if="conf.cardType ==='A' ">
                        <!-- A TYPE COMPONENET -->
                    </div>

                    <div v-else-if="conf.cardType ==='B'">
                        <!-- B TYPE COMPONENET -->
                    </div>

                    <div v-else-if="conf.cardType ==='C' ">
                        <!-- C TYPE COMPONENET -->
                    </div>

                    <div v-else-if="conf.cardType ==='D' ">
                        <!-- D TYPE COMPONENET -->
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <h2>Nos contacts</h2>
        <ul>
            <li>email</li>
            <li>phone</li>
            <li v-if="conf.fb_url">facebook</li>
            <li v-if="conf.ig_url">Instagram</li>
        </ul>

        <div v-if="conf.xcor !== 0 && conf.ycor !==0">
            <div id="map">
                <!-- map from leflet -->
            </div>

            <p v-if="conf.address">
                {{ conf.address }}
            </p>
        </div>

        <div v-else>
            <p v-if="conf.address">
                {{ conf.address }}
            </p>
        </div>
    </footer>
    </div>
</template>
    
<script setup lang='ts'>
import type { shopConfT } from '~/types/GeneraleT';

    defineProps<{
        conf :shopConfT,
    }>()


</script>