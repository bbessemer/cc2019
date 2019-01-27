{
	"lessons": [
		{
			"title": "Environment",
			"script": {
				"overview": [
					"This is the prompt. It helps to keep in mind what you are trying to learn.",
					"The code frame is where you can read and write code. It also has effects to emphasize parts of the code.",
					"The visualizer frame gives a graphical representation of everything your code does.",
					"When going through a lesson or executing code, take care to see how it is being visualized.",
					"These buttons allow you execute and step through your code. The visualizer frame will give you graphical feedback on what each line is doing."
				]
			}
		},
		{
			"title": "Syntax",
			"script": {
				"code": [
					"int x",
					" = 4",
					";"
				],
				"introduction": [
					"This is an example of a statement. For this lesson, we are going to go through the grammar (i.e. syntax) of this simple statement.",
					"But first, let's address this statement in halves."
				],
				"variable": [
					"`x`, just like in math, is a variable. It's a placeholder for whatever value we assign to it."
				],
				"type": [
					"The `int` designates that the `data type` of variable `x` is an integer, and can store integer values.",
					"There are other types that we can make `x`, but that will be covered later"
				],
				"declaration": [
					"This statement is known as a `declaration`. It simply declares that an integer variable named 'x' exists, no value has been assigned to it."
				],
				"assignment": [
					"The equal sign, just like in math, represents assigning a value to the varibale; in this case, 4."
				],
				"semicolon": [
					"Most programming languages require that statements end with a semicolons."
				],
				"definition": [
					"The latter half of this statement is known as the `definition`, i.e. defining the value of the variable."
				],
				"conclusion": [
					"By combinding the declaration and the definiton, we are able to construct a simple declarative statement."
				]
			}
		},
		{
			"title": "Data Types",
			"scripts": {
				"code": [
					"int x = 4;",
					"float x = 4.0;",
					"char x = 'A';",
					"bool x = true;"
				],
				"introduction": [
					"In the previous lesson we learned that `int` is a data type to use integers. Here we will go over other data types."
				],
				"int": [
					"`int` stores integer values."
				],
				"float": [
					"`float` stores decimal values."
				],
				"char": [
					"`char` variables store a single alpha-numeric character."
				],
				"bool": [
					"The `bool`data type only has two values; true or false. This makes them useful for writing logic in our program."
				]
			},
			"practice": {
				"code": [
					"floatvelocity;",
					"char",
					"intwheels=4;",
					"boolflying=false;"
				],
				"problems": [
					"Declare a float called `velocity'.",
					"What data type would be most useful for a teacher to store letter grades",
					"Declare an int called `wheels` with the number of wheels a car has",
					"Use a boolean variable called `flying' to store whether or not you are flying"
				]
			}
		}
	]
}
