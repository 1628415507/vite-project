import { defineComponent, h } from 'vue';

export default defineComponent({
    props: {
        level: {
            type: Number,
            required: true
        }
    },
    // 这⾥的setup函数返回值是⼀个函数，就是我们所说的render函数。
    // render函数返回h函数的执⾏结果，h函数的第⼀个参数就是标签名
    setup(props, { slots }) {
        // return () =>
        //     h(
        //         'h' + props.level, // 标签名
        //         {}, // prop 或 attribute
        //         slots.default() // 子节点
        //     );
        const tag = 'h' + props.level;
        return () => <tag>{slots.default()}</tag>;
    }
});
