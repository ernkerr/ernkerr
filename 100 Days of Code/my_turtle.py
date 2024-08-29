# import another_module
# print(another_module.another_variable)

# import turtle
# timmy = turtle.Turtle()

from turtle import Turtle, Screen

timmy = Turtle()
timmy.shape("turtle")
timmy.color("DarkSeaGreen4")
timmy.forward(100)
timmy.left(120)
timmy.forward(100)
timmy.left(120)
timmy.forward(100)
print(timmy)
# returns <turtle.Turtle object at 0x105dcd1f0>

my_screen = Screen()
print(my_screen.canvheight)
my_screen.exitonclick()

# directory:
# cd "/Users/ern/Documents/ernkerr/100 Days of Code"
# python3 my_turtle.py
