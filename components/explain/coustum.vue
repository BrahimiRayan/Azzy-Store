<template>
    <div class="p-6 space-y-4">
        <div>
            <h2 class="text-2xl font-bold text-green-400">Personnalisation libre</h2>
            <p class="ml-1 text-sm text-white/80">Après création, vous pourrez modifier tous ces éléments à tout moment depuis votre tableau de bord </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            <div class="border-2 rounded-lg border-white/10 p-6">

                <div class="bg-green-400/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                  <Icon name="lucide-palette" class="w-5 h-5 text-primary" />
                </div>

                <div>
                    <h3 class="font-semibold mb-2">Apparence</h3>
                    <p class="text-xs text-white/70">
                        Couleur de text, Couleur d'arrière-plan
                    </p>
                </div>

            </div>

            <div class="border-2 rounded-lg border-white/10 p-6">
                <div class="bg-green-400/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                   <Icon name="lucide-shopping-bag" class="w-5 h-5 text-primary" />
                </div>

                <div>
                    <h3 class="font-semibold mb-2">Catalogue produits</h3>
                    <p class="text-xs text-white/70">
                        Ajoutez, organisez et mettez en avant vos articles.
                    </p>
                </div>

            </div>

            <div class="border-2 rounded-lg border-white/10 p-6">
                <div class="bg-green-400/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                   <Icon name="lucide-type" class="w-5 h-5 text-primary" />
                </div>

                <div>
                    <h3 class="font-semibold mb-2">Contenu</h3>
                    <p class="text-xs text-white/70">
                        Ajoutez un nom, description , style des carts...
                    </p>
                </div>

            </div>

            <div class="border-2 rounded-lg border-white/10 p-6">
                <div class="bg-green-400/10 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                   <Icon name="lucide-smartphone" class="w-5 h-5 text-primary" />
                </div>

                <div>
                    <h3 class="font-semibold mb-2">Aperçu instantané</h3>
                    <p class="text-xs text-white/70">
                        Toutes vos modifications s'affichent en temps réel sur tous les appareils.
                    </p>
                </div>

            </div>

        </div>
    </div>
</template>