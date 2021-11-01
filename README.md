# shopee_tetris

### Script
```
# 初始化
npm install

# 开发预览
npm run dev

# 打包
npm run build

# 语法校验
npm run lint
```

### 思路阐述

##### 基本数据结构
1. Block 类生成方块，并控制方块移动
2. Game 类渲染视图，限制方块移动，记录游戏状态
3. Event 类生成方法调用 Game 类的相关方法

##### vue组件功能
1. Cell 组件就是小单元格，组合起来渲染场景
2. Menu 组件下方的按钮操作，给移动端按的
3. Scene 组件显示整体场景

##### 如何关联
主要是使用了 vue3 的 reactive API，创建一个响应式的 game 对象，调用暴露出来的方法之后，game对象更改自身的属性，然后vue劫持到了game 属性的更改，进行自动更新视图。



