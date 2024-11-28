// src/utils/generatePDF.js

import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = (cart, paymentMethod, totalPrice) => {
    const doc = new jsPDF({
        unit: 'mm',
        format: [80, 297]
    });

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");

    const companyName = "CHECKPOINT RETRO";
    const companyAddress = "Rua Presidente Jânio Quadros";
    const companyDistrict = "Jardim Concórdia, Toledo - PR, 90";

    const pageWidth = doc.internal.pageSize.width;

    doc.text(companyName, pageWidth / 2, 10, { align: 'center' });
    doc.setFontSize(8);
    doc.text(companyAddress, pageWidth / 2, 15, { align: 'center' });
    doc.text(companyDistrict, pageWidth / 2, 18, { align: 'center' });

    doc.setLineWidth(0.5);
    doc.line(10, 20, pageWidth - 10, 20);
    doc.setLineWidth(0.2);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text('Comprovante de aluguel de jogo', pageWidth / 2, 25, { align: 'center' });

    doc.setFontSize(8);
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 5, 35);
    doc.text(`Forma de Pagamento: ${paymentMethod}`, 5, 40);

    const tableData = cart.map(product => [product.name, formatCurrency(product.precounitariocomercial)]);
    doc.autoTable({
        head: [['Produto', 'Preço']],
        body: tableData,
        startY: 45,
        styles: { fontSize: 8 },
        columnStyles: {
            0: { cellWidth: 50 },
            1: { cellWidth: 20, halign: 'right' }
        },
        margin: { left: 5 }
    });

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`Total: ${formatCurrency(totalPrice)}`, 27, doc.autoTable.previous.finalY + 10);

    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 7);
    const formattedReturnDate = returnDate.toLocaleDateString('pt-BR');

    // Inserir o termo com a data de devolução
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(`O cliente compromete-se a devolver o(s) jogo(s) alugado(s) no prazo de 7 dias (até ${formattedReturnDate}), conforme as condições acordadas no momento da locação.`, 5, doc.autoTable.previous.finalY + 15);


    const signature = doc.autoTable.previous.finalY + 30;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text('Assinatura do cliente:', 5, signature);
    doc.line(5, signature + 5, pageWidth - 5, signature + 5);

    doc.save('comprovante.pdf');
};

const formatCurrency = (value) => {
    return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};
