export const isTypeOf = (variable) =>
  Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();

export const mapToValues = (
  current,
  min,
  max,
  targetMin = 0,
  targetMax = 100
) => ((current - min) * (targetMax - targetMin)) / (max - min) + targetMin;

export const cookies = {
  set: (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  },
  get: (cname) => {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },
};
