/**
 * @singleton
 * @type {Object}
 */
aKa.Validation = {
    verbose : true,

    cls     : '.aka-validation',
    msgJoin : '\n',

    emailRegEx  : /^(\w+)([\-+.][\w]+)*@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/,
    emailErrMsg : 'Please enter a valid email address.',

    phoneRegEx  : /^([0-9]{3})([-,\.,\s]?)([0-9]{3})([-,\.,\s]?)([0-9]{4})$/,
    phoneErrMsg : 'Please enter a valid US phone number in 123-456-7890 format.',

    textRegEx  : /^.{5,}$/,
    textErrMsg : 'Please enter valid text.',

    /**
     * @param value
     * @return {Boolean}
     */
    testEmail : function (value) {
        return this.emailRegEx.test(value);
    },

    /**
     * @param value
     * @return {Boolean}
     */
    testPhone : function (value) {
        return this.phoneRegEx.test(value);
    },

    /**
     * @param value
     * @return {Boolean}
     */
    testText : function (value) {
        return this.textRegEx.test(value);
    },

    /**
     * @param form
     * @return {Array}
     */
    validateFormFields : function (form) {
        var formEl = $(form),
            formFields = formEl.find(this.cls),
            passingTests = 0,
            i = 0,
            errMsg = [],
            currentField, focusEl;

        for (i; i < formFields.length; i++) {
            currentField = $(formFields[i]);

            if (currentField.attr('vtype') === 'text') {
                if (this.testText(currentField[0].value)) {
                    passingTests++;
                }
                else {
                    if (!focusEl) {
                        focusEl = currentField;
                    }
                    errMsg.push(this.textErrMsg);
                }
            }
            else if (currentField.attr('vtype') === 'email') {
                if (this.testEmail(currentField[0].value)) {
                    passingTests++;
                }
                else {
                    if (!focusEl) {
                        focusEl = currentField;
                    }
                    errMsg.push(this.emailErrMsg);
                }
            }
            else if (currentField.attr('vtype') === 'phone') {
                if (this.testPhone(currentField[0].value)) {
                    passingTests++;
                }
                else {
                    if (!focusEl) {
                        focusEl = currentField;
                    }
                    errMsg.push(this.phoneErrMsg);
                }
            }
            else {
                passingTests++;
            }
        }

        if (focusEl) {
            focusEl.focus();
        }

        return [
            (passingTests === formFields.length),
            (errMsg.length > 0 && this.verbose ? errMsg.join(this.msgJoin) : false)
        ];
    }
};