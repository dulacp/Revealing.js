# Revealing.js

**Reveal your text with a delightful letter by letter animation.**

> Inspired by the Secret app.

[![Build Status](https://travis-ci.org/dulaccc/Revealing.js.png?branch=master)](https://travis-ci.org/dulaccc/Revealing.js)

![Text animation example](examples/quote.gif)


## Examples

[**Check out some basic examples**](http://dulaccc.github.com/Revealing.js/examples/)


## Getting Started

### Install from Bower (recommended)

```sh
bower install Revealing.js
```

### Development version

- [revealing.js](https://raw.githubusercontent.com/dulaccc/Revealing.js/master/src/revealing.js)
- [revealing.scss](https://raw.githubusercontent.com/dulaccc/Revealing.js/master/src/revealing.scss)

### Build compiled version from sources

3 simple steps: 
- clone `git clone https://github.com/dulaccc/Revealing.js.git && cd Revealing.js`
- install dependencies `npm install`
- build `grunt build`

Then you'll find the compiled code in `dist/`.


## Integration

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/revealing.min.js"></script>
<link rel="stylesheet" href="dist/revealing.css"></script>

<script>
jQuery(function($) {
  // initialize the plugin
  $('.fancy-text').revealing();

  // delay the animation just a little bit
  setTimeout(function() {
  	$('.fancy-text').revealing('show');
  }, 150);
});
</script>
```


## Documentation

**Coming soon**


## Contact

[Pierre Dulac](http://github.com/dulaccc)  
[@dulaccc](https://twitter.com/dulaccc)


## License

Revealing.js is available under the MIT license. See the LICENSE file for more info.
