import { saveInvoice } from '../firebase/firebase';

export const createInvoice = async (invoiceData) => {
  const requiredFields = [
    'customerName',
    'customerPhone',
    'items',
    'subtotal',
    'serviceFee',
    'deliveryFee',
    'discount',
    'total'
  ];
  
  // اعتبارسنجی فیلدهای ضروری
  for (const field of requiredFields) {
    if (!invoiceData[field]) {
      throw new Error(`فیلد ${field} الزامی است`);
    }
  }

  // ساخت ساختار داده فاکتور
  const invoice = {
    customerName: invoiceData.customerName,
    customerPhone: invoiceData.customerPhone,
    items: invoiceData.items.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      notes: item.notes || ''
    })),
    subtotal: invoiceData.subtotal,
    serviceFee: invoiceData.serviceFee,
    deliveryFee: invoiceData.deliveryFee,
    discount: invoiceData.discount,
    total: invoiceData.total,
    notes: invoiceData.notes || '',
    paymentMethod: invoiceData.paymentMethod || 'cash'
  };

  // ذخیره در Firebase
  return await saveInvoice(invoice);
};