export function TitleLimit(title: string, limit: number = 16): string {
        return title.length > limit ? title.slice(0, limit) + '...' : title;
}

export function addHyphensBetweenPairs(str : string) : string {
  return str.match(/.{1,2}/g)?.join('-') || str;
}

export function copyToClipboard (text: string) {
  const toast = useToast();
  navigator.clipboard.writeText(text);
  toast.add({
    title: 'Succès',
    description: 'Le Lien est copier avec succès',
    color: 'success',
    icon: 'lucide-check-circle',
    duration : 4000,
    ui: {
        root: 'bg-gray-900/90 rounded-lg p-4',
        progress : 'bg-green-600'
    },
    });
}

export function shareOnWhatsApp(url: string) {
  const message = `
🌟 *Découvrez ma boutique!* 🌟

✅ Produits exclusifs
✅ Prix exceptionnels
✅ Satisfaction garantie

👉 ${url}

_À bientôt!_
  `;

  window.open(`https://wa.me/?text=${encodeURIComponent(message)}`);
}

export function shareOnEmail(url: string) {
  const subject = "✨ Visitez ma boutique en ligne !";
  const body = `Bonjour 👋,\n\nJe vous invite à découvrir ma nouvelle boutique :\n${url}\n\n🛒 Produits exclusifs\n🎁 Prix exceptionnels\n⭐ Satisfaction garantie\n\nÀ bientôt !`;
  window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
}

export function shareOnFacebook(url: string) {
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&display=popup`, '_blank', 'width=600,height=400');
}

export function shareOnInstagram(url: string) {
  const message = `🌟 Découvrez ma boutique exclusive ! 🛍️\n${url}`;
  window.open(`https://www.instagram.com/direct/new/?text=${encodeURIComponent(message)}`, '_blank');
}