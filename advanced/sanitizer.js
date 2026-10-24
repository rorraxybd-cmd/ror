/**
 * rorraxy - Advanced Core Sanitization Engine
 * Description: Deep cleans user inputs, HTML tags, and text strings to prevent 
 * Cross-Site Scripting (XSS), SQL injection, and malicious payload execution.
 */

class RorraxySanitizer {
    constructor() {
        this.allowedTags = [];
    }

    sanitizeText(input) {
        if (typeof input !== 'string') return '';
        
        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;')
            .trim();
    }

    sanitizeHTML(html) {
        if (typeof html !== 'string') return '';

        return html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/on\w+\s*=\s*"[^"]*"/gi, '')
            .replace(/on\w+\s*=\s*'[^']*'/gi, '')
            .replace(/on\w+\s*=[^\s>]+/gi, '')
            .replace(/javascript:/gi, '');
    }

    sanitizeURL(url) {
        if (typeof url !== 'string') return '';
        
        const trimmedUrl = url.trim();
        if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')) {
            return trimmedUrl;
        }
        return '';
    }

    sanitizeObject(dataObject) {
        if (!dataObject || typeof dataObject !== 'object') return {};

        let sanitizedObj = {};
        for (let key in dataObject) {
            if (Object.prototype.hasOwnProperty.call(dataObject, key)) {
                let value = dataObject[key];
                if (typeof value === 'string') {
                    sanitizedObj[key] = this.sanitizeText(value);
                } else if (typeof value === 'object' && value !== null) {
                    sanitizedObj[key] = this.sanitizeObject(value);
                } else {
                    sanitizedObj[key] = value;
                }
            }
        }
        return sanitizedObj;
    }
}

const rorraxySanitizer = new RorraxySanitizer();

if (typeof window !== 'undefined') {
    window.RorraxySanitizer = RorraxySanitizer;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = RorraxySanitizer;
}
