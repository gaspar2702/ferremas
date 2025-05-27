
const axios = require('axios');


const BCCH_USER = process.env.BCCH_USER;
const BCCH_PASS = process.env.BCCH_PASS;


const BCCH_BASE_URL = 'https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx';


const DOLAR_SERIES_ID = 'F073.DCC.CLP.USD.N.Z.D'; 

async function getValorDolarObservado() {

    if (!BCCH_USER || !BCCH_PASS) {
        console.error('Error: Credenciales del Banco Central (BCCH_USER/BCCH_PASS) no configuradas en .env');
        throw new Error('Las credenciales del Banco Central de Chile no están configuradas.');
    }


    const today = new Date();
    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');


    const todayFormatted = `${year}-${month}-${day}`;


    const apiUrl = `${BCCH_BASE_URL}?user=${BCCH_USER}&pass=${BCCH_PASS}&function=GetSeries&timeseries=${DOLAR_SERIES_ID}&firstdate=${todayFormatted}&lastdate=${todayFormatted}`;
  

    try {
        console.log(`Consultando API del Banco Central (BDE) para el dólar: ${apiUrl}`);
        const response = await axios.get(apiUrl);


        if (response.data && response.data.Codigo === 0 && response.data.Series && response.data.Series.Obs && response.data.Series.Obs.length > 0) {

            const valorDolar = parseFloat(response.data.Series.Obs[0].value);
            console.log(`Valor del dólar obtenido del BCCh: ${valorDolar}`);
            return valorDolar;
        } else if (response.data && response.data.Descripcion) {

            console.error('Error de la API del Banco Central (BCDE):', response.data.Descripcion);
            throw new Error(`Error de la API del Banco Central: ${response.data.Descripcion}`);
        }
        else {
            throw new Error('Formato de respuesta inesperado o datos de dólar no encontrados en la API del Banco Central.');
        }

    } catch (error) {
        console.error('Error al obtener el valor del dólar del Banco Central (BCDE):', error.message);
        if (error.response) {
            console.error('Detalles de la respuesta HTTP de la API:', error.response.status, error.response.data);
            if (error.response.status === 401 || error.response.status === 403) {
                 console.error('¡POSIBLE ERROR DE CREDENCIALES BCCh! Revisa BCCH_USER y BCCH_PASS en tu .env');
            }
        }
        throw new Error('No se pudo obtener el valor del dólar del Banco Central en este momento.');
    }
}

module.exports = {
    getValorDolarObservado
};