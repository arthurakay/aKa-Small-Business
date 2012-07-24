/**
 * @singleton
 * @type {Object}
 * @author Arhur Kay (http://www.akawebdesign.com)
 */
aKa = {
    version     : '0.1',
    versionDate : 'July 24, 2012',

    validateForm : function (form) {
        var result = aKa.Validation.validateFormFields(form);

        console.log('Form passes validation? ' + result[0]);
        if (result[1] !== false) {
            alert(result[1]);
        }

        return result[0];
    }
};