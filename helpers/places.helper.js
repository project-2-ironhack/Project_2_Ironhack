const hbs = require('hbs');

hbs.registerHelper('isMainCategory', function (place, category, options) {
  if (place.type.includes(category)) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
});