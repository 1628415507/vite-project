export function pageMap(canvas, options) {
    // console.log('【 options 】-2', options);
    const WIN = window //WIN对象
    // console.log('【 WIN 】-3', WIN);
    var DOC = WIN.document
    var DOC_EL = DOC.documentElement //获取整个页面的dom对象
    var BODY = DOC.querySelector('body')
    // var CTX = canvas.getContext('2d');

    // var black = function black(pc) {
    //     return 'rgba(0,0,0,'.concat(pc / 100, ')');
    // };

    var settings = Object.assign(
        {
            viewport: null,
            // styles: {
            //     'header,footer,section,article': black(8),
            //     'h1,a': black(10),
            //     'h2,h3,h4': black(8)
            // },
            // back: black(2),
            // view: black(5),
            // drag: black(10),
            interval: null
        },
        options
    )

    var _listener = function _listener(el, method, types, fn) {
        return types.split(/\s+/).forEach(function (type) {
            return el[method](type, fn)
        })
    }

    var on = function on(el, types, fn) {
        return _listener(el, 'addEventListener', types, fn)
    }
    // 移出事件监听
    var off = function off(el, types, fn) {
        return _listener(el, 'removeEventListener', types, fn)
    }
    // 返回矩形对象形式的值
    const Rect = function Rect(x, y, w, h) {
        return { x, y, w, h } //起始坐标x,y和长宽w,h
    }

    var rect_rel_to = function rect_rel_to(rect) {
        // console.log('【 rect 】-48', rect);
        var pos =
            arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {
                      x: 0,
                      y: 0
                  }
        return Rect(rect.x - pos.x, rect.y - pos.y, rect.w, rect.h)
    }
    // 获取整体页面的大小值
    const rect_of_doc = function rect_of_doc() {
        // console.log('【 DOC_EL.scrollWidth 】-63', DOC_EL.scrollWidth, DOC_EL.scrollHeight);
        return Rect(0, 0, DOC_EL.scrollWidth, DOC_EL.scrollHeight)
    }

    var rect_of_win = function rect_of_win() {
        return Rect(WIN.pageXOffset, WIN.pageYOffset, DOC_EL.clientWidth, DOC_EL.clientHeight)
    }
    // 获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
    var el_get_offset = function el_get_offset(el) {
        // getBoundingClientRect()用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。
        // getBoundingClientRect()是DOM元素到浏览器可视范围的距离（不包含文档卷起的部分）。
        const br = el.getBoundingClientRect() //获取元素位置
        // console.log('【 br 】-70', br.left, WIN.pageXOffset, WIN.pageYOffset);
        const x = br.left + WIN.pageXOffset
        // console.log('【 x 】-73', x)
        const y = br.top + WIN.pageYOffset
        return { x, y }
    }

    // var rect_of_el = function rect_of_el(el) {
    //     var _el_get_offset = el_get_offset(el),
    //         x = _el_get_offset.x,
    //         y = _el_get_offset.y;

    //     return Rect(x, y, el.offsetWidth, el.offsetHeight);
    // };

    var rect_of_viewport = function rect_of_viewport(el) {
        // console.log('【 rect_of_viewport 】-222', el);
        const _el_get_offset2 = el_get_offset(el),
            x = _el_get_offset2.x,
            y = _el_get_offset2.y
        // console.log('【 _el_get_offset2 】-85', _el_get_offset2);
        return Rect(x + el.clientLeft, y + el.clientTop, el.clientWidth, el.clientHeight)
    }

    var rect_of_content = function rect_of_content(el) {
        const _el_get_offset3 = el_get_offset(el),
            x = _el_get_offset3.x,
            y = _el_get_offset3.y

        return Rect(x + el.clientLeft - el.scrollLeft, y + el.clientTop - el.scrollTop, el.scrollWidth, el.scrollHeight)
    }
    // 计算缩放比例
    const calc_scale = (function () {
        const width = canvas.clientWidth //canvas的宽度
        const height = canvas.clientHeight //canvas的高度
        return function (w, h) {
            return Math.min(width / w, height / h) //取两值之间的较小值
        }
    })()

    // 重新设置canvas的大小
    // var resize_canvas = function resize_canvas(w, h) {
    //     canvas.width = w;
    //     canvas.height = h;
    //     canvas.style.width = ''.concat(w, 'px');
    //     canvas.style.height = ''.concat(h, 'px');
    // };

    var viewport = settings.viewport //
    console.log('【 viewport 】-122', viewport)

    // var find = function find(sel) {
    //     return Array.from((viewport || DOC).querySelectorAll(sel));
    // };

    var drag = false
    let root_rect //根页面的坐标尺寸
    var view_rect
    let scale //缩放比例
    var drag_rx
    var drag_ry

    // var draw_rect = function draw_rect(rect, col) {
    //     if (col) {
    //         CTX.beginPath();
    //         CTX.rect(rect.x, rect.y, rect.w, rect.h);
    //         CTX.fillStyle = col;
    //         CTX.fill();
    //     }
    // };

    // var apply_styles = function apply_styles(styles) {
    //     Object.keys(styles).forEach(function (sel) {
    //         var col = styles[sel];
    //         find(sel).forEach(function (el) {
    //             draw_rect(rect_rel_to(rect_of_el(el), root_rect), col);
    //         });
    //     });
    // };

    var draw = function draw() {
        // 获取根页面,没有则默认整个html——rect_of_doc()
        root_rect = viewport ? rect_of_content(viewport) : rect_of_doc()
        // console.log('【 root_rect 】-153', root_rect);
        // ？？
        view_rect = viewport ? rect_of_viewport(viewport) : rect_of_win()
        // console.log('【 view_rect 】-155', view_rect);
        //计算缩放比例
        scale = calc_scale(root_rect.w, root_rect.h)
        // resize_canvas(root_rect.w * scale, root_rect.h * scale); // 重新设置canvas的大小
        // CTX.setTransform(1, 0, 0, 1, 0, 0);//绘制一个矩形，通过 setTransform() 重置并创建新的变换矩阵，再次绘制矩形
        // CTX.clearRect(0, 0, canvas.width, canvas.height); // 在给定矩形内清空一个矩形
        // CTX.scale(scale, scale);
        // draw_rect(rect_rel_to(root_rect, root_rect), settings.back);
        // apply_styles(settings.styles);
        // draw_rect(rect_rel_to(view_rect, root_rect), drag ? settings.drag : settings.view);
    }
    // 鼠标在试图上拖拉
    var on_drag = function on_drag(ev) {
        // console.log('【 ev 】-311', ev.pageX, ev.pageY);
        ev.preventDefault()
        var cr = rect_of_viewport(canvas) //canvas的坐标尺寸
        // console.log('【 cr 】-320', cr);
        var x = (ev.pageX - cr.x) / scale - view_rect.w * drag_rx
        var y = (ev.pageY - cr.y) / scale - view_rect.h * drag_ry
        // console.log('【 WIN 】-185', WIN, viewport);

        if (viewport) {
            console.log('【 viewport 】-173', viewport)
            viewport.scrollLeft = x
            console.log('【  viewport.scrollLeft 】-183',  viewport.scrollLeft)
            viewport.scrollTop = y
            // viewport.scrollTo(x, y);
        } else {
            WIN.scrollTo(x, y)
            // console.log('【 x, y 】-181', x, y);
        }
        draw()
    }
    // 鼠标放开
    var on_drag_end = function on_drag_end(ev) {
        drag = false
        canvas.style.cursor = 'pointer'
        BODY.style.cursor = 'auto'
        off(WIN, 'mousemove', on_drag)
        off(WIN, 'mouseup', on_drag_end)
        on_drag(ev)
    }
    // 1.开始拖拽
    const on_drag_start = function on_drag_start(ev) {
        // console.log('【 开始拖拽 】-195', ev);
        drag = true
        var cr = rect_of_viewport(canvas)
        var vr = rect_rel_to(view_rect, root_rect)
        drag_rx = ((ev.pageX - cr.x) / scale - vr.x) / vr.w
        drag_ry = ((ev.pageY - cr.y) / scale - vr.y) / vr.h

        if (drag_rx < 0 || drag_rx > 1 || drag_ry < 0 || drag_ry > 1) {
            drag_rx = 0.5
            drag_ry = 0.5
        }

        canvas.style.cursor = 'crosshair'
        BODY.style.cursor = 'crosshair'
        on(WIN, 'mousemove', on_drag)
        on(WIN, 'mouseup', on_drag_end)
        on_drag(ev)
        // console.log('【 ev 】-213', ev)
    }
    // 初始化
    var init = function init() {
        canvas.style.cursor = 'pointer'
        // 给canvas和window添加监听事件
        on(canvas, 'mousedown', on_drag_start)
        on(viewport || WIN, 'load resize scroll', draw)

        if (settings.interval > 0) {
            setInterval(function () {
                return draw()
            }, settings.interval)
        }
        // 初始化cavans
        draw()
    }

    init()
    return {
        redraw: draw
    }
}
