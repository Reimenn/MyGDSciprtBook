# 整活：Fire

> [!warning] 编写中

本节实现玩家开火效果。

首先需要创建一个子弹 PackedScene：

![子弹PackedScene](./images/bullet.png)

子弹的代码如下：

```gdscript
extends Area2D
class_name 子弹类

var 移动速度:Vector2

func _physics_process(delta):
    position += 移动速度 * delta
```

玩家的创建代码如下：

```gdscript
var 子弹: PackedScene

func _read():
    子弹 = load("res://子弹/子弹.tscn")

func _process(delta):
	var 鼠标方向 = get_global_mouse_position() - global_position
	rotation = 鼠标方向.angle()
	if Input.is_action_just_pressed("攻击"):
		var 创建的子弹:子弹类 = 子弹.instantiate()
		创建的子弹.移动速度 = 鼠标方向.normalized() * 1000
		$"/root/".add_child(创建的子弹)
		创建的子弹.global_position = global_position
		创建的子弹.rotation = 鼠标方向.angle()
```

## 子弹清理

定时器节点如下：

![定时器属性](./images/bullet_timer.png)

连接 timeout 信号。

```gdscript
func _on_timer_timeout():
    queue_free()
```