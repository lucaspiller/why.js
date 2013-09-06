/**
 * Why.js
 *
 * Why stubs stuff. WHy? Because you want to make testing stuff easier.
 *
 * # Usage
 *
 * Stubbing a function:
 *
 *     why.stub 'User.find', (userId) ->
 *       { name: 'Bob' }
 *
 * Stubbing a class:
 *
 *     why.stub 'User', class
 *       find: (userId) ->
 *         { name: 'Bob' }
 *
 * # Cleanup
 *
 * To cleanup stuff just run `why.reset()` in an after each block.
 *
 */

var why = {};

why.stub = function(what, how) {
  why.stubChain(what, how);
};

why.stubChain = function(what, how) {
  var parts = what.split('.');
  var base = window;
  var chain = "window";
  for(var index in parts) {
    var part = parts[index];
    chain += ("." + part);
    if (index < (parts.length - 1)) {
      if (!base[part]) {
        why.__stub(chain, base, part, {});
        base = base[part];
      } else {
        base = base[part];
      }
    } else {
      why.__stub(chain, base, part, how);
    }
  }
};

why.__stub = function(chain, what, property, how) {
  why.stubbed[chain] = what[property];
  what[property] = how;
}

why.unstubChain = function(what, how) {
  var parts = what.split('.');
  var base = window;
  for(var index in parts) {
    var part = parts[index];
    if (index < (parts.length - 1)) {
      base = base[part];
    } else {
      why.__unstub(base, part, how);
    }
  }
};

why.__unstub = function(what, property, how) {
  what[property] = how;
}

why.stubbed = {};

why.reset = function() {
  for(var index in why.stubbed) {
    why.unstubChain(index, why.stubbed[index]);
  }
  why.stubbed = {};
};
