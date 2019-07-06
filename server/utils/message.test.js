var expect = require('expect');

var { generateMessage } = require('./message'); 


describe('generate message', () => {

    it('should generate correct message object', () => {

        var from = 'jen';
        var text = 'some message';
        var message = generateMessage(from, text);

        expect(message.createdAt).toBeGreaterThan(0);
        expect(message.text).toBe(text);
    });

});