// =============================================================
// BharatYatra — API Layer
// Free APIs, no keys required
// =============================================================

const API = {

    // ── OPEN-METEO: Live Weather (no key needed) ──────────────
    async getWeather(lat, lon, city) {
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FKolkata&forecast_days=3`;
            const r = await fetch(url);
            if (!r.ok) throw new Error('Weather fetch failed');
            const d = await r.json();
            return {
                temp: Math.round(d.current.temperature_2m),
                humidity: d.current.relative_humidity_2m,
                wind: Math.round(d.current.wind_speed_10m),
                code: d.current.weather_code,
                high: Math.round(d.daily.temperature_2m_max[0]),
                low: Math.round(d.daily.temperature_2m_min[0]),
                rain: d.daily.precipitation_sum[0],
                icon: API._wmoIcon(d.current.weather_code),
                desc: API._wmoDesc(d.current.weather_code)
            };
        } catch (e) {
            return null;
        }
    },

    _wmoIcon(code) {
        if (code === 0) return '☀️';
        if (code <= 3) return '⛅';
        if (code <= 48) return '🌫️';
        if (code <= 67) return '🌧️';
        if (code <= 77) return '❄️';
        if (code <= 82) return '🌦️';
        if (code <= 99) return '⛈️';
        return '🌤️';
    },

    _wmoDesc(code) {
        if (code === 0) return 'Clear skies';
        if (code <= 3) return 'Partly cloudy';
        if (code <= 48) return 'Foggy';
        if (code <= 67) return 'Rainy';
        if (code <= 77) return 'Snow / sleet';
        if (code <= 82) return 'Rain showers';
        if (code <= 99) return 'Thunderstorm';
        return 'Cloudy';
    },

    // ── EXCHANGE RATE: Live INR rates (no key needed) ─────────
    async getRates() {
        try {
            const r = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
            if (!r.ok) throw new Error();
            const d = await r.json();
            return d.rates; // rates relative to INR
        } catch (e) {
            return { USD: 0.012, EUR: 0.011, GBP: 0.0095, AED: 0.044 };
        }
    },

    // ── TELEPORT: City cost of living data (no key needed) ────
    async getCityScore(cityName) {
        try {
            // Search for the city in Teleport
            const searchRes = await fetch(`https://api.teleport.org/api/cities/?search=${encodeURIComponent(cityName)}&limit=1`);
            if (!searchRes.ok) throw new Error();
            const searchData = await searchRes.json();
            const embedded = searchData._embedded?.['city:search-results'];
            if (!embedded || embedded.length === 0) throw new Error('No results');
            const cityUrl = embedded[0]._links?.['city:item']?.href;
            if (!cityUrl) throw new Error('No city URL');
            const cityRes = await fetch(cityUrl);
            const cityData = await cityRes.json();
            const urbanAreaUrl = cityData._links?.['city:urban_area']?.href;
            if (!urbanAreaUrl) throw new Error('No urban area');
            const scoresRes = await fetch(`${urbanAreaUrl}scores/`);
            if (!scoresRes.ok) throw new Error();
            const scoresData = await scoresRes.json();
            const categories = scoresData.categories || [];
            return {
                summary: scoresData.summary?.replace(/<[^>]+>/g, '') || '',
                scores: categories.slice(0, 6).map(c => ({
                    name: c.name,
                    score: Math.round(c.score_out_of_10 * 10)
                }))
            };
        } catch (e) {
            return null;
        }
    },

    // ── REST COUNTRIES: International destination data ────────
    async getCountryInfo(countryCode) {
        try {
            const r = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}?fields=name,currencies,languages,flags,capital,region`);
            if (!r.ok) throw new Error();
            return await r.json();
        } catch (e) {
            return null;
        }
    }
};

window.YATRA_API = API;
