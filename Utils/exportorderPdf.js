// import { jsPDF } from "jspdf";
// import autoTable from 'jspdf-autotable';

export async function genererPDFCommande(commande, fileName = `commande_${commande.id}.pdf`) {
    if (process.server) return;

  try {
    // Dynamically import libraries
    const { jsPDF } = await import('jspdf');
    const autoTable = (await import('jspdf-autotable')).default;

  // Initialiser jsPDF
  const doc = new jsPDF();
  
  // En-tête
  doc.setFontSize(18);
  doc.setFont("Monospaced", "bold");
  doc.text("Fiche de Commande", 14, 20);
  
  // Informations de la commande
  doc.setFontSize(12);
  doc.setFont("Monospaced", "normal");
  doc.text(`Date: ${commande.date}`, 14, 30);
  doc.text(`N° Commande: ${commande.id}`, 14, 38);
  doc.text(`Fournisseur: ${commande.fournisseur}`, 14, 46);
  
  // Préparation des données du tableau
  const bodyData = commande.produits.map(produit => [
    produit.id,
    produit.name,
    produit.category,
    produit.quantity
  ]);

  // Configuration des colonnes
  const headers = [
    "ID", 
    "Produit", 
    "Catégorie", 
    "Quantité"
  ];

  // Ajout du tableau avec autoTable
  autoTable(doc, {
    startY: 56,
    head: [headers],
    body: bodyData,
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 20 },  // ID
      1: { cellWidth: 60 },  // Produit
      2: { cellWidth: 50 },  // Catégorie
      3: { cellWidth: 40 }   // Quantité
    },
    styles: {
      fontSize: 10,
      cellPadding: 3
    }
  });

  // Calcul du total
  const finalY = doc.lastAutoTable.finalY + 10;
  const total = commande.produits.reduce((sum, p) => sum + p.quantity, 0);
  
  doc.setFontSize(12);
  doc.setFont("Monospaced", "bold");
  doc.text(`Total d'articles : ${total} articles`, 14, finalY);
  
  // Sauvegarde du PDF
  doc.save(fileName);
  }catch(error){
    throw error
  }
}