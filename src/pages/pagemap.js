export function pageMap(canvas, options) {
    const WIN = window //global.window;WIN对象
    const DOC = WIN.document
    const DOC_EL = DOC.documentElement //获取整个页面的dom对象，documentElement 属性以一个元素对象返回一个文档的文档元素。
    const BODY = DOC.querySelector('body')
    // const CTX = canvas.getContext('2d')
    const settings = Object.assign(
        {
            viewport: null, // viewport的css样式必须有overflow属性scrollLeft、scrollTop才有效
            styles: {
                'header,footer,section,article': 'rgba(0,0,0,0.08)',
                'h1,a': 'rgba(0,0,0,0.1)',
                'h2,h3,h4': 'rgba(0,0,0,0.08)'
            },
            back: 'rgba(33,77,68,.02)', //整体缩略图的颜色
            view: 'rgba(0,0,0,0.05)', //鼠标范围的颜色
            drag: 'rgba(0,0,0,0.01)', //拖拽时的颜色
            interval: null
        },
        options
    )
    const viewport = settings.viewport //指定的整体页面
    let canvasMask = document.getElementById(settings.canvasViewPortId)

    // 事件监听：遍历添加监听事件
    const _listener = function (el, method, types, fn) {
        return types.split(/\s+/).forEach(function (type) {
            // 实现的功能
            // el.addEventListener('mousedown', function (e) {
            // });
            return el[method](type, fn)
        })
    }
    // 事件监听：添加事件监听
    const on = function (el, types, fn) {
        return _listener(el, 'addEventListener', types, fn)
    }
    // 事件监听：移除事件监听
    const off = function (el, types, fn) {
        return _listener(el, 'removeEventListener', types, fn)
    }
    // 返回矩形的坐标尺寸
    const Rect = function (x, y, w, h) {
        return { x, y, w, h } //起始坐标x,y和长宽w,h
    }
    // TODO 作用????
    var rect_rel_to = function (rect) {
        // console.log('【 rect 】-48', rect)
        // console.log('【 arguments 】-51', arguments)
        var pos =
            arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {
                      x: 0,
                      y: 0
                  }
        return Rect(rect.x - pos.x, rect.y - pos.y, rect.w, rect.h)
    }
    // 获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置
    const el_get_offset = function (el) {
        // getBoundingClientRect()用于获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置。
        // getBoundingClientRect()是DOM元素到浏览器可视范围的距离（不包含文档卷起的部分）。
        const br = el.getBoundingClientRect() //获取元素位置
        const x = br.left + WIN.pageXOffset //元素相对视窗左侧的距离+视窗向左卷起的部分=元素整体向左移动的距离
        const y = br.top + WIN.pageYOffset
        return { x, y }
    }

    // 获取el的可视范围
    const rect_of_viewport = function (el) {
        const offset = el_get_offset(el),
            x = offset.x, //可视范围的起始位置x
            y = offset.y //可视范围的起始位置y
        return Rect(x + el.clientLeft, y + el.clientTop, el.clientWidth, el.clientHeight)
    }
    //  页面的整体范围,没有则默认整个html
    const rect_of_root = function () {
        // 如果有指定的dom范围，则使用指定的，没有则默认范围是整个html
        if (viewport) {
            const el = viewport
            const rootOffset = el_get_offset(el),
                x = rootOffset.x,
                y = rootOffset.y
            return Rect(x + el.clientLeft - el.scrollLeft, y + el.clientTop - el.scrollTop, el.scrollWidth, el.scrollHeight)
        } else {
            // 整个html的坐标尺寸
            return Rect(0, 0, DOC_EL.scrollWidth, DOC_EL.scrollHeight)
        }
    }
    // 页面当前的可视范围,没有则默认是 可视窗口范围
    const rect_of_view = function () {
        // 如果有指定的dom范围，则获取指定范围的可视范围，没有则默认范围是可视窗口的范围
        if (viewport) {
            return rect_of_viewport(viewport)
        } else {
            // 整个窗口的坐标尺寸
            // pageXOffset 和 pageYOffset 属性返回文档在窗口左上角水平和垂直方向滚动的像素。
            return Rect(WIN.pageXOffset, WIN.pageYOffset, DOC_EL.clientWidth, DOC_EL.clientHeight)
        }
    }

    // 计算canvas相对于整体页面的缩放比例
    const calc_scale = function (w, h) {
        const width = canvas.clientWidth //canvas的宽度
        const height = canvas.clientHeight //canvas的高度
        return Math.min(width / w, height / h) //取两值之间的较小值
    }

    let drag = false
    let root_rect //整体页面的范围
    var view_rect //整体页面的可视范围
    let scale //缩放比例
    var drag_rx
    var drag_ry

    // 画一个矩形
    // const draw_rect = function (rect, color) {
    //     console.log('【 rect, col 】-138', rect, color)
    //     if (color) {
    //         CTX.beginPath() // 方法开始一条路径，或重置当前的路径
    //         CTX.rect(rect.x, rect.y, rect.w, rect.h) //创建矩形
    //         CTX.fillStyle = color //设置或返回用于填充绘画的颜色、渐变或模式
    //         CTX.fill() //填充当前的图像（路径）。默认颜色是黑色。
    //     }
    // }
    // 控制遮罩移动
    const dragCanvasMask = function (rect) {
        // console.log('【 rect 】-146', rect)
        // console.log('【 scale 】-165', root_rect, view_rect)
        canvasMask.style.width = canvas.width * (view_rect.w / root_rect.w) + 'px'
        canvasMask.style.height = canvas.height * (view_rect.h / root_rect.h) + 'px'
        // offsetWidth：获取 div 元素的宽度，包含内边距（padding）和边框（border）
        // offsetHeight div 元素的高度，包含内边距（padding）和边框（border）
        // offsetLeft ：返回当前元素相对于 offsetParent 节点左边界的偏移像素值。
        // 算出遮罩在图片的中心点 //TODO
        let x = rect.x - canvas.offsetLeft - canvasMask.offsetWidth / 2
        let y = rect.y - canvas.offsetTop - canvasMask.offsetHeight / 2
        // var x = e.pageX(返回鼠标指针的位置) - canvas.offsetLeft - canvasMask.offsetWidth / 2
        // var y = e.pageY - canvas.offsetTop - canvasMask.offsetHeight / 2
        if (x < 0) {
            // 此时的0不是图片的左侧，而是小盒子在最左边时，小盒子的中心点
            x = 0
        } else if (x > canvas.offsetWidth - canvasMask.offsetWidth) {
            //  遮罩的X轴中心点大于图片盒子的宽度减去自身宽度时，说明超出，则始终等于图片盒子的宽度减去自身宽度
            x = canvas.offsetWidth - canvasMask.offsetWidth
        }

        if (y < 0) {
            // 此时的0不是图片的左侧，而是小盒子在最左边时，小盒子的中心点
            y = 0
        } else if (y > canvas.offsetHeight - canvasMask.offsetHeight) {
            y = canvas.offsetHeight - canvasMask.offsetHeight
        }
        canvasMask.style.left = x + 'px'
        canvasMask.style.top = y + 'px'
    }
    const draw = function draw() {
        // 获取整体页面范围
        root_rect = rect_of_root()
        // 获取整体页面的当前可视范围
        view_rect = rect_of_view()
        //计算缩放比例
        scale = calc_scale(root_rect.w, root_rect.h)
        // 控制遮罩移动
        dragCanvasMask(rect_rel_to(view_rect, root_rect), settings.back)
    }
    // 鼠标在试图上拖拉
    const on_drag = function (ev) {
        ev.preventDefault()
        var cr = rect_of_viewport(canvas) //canvas的坐标尺寸
        // TODO （canvas的坐标尺寸）/比例-
        const x = (ev.pageX - cr.x) / scale - view_rect.w * drag_rx
        const y = (ev.pageY - cr.y) / scale - view_rect.h * drag_ry
        if (viewport) {
            // viewport的css样式必须有overflow属性scrollLeft、scrollTop才有效
            viewport.scrollLeft = x
            viewport.scrollTop = y
        } else {
            WIN.scrollTo(x, y)
        }
        draw()
    }
    // 鼠标放开
    const on_drag_end = function (ev) {
        drag = false
        canvas.style.cursor = 'pointer'
        BODY.style.cursor = 'auto'
        off(WIN, 'mousemove', on_drag)
        off(WIN, 'mouseup', on_drag_end)
        on_drag(ev)
    }
    // 1.开始拖拽
    const on_drag_start = function (ev) {
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
    }

    // 初始化
    const init = function () {
        canvas.style.cursor = 'pointer'
        // 给canvas和window添加监听事件
        on(canvas, 'mousedown', on_drag_start)
        on(canvasMask, 'mousedown', on_drag_start)
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
