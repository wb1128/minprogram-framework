(wx["webpackJsonp"] = wx["webpackJsonp"] || []).push([
  [539], {
    597: function (t, e, r) {
      "use strict";
      var n = r(227)["default"],
        o = r(560)["default"];
      e.Z = function (t, e) {
        var r, u = t.__vccOpts || t,
          a = o(e);
        try {
          for (a.s(); !(r = a.n()).done;) {
            var i = n(r.value, 2),
              l = i[0],
              s = i[1];
            u[l] = s
          }
        } catch (t) {
          a.e(t)
        } finally {
          a.f()
        }
        return u
      }
    },
    596: function (t, e, r) {
      "use strict";
      var n = r(14),
        o = r(653),
        u = r(604),
        a = {
          class: "index"
        };

      function i(t, e, r, n, i, l) {
        return (0, o.wg)(), (0, o.iD)("view", a, [(0, o._)("text", {
          onClick: e[0] || (e[0] = function () {
            return n.onClick && n.onClick.apply(n, arguments)
          })
        }, (0, u.zw)(n.msg), 1)])
      }
      var l = r(876),
        s = {
          setup: function () {
            var t = (0, l.iH)("Hello world"),
              e = function () {
                console.log("\u70b9\u51fb")
              };
            return {
              msg: t,
              onClick: e
            }
          }
        },
        f = r(597);
      const c = (0, f.Z)(s, [
        ["render", i]
      ]);
      var p = c,
        d = {
          navigationBarTitleText: "\u9996\u9875"
        };
      Page((0, n.createPageConfig)(p, "pages/index/index", {
        root: {
          cn: []
        }
      }, d || {}))
    },
    231: function (t) {
      function e(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
        return n
      }
      t.exports = e, t.exports.__esModule = !0, t.exports["default"] = t.exports
    },
    10: function (t) {
      function e(t) {
        if (Array.isArray(t)) return t
      }
      t.exports = e, t.exports.__esModule = !0, t.exports["default"] = t.exports
    },
    560: function (t, e, r) {
      var n = r(772);

      function o(t, e) {
        var r = "undefined" !== typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
        if (!r) {
          if (Array.isArray(t) || (r = n(t)) || e && t && "number" === typeof t.length) {
            r && (t = r);
            var o = 0,
              u = function () {};
            return {
              s: u,
              n: function () {
                return o >= t.length ? {
                  done: !0
                } : {
                  done: !1,
                  value: t[o++]
                }
              },
              e: function (t) {
                throw t
              },
              f: u
            }
          }
          throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        var a, i = !0,
          l = !1;
        return {
          s: function () {
            r = r.call(t)
          },
          n: function () {
            var t = r.next();
            return i = t.done, t
          },
          e: function (t) {
            l = !0, a = t
          },
          f: function () {
            try {
              i || null == r["return"] || r["return"]()
            } finally {
              if (l) throw a
            }
          }
        }
      }
      t.exports = o, t.exports.__esModule = !0, t.exports["default"] = t.exports
    },
    579: function (t) {
      function e(t, e) {
        var r = null == t ? null : "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
        if (null != r) {
          var n, o, u, a, i = [],
            l = !0,
            s = !1;
          try {
            if (u = (r = r.call(t)).next, 0 === e) {
              if (Object(r) !== r) return;
              l = !1
            } else
              for (; !(l = (n = u.call(r)).done) && (i.push(n.value), i.length !== e); l = !0);
          } catch (t) {
            s = !0, o = t
          } finally {
            try {
              if (!l && null != r["return"] && (a = r["return"](), Object(a) !== a)) return
            } finally {
              if (s) throw o
            }
          }
          return i
        }
      }
      t.exports = e, t.exports.__esModule = !0, t.exports["default"] = t.exports
    },
    750: function (t) {
      function e() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
      }
      t.exports = e, t.exports.__esModule = !0, t.exports["default"] = t.exports
    },
    227: function (t, e, r) {
      var n = r(10),
        o = r(579),
        u = r(772),
        a = r(750);

      function i(t, e) {
        return n(t) || o(t, e) || u(t, e) || a()
      }
      t.exports = i, t.exports.__esModule = !0, t.exports["default"] = t.exports
    },
    772: function (t, e, r) {
      var n = r(231);

      function o(t, e) {
        if (t) {
          if ("string" === typeof t) return n(t, e);
          var r = Object.prototype.toString.call(t).slice(8, -1);
          return "Object" === r && t.constructor && (r = t.constructor.name), "Map" === r || "Set" === r ? Array.from(t) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? n(t, e) : void 0
        }
      }
      t.exports = o, t.exports.__esModule = !0, t.exports["default"] = t.exports
    }
  },
  function (t) {
    var e = function (e) {
      return t(t.s = e)
    };
    t.O(0, [107, 216], (function () {
      return e(596)
    }));
    t.O()
  }
]);
