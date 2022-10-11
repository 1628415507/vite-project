/*
 * @Author: Hongzf
 * @Date: 2022-10-10 16:27:41
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-10-10 16:59:35
 * @Description:
 */

let activeEffect = null;
// let shouldTrack = false
// let effectStack = []

// 在track函数中，我们可以使⽤⼀个巨⼤的tragetMap去存储依赖关系

const targetMap = new WeakMap();
// 依赖地图存储的数据格式，⽤代码描述如下：
// targetMap = {
//   target： {
//     key1: [回调函数1，回调函数2],
//     key2: [回调函数3，回调函数4],
//   }  ,
//    target1： {
//     key3: [回调函数5]
//   }
//  }

export function effect(fn, options = {}) {
    // effect嵌套，通过队列管理
    const effectFn = () => {
        try {
            activeEffect = effectFn;
            //fn执行的时候，内部读取响应式数据的时候，就能在get配置里读取到activeEffect
            return fn();
        } finally {
            activeEffect = null;
        }
    };
    if (!options.lazy) {
        //没有配置lazy 直接执行
        effectFn();
    }
    effectFn.scheduler = options.scheduler; // 调度时机 watchEffect会用到
    return effectFn;
}
// get中关键的收集依赖的track函数
export function track(target, type, key) {
    // console.log(`触发 track -> target: ${target} type:${type} key:${key}`)

    // 1. 先基于 target 找到对应的 dep
    // 如果是第一次的话，那么就需要初始化
    // {
    //   target1: {//depsmap
    //     key:[effect1,effect2]
    //   }
    // }
    let depsMap = targetMap.get(target);
    // 每次操作之前需要做⾮空的判 断
    if (!depsMap) {
        // 初始化 depsMap 的逻辑
        // depsMap = new Map()
        // targetMap.set(target, depsMap)
        // 上面两行可以简写成下面的
        targetMap.set(target, (depsMap = new Map()));
        // 得到如下格式
        // targetMap = {
        //   target： {}  ,
        //  }
    }
    //
    let deps = depsMap.get(key);
    if (!deps) {
        deps = new Set();
    }
    if (!deps.has(activeEffect) && activeEffect) {
        // 防止重复注册
        deps.add(activeEffect);
    }
    depsMap.set(key, deps);
    // 得到如下格式
    // targetMap = {
    //   target： {
    //     key1: [],
    //   }
    // }
}
// 【set中关键的trigger函数】。
// trigger函数实现的思路就是从targetMap中，
// 根据target和key找到对应的依赖函数集合deps，
// 然后遍历deps执⾏依赖函数 。
export function trigger(target, type, key) {
    // console.log(`触发 trigger -> target:  type:${type} key:${key}`)
    // 从targetMap中，根据target和key找到对应的依赖函数集合deps，
    /*
    const depsMap = targetMap.get(target);
    if (!depsMap) {
        // 没找到依赖
        return;
    }
    const deps = depsMap.get(key);
    if (!deps) {
        return;
    }
    */
    // 上面简写如下
    // 从targetMap中，根据target和key找到对应的依赖函数集合deps，
    const deps = targetMap.get(target)?.get(key) || null;
    if (!deps) {
        return;
    }
    // 遍历deps执⾏依赖函数
    deps.forEach(effectFn => {
        if (effectFn.scheduler) {
            // 执行的是effect的scheduler或者run函数，
            // 这是因为我们需要在effect函数中把依赖函数进行包装，并对依赖函数的执行时机进行控制，
            // 这是一个小的设计点。
            effectFn.scheduler();
        } else {
            effectFn();
        }
    });
}
