
const transbankService = require('../services/transbankService');

async function iniciarPagoWebpay(req, res) {
    const { buyOrder, sessionId, amount, returnUrl } = req.body;

    try {
        const result = await transbankService.iniciarTransaccionWebpay(buyOrder, sessionId, amount, returnUrl);
        res.json({
            message: "Transacción de Webpay iniciada exitosamente.",
            token: result.token,
            url: result.url
        });
    } catch (error) {
        console.error('Error en transbankController.iniciarPagoWebpay:', error);
        res.status(500).json({ message: error.message });
    }
}


async function confirmarPagoWebpay(req, res) {
    console.log('--- Recibida redirección de Transbank ---');
    console.log('req.body (POST):', req.body);
    console.log('req.query (GET):', req.query);


    const token = req.body.token_ws || req.query.token_ws; 

    if (!token) {
        console.error('Token no encontrado en la redirección de Transbank.');

        return res.redirect(`http://localhost:3000/error.html?status=failed&message=${encodeURIComponent('Token de transacción no recibido en el retorno.')}`);
    }

    try {

        const response = await transbankService.confirmarTransaccionWebpay(token);


        console.log('Transacción confirmada con éxito:', response);
        res.redirect(`http://localhost:3000/success.html?status=success&buyOrder=${response.buy_order}&amount=${response.amount}`);

    } catch (error) {
        console.error('Error al confirmar la transacción de Transbank:', error);

        res.redirect(`http://localhost:3000/error.html?status=failed&message=${encodeURIComponent(error.message)}`);
    }
}


module.exports = {
    iniciarPagoWebpay,
    confirmarPagoWebpay 
};