
const { WebpayPlus } = require('transbank-sdk'); 
const Environment = require('transbank-sdk').Environment; 

const TBK_COMMERCE_CODE = process.env.TRANSBANK_COMMERCE_CODE;
const TBK_API_KEY = process.env.TRANSBANK_API_KEY;


console.log('--- Configuración de Transbank (desde process.env) ---');
console.log('TRANSBANK_COMMERCE_CODE (usado):', TBK_COMMERCE_CODE);
console.log('TRANSBANK_API_KEY (usada):', TBK_API_KEY);
console.log('Ambiente Transbank (SDK):', Environment.Integration);
console.log('----------------------------------------------------');



const tx = new WebpayPlus.Transaction({
    environment: Environment.Integration, 
    commerceCode: TBK_COMMERCE_CODE,     
    apiKey: TBK_API_KEY                  
});


async function iniciarTransaccionWebpay(buyOrder, sessionId, amount, returnUrl) {
    try {
        
        if (!buyOrder || !sessionId || !amount || amount <= 0 || !returnUrl) {
            throw new Error('Faltan parámetros obligatorios para iniciar la transacción de Webpay (buyOrder, sessionId, amount > 0, returnUrl).');
        }

        console.log('Intentando iniciar transacción con Transbank con los siguientes parámetros:');
        console.log('buyOrder:', buyOrder);
        console.log('sessionId:', sessionId);
        console.log('amount:', amount);
        console.log('returnUrl:', returnUrl); 

        
        const response = await tx.create(
            buyOrder,
            sessionId,
            amount,
            returnUrl
        );

        
        return {
            token: response.token,
            url: response.url
        };

    } catch (error) {
        console.error('Error al iniciar la transacción Webpay:', error);
        
        if (error.response && error.response.data) {
            console.error('Detalle de la respuesta HTTP de Transbank (error.response.data):', error.response.data);
        }
        if (error.tbkDetails) { 
            console.error('Detalles del error de Transbank (error.tbkDetails):', error.tbkDetails);
        }
        throw new Error('No se pudo iniciar la transacción con Transbank. ' + (error.message || 'Error desconocido.'));
    }
}

module.exports = {
    iniciarTransaccionWebpay
};