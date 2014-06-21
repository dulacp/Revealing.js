(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#revealing', {
    // This will run before each test in this module.
    setup: function() {
      this.wrapper = $('#qunit-fixture');
      this.elems = this.wrapper.children();
    }
  });

  test('is chainable', function() {
    expect(1);
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.revealing(), this.elems, 'should be chainable');
  });

  test('wrap each letters', function() {
    expect(1);
    var els = this.wrapper.find('.simple-text').revealing();
    equal(els.find('span').length, 68, 'should have wrapped with <span></span>');
  });

  test('maintain styled input', function() {
    expect(3);
    var els = this.wrapper.find('.styled-text').revealing();
    equal(els.find('span').length, 68, 'should have wrapped each letters');
    equal(els.find('b').length, 1, 'should maintain bold style');
    equal(els.find('u').length, 1, 'should maintain underlined style');
  });

  test('support nested styled input', function() {
    expect(4);
    var els = this.wrapper.find('.nested-styled-text').revealing();
    equal(els.find('span').length, 68, 'should have wrapped each letters');
    equal(els.find('b').length, 2, 'should maintain bold style');
    equal(els.find('u').length, 1, 'should maintain underlined style');
    equal(els.find('b > u').length, 1, 'should maintain bold nested underlined style');
  });

}(jQuery));
