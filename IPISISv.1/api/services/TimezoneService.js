/**
* TimezoneService.js
*
*/

module.exports = {
  getDate: function (options, next) {
    var localDate = new Date();
    var destDate = null;

    var localoffset = -(localDate.getTimezoneOffset());
    var destoffset = options.offset;
    var offset = destoffset - localoffset;

    if (options.timestamp) {
        destDate = new Date(options.timestamp + ((offset + localoffset) * 60 * 1000 ));
    } else {
        destDate = new Date(Date.now() + ((offset + localoffset) * 60 * 1000));
    }
    return destDate;
  }
};
