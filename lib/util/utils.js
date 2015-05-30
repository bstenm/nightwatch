var Util = module.exports = {};

Util.formatElapsedTime = function(timeMs, includeMs) {
  var seconds = timeMs/1000;
  return (seconds < 1 && timeMs + 'ms') ||
    (seconds > 1 && seconds < 60 && (seconds + 's')) ||
    (Math.floor(seconds/60) + 'm' + ' ' + Math.floor(seconds%60) + 's' + (includeMs ? (' / ' + timeMs + 'ms') : ''));
};

Util.getDateStamp = function () {
  return ( new Date() ).toLocaleString('en-GB', {
    weekday       : 'narrow',
    year          : 'numeric',
    month         : '2-digit',
    day           : '2-digit',
    timeZoneName  : 'short',
    hour          : '2-digit',
    minute        : '2-digit',
    second        : '2-digit',
    era           : 'short'
  }).replace(/:/g,'').replace(/\s/g,'-').replace(/-\(.+?\)/,'');
};

/**
 * Wrap a synchronous function, turning it into an async fn with a callback as
 * the last argument if necessary. `asyncArgCount` is the expected argument
 * count if `fn` is already asynchronous.
 *
 * @param {number} asyncArgCount
 * @param {function} fn
 * @param {object} [context]
 */
Util.makeFnAsync = function (asyncArgCount, fn, context) {
  if (fn.length === asyncArgCount) {
    return fn;
  }

  return function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var done = args.pop();
    context = context || null;
    fn.apply(context, args);
    done();
  };
};

Util.checkFunction = function(name, parent) {
  return parent && (typeof parent[name] == 'function') && parent[name] || false;
};

Util.getTestSuiteName = function(moduleName) {
  var words;

  moduleName = moduleName.replace(/(_|-|\.)*([A-Z]*)/g, function(match, $0, $1, offset, string) {
    if (!match) {
      return '';
    }
    return (offset > 0 && (string.charAt(offset-1) !== ' ') ? ' ':'') + $1;
  });

  words = moduleName.split(/(\s|\/)/).map(function(word, index, matches) {
    if (word == '/') {
      return ' / ';
    }
    return word.charAt(0).toUpperCase() + word.substr(1);
  });

  return words.join('');
};
