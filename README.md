#why.js

Why stubs stuff. Why? Because you want to make testing stuff easier.

## Usage

Stubbing a function:

    why.stub 'User.find', (userId) ->
      { name: 'Bob' }

Stubbing a class:

    why.stub 'User', class
      find: (userId) ->
        { name: 'Bob' }

(Examples are in CoffeeScript)

### Cleanup

To cleanup stuff just run `why.reset()` in an after each block.

## Teaspoon

To use with [teaspoon](https://github.com/modeset/teaspoon), add this to your `spec_helper.coffee`:

    #= require support/why
    afterEach ->
      why.reset()

## License

See [LICENSE](LICENSE).
