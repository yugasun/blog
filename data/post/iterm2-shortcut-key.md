---
title: iTerm2 快捷键集锦
desc: iTerm2 快捷键集锦，持续更新中
reward: true
date: 2017-11-15 18:37:38
summary: 'iTerm2 快捷键集锦，持续更新中'
tags:
  - iTerm
  - 程序员自我修养
---

> 持续更新中~

### 标签相关快捷键

```
新建标签：Cmd + t

关闭标签：Cmd + w

切换标签：Cmd + 数字 Cmd + 左右方向键

切换全屏：Cmd + enter

```

### 分屏相关快捷键

```
垂直分屏：Cmd + d

水平分屏：Cmd + shift + d

切换屏幕：Cmd + option + 方向键 Cmd + [ 或 Cmd + ]
```

### 不用鼠标也可以选择文本 (Cmd + F, Tab)

iTerm 提供了一种脱离鼠标也可以选择文本的机制，叫做 `搜索 + Tab`，不要小看这个细微的小功能，它能让你保持专注。我们在使用命令行的时候，经常会要去选择命令行中的文本复制粘贴。就比如说 `ping` 命令吧，我们用 ping 命令来获取一个域名解析后的 IP:

```bash
# Yuga @ Yuga-xuetangx in ~ [17:02:30]
$ ping yugasun.com
PING yugasun.com (47.95.247.149): 56 data bytes
64 bytes from 47.95.247.149: icmp_seq=0 ttl=50 time=6.875 ms
--- yugasun.com ping statistics ---
2 packets transmitted, 2 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 6.875/7.383/7.892/0.509 ms
```

相信大家都有过这样的体验： `ping` 命令得到 `IP` 后，我们想要把它复制下来，我们只能拿起鼠标，然后精确的选中这段 `IP`，然后把它复制出来。频繁的在键盘和鼠标之间切换，很会影响我们的注意力。

iTerm 给我们提供了一个好的方法，我们先按下 `Cmd + F` 调出搜索框，然后输入这段 `IP` 的前缀，比如 `47`，我们用搜索的方式找到了这段文本，接下来神奇的事情就要发生啦，我们这时按下 `Tab` 键，我们发现 `iTerm` 自动帮我们把这段 `IP` 选中了，并且自动的帮我们复制到了剪贴板中

### 剪切板历史记录 (Cmd + Shift + H)

这个也是一个很方便的特性，iTerm 能够将我们在使用命令行过程中所有的复制粘贴操作保存下来，随后我们在任何地方按下 `Cmd + Shift + H` 就可以我们所有复制粘贴内容的列表

### 快照返回 (Cmd + Option + B)

这个功能称得上是 iTerm 又一杀器，比如你在下午三点的时候执行了一些命令，然后过了几个小时，你又执行了其他的命令。如果这时候你想再回去看看下午三点那会儿你做了什么怎么办呢，答案就是用 iTerm 的快照返回功能。按下 `Cmd + Option + B` 就会在界面上显示一个时间轴，这时候，我们按下键盘的左右箭头，时间轴就会自由的穿梭，这时 iTerm 上的命令行界面也随着变化成你选中的时间点的内容了。很神奇，很方便～

### 标签排列切换 (Cmd + Option + E)

我们用命令行的时候，会发现用着用着，不知不觉就打开了很多个标签，这时候，我们想在这么多标签中找一个窗口就很麻烦哦。这时候我们可以按下 `Cmd + Option + E` 键。。。又一件神奇的事情发生了，我们看到所有的标签都整齐的排列在屏幕上，并且屏幕左上角为我们展现了一个搜索框，我们可以根据需要输入我们记忆中要搜寻的内容。

### 基本其他快捷键

```
open . 在当前目录下打开finder
⌘ + return 全屏
⌘ + f 所查找的内容会被自动复制
⌘ + d 横着分屏 / ⌘ + shift + d 竖着分屏令
⌘ + / 光标位置
⌘ + r 只是换到新一屏，不会像 clear 一样创建一个空屏
ctrl + u 清除当前行
ctrl + a 到行首
ctrl + e 到行尾
ctrl + w 删除光标之前的单词
ctrl + k 删除到文本末尾
⌘ + alt + 方向键 切换屏幕(用于hotkey window)
⌘ + 方向键 切换tab
ctrl + _ Undo
ctrl + y Paste the last thing to be cut
```

### vi 快捷键

```
h               光标左移
l               光标右移
A               移动光标到当前行尾，并进入 insert 状态
0               移动光标到当前行首
i               在当前位置进入 insert 状态
a               在当前位置后进入 insert 状态
dd              删除当前行
D               删除光标之后的内容
p               粘贴刚删除的文本
u               撤销历史操作
ctrl+r          搜索历史命令
!!              执行上条命令
ctrl+X Ctrl+E   调用默认编辑器去编辑一个特别长的命令
```
