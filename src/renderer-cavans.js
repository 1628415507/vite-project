/*
 * @Author: Hongzf
 * @Date: 2022-10-10 11:10:11
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-10-10 14:33:16
 * @Description: 通过这个文件实现一个简易的Canvas渲染逻辑
 */
// 【1】引入createRenderer
import { createRenderer } from '@vue/runtime-core';
// 通过createRenderer函数创建了一个渲染器。
// 通过参数options获取增删改查所有的函数以后，
// 在内部的render、mount、patch等函数中，需要去渲染一个元素的时候，
// 就可以通过option.createElement和option.insert来实现。

// 【2】实现draw函数
// 用Canvas的操作方法递归地把Canvas对象渲染到Canvas标签内部。
let ctx;
function draw(ele, isChild) {
    if (!isChild) {
        ctx.clearRect(0, 0, 500, 500);
    }

    ctx.fillStyle = ele.fill || 'white';
    ctx.fillRect(...ele.pos);
    if (ele.text) {
        ctx.fillStyle = ele.color || 'white';
        ele.fontSize = ele.type == 'h1' ? 20 : 12;
        ctx.font = (ele.fontSize || 18) + 'px serif';
        ctx.fillText(ele.text, ele.pos[0] + 10, ele.pos[1] + ele.fontSize);
    }

    ele.child &&
        ele.child.forEach(c => {
            console.log('child:::', c);
            // 用Canvas的操作方法递归地把Canvas对象渲染到Canvas标签内部。
            draw(c, true);
        });
}

// 【3】在createRenderer的insert方法中调用draw函数
const { createApp: originCa } = createRenderer({
    // 新增insert需要维护parent和child元素
    insert: (child, parent, anchor) => {
        if (typeof child == 'string') {
            parent.text = child;
        } else {
            child.parent = parent;
            if (!parent.child) {
                parent.child = [child];
            } else {
                parent.child.push(child);
            }
        }
        if (parent.nodeName) {
            // 插入的时候也需要调用draw函数，并且需要监听onclick事件
            draw(child);
            if (child.onClick) {
                // 监听onclick事件
                ctx.canvas.addEventListener(
                    'click',
                    () => {
                        child.onClick();
                        setTimeout(() => {
                            draw(child);
                        });
                    },
                    false
                );
            }
        }
    },
    createElement(type, isSVG, isCustom) {
        return {
            type
        };
    },
    setElementText(node, text) {
        node.text = text;
    },
    patchProp(el, key, prev, next) {
        el[key] = next;
    }
});

// 【4】重写并导出createApp

// 通过createRenderer⽤我们⾃已定义的renderer去创建createApp，并且重写mount函数
function createApp(...args) {
    const app = originCa(...args);
    // 在 Canvas的mount中，我们需要创建Canvas标签并且挂载到App上。
    return {
        mount(selector) {
            // 创建Canvas标签
            const canvas = document.createElement('canvas');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            document.querySelector(selector).appendChild(canvas);
            ctx = canvas.getContext('2d');
            // 挂载到App上。
            app.mount(canvas);
        }
    };
}
export { createApp };
// 【5】在main.js中引入自己写的createApp
