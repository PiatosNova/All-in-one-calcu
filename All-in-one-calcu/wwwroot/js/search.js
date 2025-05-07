document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    
    // Calculator data with their paths and icons
    const calculators = [
        { name: 'Standard Calculator', path: '/Calculators/Standard', icon: 'bi-calculator' },
        { name: 'Scientific Calculator', path: '/Calculators/Scientific', icon: 'bi-graph-up' },
        { name: 'Unit Converter', path: '/Calculators/UnitConverter', icon: 'bi-arrows-angle-contract' },
        // Sub-calculators for Unit Converter
        { name: 'Length Converter', path: '/Calculators/UnitConverter#length', icon: 'bi-rulers', parent: 'Unit Converter' },
        { name: 'Weight Converter', path: '/Calculators/UnitConverter#weight', icon: 'bi-scale', parent: 'Unit Converter' },
        { name: 'Volume Converter', path: '/Calculators/UnitConverter#volume', icon: 'bi-droplet', parent: 'Unit Converter' },
        { name: 'Temperature Converter', path: '/Calculators/UnitConverter#temperature', icon: 'bi-thermometer', parent: 'Unit Converter' },
        { name: 'Area Converter', path: '/Calculators/UnitConverter#area', icon: 'bi-square', parent: 'Unit Converter' },
        { name: 'Speed Converter', path: '/Calculators/UnitConverter#speed', icon: 'bi-speedometer2', parent: 'Unit Converter' },
        { name: 'Currency Converter', path: '/Calculators/CurrencyConverter', icon: 'bi-currency-exchange' },
        { name: 'Finance Calculator', path: '/Calculators/Finance', icon: 'bi-bank' },
        // Sub-calculators for Finance
        { name: 'Loan Calculator', path: '/Calculators/Finance#loan', icon: 'bi-cash-stack', parent: 'Finance' },
        { name: 'Mortgage Calculator', path: '/Calculators/Finance#mortgage', icon: 'bi-house', parent: 'Finance' },
        { name: 'Interest Calculator', path: '/Calculators/Finance#interest', icon: 'bi-percent', parent: 'Finance' },
        { name: 'Health Calculator', path: '/Calculators/Health', icon: 'bi-heart' },
        // Sub-calculators for Health
        { name: 'BMI Calculator', path: '/Calculators/Health#bmi', icon: 'bi-person', parent: 'Health' },
        { name: 'BMR Calculator', path: '/Calculators/Health#bmr', icon: 'bi-fire', parent: 'Health' },
        { name: 'Body Fat Calculator', path: '/Calculators/Health#bodyFat', icon: 'bi-person-badge', parent: 'Health' },
        { name: 'Miscellaneous Calculator', path: '/Calculators/Miscellaneous', icon: 'bi-three-dots' },
        // Sub-calculators for Miscellaneous
        { name: 'Age Calculator', path: '/Calculators/Miscellaneous#age', icon: 'bi-calendar', parent: 'Miscellaneous' },
        { name: 'Date Calculator', path: '/Calculators/Miscellaneous#date', icon: 'bi-calendar-date', parent: 'Miscellaneous' },
        { name: 'Time Calculator', path: '/Calculators/Miscellaneous#time', icon: 'bi-clock', parent: 'Miscellaneous' },
        { name: 'Percentage Calculator', path: '/Calculators/Miscellaneous#percentage', icon: 'bi-percent', parent: 'Miscellaneous' }
    ];

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length < 2) {
            searchSuggestions.style.display = 'none';
            return;
        }

        const filteredCalculators = calculators.filter(calc => 
            calc.name.toLowerCase().includes(searchTerm)
        );

        if (filteredCalculators.length > 0) {
            let suggestionsHTML = '';
            let mainCalculators = [];
            let unitSubCalculators = [];
            let financeSubCalculators = [];
            let healthSubCalculators = [];
            let miscSubCalculators = [];

            // Separate main calculators and sub-calculators
            filteredCalculators.forEach(calc => {
                if (calc.parent === 'Unit Converter') {
                    unitSubCalculators.push(calc);
                } else if (calc.parent === 'Finance') {
                    financeSubCalculators.push(calc);
                } else if (calc.parent === 'Health') {
                    healthSubCalculators.push(calc);
                } else if (calc.parent === 'Miscellaneous') {
                    miscSubCalculators.push(calc);
                } else {
                    mainCalculators.push(calc);
                }
            });

            // Add main calculators first
            mainCalculators.forEach(calc => {
                suggestionsHTML += `
                    <a href="${calc.path}" class="search-suggestion-item">
                        <i class="bi ${calc.icon}"></i>
                        <span>${calc.name}</span>
                    </a>
                `;
            });

            // Add Unit Converter sub-calculators if any
            if (unitSubCalculators.length > 0) {
                suggestionsHTML += '<div class="search-suggestion-divider">Unit Converter Types</div>';
                unitSubCalculators.forEach(calc => {
                    suggestionsHTML += `
                        <a href="${calc.path}" class="search-suggestion-item">
                            <i class="bi ${calc.icon}"></i>
                            <span>${calc.name}</span>
                        </a>
                    `;
                });
            }

            // Add Finance sub-calculators if any
            if (financeSubCalculators.length > 0) {
                suggestionsHTML += '<div class="search-suggestion-divider">Finance Calculators</div>';
                financeSubCalculators.forEach(calc => {
                    suggestionsHTML += `
                        <a href="${calc.path}" class="search-suggestion-item">
                            <i class="bi ${calc.icon}"></i>
                            <span>${calc.name}</span>
                        </a>
                    `;
                });
            }

            // Add Health sub-calculators if any
            if (healthSubCalculators.length > 0) {
                suggestionsHTML += '<div class="search-suggestion-divider">Health Calculators</div>';
                healthSubCalculators.forEach(calc => {
                    suggestionsHTML += `
                        <a href="${calc.path}" class="search-suggestion-item">
                            <i class="bi ${calc.icon}"></i>
                            <span>${calc.name}</span>
                        </a>
                    `;
                });
            }

            // Add Miscellaneous sub-calculators if any
            if (miscSubCalculators.length > 0) {
                suggestionsHTML += '<div class="search-suggestion-divider">Miscellaneous Calculators</div>';
                miscSubCalculators.forEach(calc => {
                    suggestionsHTML += `
                        <a href="${calc.path}" class="search-suggestion-item">
                            <i class="bi ${calc.icon}"></i>
                            <span>${calc.name}</span>
                        </a>
                    `;
                });
            }

            searchSuggestions.innerHTML = suggestionsHTML;
            searchSuggestions.style.display = 'block';
        } else {
            searchSuggestions.style.display = 'none';
        }
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
            searchSuggestions.style.display = 'none';
        }
    });
});
