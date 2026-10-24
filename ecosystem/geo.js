/**
 * rorraxy Ecosystem - Robust Free Geo-Location, Auto Currency, City & Phone Country Code Auto-Fill
 * File Location: management/countryCodeDetector.js
 */

async function initAutoCountryAndCurrency(baseUsdPrice = 0) {
    const fallbackData = {
        country: "Bangladesh",
        countryCode: "bd",
        city: "Dhaka",
        currency: "BDT",
        phoneCode: "+880",
        rate: 115,
        flag: "https://flagcdn.com/w80/bd.png"
    };

    let countryName = fallbackData.country;
    let countryCode = fallbackData.countryCode;
    let cityName = fallbackData.city;
    let targetCurrency = fallbackData.currency;
    let phoneCode = fallbackData.phoneCode;
    let exchangeRate = 1;
    let finalPrice = baseUsdPrice;
    let flagUrl = fallbackData.flag;

    try {
        const geoResponse = await fetch('https://ipapi.co/json/');
        if (!geoResponse.ok) throw new Error("Geo API failed");
        
        const geoData = await geoResponse.json();
        
        if (geoData && geoData.country_name) {
            countryName = geoData.country_name;
            countryCode = geoData.country_code ? geoData.country_code.toLowerCase() : "us";
            cityName = geoData.city || "New York";
            targetCurrency = geoData.currency || "USD";
            phoneCode = geoData.country_calling_code ? `+${geoData.country_calling_code.replace('+', '')}` : "+1";
            flagUrl = `https://flagcdn.com/w80/${countryCode}.png`;
        }
    } catch (err) {
        console.warn("[rorraxy Geo Warning]: আইপি ডিটেক্ট করতে সমস্যা হয়েছে, ব্যাকআপ লোকেশন ব্যবহার করা হচ্ছে।", err);
    }

    if (targetCurrency !== 'USD') {
        try {
            const rateRes = await fetch(`https://api.frankfurter.app/latest?from=USD&to=${targetCurrency}`);
            if (!rateRes.ok) throw new Error("Currency API failed");
            
            const rateData = await rateRes.json();
            if (rateData && rateData.rates && rateData.rates[targetCurrency]) {
                exchangeRate = rateData.rates[targetCurrency];
                finalPrice = (baseUsdPrice * exchangeRate).toFixed(2);
            } else {
                throw new Error("Rate not found");
            }
        } catch (err) {
            exchangeRate = targetCurrency === 'BDT' ? 115 : (targetCurrency === 'INR' ? 83 : 1);
            finalPrice = (baseUsdPrice * exchangeRate).toFixed(2);
        }
    } else {
        finalPrice = baseUsdPrice.toFixed(2);
    }

    try {
        const cityInput = document.getElementById('target_city') || document.querySelector('input[name="city"]');
        if (cityInput && !cityInput.value) {
            cityInput.value = cityName;
        }

        const countryInput = document.getElementById('target_country') || document.querySelector('select[name="country"]');
        if (countryInput && !countryInput.value) {
            countryInput.value = countryName;
        }

        const phoneInput = document.getElementById('target_phone') || document.querySelector('input[name="phone"]') || document.querySelector('input[type="tel"]');
        if (phoneInput && !phoneInput.value) {
            phoneInput.value = phoneCode + " ";
        }

        const flagElement = document.getElementById('user-flag-img');
        if (flagElement) {
            flagElement.src = flagUrl;
            flagElement.alt = countryName;
        }

        const locationText = document.getElementById('user-location-display');
        if (locationText) {
            locationText.innerText = `${cityName}, ${countryName} (${targetCurrency}) - Phone: ${phoneCode}`;
        }

        const priceDisplay = document.getElementById('dynamic-price-tag');
        if (priceDisplay) {
            priceDisplay.innerText = `${targetCurrency} ${finalPrice}`;
        }

        window.rorraxyUserGeo = {
            country: countryName,
            city: cityName,
            currency: targetCurrency,
            phoneCode: phoneCode,
            rate: exchangeRate,
            flag: flagUrl
        };

    } catch (uiErr) {
        console.error("[rorraxy UI Error]:", uiErr);
    }
}

if (typeof window !== 'undefined') {
    window.initAutoCountryAndCurrency = initAutoCountryAndCurrency;
    document.addEventListener('DOMContentLoaded', () => {
        initAutoCountryAndCurrency(100); 
    });
}
