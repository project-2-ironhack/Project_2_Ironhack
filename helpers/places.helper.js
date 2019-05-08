const hbs = require('hbs');

hbs.registerHelper('isMainCategory', function (place, category, options) {
  if (place.type.includes(category)) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
});
hbs.registerHelper('hasCategory', function(book, category, options) {
  if(book.categories.includes(category)) {
    return options.fn(this)
  } else {
    return options.inverse(this) 
  }
});
