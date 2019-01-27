var lessons =  [
	{
		"title": "Syntax",
		"slides": [
			{
				"title": "introduction",
				"content": [
					"This is an example of a statement. For this lesson, we are going to go through the grammar (i.e. syntax) of this simple statement.",
					"But first, let's address this statement in halves."
				],
				"code": "int x = 1;"
			},
			{
				"title": "Variables",
				"content": [
					"Just like in math, the `x` is a variable; a placeholder for a value."
				],
				"code": "int x;"
			},
			{
				"title": "Types",
				"content": [
					"The `int` designates that the `data type` of variable `x` is an integer and `x`can store integer values.",
					"There are other data types that we can make `x`, but that will be covered later"
				]
			},
			{
				"title": "Declarations",
				"content": [
					"This statement is known as a `declaration`. It simply declares that an integer variable named 'x' exists, no value has been assigned to it."
				]
			},
			{
				"title": "Assignments",
				"content": [
					"The equal sign, just like in math, represents assigning a value to the varibale; in this case, 4."
				],
				"code": "x = 4;"
			},
			{
				"title": "Semicolons",
				"content": [
					"Most programming languages require that statements end with a semicolons."
				]
			},
			{
				"title": "Definitions",
				"content": [
					"The latter half of this statement is known as the `definition`, i.e. defining the value of the variable."
				]
			},
			{
				"title": "Conclusion",
				"content": [
					"By combinding the declaration and the definiton, we are able to construct a simple declarative statement."
				],
				"code": "int x = 4;"
			}
		]
	},
	{
		"title": "Data Types",
		"slides": [
			{
				"title": "Introduction",
				"content": [
					"In the previous lesson we learned about our first data type, `int`. Here we will learn about other data types."
				]
			},
			{
				"title": "int",
				"content": [
					"This declaration is the same as the last lesson; `int` stores integer values."
				],
				"code": "int a = 4;"
			},
			{
				"title": "float",
				"content": [
					"`float` stores decimal values."
				],
				"code": "float b = 9.8;"
			},
			{
				"title": "char",
				"content": [
					"Variables with the data type `char` store a single alpha-numeric character. That alpha-numeric character is required to be encased in single quotations."
				],
				"code": "char c = 'A';"
			},
			{
				"title": "bool",
				"content": [
					"`bool` variables store only two values: true and false. This makes them useful for implementing logic."
				],
				"code": "bool d = true;"
			}
		]
	},
	{
		"title": "Practice",
		"answers": [
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
]
