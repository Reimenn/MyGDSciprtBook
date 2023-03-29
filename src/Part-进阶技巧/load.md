# load

之前在学习 PackedScene 的时候用过 load 方法，知道它可以从文件中读取一个 PackedScene。

但实际上，load 方法可以读取任何 Godot 认识的文件，例如脚本、图片、声音以及PackedScene等等。

例如加载图片并显示在 TextureRect 节点上：

```gdscript
$"TextureRect".texture = load("res://你的图片路径")
```

或者加载一段声音并播放：

```gdscript
$"AudioStreamPlayer".stream = load("res://你的音频路径")
$"AudioStreamPlayer".play()
```
