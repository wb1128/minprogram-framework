"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(0));
var _eventHub = _interopRequireDefault(require('./../common/eventHub.js'));
var _test = _interopRequireDefault(require('./../mixins/test.js'));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_core["default"].page({
  config: {
    navigationBarTitleText: 'test'
  },
  hooks: {
    // Page 级别 hook, 只对当前 Page 的 setData 生效。
    'before-setData': function beforeSetData(dirty) {
      if (Math.random() < 0.2) {
        console.log('setData canceled');
        return false; // Cancel setData
      }

      dirty.time = +new Date();
      return dirty;
    }
  },
  mixins: [_test["default"]],
  data: {
    inputmodel: 'v-model',
    mynum: 20,
    userInfo: {
      nickName: '加载中...'
    },
    currentTime: +new Date(),
    setTimeoutTitle: '标题三秒后会被修改',
    count: 0,
    netrst: '',
    userinfoNum: 1
  },
  computed: {},
  methods: {
    handleViewTap: function handleViewTap() {
      console.log('handleVieTap clicked');
      debugger
      this.userinfoNum += 1;
    },
    plus: function plus() {
      this.mynum++;
    },
    toast: function toast() {
      var promise = this.$invoke('toast', 'show', {
        title: '自定义标题',
        img: 'https://raw.githubusercontent.com/kiinlam/wetoast/master/images/star.png'
      });
      promise.then(function (d) {
        console.log('toast done');
      });
    },
    mixintap: function mixintap() {
      console.log('do noting from ' + this.$is);
    },
    counterEmit: function counterEmit(num) {
      console.log("".concat(this.$is, " receive event, the number is: ").concat(num));
    }
  },
  created: function created() {
    var self = this;
    self.currentTime = +new Date();
    self.setTimeoutTitle = '标题三秒后会被修改';
    setTimeout(function () {
      self.setTimeoutTitle = '到三秒了';
    }, 3000);
    wx.getUserInfo({
      success: function success(res) {
        self.userInfo = res.userInfo;
      }
    });
  }
}, {info: {"components":{"list":{"path":"./../components/wepy-list"},"panel":{"path":"./../components/panel"},"group":{"path":"./../components/group"},"counter":{"path":"./../components/counter"},"slide-view":{"path":"./../$vendor/miniprogram-slide-view/miniprogram_dist/index"}},"on":{}}, handlers: {'5-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.handleViewTap.apply(_vm, $args || [$event]);
  })();
}},'5-1': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.currentTime = +new Date();
  })();
}},'5-2': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.mixintap.apply(_vm, $args || [$event]);
  })();
}}}, models: {'0': {
      type: "input",
      expr: "inputmodel",
      handler: function set ($v) {
      var _vm=this;
        _vm.inputmodel = $v;
      
    }
    }}, refs: undefined });