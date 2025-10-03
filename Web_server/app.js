// Square Calculator JavaScript
class SquareCalculator {
    constructor() {
        this.form = document.getElementById('calculator-form');
        this.input = document.getElementById('number-input');
        this.calculateBtn = document.querySelector('.calculate-btn');
        this.validationMessages = document.getElementById('validation-messages');
        this.resultContainer = document.getElementById('result-container');
        this.resultEquation = document.getElementById('result-equation');
        this.resultValue = document.getElementById('result-value');
        
        this.init();
    }
    
    init() {
        // Add event listeners
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.input.addEventListener('input', () => this.handleInput());
        this.input.addEventListener('keypress', (e) => this.handleKeyPress(e));
        this.input.addEventListener('focus', () => this.handleFocus());
        
        // Focus on input when page loads
        this.input.focus();
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.calculateSquare();
    }
    
    handleInput() {
        // Clear previous results and errors when user starts typing
        this.clearResults();
        this.clearValidationMessages();
        this.input.classList.remove('error', 'success');
        
        // Provide real-time validation feedback
        const value = this.input.value.trim();
        if (value && !this.isValidNumber(value)) {
            this.showValidationMessage('Please enter a valid number', 'error');
            this.input.classList.add('error');
        }
    }
    
    handleKeyPress(e) {
        // Allow Enter key to submit
        if (e.key === 'Enter') {
            e.preventDefault();
            this.calculateSquare();
        }
    }
    
    handleFocus() {
        // Select all text when input is focused for easy replacement
        setTimeout(() => {
            this.input.select();
        }, 10);
    }
    
    calculateSquare() {
        const value = this.input.value.trim();
        
        // Clear previous states
        this.clearValidationMessages();
        this.input.classList.remove('error', 'success');
        
        // Validate input
        if (!value) {
            this.showValidationMessage('Please enter a number to calculate its square', 'error');
            this.input.classList.add('error');
            this.input.focus();
            return;
        }
        
        if (!this.isValidNumber(value)) {
            this.showValidationMessage('Please enter a valid number (e.g., 5, -3.14, 0.5)', 'error');
            this.input.classList.add('error');
            this.input.focus();
            return;
        }
        
        const number = parseFloat(value);
        
        // Check for edge cases
        if (!isFinite(number)) {
            this.showValidationMessage('Number is too large or invalid', 'error');
            this.input.classList.add('error');
            return;
        }
        
        // Check if result would be too large
        const square = number * number;
        if (!isFinite(square)) {
            this.showValidationMessage('Result is too large to display', 'error');
            this.input.classList.add('error');
            return;
        }
        
        // Show loading state
        this.showLoadingState();
        
        // Simulate brief calculation delay for better UX
        setTimeout(() => {
            this.displayResult(number, square);
            this.hideLoadingState();
            this.input.classList.add('success');
            // Select input text for easy replacement of next calculation
            this.input.select();
        }, 300);
    }
    
    isValidNumber(value) {
        // Check if the value is a valid number
        // Also handle cases where HTML5 validation might miss edge cases
        if (value === '' || value === null || value === undefined) {
            return false;
        }
        
        // Check for non-numeric characters (for cases where type="number" doesn't catch everything)
        if (!/^-?(\d+\.?\d*|\.\d+)([eE][-+]?\d+)?$/.test(value.toString())) {
            return false;
        }
        
        const number = parseFloat(value);
        return !isNaN(number) && isFinite(number);
    }
    
    showLoadingState() {
        this.calculateBtn.classList.add('loading');
        this.calculateBtn.disabled = true;
    }
    
    hideLoadingState() {
        this.calculateBtn.classList.remove('loading');
        this.calculateBtn.disabled = false;
    }
    
    displayResult(number, square) {
        // Format the equation and result
        const formattedNumber = this.formatNumber(number);
        const formattedSquare = this.formatNumber(square);
        
        this.resultEquation.textContent = `${formattedNumber}² = `;
        this.resultValue.textContent = formattedSquare;
        
        // Show result container with animation
        this.resultContainer.classList.remove('hidden');
        
        // Scroll result into view if needed
        setTimeout(() => {
            this.resultContainer.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 100);
    }
    
    formatNumber(number) {
        // Format number for display
        if (Number.isInteger(number) && Math.abs(number) < 1000000) {
            return number.toString();
        }
        
        // For decimal numbers or large numbers, use appropriate formatting
        if (Math.abs(number) >= 1000000 || (number !== 0 && Math.abs(number) < 0.001)) {
            return number.toExponential(6).replace(/\.?0+e/, 'e');
        }
        
        // For normal decimal numbers
        return parseFloat(number.toFixed(10)).toString();
    }
    
    showValidationMessage(message, type = 'error') {
        this.validationMessages.textContent = message;
        this.validationMessages.className = `validation-messages ${type}`;
        this.validationMessages.classList.remove('hidden');
    }
    
    clearValidationMessages() {
        this.validationMessages.classList.add('hidden');
        this.validationMessages.textContent = '';
    }
    
    clearResults() {
        this.resultContainer.classList.add('hidden');
        this.resultEquation.textContent = '';
        this.resultValue.textContent = '';
    }
    
    clearInput() {
        this.input.value = '';
        this.input.focus();
        this.clearResults();
        this.clearValidationMessages();
        this.input.classList.remove('error', 'success');
    }
}

// Additional utility functions
function addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Clear input with Escape key
        if (e.key === 'Escape') {
            calculator.clearInput();
        }
        
        // Focus input with Ctrl/Cmd + /
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            document.getElementById('number-input').focus();
        }
    });
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create calculator instance
    window.calculator = new SquareCalculator();
    
    // Add keyboard shortcuts
    addKeyboardShortcuts();
    
    // Add some helpful console messages for developers
    console.log('Square Calculator initialized successfully!');
    console.log('Keyboard shortcuts:');
    console.log('- Enter: Calculate square');
    console.log('- Escape: Clear input');
    console.log('- Ctrl/Cmd + /: Focus input field');
});

// Handle page visibility changes to maintain focus
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        // Refocus input when user returns to tab
        setTimeout(() => {
            const input = document.getElementById('number-input');
            if (input && !input.value) {
                input.focus();
            }
        }, 100);
    }
});

// Export for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SquareCalculator;
}
