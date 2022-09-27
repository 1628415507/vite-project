/*
 * @Author: Hongzf
 * @Date: 2022-09-26 16:13:45
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-26 16:35:31
 * @Description:
 */
import { ref, onMounted, onUnmounted } from 'vue';
export function useMouse() {
    const x = ref(0);
    const y = ref(0);
    function update(e) {
        x.value = e.pageX;
        y.value = e.pageY;
    }
    // 组件加载的时候，会触发onMounted⽣命周期，执⾏监听mousemove事件，
    onMounted(() => {
        window.addEventListener('mousemove', update);
    });
    // 组件卸载的时候，会触发onUnmounted⽣命周期，解除mousemove事件。
    onUnmounted(() => {
        window.removeEventListener('mousemove', update);
    });
    return { x, y };
}
