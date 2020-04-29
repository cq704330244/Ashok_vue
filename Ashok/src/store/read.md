### state

computed: {
...mapState({
userInfo: state => state.login.userInfo // 将 `this.userInfo` 映射为 `this.$store.state.login.userInfo`
})
}

### mutation

#### 创建

mutations: {
increment (state,playload) {
state.count++
}
}

#### 使用

methods: {
...mapMutations({
add: 'increment' // 将 `this.add(playload)` 映射为 `this.$store.commit('increment',playload)`
})
}

### getter

#### 创建

getters: {
doneTodos: state => {
return state.todos.filter(todo => todo.done)
}
}

#### 使用

computed: {
...mapGetters({
// 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
doneCount: 'doneTodosCount'
})
}

### action

#### 创建

context:{
commit, state, getter,dispatch
}
actions: {
increment (state || context ,playload) {
state.xxx=xxx
}
}

#### 使用

methods: {
...mapActions([
'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
]),
...mapActions({
add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
})
}
