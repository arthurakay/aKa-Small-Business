describe('aKa.Validation', function() {

    var me = aKa.Validation;

    /**
     * testEmail()
     */
    describe('testEmail() method', function() {

        it('should be a function', function() {
            expect(typeof me.testEmail).toEqual('function');
        });

        it('should return FALSE when the test fails', function() {
            var testEmail;

            expect(typeof me.testEmail()).toEqual('boolean');

            testEmail = ''; //should not allow empty values
            expect(me.testEmail(testEmail)).toEqual(false);

            testEmail = 'notAnEmailAddress'; //this should be poorly formed
            expect(me.testEmail(testEmail)).toEqual(false);

            testEmail = 'a@a'; //this should be poorly formed
            expect(me.testEmail(testEmail)).toEqual(false);

            testEmail = 'a@a.a'; //this should be too short (requires at least 2 chars in domain
            expect(me.testEmail(testEmail)).toEqual(false);
        });

        it('should return TRUE when the test passes', function() {
            var testEmail;

            expect(typeof me.testEmail()).toEqual('boolean');

            testEmail = 'a@a.aa'; //this should be long enough
            expect(me.testEmail(testEmail)).toEqual(true);

            testEmail = 'a@a.a.aa'; //this should allow multiple TLDs
            expect(me.testEmail(testEmail)).toEqual(true);
        });

        it('should return TRUE when email has multiple TLDs', function() {
            var testEmail;

            expect(typeof me.testEmail()).toEqual('boolean');

            testEmail = 'a@a.a.aa'; //this should allow multiple TLDs
            expect(me.testEmail(testEmail)).toEqual(true);
        });

    });

    /**
     * testPhone()
     */
    describe('testPhone() method', function() {

        it('should be a function', function() {
            expect(typeof me.testPhone).toEqual('function');
        });

        it('should return FALSE when the test fails', function() {
            var testPhone;

            expect(typeof me.testPhone()).toEqual('boolean');

            testPhone = ''; //should not allow empty values
            expect(me.testPhone(testPhone)).toEqual(false);

            testPhone = '123'; //should be too short
            expect(me.testPhone(testPhone)).toEqual(false);

            testPhone = '123456'; //should be too short
            expect(me.testPhone(testPhone)).toEqual(false);

            testPhone = '123456789'; //should be too short
            expect(me.testPhone(testPhone)).toEqual(false);

            testPhone = '12345678900'; //should be too long - only allows 10 chars
            expect(me.testPhone(testPhone)).toEqual(false);
        });

        it('should return FALSE when text characters are provided', function() {
            var testPhone;

            expect(typeof me.testPhone()).toEqual('boolean');

            testPhone = '123456789p'; //should not allow text chars
            expect(me.testPhone(testPhone)).toEqual(false);

            testPhone = '123-456-789p'; //should not allow text chars
            expect(me.testPhone(testPhone)).toEqual(false);

            testPhone = '123_456_7890'; //should not allow text chars
            expect(me.testPhone(testPhone)).toEqual(false);
        });

        it('should return TRUE when the test passes', function() {
            var testPhone;

            expect(typeof me.testEmail()).toEqual('boolean');

            testPhone = '1234567890'; //should be long enough
            expect(me.testPhone(testPhone)).toEqual(true);
        });

        it('should return TRUE when phone has hyphens, periods or spaces', function() {
            var testPhone;

            expect(typeof me.testEmail()).toEqual('boolean');

            testPhone = '1234567890'; //should be long enough
            expect(me.testPhone(testPhone)).toEqual(true);

            testPhone = '123-456-7890'; //should be long enough
            expect(me.testPhone(testPhone)).toEqual(true);

            testPhone = '123 456 7890'; //should be long enough
            expect(me.testPhone(testPhone)).toEqual(true);

            testPhone = '123.456.7890'; //should be long enough
            expect(me.testPhone(testPhone)).toEqual(true);
        });

    });


    /**
     * testText()
     */
    describe('testText() method', function() {

        it('should be a function', function() {
            expect(typeof me.testText).toEqual('function');
        });

        it('should return FALSE when the test fails', function() {
            var testText;

            expect(typeof me.testText()).toEqual('boolean');

            testText = '1234'; //should be to short - must have at least 5 chars
            expect(me.testText(testText)).toEqual(false);

            testText = 'abcd'; //should be to short - must have at least 5 chars
            expect(me.testText(testText)).toEqual(false);
        });

        it('should return TRUE when the test passes', function() {
            var testText;

            expect(typeof me.testText()).toEqual('boolean');

            testText = '12345'; //should be long enough - must have at least 5 chars
            expect(me.testText(testText)).toEqual(true);

            testText = 'abcde'; //should be long enough - must have at least 5 chars
            expect(me.testText(testText)).toEqual(true);

            testText = 'I have a question for you! Please contact me at foo@bar.com'; //should handle realistic input
            expect(me.testText(testText)).toEqual(true);
        });
    });

    /**
     * testEmail()
     */
    describe('validateFormFields() method', function() {
        beforeEach(function() {
            aKa.Validation.verbose = false;
        });

        afterEach(function() {
            aKa.Validation.verbose = true;
        });

        it('should be a function', function() {
            expect(typeof me.validateFormFields).toEqual('function');
        });

        it('should return an array with two items', function() {
            var el = document.getElementById('test-form');
            var result = me.validateFormFields(el);

            expect(typeof result).toEqual('object');
            expect(result.length).toEqual(2);
        });

        it('should correctly monitor the failing fields', function() {
            var el = document.getElementById('test-form');
            var result = me.validateFormFields(el);

            expect(typeof result).toEqual('object');

            //all fields are empty
            expect(result[0]).toEqual(false);

            //correctly entered TEXT input, 2 invalid fields remaining
            $(el).children()[0].value = 'Correct value';
            result = me.validateFormFields(el);
            expect(result[0]).toEqual(false);

            //correctly entered phone input, 1 invalid fields remaining
            $(el).children()[1].value = '123-546-9000';
            result = me.validateFormFields(el);
            expect(result[0]).toEqual(false);

            //correctly entered email input, 0 invalid fields remaining
            $(el).children()[2].value = 'foo@bar.com';
            result = me.validateFormFields(el);
            expect(result[0]).toEqual(true);
        });
    });

});