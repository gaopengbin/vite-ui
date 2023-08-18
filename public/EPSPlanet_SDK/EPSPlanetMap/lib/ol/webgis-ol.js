var Ie = Object.defineProperty;
var De = (r, e, t) => e in r ? Ie(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var zt = (r, e, t) => (De(r, typeof e != "symbol" ? e + "" : e, t), t), Ft = (r, e, t) => {
  if (!e.has(r))
    throw TypeError("Cannot " + t);
};
var o = (r, e, t) => (Ft(r, e, "read from private field"), t ? t.call(r) : e.get(r)), l = (r, e, t) => {
  if (e.has(r))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(r) : e.set(r, t);
}, d = (r, e, t, s) => (Ft(r, e, "write to private field"), s ? s.call(r, t) : e.set(r, t), t), Zt = (r, e, t, s) => ({
  set _(i) {
    d(r, e, i, t);
  },
  get _() {
    return o(r, e, s);
  }
}), h = (r, e, t) => (Ft(r, e, "access private method"), t);
import { Map as Ne, View as Ae } from "ol";
import Fe from "ol/proj/Projection";
import { get as Me, transform as Ve } from "ol/proj";
import * as b from "ol/layer";
import * as m from "ol/source";
import * as v from "ol/format";
import * as j from "ol/style.js";
import { defaults as Be } from "ol/control/defaults";
import Ut from "ol/style/Style";
import Ge from "ol/style/Text";
import Re from "ol/tilegrid/TileGrid";
import He from "ol/tilegrid/WMTS";
import { getTopLeft as We, getWidth as Ue, containsCoordinate as ze } from "ol/extent";
import Ze from "ol/control/Zoom";
import Je from "ol-ext/control/LayerShop";
import ke from "ol-ext/control/LayerSwitcher";
import { listen as qe } from "ol/events";
import Ke from "ol-ext/control/EditBar";
import Xe from "ol-ext/control/Toggle";
import ue from "ol-ext/control/Notification";
import me from "ol/layer/Vector";
import fe from "ol/source/Vector";
import { getArea as Ye } from "ol/sphere";
import ge from "ol/style/Circle";
import Mt from "ol/style/Stroke";
import Jt from "ol/style/Fill";
import Qe from "ol/format/EsriJSON";
import kt from "ol/format/GeoJSON";
import ts from "ol/interaction/Select";
import es from "ol/interaction/Modify";
import ss from "ol-ext/control/Button";
import is from "ol/interaction/DoubleClickZoom";
import { register as rs } from "ol/proj/proj4";
import qt from "proj4";
import { v4 as ns } from "uuid";
import as from "ol-ext/control/Overview";
import os from "ol-ext/control/Swipe";
import { unByKey as ls } from "ol/Observable";
import cs from "ol/Feature";
import hs from "ol/geom/Point";
import { easeOut as Kt } from "ol/easing";
import ds from "ol-ext/featureAnimation/Show";
import { MousePosition as ps } from "ol/control";
class us {
  /**
   * 获取样式的函数，主要用于创建需要动态获取属性的样式
   * @param config 相关配置信息
   * @returns
   */
  constructor(e) {
    const t = Object.assign({}, e), s = new Ut(t);
    return (i) => {
      const n = s.getText();
      return n.setFeature && n.setFeature(i), s;
    };
  }
}
var lt, D, ct, Vt;
class ms extends Ge {
  constructor(t) {
    super(t);
    /**
     * 获取当前指定的属性值
     * @param {string} template 
     * @returns 
     */
    l(this, ct);
    /** 当前样式对应的feature */
    l(this, lt, void 0);
    // 原始内容
    l(this, D, void 0);
    d(this, D, t.text);
  }
  /**
   * 设置feature
   * @param {Feature} feature
   */
  setFeature(t) {
    d(this, lt, t);
  }
  /**
   * 重写获取文字值的方法
   * 如果text是数组，需要注意写法，应该是一行文字，一行样式，如果没有样式，要写一个空行，如：
   *                  [
                          "张三",
                          "bold 13px Calibri,sans-serif",
                          "\n",
                          "",  这个代表回车的样式
                          "李四",
                          "italic 11px Calibri,sans-serif"
                      ]
   * @returns 
   */
  getText() {
    try {
      let t;
      return Array.isArray(o(this, D)) ? t = o(this, D).map((s) => h(this, ct, Vt).call(this, s)) : t = h(this, ct, Vt).call(this, o(this, D)), t;
    } catch (t) {
      console.error(t);
      return;
    }
  }
}
lt = new WeakMap(), D = new WeakMap(), ct = new WeakSet(), Vt = function(t) {
  return t.replace(/\{(.+?)\}/g, (...s) => {
    var i;
    return (i = o(this, lt)) == null ? void 0 : i.get(s[1]);
  });
};
const fs = {
  // 地图
  map: Ne,
  view: Ae,
  // 投影
  projection: Fe,
  // 默认控件
  defaults: Be,
  // defaults: _Control.defaults,
  // 图层
  graticule: b.Graticule,
  group: b.Group,
  heatmap: b.Heatmap,
  image: b.Image,
  layer: b.Layer,
  mapboxvector: b.MapboxVector,
  tile: b.Tile,
  vector: b.Vector,
  vectorimage: b.VectorImage,
  vectortile: b.VectorTile,
  webglpoints: b.WebGLPoints,
  webgltile: b.WebGLTile,
  // 数据源
  "bingmaps-source": m.BingMaps,
  "cartodb-source": m.CartoDB,
  "cluster-source": m.Cluster,
  "datatile-source": m.DataTile,
  "geotiff-source": m.GeoTIFF,
  "iiif-source": m.IIIF,
  // imagesource-source': _Source.Image, 基类 // 防止与图层的配置重复
  "imagearcgisrest-source": m.ImageArcGISRest,
  "imagecanvas-source": m.ImageCanvas,
  "imagemapguide-source": m.ImageMapGuide,
  "imagestatic-source": m.ImageStatic,
  "imagewms-source": m.ImageWMS,
  "osm-source": m.OSM,
  "raster-source": m.Raster,
  // source-source': _Source.Source, 基类
  "stamen-source": m.Stamen,
  // 'tile-source'-source': _Source.Tile, 基类 // 防止与图层的配置重复
  "tilearcgisrest-source": m.TileArcGISRest,
  "tiledebug-source": m.TileDebug,
  "tileimage-source": m.TileImage,
  "tilejson-source": m.TileJSON,
  "tilewms-source": m.TileWMS,
  "urltile-source": m.UrlTile,
  "utfgrid-source": m.UTFGrid,
  "vector-source": m.Vector,
  // 防止与图层的配置重复
  "vectortile-source": m.VectorTile,
  // 防止与图层的配置重复
  "wmts-source": m.WMTS,
  tilegrid: Re,
  "wmts-tilegrid": He,
  "xyz-source": m.XYZ,
  "zoomify-source": m.Zoomify,
  // 要素格式方式
  esrijson: v.EsriJSON,
  geojson: v.GeoJSON,
  gml: v.GML,
  gpx: v.GPX,
  igc: v.IGC,
  iiifinfo: v.IIIFInfo,
  kml: v.KML,
  mvt: v.MVT,
  ows: v.OWS,
  polyline: v.Polyline,
  topojson: v.TopoJSON,
  wfs: v.WFS,
  wkb: v.WKB,
  wkt: v.WKT,
  wmscapabilities: v.WMSCapabilities,
  wmsgetfeatureinfo: v.WMSGetFeatureInfo,
  wmtscapabilities: v.WMTSCapabilities,
  // 样式
  circle: j.Circle,
  fill: j.Fill,
  icon: j.Icon,
  iconimage: j.IconImage,
  // 'image-style': _Style.Image, 基类 // 防止与图层的配置重复
  regularshape: j.RegularShape,
  stroke: j.Stroke,
  style: j.Style,
  text: j.Text,
  "style-fn": us,
  "text-fn": ms
}, H = (r, e) => {
  if (r === null || typeof r != "object" || e == "params" || e == "props")
    return r;
  r.type == "wmts-source" && (r.projection = r.projection ?? "EPSG:3857", r.tileGrid.projection = r.projection, r.tileGrid.matrixSet = r.matrixSet);
  const t = JSON.parse(JSON.stringify(r));
  try {
    if (Array.isArray(t)) {
      for (let i = 0; i < t.length; i++)
        t[i] = H(t[i]);
      return t;
    }
    Object.keys(t).forEach((i) => {
      t[i] = H(t[i], i);
    }), e == "source" && (t.crossOrigin = "anonymous"), e = t.type || e;
    const s = gs(e);
    if (!s)
      throw new Error(`Cannot find a constructor of type ${e}`);
    if (r.type == "wmts-tilegrid") {
      let i = ws(t);
      t.origin = i.origin, t.resolutions || (t.resolutions = i.resolutions), t.matrixIds = i.matrixIds;
    }
    return new s(t);
  } catch (s) {
    return console.error(s), t;
  }
};
window.getObject = H;
const gs = (r) => {
  if (r)
    return fs[r.toLowerCase()];
}, ws = (r) => {
  const e = r.projection ?? "EPSG:3857", t = r.maxZoom ?? 18, s = r.minZoom ?? 0, i = r.tileSize ?? 256, n = r.matrixSet ?? "EPSG:3857", c = Me(e).getExtent(), u = We(c), p = [], y = Ue(c) / i, w = t - s + 1, f = new Array(w), O = new Array(w);
  for (let g = s; g <= t; g++)
    n.indexOf("EPSG") > -1 ? O[g - s] = e + ":" + g : O[g - s] = g, r.tileTool == "geoserver" ? f[g - s] = y / Math.pow(2, g + 1) : f[g - s] = y / Math.pow(2, g), p.push(u);
  return {
    origin: u,
    origins: p,
    matrixIds: O,
    resolutions: f
  };
};
var _ = /* @__PURE__ */ ((r) => (r[r.none = 0] = "none", r[r.funOnly = 1] = "funOnly", r[r.propOnly = 2] = "propOnly", r[r.always = 3] = "always", r))(_ || {});
const C = (r) => (e) => (e.prototype._manifest = vs(r), customElements.define(r.tagName, e), e), vs = (r) => (r = Object.assign({
  hasConfig: !1,
  mode: _.always
}, r), r), Xt = (r) => {
  Promise ? Promise.resolve().then(r) : requestAnimationFrame ? requestAnimationFrame(r) : setTimeout(r, 0);
};
const ys = `<div class="error">\r
    <div class="info">\r
        <div>\r
            <p>软件未授权，请联系软件提供商，获取授权码！</p>\r
            <a href="">刷新</a>\r
        </div>\r
    </div>\r
</div>`, bs = `<div class="develop">\r
    开发预览版，有限期至【】@山维科技\r
</div>`;
var z, N, Ct, we, Ot, ve, Z, _t, ye, L, P, Lt, be, J, bt;
const U = class {
  constructor() {
    /**
     * 脱密
     * @param str 
     * @param pwd 
     * @returns 
     */
    l(this, Ct);
    /**
     * 验证授权
     * @param licenses 
     */
    l(this, Ot);
    // 服务器时间
    /**
     * 获取服务器时间
     * @returns 
     */
    l(this, _t);
    /**
     * 右下角显示开发版内容
     */
    l(this, Lt);
    /**
     * 显示未授权
     */
    l(this, J);
    l(this, N, "开发版");
    l(this, Z, null);
    l(this, L, null);
    l(this, P, null);
    if (new.target === U)
      return o(U, z) || d(U, z, this), o(U, z);
  }
  // 授权类型
  /**
   * 授权类型
   */
  get authtype() {
    return o(this, N);
  }
  /**
   * 是否授权
   */
  get authorized() {
    return h(this, Ot, ve).call(this);
  }
};
let yt = U;
z = new WeakMap(), N = new WeakMap(), Ct = new WeakSet(), we = function(e, t) {
  try {
    if (!e || e.length < 8)
      return "";
    t || (t = "sunway_webgis_auth_code"), t = encodeURIComponent(t);
    let s = "";
    for (let w = 0; w < t.length; w += 1)
      s += t.charCodeAt(w).toString();
    let i = Math.floor(s.length / 5), n = parseInt(s.charAt(i) + s.charAt(i * 2) + s.charAt(i * 3) + s.charAt(i * 4) + s.charAt(i * 5)), a = Math.round(t.length / 2), c = Math.pow(2, 31) - 1, u = parseInt(e.substring(e.length - 8, e.length), 16);
    for (e = e.substring(0, e.length - 8), s += u; s.length > 10; )
      s = (parseInt(s.substring(0, 10)) + parseInt(s.substring(10, s.length))).toString();
    s = (n * s + a) % c;
    let p = "", y = "";
    for (let w = 0; w < e.length; w += 2)
      p = parseInt(e.substring(w, w + 2), 16) ^ Math.floor(s / c * 255), y += String.fromCharCode(p), s = (n * s + a) % c;
    return decodeURIComponent(y);
  } catch {
    return "";
  }
}, Ot = new WeakSet(), ve = function() {
  const e = h(this, Ct, we).call(this, window.licenses), t = e.split("|")[0], s = e.split("|")[1];
  d(this, N, e.split("|")[2]);
  let i = window.location.hostname.toUpperCase();
  if (i === "LOCALHOST" || i == "127.0.0.1")
    return !0;
  let n = !1;
  if (t.split(",").forEach((p) => {
    if (p.toUpperCase() === i) {
      n = !0;
      return;
    }
  }), !n)
    return h(this, J, bt).call(this, "软件未授权，请联系软件提供商，获取授权码！"), !1;
  if (typeof s > "u")
    return h(this, J, bt).call(this, "软件未授权，请联系软件提供商，获取授权码！"), !1;
  const c = h(this, _t, ye).call(this), u = new Date(s);
  return c.getTime() > u.getTime() ? (h(this, J, bt).call(this, o(this, N) + "有限期至【" + s + "】已过期，请重新授权！@山维科技"), !1) : (o(this, N) != "正式版" && h(this, Lt, be).call(this, "开发预览版，有限期至【" + s + "】@山维科技"), !0);
}, Z = new WeakMap(), _t = new WeakSet(), ye = function() {
  if (!o(this, Z)) {
    const e = new window.XMLHttpRequest();
    e.open("GET", "/", !1), e.send(null);
    const t = e.getResponseHeader("Date");
    d(this, Z, new Date(t));
  }
  return o(this, Z);
}, L = new WeakMap(), P = new WeakMap(), Lt = new WeakSet(), be = function(e) {
  o(this, P) || (d(this, P, document.createElement("div")), o(this, P).style.zIndex = "999", o(this, P).classList.add("auth"), o(this, P).innerHTML = bs, document.body.appendChild(o(this, P)));
  const t = o(this, P).getElementsByClassName("develop")[0];
  t.innerHTML = e;
}, J = new WeakSet(), bt = function(e) {
  o(this, L) || (d(this, L, document.createElement("div")), o(this, L).style.zIndex = "1000", o(this, L).classList.add("auth"), o(this, L).innerHTML = ys, document.body.appendChild(o(this, L)));
  const t = o(this, L).getElementsByTagName("p")[0];
  t.innerHTML = e;
}, // 单例模式
l(yt, z, void 0);
var k, q, K, X, ht, Y, Q, dt, A, Pt, pt, Bt, St, $e, xt, Ce, tt, $t, et, jt, Oe, ut, Gt, Tt, _e, mt, Rt, Et, Le, It, Pe, F, T, W;
class S extends HTMLElement {
  // 需要双向绑定的属性
  constructor() {
    super();
    /**
     * 加载config
     * 当config不存在时，从文件加载config
     */
    l(this, pt);
    /**
     * loading状态改变
     */
    l(this, St);
    /**
     * 初始化方法，用于初始化Dom
     */
    l(this, xt);
    /**
     * 对象劫持
     * @param {any} value 
     * @returns {any}
     */
    l(this, tt);
    /**
     * 延迟执行刷新 防抖 
     * 主要是防止数组的length也会触发刷新
     * @returns 
     */
    l(this, jt);
    /**
     * 刷新所有 #labelTag 标签内容 该处为全部刷新，防止遗漏
     * {{}}已经被 #labelTag 标签替换
     */
    l(this, ut);
    /**
     * 绑定属性
     * @param att 需要绑定的属性 如 value
     */
    l(this, Tt);
    /**
     * 获取指定属性值
     * @param {string} origin 需要获取的属性 如a.b
     * @returns 对应属性的值
     */
    l(this, mt);
    /**
     * 设置$data中的属性
     * @param key 
     * @param value 
     */
    l(this, Et);
    /**
     * 给dom绑定$this，指向当前组件
     */
    l(this, It);
    /**
     * 组件初始化方法，只初始化一次
     * 需要判断所有必要条件添加完成再进行初始化
     */
    l(this, T);
    // 任意的string索引List
    // 一些私有属性
    l(this, k, void 0);
    l(this, q, void 0);
    l(this, K, void 0);
    l(this, X, void 0);
    l(this, ht, void 0);
    l(this, Y, void 0);
    l(this, Q, "w-l");
    // label标签的名称
    l(this, dt, !1);
    // 渲染是否完成
    l(this, A, _.none);
    //组件模式
    l(this, Pt, ["value", "src", "title"]);
    l(this, et, !1);
    /**
     * 组件初始化状态，设置多个用于防抖
     * unInited 未初始化
     * initing 正在初始化
     * inited 已经初始化
     */
    l(this, F, "unInited");
    new yt().authorized && (this.manifest.hasConfig && h(this, pt, Bt).call(this, this.getAttribute("config") || this.getAttribute("configUrl")), d(this, A, this.manifest.mode ?? _.always), Xt(() => {
      h(this, xt, Ce).call(this), h(this, T, W).call(this);
    }));
  }
  /**
   * 手动启动初始化的方法
   * @param args 初始化的必要参数
   */
  startup(t) {
    this.mapView = t.mapView, this.map = t.map, this.mapConfig = t.mapConfig, this.config = t.config;
  }
  /**
   * 组件的创建参数
   */
  get manifest() {
    return this._manifest;
  }
  /**
   * 当前组件所在地图的配置 类似于之前的appConfig
   */
  get mapConfig() {
    return o(this, k);
  }
  set mapConfig(t) {
    !o(this, k) && t && (d(this, k, t), h(this, T, W).call(this));
  }
  /**
   * 组件所在地图的原型，如果组件本身为地图，则指向自身
   */
  get mapView() {
    return o(this, q);
  }
  set mapView(t) {
    !o(this, q) && t && (d(this, q, t), h(this, T, W).call(this));
  }
  /**
    * 当前组件所在地图
    */
  get map() {
    return o(this, K);
  }
  set map(t) {
    !o(this, K) && t && (d(this, K, t), h(this, T, W).call(this));
  }
  /**
    * 当前组件的配置
    */
  get config() {
    return o(this, X);
  }
  set config(t) {
    if (typeof t == "string") {
      h(this, pt, Bt).call(this, t);
      return;
    } else
      typeof t == "object" && !o(this, X) && t && (d(this, X, t), h(this, T, W).call(this));
  }
  /**
   * 加载中
   */
  get loading() {
    return !!o(this, ht);
  }
  set loading(t) {
    d(this, ht, t), h(this, St, $e).call(this);
  }
  /**
   * 用于渲染html的数据
   */
  get $data() {
    return o(this, Y);
  }
  set $data(t) {
    (o(this, A) & _.propOnly) == _.propOnly ? (d(this, Y, h(this, tt, $t).call(this, t)), h(this, ut, Gt).call(this)) : d(this, Y, t);
  }
  /**
   * 是否可以开始初始化，该方法可以被重写
   * @returns 是否可以开始初始化
   */
  isReady() {
    return !!(this.map && this.mapView && this.mapConfig && (this.config || !this.manifest.hasConfig));
  }
  /**
   * 组件初始化方法
   */
  async onInit() {
  }
  /**
   * 初始化完成之后调用的方法，该方法可以被重写
   */
  afterInit() {
  }
  /**
   * 当组件被打开
   */
  onOpen() {
  }
  /**
   * 当组件被关闭
   */
  onClose() {
  }
}
k = new WeakMap(), q = new WeakMap(), K = new WeakMap(), X = new WeakMap(), ht = new WeakMap(), Y = new WeakMap(), Q = new WeakMap(), dt = new WeakMap(), A = new WeakMap(), Pt = new WeakMap(), pt = new WeakSet(), Bt = async function(t) {
  if (!this.config && t) {
    this.loading = !0;
    const s = await fetch(t);
    this.config = s && s.ok && await s.json() || {}, this.loading = !1;
  }
}, St = new WeakSet(), $e = function() {
  this.loading ? this.classList.add("loading") : this.classList.remove("loading");
}, xt = new WeakSet(), Ce = function() {
  const t = this.manifest.className || this.manifest.tagName;
  if (this.classList.add(t), this.manifest.template) {
    let s = this.manifest.template;
    (o(this, A) & _.propOnly) == _.propOnly && (s = s.replace(/\{\{(.+?)\}\}/g, (...i) => `<${o(this, Q)}>${i[1]}</${o(this, Q)}>`)), this.innerHTML = s, (o(this, A) & _.funOnly) == _.funOnly && h(this, It, Pe).call(this);
  }
  d(this, dt, !0);
}, tt = new WeakSet(), $t = function(t) {
  return typeof t == "object" && t !== null ? (Object.keys(t).forEach((s) => {
    t[s] = h(this, tt, $t).call(this, t[s]);
  }), new Proxy(t, {
    set: (s, i, n) => (s[i] = h(this, tt, $t).call(this, n), h(this, jt, Oe).call(this), !0)
    // get: (obj, p) => {
    //     // 判断是否需要刷新dom
    //     return obj[p];
    // },
  })) : t;
}, et = new WeakMap(), jt = new WeakSet(), Oe = function() {
  o(this, et) || (d(this, et, !0), Xt(() => {
    h(this, ut, Gt).call(this), d(this, et, !1);
  }));
}, ut = new WeakSet(), Gt = function() {
  o(this, Pt).forEach((s) => {
    h(this, Tt, _e).call(this, s);
  }), this.querySelectorAll(o(this, Q)).forEach((s) => {
    const i = h(this, mt, Rt).call(this, s.origin);
    String(i) !== s.innerHTML && (s.innerHTML = i);
  });
}, Tt = new WeakSet(), _e = function(t) {
  const s = `s-${t}`;
  this.querySelectorAll(`[${s}]`).forEach((n) => {
    const a = n.getAttribute(s), c = h(this, mt, Rt).call(this, a);
    c !== n[t] && (n[t] = c);
  });
}, mt = new WeakSet(), Rt = function(t) {
  try {
    return t.split(".").reduce((s, i) => s[i], this.$data);
  } catch (s) {
    console.error(s);
    return;
  }
}, Et = new WeakSet(), Le = function(t, s) {
  let i = this.$data, n = t.split(".");
  for (let a = 0; a < n.length; a++) {
    const c = n[a];
    a == n.length - 1 ? i[c] = s : i = i[c];
  }
}, It = new WeakSet(), Pe = function() {
  this.querySelectorAll("*").forEach((s) => {
    s.$this || (s.$this = this, s.$set = (i, n) => {
      h(this, Et, Le).call(this, i, n);
    });
  });
}, F = new WeakMap(), T = new WeakSet(), W = async function() {
  o(this, dt) && (o(this, F) === "initing" || o(this, F) === "inited" || this.isReady() && (d(this, F, "initing"), this.loading = !0, await this.onInit(), this.loading = !1, d(this, F, "inited"), this.afterInit()));
};
class Se extends S {
  constructor() {
    super();
  }
  /**
   * 重写基类的isReady方法
   * 地图只需要加载config就可以初始化了
   * @returns 是否可以开始初始化
   */
  isReady() {
    return !!this.config;
  }
  /**
   * 加载该map的其他组件
   */
  afterInit() {
    this.mapConfig = this.config, this.mapView = this;
    const e = this.mapConfig.widgetManager || "webgis-widget-manager", t = document.createElement(e);
    t.startup({
      mapView: this,
      map: this.map,
      config: this.mapConfig.widgets,
      mapConfig: this.mapConfig
    }), this.childNodes[0] ? this.insertBefore(t, this.childNodes[0]) : this.appendChild(t);
  }
}
var $s = Object.defineProperty, Cs = Object.getOwnPropertyDescriptor, Os = (r, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? Cs(e, t) : e, n = r.length - 1, a; n >= 0; n--)
    (a = r[n]) && (i = (s ? a(e, t, i) : a(i)) || i);
  return s && i && $s(e, t, i), i;
};
let Yt = class extends Se {
  constructor() {
    super();
  }
  async onInit() {
    const r = H(this.config.map, "map");
    r.setTarget(this), this.map = r, this.getObject = H;
  }
};
Yt = Os([
  C({
    tagName: "ol-map",
    className: "ol-map",
    hasConfig: !0
  })
], Yt);
var _s = Object.defineProperty, Ls = Object.getOwnPropertyDescriptor, Ps = (r, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? Ls(e, t) : e, n = r.length - 1, a; n >= 0; n--)
    (a = r[n]) && (i = (s ? a(e, t, i) : a(i)) || i);
  return s && i && _s(e, t, i), i;
};
let Qt = class extends S {
  constructor() {
    super();
  }
  async onInit() {
    let r = new Ze({
      target: this
    });
    this.map.addControl(r);
  }
};
Qt = Ps([
  C({
    tagName: "ol-zoom-widget",
    className: "ol-zoom-widget"
  })
], Qt);
var Ss = Object.defineProperty, xs = Object.getOwnPropertyDescriptor, js = (r, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? xs(e, t) : e, n = r.length - 1, a; n >= 0; n--)
    (a = r[n]) && (i = (s ? a(e, t, i) : a(i)) || i);
  return s && i && Ss(e, t, i), i;
}, M, ce;
let te = (ce = class extends S {
  //记录打开透明度滑条的图层id
  constructor() {
    super();
    l(this, M, []);
  }
  async onInit() {
    let e = new Je({
      target: this,
      noScroll: !0,
      collapsed: !1,
      trash: !1,
      extent: !0,
      // ol-ext插件的类型写错了
      show_progress: !1,
      // 判断需要展示的图层
      displayInLayerSwitcher: (t) => t.get("listMode") !== "hide"
    });
    e.on("drawlist", (t) => {
      const s = t.li, i = s.getElementsByClassName("ol-layerswitcher-buttons")[0], n = s.getElementsByClassName("layerswitcher-opacity")[0];
      let a = document.createElement("div");
      a.title = "透明度", a.innerHTML = "%";
      const c = t.layer;
      n.style.display = o(this, M).includes(c.ol_uid) ? "block" : "none", a.onclick = () => {
        n.style.display === "block" ? (n.style.display = "none", d(this, M, o(this, M).filter((p) => p !== c.ol_uid))) : (n.style.display = "block", o(this, M).push(c.ol_uid));
      }, i.appendChild(a);
    }), this.map.addControl(e);
  }
}, M = new WeakMap(), ce);
te = js([
  C({
    tagName: "ol-layer-list",
    className: "ol-layer-list"
  })
], te);
var Ts = Object.defineProperty, Es = Object.getOwnPropertyDescriptor, Is = (r, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? Es(e, t) : e, n = r.length - 1, a; n >= 0; n--)
    (a = r[n]) && (i = (s ? a(e, t, i) : a(i)) || i);
  return s && i && Ts(e, t, i), i;
};
let ee = class extends S {
  constructor() {
    super();
  }
  async onInit() {
    let r = new Ds({
      target: this
    });
    this.map.addControl(r);
  }
};
ee = Is([
  C({
    tagName: "ol-basemap-list",
    className: "ol-basemap-list"
  })
], ee);
class Ds extends ke {
  constructor(e) {
    e = e || {}, e.switcherClass = ((e.switcherClass || "") + " ol-layerswitcher-image").trim(), e.mouseover = e.mouseover !== !1, super(e);
  }
  drawList(e, t) {
    e.style.height = "auto", t.getArray().filter((i) => i.get("isBasemap")).forEach((i) => {
      if (this.displayInLayerSwitcher(i)) {
        let n = document.createElement("img");
        n.src = i.get("thumbnail") || "images/thumbnail.png";
        let a = document.createElement("p");
        a.innerHTML = i.get("title") || i.get("name");
        let c = document.createElement("li");
        c.className = "ol-imgcontainer" + (i.getVisible() ? " ol-visible" : ""), c.appendChild(n), c.appendChild(a), c.onclick = () => {
          this.switchLayerVisibility(i, t);
        }, this._setLayerForLI(c, i), this.testLayerVisibility(i) || c.classList.add("ol-layer-hidden"), e.appendChild(c);
      }
    });
  }
  /** Disable overflow
  */
  overflow() {
  }
}
const Ns = "<div>{{coordinate}} 比例尺 {{scale}}</div>";
var As = Object.defineProperty, Fs = Object.getOwnPropertyDescriptor, Ms = (r, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? Fs(e, t) : e, n = r.length - 1, a; n >= 0; n--)
    (a = r[n]) && (i = (s ? a(e, t, i) : a(i)) || i);
  return s && i && As(e, t, i), i;
};
let se = class extends S {
  constructor() {
    super();
  }
  async onInit() {
    this.$data = {
      coordinate: "",
      scale: ""
    };
    const r = this.map.getViewport();
    qe(r, "pointermove", this.handleMouseMove, this), this.map.on("moveend", this.moveEnd.bind(this));
  }
  // 鼠标移动
  handleMouseMove(r) {
    const e = this.map.getEventPixel(r), t = this.map.getCoordinateFromPixelInternal(e);
    t && (this.$data.coordinate = `${t[0].toFixed(3)} ${t[1].toFixed(3)}`);
  }
  // 比例尺变化
  moveEnd() {
    const r = this.getScale();
    (r ?? !1) && (this.$data.scale = `1:${r.toLocaleString()}`);
  }
  /**
   * 获取比例尺
   * @return {number} 比例尺.
   */
  getScale() {
    const r = this.map.getView(), e = 25.4 / 0.28, t = 1e3 / 25.4;
    var s = 1;
    return r.getProjection().getUnits() != "metric" ? s = r.getResolution() * r.getProjection().getMetersPerUnit() * t * e : s = r.getResolution() * t * e, Math.round(s);
  }
};
se = Ms([
  C({
    tagName: "ol-coordinate",
    className: "ol-coordinate",
    template: Ns
  })
], se);
const Vs = `<div class="attribute">\r
    <table class="table">\r
\r
    </table>\r
    <div>\r
        <button class="btn" onclick="$this.delete()">删除</button>\r
        <button class="btn" onclick="$this.upload()">提交</button>\r
    </div>\r
</div>\r
<input class="shp-upload" multiple type="file" onchange="$this.readFile(event)" id="shp-upload" name="shp-upload"\r
    accept=".shp,.prj,.dbf,.shx">\r
<!-- <input class="shp-upload" type="file" onchange="$this.readFile(event)" id="shp-upload" name="shp-upload" accept=".zip"> -->`;
var Bs = Object.defineProperty, Gs = Object.getOwnPropertyDescriptor, Rs = (r, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? Gs(e, t) : e, n = r.length - 1, a; n >= 0; n--)
    (a = r[n]) && (i = (s ? a(e, t, i) : a(i)) || i);
  return s && i && Bs(e, t, i), i;
}, $, st, E, I, it, ft, Dt, rt, gt, Ht, Nt, xe, V, ot, wt, Wt, At, je, he;
let ie = (he = class extends S {
  constructor() {
    super();
    l(this, gt);
    // 编辑属性
    l(this, Nt);
    // 隐藏属性编辑框
    l(this, V);
    // 显示属性编辑框
    l(this, wt);
    // 获取字段的输入框或展示框
    l(this, At);
    l(this, $, void 0);
    l(this, st, void 0);
    //当前图层
    l(this, E, void 0);
    l(this, I, void 0);
    zt(this, "notification");
    l(this, it, void 0);
    l(this, ft, []);
    // 投影列表
    l(this, Dt, 0);
    //投影的索引
    l(this, rt, void 0);
  }
  async onInit() {
    const e = new me({
      source: new fe(),
      style: function(p) {
        return new Ut({
          image: new ge({
            radius: 5,
            stroke: new Mt({ width: 1.5, color: p.get("color") || [255, 128, 0] }),
            fill: new Jt({ color: (p.get("color") || [255, 128, 0]).concat([0.3]) })
          }),
          stroke: new Mt({ width: 2.5, color: p.get("color") || [255, 128, 0] }),
          fill: new Jt({ color: (p.get("color") || [255, 128, 0]).concat([0.3]) })
        });
      }
    });
    e.set("listMode", "hide"), this.map.addLayer(e), d(this, st, e);
    let t = {
      edition: !0,
      select: !1,
      delete: !1,
      info: !1,
      drawPoint: !0,
      drawLine: !0,
      drawPolygon: !0,
      drawHole: !0,
      drawRegular: !0,
      transform: !0,
      split: !0,
      offset: !0
    };
    t = Object.assign(t, this.config.tools);
    const s = new Ke({
      source: e.getSource(),
      target: this,
      // edition: false,
      interactions: {
        Select: !1,
        //&& _select,// 不展示选择
        Delete: !1,
        Info: !1,
        DrawPoint: t.drawPoint && {
          title: "绘制点"
        },
        DrawLine: t.drawLine && {
          title: "绘制线"
        },
        DrawPolygon: t.drawPolygon && {
          title: "绘制面"
        },
        DrawHole: t.drawHole && {
          title: "绘制岛面"
        },
        DrawRegular: t.drawRegular && {
          title: "绘制多边形",
          ptsLabel: "边"
        },
        Transform: t.transform && {
          title: "旋转/缩放"
        },
        Split: t.split && {
          title: "打断"
        },
        Offset: t.offset && {
          title: "偏移"
        },
        UndoDraw: "回退",
        FinishDraw: "完成"
      }
    }), i = new ts({
      layers: [e]
      // 指定图层
    });
    i.on("change:active", () => {
      i.getActive() || (i.getFeatures().clear(), h(this, V, ot).call(this));
    }), i.on("select", (p) => {
      h(this, Nt, xe).call(this, p);
    }), d(this, I, new es({
      features: i.getFeatures()
    })), this.map.addInteraction(o(this, I)), o(this, I).setActive(!1);
    const n = new Xe({
      // className: 'attr-edit',
      html: '<div class="attr-edit">☰</div>',
      title: "属性编辑",
      interaction: i
    });
    s.addControl(n);
    const a = this.map.interactions.getArray().find((p) => p instanceof is);
    [
      s.getInteraction("DrawPoint"),
      s.getInteraction("DrawLine"),
      s.getInteraction("DrawPolygon"),
      s.getInteraction("DrawHole"),
      s.getInteraction("DrawRegular")
    ].forEach((p) => {
      p == null || p.on("drawend", (y) => {
        a.setActive(!1), h(this, gt, Ht).call(this, y.feature), setTimeout(() => {
          a.setActive(!0);
        }, 0);
      });
    }), d(this, rt, i);
    const u = new ss({
      html: '<div class="upload"><label>➜</label></div>',
      title: "上传shp",
      handleClick: () => this.uploadShp()
    });
    s.addControl(u), this.map.addControl(s), this.notification = new ue({}), this.map.addControl(this.notification);
  }
  // 上传shp
  uploadShp() {
    d(this, it, o(this, it) || this.getElementsByClassName("shp-upload")[0]), o(this, it).click();
  }
  // 读取shp文件
  async readFile(e) {
    var i;
    const t = e.currentTarget, s = t.files;
    if (s.length !== 0) {
      this.loading = !0;
      try {
        let n, a;
        for (let f = 0; f < s.length; f++) {
          const [O, g] = s[f].name.split(".");
          if (g.toLowerCase() === "shp") {
            n = O, a = s[f];
            break;
          }
        }
        if (!a)
          throw new Error("没有找到shp文件");
        const c = await this.loadFile(a);
        if (!c)
          throw new Error("读取文件失败");
        let u = await window.shp(c).then((f) => f, (f) => {
          throw new Error(f);
        }), p;
        for (let f = 0; f < s.length; f++) {
          const [O, g] = s[f].name.split(".");
          if (g.toLowerCase() === "prj" && O == n) {
            p = s[f];
            break;
          }
        }
        let y;
        if (p) {
          let f = await this.loadFile(p, "text");
          f = f.replace("Gauss_Kruger", "Transverse_Mercator");
          let O = o(this, ft).find((Ee) => Ee.prj === f), g;
          O ? g = O.name : (g = `ESRI:${Zt(this, Dt)._++}`, o(this, ft).push({
            name: g,
            prj: f
          }), qt.defs(g, f), rs(qt));
          const Te = this.map.getView().getProjection().getCode();
          y = new kt().readFeatures(u, {
            dataProjection: g,
            // 元数据的投影坐标
            featureProjection: Te
            // 规定要素以哪种坐标显示
          });
        } else
          y = new kt().readFeatures(u);
        const w = y[0];
        if (w) {
          o(this, st).getSource().addFeature(w);
          const f = (i = w.getGeometry()) == null ? void 0 : i.getExtent();
          this.map.getView().fit(f, { padding: [50, 50, 50, 50], duration: 1e3 }), h(this, gt, Ht).call(this, w);
        } else
          throw new Error("没有找到上传的图形");
      } catch (n) {
        console.error(n), this.notification.show(n);
      } finally {
        t.value = null, this.loading = !1;
      }
    }
  }
  // 读取blob文件
  loadFile(e, t) {
    return new Promise((s, i) => {
      const n = new FileReader();
      switch (t) {
        case "text":
          n.readAsText(e);
          break;
        case "buffer":
          n.readAsArrayBuffer(e);
          break;
        case "binary":
          n.readAsBinaryString(e);
          break;
        default:
          n.readAsDataURL(e);
          break;
      }
      n.onload = (a) => {
        var u;
        let c = (u = a.target) == null ? void 0 : u.result;
        s(c);
      }, n.onerror = (a) => {
        n.abort(), i(a);
      };
    });
  }
  // 删除指定图形
  delete() {
    o(this, st).getSource().removeFeature(o(this, E)), d(this, E, null), h(this, V, ot).call(this);
  }
  // 获取日期部分
  getDate(e) {
    let t;
    if (e)
      typeof e == "string" ? t = new Date(e) : t = e;
    else
      return "";
    const s = t.getFullYear(), i = t.getMonth() + 1, n = t.getDate();
    return `${this.pad(s, 4)}-${this.pad(i)}-${this.pad(n)}`;
  }
  // 补零
  pad(e, t = 2, s = "0") {
    return e.toString().padStart(t, s);
  }
  // 获取时间部分
  getTime(e) {
    let t;
    if (e)
      typeof e == "string" ? t = new Date(e) : t = e;
    else
      return "";
    return t.toLocaleTimeString("zh-cn", { hour: "numeric", minute: "numeric", hour12: !1 });
  }
  // 获取默认值
  getDefaultValue(e, t) {
    let s = "";
    try {
      switch (t == null ? void 0 : t.toLowerCase()) {
        case "$guid":
          s = `{${ns()}}`;
          break;
        case "$date":
          let i = /* @__PURE__ */ new Date();
          s = `${this.getDate(i)} ${this.getTime(i)}`;
          break;
        case "$area":
          const n = e.getGeometry();
          n && (s = Ye(n, {
            projection: this.map.getView().getProjection()
          }).toFixed(3));
          break;
        default:
          s = t || "";
          break;
      }
    } catch (i) {
      console.error(i);
    }
    return s;
  }
  // 提交
  upload() {
    if (!o(this, E)) {
      this.notification.show("请先绘制一个图形");
      return;
    }
    let e = new Qe().writeFeaturesObject([o(this, E)], {
      featureProjection: this.map.getView().getProjection()
    });
    e = this.beforeUpload(e);
    let t = `features=${JSON.stringify(e.features)}&rollbackOnFailure=true&f=pjson`;
    const s = this.config.layer.url + "/addFeatures";
    fetch(s, {
      method: "POST",
      body: t,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then((i) => i.json()).then((i) => {
      if (i.error) {
        const n = i.error.details[0] || i.error.message;
        this.notification.show(`提交失败 ${n}`), console.error(i.error), this.afterUpload(!1);
      } else
        this.notification.show("提交完成"), this.delete(), this.map.getAllLayers().forEach((n) => {
          var a;
          ((a = n.get("type")) == null ? void 0 : a.toLowerCase()) === "image" && n.getSource().refresh();
        }), this.afterUpload(!0);
    }).catch((i) => {
      console.error(i), this.afterUpload(!1);
    });
  }
  beforeUpload(e) {
    return e;
  }
  afterUpload(e) {
  }
}, $ = new WeakMap(), st = new WeakMap(), E = new WeakMap(), I = new WeakMap(), it = new WeakMap(), ft = new WeakMap(), Dt = new WeakMap(), rt = new WeakMap(), gt = new WeakSet(), Ht = function(e) {
  o(this, rt).setActive(!0), o(this, rt).getFeatures().extend([e]), h(this, wt, Wt).call(this, e);
}, Nt = new WeakSet(), xe = function(e) {
  const t = e.target.getFeatures(), s = t.getLength();
  if (s === 0)
    h(this, V, ot).call(this);
  else if (s > 1)
    h(this, V, ot).call(this);
  else {
    const i = t.getArray()[0];
    h(this, wt, Wt).call(this, i);
  }
}, V = new WeakSet(), ot = function() {
  o(this, I).setActive(!1), d(this, $, o(this, $) || this.getElementsByClassName("attribute")[0]), o(this, $).style.display = "none";
}, wt = new WeakSet(), Wt = function(e) {
  o(this, I).setActive(!0), d(this, E, e);
  let t = this.config.layer.fields || [], s = document.createElement("table");
  s.classList.add("table"), t.forEach((i) => {
    let n = document.createElement("tr"), a = document.createElement("td");
    a.innerHTML = i.alias || i.name;
    let c = document.createElement("td");
    c.appendChild(h(this, At, je).call(this, e, i)), n.appendChild(a), n.appendChild(c), n.style.display = i.isDisplay === !1 ? "none" : "table-row", s.appendChild(n);
  }), d(this, $, o(this, $) || this.getElementsByClassName("attribute")[0]), o(this, $).replaceChild(s, o(this, $).firstChild), o(this, $).style.display = "block";
}, At = new WeakSet(), je = function(e, t) {
  var i, n;
  let s = e.get(t.name) || this.getDefaultValue(e, t.defaultValue);
  if (e.set(t.name, s), ((i = t.type) == null ? void 0 : i.toLowerCase()) === "date") {
    let a = document.createElement("div"), c = document.createElement("input");
    c.type = "date", c.value = this.getDate(s);
    let u = document.createElement("input");
    return u.type = "time", u.value = this.getTime(s), u.oninput = c.oninput = () => {
      e.set(t.name, `${c.value} ${u.value}`);
    }, t.editable == !1 && (c.readOnly = !0, u.readOnly = !0), a.appendChild(c), a.appendChild(u), a.classList.add("date-time"), a;
  } else {
    let a = document.createElement("input");
    t.editable == !1 && (a.readOnly = !0);
    let c;
    switch ((n = t.type) == null ? void 0 : n.toLowerCase()) {
      case "string":
        c = "text";
        break;
      case "guid":
        c = "text";
        break;
      case "int":
        c = "number";
        break;
      case "double":
        c = "number";
        break;
      default:
        c = "text";
        break;
    }
    return a.type = c, a.oninput = (u) => {
      e.set(t.name, u.target.value);
    }, a.value = s, a;
  }
}, he);
ie = Rs([
  C({
    tagName: "ol-edit-bar",
    className: "ol-edit-bar",
    template: Vs
  })
], ie);
const Hs = `<div s-title="title" class="btn" onclick="$this.btnClick(event)">\r
    <div class="arrow">&#8678</div>\r
</div>`;
var Ws = Object.defineProperty, Us = Object.getOwnPropertyDescriptor, zs = (r, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? Us(e, t) : e, n = r.length - 1, a; n >= 0; n--)
    (a = r[n]) && (i = (s ? a(e, t, i) : a(i)) || i);
  return s && i && Ws(e, t, i), i;
};
let re = class extends S {
  constructor() {
    super();
  }
  async onInit() {
    this.$data = {
      title: "显示鹰眼图",
      display: !1
    }, this.classList.add("overview-hide");
    const r = this.mapConfig.map.layers.filter((s) => s.isBasemap === !0), e = H(r, "map");
    let t = new as({
      target: this,
      layers: e,
      rotation: !0,
      panAnimation: !0,
      minZoom: 0,
      maxZoom: 20
    });
    this.map.addControl(t);
  }
  // 按钮点击事件
  btnClick() {
    this.$data.display = !this.$data.display, this.$data.display ? (this.$data.title = "隐藏鹰眼图", this.classList.remove("overview-hide")) : (this.$data.title = "显示鹰眼图", this.classList.add("overview-hide"));
  }
};
re = zs([
  C({
    tagName: "ol-overview",
    className: "ol-overview",
    template: Hs
  })
], re);
const Zs = `<div class="header">\r
    <label>卷帘开关</label>\r
    <input type="checkbox" class="switch" id="switch" onclick="$this.switchChange(event)">\r
    <label for="switch"></label>\r
</div>\r
<div class="left">\r
    <div class="title">左侧</div>\r
    <div class="layer-list-left">\r
    </div>\r
</div>\r
<div class="right">\r
    <div class="title">右侧</div>\r
    <div class="layer-list-right">\r
    </div>\r
</div>`;
var Js = Object.defineProperty, ks = Object.getOwnPropertyDescriptor, qs = (r, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? ks(e, t) : e, n = r.length - 1, a; n >= 0; n--)
    (a = r[n]) && (i = (s ? a(e, t, i) : a(i)) || i);
  return s && i && Js(e, t, i), i;
}, B, G, x, nt, de;
let ne = (de = class extends S {
  constructor() {
    super();
    l(this, B, void 0);
    l(this, G, void 0);
    l(this, x, void 0);
    l(this, nt, []);
  }
  async onInit() {
    d(this, x, new os()), this.drawList();
    let e = this.map.getLayerGroup().getLayers();
    e.on("change:length", () => {
      this.drawList(), this.listen(e);
    }), this.listen(e);
  }
  removeListeners() {
    o(this, nt).forEach((e) => {
      ls(e);
    }), d(this, nt, []);
  }
  listen(e) {
    this.removeListeners(), e.getArray().forEach((t) => {
      o(this, nt).push(t.on("change:visible", () => {
        this.drawList();
      }));
    });
  }
  switchChange(e) {
    e.target.checked ? this.map.addControl(o(this, x)) : this.map.removeControl(o(this, x));
  }
  // 绘制列表
  drawList() {
    d(this, B, o(this, B) || this.getElementsByClassName("layer-list-left")[0]), d(this, G, o(this, G) || this.getElementsByClassName("layer-list-right")[0]);
    let e = [];
    this.getLayers(this.map.getLayers(), e), o(this, B).innerHTML = "", o(this, B).appendChild(this.createUl(e, "left")), o(this, G).innerHTML = "", o(this, G).appendChild(this.createUl(e, "right"));
  }
  getLayers(e, t) {
    e.getArray().forEach((s) => {
      s.getLayers && s.getVisible() ? this.getLayers(s.getLayers(), t) : s.getVisible() && t.push(s);
    });
  }
  createUl(e, t) {
    const s = document.createElement("ul");
    return e.forEach((i) => {
      let n = i.ol_uid, a = i.get("title");
      const c = i.get("isBasemap");
      if (n && a) {
        n = `${t}_${n}`, a = c ? `${a}（底图）` : a;
        const u = document.createElement("li");
        u.innerHTML = `<div class="checkbox"><input type="checkbox" id="${n}">
                <label for="${n}" title="${a}"><span>${a}</span></label></div>`;
        const p = u.getElementsByTagName("input")[0];
        p.onclick = (y) => {
          let w = y.target.checked;
          this.onLayerClick({
            layer: i,
            type: t,
            checked: w
          });
        }, p.checked = this.getCheckBoxState(i, t), s.appendChild(u);
      }
    }), s;
  }
  // 获取选择框状态
  getCheckBoxState(e, t) {
    const s = o(this, x).layers;
    for (var i = 0; i < s.length; i++)
      if (s[i].layer === e && s[i].right === (t === "right"))
        return !0;
    return !1;
  }
  // layer选择事件
  onLayerClick(e) {
    if (o(this, x).removeLayer(e.layer), e.checked) {
      const s = `${e.type === "right" ? "left" : "right"}_${e.layer.ol_uid}`, i = document.getElementById(s);
      i.checked = !1, o(this, x).addLayer(e.layer, e.type === "right");
    }
  }
}, B = new WeakMap(), G = new WeakMap(), x = new WeakMap(), nt = new WeakMap(), de);
ne = qs([
  C({
    tagName: "ol-swipe",
    className: "ol-swipe-widget",
    template: Zs
  })
], ne);
var R, at;
class Ks extends ds {
  constructor(t) {
    t = t || {};
    super(t);
    // 任意的string索引List
    l(this, R, 0);
    l(this, at, 0);
  }
  // 线宽由粗到细 由不透明到透明 半径由小变大
  animate(t) {
    const s = this.easing_(t.elapsed);
    if (s) {
      let i = t.style, n, a;
      for (n = 0; n < i.length; n++)
        a = i[n].getImage(), a && a.getRadius && (d(this, at, o(this, at) || a.getRadius()), a.setRadius(o(this, at) * s), a.setOpacity(1 - s), d(this, R, o(this, R) || a.getStroke().getWidth()), a.getStroke().setWidth(o(this, R) - o(this, R) * s));
      this.drawGeom_(t, t.geom);
    }
    return t.time <= this.duration_;
  }
}
R = new WeakMap(), at = new WeakMap();
const Xs = `<div class="row">\r
    <div class="label">坐标系:</div>\r
    <div class="div">\r
        <select s-value="prj" name="prj" onchange="$this.$data.prj=value">\r
            <option value="4326">地理坐标（经纬度）</option>\r
            <option value="3857">投影坐标（平面坐标）</option>\r
        </select>\r
    </div>\r
</div>\r
<div class="row">\r
    <div class="label">X:</div>\r
    <div class="div">\r
        <input type="number" s-value="x" oninput="$this.$data.x=value">\r
    </div>\r
\r
</div>\r
<div class="row">\r
    <div class="label">Y:</div>\r
    <div class="div">\r
        <input type="number" s-value="y" oninput="$this.$data.y=value">\r
    </div>\r
</div>\r
<div class="row btn">\r
    <button onclick="$this.submit()">定位</button>\r
</div>`;
var Ys = Object.defineProperty, Qs = Object.getOwnPropertyDescriptor, ti = (r, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? Qs(e, t) : e, n = r.length - 1, a; n >= 0; n--)
    (a = r[n]) && (i = (s ? a(e, t, i) : a(i)) || i);
  return s && i && Ys(e, t, i), i;
}, vt, pe;
let ae = (pe = class extends S {
  constructor() {
    super();
    l(this, vt, void 0);
  }
  async onInit() {
    this.$data = {
      x: null,
      y: null,
      prj: "4326"
    }, this.notification = new ue({}), this.map.addControl(this.notification), d(this, vt, new me({
      source: new fe()
    })), o(this, vt).setMap(this.map);
  }
  submit() {
    if (this.$data.x && this.$data.y) {
      const e = Ve([this.$data.x, this.$data.y], `EPSG:${this.$data.prj}`, this.map.getView().getProjection()), t = this.map.getView().getProjection().getExtent();
      ze(t, e) ? (this.map.getView().animate({
        center: e,
        //动画结尾的视图中心
        // zoom:7, //这里可以指定到具体等级
        duration: 100
        //动画的持续时间
      }), this.pulse(e)) : this.notification.show("坐标超出地图范围！");
    } else
      this.notification.show("请输入坐标！");
  }
  // 多圈动画
  pulse(e) {
    for (let t = 0; t < 4; t++)
      setTimeout(() => {
        this.pulseFeature(e);
      }, t * 500);
  }
  // 动画效果
  pulseFeature(e, t = 3e3) {
    let s = new cs(new hs(e));
    s.setStyle(new Ut({
      image: new ge({
        radius: 24,
        stroke: new Mt({
          color: "rgb(255,0,0)",
          width: 3
        })
      })
    })), this.map.animateFeature(s, new Ks({
      fade: Kt,
      duration: t,
      easing: Kt
    }));
  }
}, vt = new WeakMap(), pe);
ae = ti([
  C({
    tagName: "ol-location",
    className: "ol-location",
    template: Xs
  })
], ae);
const ei = `<fieldset>\r
    <legend>\r
        数据解析\r
    </legend>\r
    <div>\r
        <button onclick="$this.add(event)">测试加一</button>\r
        结果：{{a}}\r
    </div>\r
\r
    <div>\r
        <button onclick="$this.changeName(event)">测试人名</button>\r
        你是：{{b}}\r
    </div>\r
\r
\r
    <div>\r
        <button onclick="$this.changeValue(event)">测试多重属性</button>\r
        c.d.e : {{c.d.e}}\r
    </div>\r
\r
\r
    <div>\r
        <button onclick="$this.changeArr(event)">测试数组</button>\r
        数组长度：{{f.length}}\r
    </div>\r
</fieldset>\r
\r
\r
<fieldset>\r
    <legend>\r
        事件数据绑定\r
    </legend>\r
    <div>\r
        <input oninput="$this.$data.aa=value">\r
        <br>\r
        结果：{{aa}}\r
    </div>\r
</fieldset>\r
\r
<fieldset>\r
    <legend>\r
        属性绑定 + 直接赋值\r
    </legend>\r
    <div>\r
        <input s-value="bb" oninput="$this.$data.bb=value">\r
        <br>\r
        结果：{{bb}}\r
    </div>\r
</fieldset>\r
\r
<fieldset>\r
    <legend>\r
        属性绑定 + 绑定赋值\r
    </legend>\r
    <div>\r
        <input s-value="cc" oninput="$set('cc',value)">\r
        <!-- <input s-value="cc" oninput="console.log(this)"> -->\r
        <br>\r
        结果：{{cc}}\r
    </div>\r
</fieldset>`;
var si = Object.defineProperty, ii = Object.getOwnPropertyDescriptor, ri = (r, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? ii(e, t) : e, n = r.length - 1, a; n >= 0; n--)
    (a = r[n]) && (i = (s ? a(e, t, i) : a(i)) || i);
  return s && i && si(e, t, i), i;
};
let oe = class extends S {
  constructor() {
    super();
  }
  async onInit() {
    this.$data = {
      a: 1,
      b: "张三",
      c: {
        d: {
          e: 1
        }
      },
      f: [1],
      aa: "123",
      bb: "start",
      cc: "121"
    };
  }
  hello(r) {
    console.log(r), this.$data.c.d = "和了了了了了了";
  }
  changeName() {
    this.$data.b = this.$data.b == "张三" ? "李四" : "张三";
  }
  changeValue() {
    this.$data.c.d = {
      // e: parseInt(String(Math.random() * 10))
      e: this.$data.c.d.e + 1
    };
  }
  changeArr() {
    this.$data.f.push(1);
  }
  add() {
    this.$data.a++;
  }
  kill() {
    return "hello";
  }
};
oe = ri([
  C({
    tagName: "ol-hello-world",
    className: "ol-hello-world",
    template: ei
    // mode: Mode.none
  })
], oe);
var ni = Object.defineProperty, ai = Object.getOwnPropertyDescriptor, oi = (r, e, t, s) => {
  for (var i = s > 1 ? void 0 : s ? ai(e, t) : e, n = r.length - 1, a; n >= 0; n--)
    (a = r[n]) && (i = (s ? a(e, t, i) : a(i)) || i);
  return s && i && ni(e, t, i), i;
};
let le = class extends Se {
  constructor() {
    super();
  }
  async onInit() {
    const r = H(this.config.map, "map");
    r.setTarget(this), r.addControl(new ps()), this.map = r;
  }
};
le = oi([
  C({
    tagName: "ol-map-test",
    className: "ol-map-test",
    hasConfig: !0
  })
], le);
export {
  ee as BasemapList,
  se as Coordinate,
  ie as EditBar,
  oe as HelloWorld,
  te as LayerList,
  ae as Location,
  Yt as MapView,
  le as MapViewTest,
  fs as Objects,
  re as Overview,
  us as StyleFn,
  ne as Swipe,
  ms as TextFn,
  Qt as ZoomWidget,
  gs as getConstructor,
  H as getObject
};
