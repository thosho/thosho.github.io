// =============================================================
// BharatYatra — Budget Calculator Engine
// =============================================================

const Calculator = {

    // Build result from form state
    calculate(state) {
        const { destination, sourceCity, travelMode, hotelTier, mealPref,
                adults, children, seniors, nights, checkIn, activities } = state;

        if (!destination || !sourceCity || !checkIn || nights < 1) return null;

        const dest = YATRA.DESTINATIONS.find(d => d.id === destination);
        const src  = YATRA.SOURCE_CITIES.find(c => c.id === sourceCity);
        if (!dest) return null;

        const checkInDate = new Date(checkIn);
        const month = checkInDate.getMonth() + 1;
        const seasonMult = YATRA.getSeasonMultiplier(dest, month);

        const totalPax   = adults + children + seniors;
        const childMult  = 0.6; // children at 60%
        const seniorDisc = 0.1; // 10% senior discount on base

        // ── TRANSPORT COST ────────────────────────────────────
        let transportPerAdult = 0;
        if (travelMode === 'flight') {
            const base = dest.baseFlight?.[sourceCity] || 5000;
            transportPerAdult = Math.round(base * seasonMult);
        } else if (travelMode === 'train') {
            const base = dest.baseTrain?.[sourceCity] || 1200;
            transportPerAdult = Math.round(base * seasonMult);
        } else if (travelMode === 'bus') {
            const base = (dest.baseTrain?.[sourceCity] || 1000) * 0.6;
            transportPerAdult = Math.round(base * seasonMult);
        } else {
            // own vehicle — petrol estimate: ₹12/km, 2-way
            const dist = this._getApproxDistance(sourceCity, destination);
            transportPerAdult = Math.round((dist * 2 * 12) / Math.max(totalPax, 1));
        }

        const transportCost =
            (adults * transportPerAdult) +
            (children * transportPerAdult * childMult) +
            (seniors * transportPerAdult * (1 - seniorDisc));

        // ── ACCOMMODATION COST ────────────────────────────────
        const hotelPerNight = dest.baseHotel[hotelTier] * seasonMult;
        const roomsNeeded   = Math.ceil(totalPax / 2); // 2 pax / room
        const hotelCost     = Math.round(hotelPerNight * roomsNeeded * nights);

        // ── MEALS COST ────────────────────────────────────────
        const mealPerPaxPerDay = dest.avgMeal[mealPref];
        const mealCost = Math.round(
            (adults * mealPerPaxPerDay + children * mealPerPaxPerDay * childMult + seniors * mealPerPaxPerDay) * nights
        );

        // ── ACTIVITIES COST ───────────────────────────────────
        let activityCostPerDay = 0;
        (activities || []).forEach(id => {
            const act = YATRA.ACTIVITY_CATEGORIES.find(a => a.id === id);
            if (act) activityCostPerDay += act.daily;
        });
        const activityCost = Math.round(activityCostPerDay * nights * totalPax * 0.5); // shared cost factor

        // ── MISCELLANEOUS ─────────────────────────────────────
        const subtotal = transportCost + hotelCost + mealCost + activityCost;
        const misc     = Math.round(subtotal * 0.08); // 8% for incidentals, tips, local transport
        const total    = subtotal + misc;

        // ── SAVINGS OPPORTUNITIES ─────────────────────────────
        const savings = this._getSavings(dest, travelMode, hotelTier, checkInDate, adults + children + seniors);

        // ── SEASON ADVICE ─────────────────────────────────────
        const seasonAdvice = this._getSeasonAdvice(dest, month, seasonMult);

        return {
            dest, src, totalPax, nights, month, seasonMult,
            breakdown: {
                transport: Math.round(transportCost),
                hotel:     Math.round(hotelCost),
                meals:     Math.round(mealCost),
                activities:Math.round(activityCost),
                misc:      Math.round(misc)
            },
            total:     Math.round(total),
            perPerson: Math.round(total / totalPax),
            savings,
            seasonAdvice,
            isGoodTime: dest.bestMonths?.includes(month)
        };
    },

    _getApproxDistance(src, dest) {
        const matrix = {
            goa:       { delhi: 1900, mumbai: 580, bangalore: 560, chennai: 700, kolkata: 2100, hyderabad: 660 },
            kerala:    { delhi: 2900, mumbai: 1400, bangalore: 620, chennai: 750, kolkata: 2800, hyderabad: 1200 },
            rajasthan: { delhi: 310, mumbai: 1200, bangalore: 2100, chennai: 2200, kolkata: 1800, hyderabad: 1700 },
            himachal:  { delhi: 500, mumbai: 2000, bangalore: 2800, chennai: 3100, kolkata: 2000, hyderabad: 2500 },
            andaman:   { delhi: 2300, mumbai: 2000, bangalore: 1800, chennai: 1400, kolkata: 1800, hyderabad: 1900 },
            ladakh:    { delhi: 1000, mumbai: 2500, bangalore: 3200, chennai: 3500, kolkata: 2800, hyderabad: 2900 },
            coorg:     { delhi: 2900, mumbai: 1400, bangalore: 250, chennai: 620, kolkata: 2900, hyderabad: 1200 },
            varanasi:  { delhi: 820, mumbai: 1600, bangalore: 2200, chennai: 2000, kolkata: 700, hyderabad: 1500 },
            ooty:      { delhi: 2900, mumbai: 1700, bangalore: 270, chennai: 550, kolkata: 3000, hyderabad: 1400 },
            jaipur:    { delhi: 280, mumbai: 1200, bangalore: 2100, chennai: 2300, kolkata: 1700, hyderabad: 1600 }
        };
        return matrix[dest]?.[src] || 1000;
    },

    _getSavings(dest, mode, hotelTier, date, pax) {
        const tips = [];
        const month = date.getMonth() + 1;

        // Early booking tip
        const daysAhead = Math.round((date - new Date()) / 86400000);
        if (daysAhead < 21 && mode === 'flight') {
            tips.push({ icon: '⚡', text: 'Book 45+ days ahead for upto 30% cheaper flights', save: '₹800–1,500/person' });
        }
        if (daysAhead >= 45) {
            tips.push({ icon: '✅', text: 'Great! Early booking detected — you likely saved 20–30%', save: 'Already saved!' });
        }

        // Off season tip
        if (dest.peakMonths?.includes(month)) {
            const cheapMonths = dest.bestMonths?.filter(m => !dest.peakMonths.includes(m));
            if (cheapMonths?.length) {
                tips.push({ icon: '📅', text: `Off-peak months (${cheapMonths.map(m => YATRA.MONTH_NAMES[m-1]).join(', ')}) are 35% cheaper`, save: 'Save 35% total' });
            }
        }

        // Group discount
        if (pax >= 4) {
            tips.push({ icon: '👥', text: 'Group of 4+ qualifies for group packages — save on hotels', save: '₹200–400/night' });
        }

        // Hotel tier
        if (hotelTier === 'luxury') {
            tips.push({ icon: '🏨', text: 'Use MakeMyTrip HDFC card for extra 12% off on luxury stays', save: '₹500–2,000/night' });
        }
        if (hotelTier === 'budget') {
            tips.push({ icon: '🎯', text: 'OYO + GOIBIBO promo code: OYO40NOW gives 40% off budget stays', save: 'Up to ₹400/night' });
        }

        // Train vs flight
        if (mode === 'flight') {
            const trainCost = dest.baseTrain?.[dest.id] || null;
            if (trainCost) {
                tips.push({ icon: '🚂', text: 'Train (AC 2-tier) is ~60% cheaper and equally comfortable', save: `₹${Math.round(trainCost * 0.6 * pax).toLocaleString('en-IN')} total` });
            }
        }

        tips.push({ icon: '💳', text: 'Pay via UPI or SBI/HDFC travel cards for 5% cashback', save: '5% cashback' });

        return tips.slice(0, 5);
    },

    _getSeasonAdvice(dest, month, mult) {
        if (mult >= YATRA.getSeasonMultiplier(null) * 1.4) {
            return { type: 'warn', text: `🔥 Peak season in ${YATRA.MONTH_NAMES[month-1]}! Prices are 60% higher. Book ASAP or consider shoulder months.` };
        }
        if (dest.bestMonths?.includes(month)) {
            return { type: 'good', text: `✅ ${YATRA.MONTH_NAMES[month-1]} is a great time to visit ${dest.name}! Pleasant weather and fair prices.` };
        }
        return { type: 'info', text: `ℹ️ Off-season pricing active — save up to 25% but check weather advisories for ${dest.name}.` };
    }
};

window.YATRA_CALC = Calculator;
