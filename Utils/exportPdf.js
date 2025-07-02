export async function exportToPdf(filename, headers, data) {
  if (process.server) return;

  try {
    // Dynamically import libraries
    const { jsPDF } = await import('jspdf');
    const autoTable = (await import('jspdf-autotable')).default;

    const doc = new jsPDF();
    const now = new Date();
    
    // Add title
    doc.text(`Informations sur les produits (${now.toLocaleDateString()})`, 14, 15);
    
    // Safely convert data
    const tableData = data.map(row => {
      return Object.keys(row).map(key => {
        const value = row[key];
        return (typeof value === 'object' && value !== null) 
          ? JSON.stringify(value) 
          : value;
      });
    });

    // Generate table using autoTable
    autoTable(doc, {
      head: [headers],
      body: tableData,
      startY: 30,
      styles: {
        fontSize: 9,
        cellPadding: 2,
        font: 'helvetica',
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 10,
      }
    });
    
    // Save the PDF
    doc.save(filename);
  } catch (error) {
    console.error('PDF generation error:', error);
    throw error; // Rethrow to handle in UI
  }
}