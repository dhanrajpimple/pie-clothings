import jsPDF from "jspdf";
import "jspdf-autotable";
import JsBarcode from "jsbarcode";

export const generateInvoicePDF = (order, email) => {
  const doc = new jsPDF();

  // Add heading
  doc.setFontSize(24);
  doc.text("Invoice - Pie-Clothing", 14, 22);

  // Add invoice date
  doc.setFontSize(12);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 32);

  // Add user details
  doc.setFontSize(12);
  doc.text(`User Name: ${order.name}`, 14, 42);
  doc.text(`User Email: ${email}`, 14, 48);
  doc.text(`User Mobile: ${order.phone}`, 14, 54);

  // Add invoice number
  const invoiceNumber = `INV-${order._id}`;
  doc.text(`Invoice Number: ${invoiceNumber}`, 14, 64);

  // Add address details
  const address = order.deliveryAdd;
  doc.text("Address:", 14, 74);
  doc.text(address.address, 14, 80);
  doc.text(`${address.city}, ${address.pincode}`, 14, 86);
  doc.text(address.state, 14, 92);

  // Add order date
  const orderDate = new Date(order.created_date).toLocaleDateString();
  doc.text(`Order Date: ${orderDate}`, 14, 102);
  const price = order.amountPaid
  // Add product table
  const productTable = order.products.map(product => [
    product.name,
    product.quantity,
    product.size,
    1990
  ]);

  doc.autoTable({
    startY: 112,
    head: [['Product Name', 'Quantity', 'Size', 'Price']],
    body: productTable,
    margin: { top: 10 },
  });

  // Generate barcode
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, invoiceNumber, { format: "CODE128" });
  const barcodeImg = canvas.toDataURL("image/png");

  // Add barcode to PDF
  doc.addImage(barcodeImg, "PNG", 14, doc.autoTable.previous.finalY + 10, 100, 30);

  // Save PDF
  doc.save(`Invoice_${invoiceNumber}.pdf`);
};
