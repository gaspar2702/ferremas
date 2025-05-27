
const bcchService = require('../services/bcchService');

async function obtenerDolarObservado(req, res) {
    try {
        const valorDolar = await bcchService.getValorDolarObservado();
        res.json({
            moneda: 'USD',
            valor: valorDolar,
            unidad: 'CLP',
            fuente: 'Banco Central de Chile (vía Mindicador.cl)'
        });
    } catch (error) {
        console.error('Error en bcchController.obtenerDolarObservado:', error);
        res.status(500).json({ message: error.message || 'Error interno del servidor al obtener el dólar.' });
    }
}

module.exports = {
    obtenerDolarObservado
};