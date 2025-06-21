const { WebpayPlus, Options, Environment } = require('transbank-sdk');

const commerceCode = process.env.WEBPAY_COMMERCE_CODE?.trim();
const apiKey = process.env.WEBPAY_API_KEY?.trim();

// Verificación crítica de las credenciales al iniciar
if (!commerceCode || !apiKey) {
  console.error('¡ERROR CRÍTICO! Las variables de Transbank no están en tu archivo .env.');
  console.error('Asegúrate de que .env contenga WEBPAY_COMMERCE_CODE y WEBPAY_API_KEY.');
  throw new Error('Credenciales de Transbank no encontradas.');
}

const tx = new WebpayPlus.Transaction(new Options(commerceCode, apiKey, Environment.Integration));

async function iniciarTransaccionWebpay(buyOrder, sessionId, amount, returnUrl) {
  try {
    console.log('--- Intentando crear transacción en Transbank ---');
    console.log(`Usando Commerce Code: [${commerceCode}]`);
    const response = await tx.create(buyOrder, sessionId, amount, returnUrl);
    return response;
  } catch (error) {
    console.error('❌ Error en el servicio al crear la transacción:', error.message);
    throw error; // Lanzamos el error para que el controlador lo maneje
  }
}

async function confirmarTransaccionWebpay(token) {
  try {
    const response = await tx.commit(token);
    return response;
  } catch (error) {
    console.error('❌ Error en el servicio al confirmar la transacción:', error.message);
    throw error;
  }
}

module.exports = {
  iniciarTransaccionWebpay,
  confirmarTransaccionWebpay
};