"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(0));
var _this = void 0;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_core["default"].component({
  data: {
    list: [{
      id: '0',
      title: 'loading'
    }]
  },
  events: {
    'index-broadcast': function indexBroadcast() {
      var _ref;
      var $event = (_ref = arguments.length - 1, _ref < 0 || arguments.length <= _ref ? undefined : arguments[_ref]);
      console.log("".concat(_this.$name, " receive ").concat($event.name, " from ").concat($event.source.name));
    }
  },
  methods: {
    tap: function tap() {
      // this.num = this.num + 1
      console.log(this.$name + ' tap');
    },
    add: function add() {
      var len = this.list.length;
      this.list.push({
        id: len + 1,
        title: 'title_' + len
      });
    },
    remove: function remove(index) {
      this.$delete(this.list, index);
    }
  },
  onLoad: function onLoad() {}
}, {info: {"components":{},"on":{}}, handlers: {'8-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.add.apply(_vm, $args || [$event]);
  })();
}},'8-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.tap.apply(_vm, $args || [$event]);
  })();
}},'8-2': {"tap": function proxy (index) {
    var _vm=this;
  return (function () {
    _vm.remove(index);
  })();
}}}, models: {}, refs: undefined });