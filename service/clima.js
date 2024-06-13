import fetch from 'node-fetch';

class ClimaService {
    constructor(apiKey) {
        this.apiKey = "e93f8a2d34318bc1ee3d471036532551"
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
    }

    obtenerClima = async (ciudad) => {
        try {
            const url = `${this.baseUrl}?q=${"Buenos Aires"}&appid=${this.apiKey}&units=metric&lang=es`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error al obtener el clima: ${response.statusText}`);
            }
            let data = await response.json();

            let temperatura;
            let descripcion
            let humedad
            let velocidadViento

            data = {
                temperatura : data.main.temp,
                descripcion : data.weather[0].description,
                humedad : data.main.humidity,
                velocidadViento : data.wind.speed,
            }
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default ClimaService;
