# Turtle Racing!!

from turtle import Turtle, Screen
import random

is_race_on = False
screen = Screen()
# use keyword arguments instead of commenting where possible
screen.setup(width=500, height=400)
user_bet = screen.textinput(
    title="Make your bet", prompt="Which turtle will win the race? Enter a color: ")
colors = ["red", "orange", "yellow", "green", "purple"]
y_positions = [-70, -40, -10, 20, 50, 80]
all_turtles = []

for turtle_index in range(0, 5):
    new_turtle = Turtle(shape="turtle")
    # when we create a new turtle object, we can initialize it with shape already set up
    # tim.shape = ("turtle") instead of this line!!

    new_turtle.color(colors[turtle_index])
    new_turtle.penup()
    new_turtle.goto(x=-230, y=y_positions[turtle_index])
    # understanding the turtle coordinate system (where the center is (0,0)
    # given our height of 400, the highest point on the y-axis will be 200 and the lowest -200
    # same on x axis, the x-axis goes to +250 (rt side) and from 0 to -250 (left side)
    all_turtles.append(new_turtle)

print(all_turtles)


if user_bet:
    is_race_on = True

while is_race_on:
    for turtle in all_turtles:
        if turtle.xcor() > 230:
            winning_color = turtle.pencolor()
            is_race_on = False
            if winning_color == user_bet:
                print(f"You won! The {winning_color} turtle is the winner!")
            else:
                print(f"You lost. The {winning_color} turtle is the winner!")

        random_distance = random.randint(0, 10)
        turtle.forward(random_distance)

        screen.exitonclick()
