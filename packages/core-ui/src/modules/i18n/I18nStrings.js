import $ from "jquery";

let i18nStrings = undefined;

export function I18nStrings(callback) {
    if (!i18nStrings) {
        i18nStrings = new Promise(function(resolve, reject) {
            $.ajax({
                type: 'GET',
                url: '/api/v2/i18n',
                contentType: 'application/json',
                async: true,
                success: resolve
            });
        })
    }
    i18nStrings.then(callback)
}