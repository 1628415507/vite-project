/*
 * @Author: Hongzf
 * @Date: 2022-09-28 15:18:59
 * @LastEditors: Hongzf
 * @LastEditTime: 2022-09-28 15:35:37
 * @Description:
 */
import { defineComponent, ref } from 'vue';
export default defineComponent({
    // 这⾥的setup函数返回值是⼀个函数，就是我们所说的render函数。
    // render函数返回h函数的执⾏结果，h函数的第⼀个参数就是标签名
    setup(props, { slots }) {
        const title = ref('');
        let todos = ref([{ title: '学习Vue 3', done: false }]);
        // 添加任务清单
        function addTodo() {
            todos.value.push({
                title: title.value,
                done: false
            });
            title.value = '';
        }
        const tag = 'h' + props.level;
        return () => (
            <div>
                <input type="text" vModel={title.value} />
                <button onClick={addTodo}>click</button>
                <ul>
                    {todos.value.length ? (
                        todos.value.map(todo => {
                            return <li>{todo.title}</li>;
                        })
                    ) : (
                        <li>no data</li>
                    )}
                </ul>
            </div>
        );
    }
});
