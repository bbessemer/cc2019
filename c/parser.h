#ifndef PARSER_H_INCLUDED
#define PARSER_H_INCLUDED

#define VariableType_Int 1

typedef struct
{
	char* name;
	char type_id;
	int first_character_position; // where does variable declaration start, from start of source code string
}
VariableDeclaration;

typedef struct
{
	char* name;
	int arguments_count;
	VariableDeclaration arguments_array;
	int first_character_position; // where does func def start, from start of source code string
}
FunctionDefinition;

typedef struct
{
	int functions_count;
	FunctionDefinition* functions_array;
}
FunctionDefinitionList;

typedef struct
{
	//int line_number;
	int offending_character_position; // index of character from start of entire source code string
	char* description; // will have been asprintf'ed, so free it when done
}
CompilationErrorInfo;

typedef struct
{
	char compilation_success;
	union
	{
		CompilationErrorInfo compilation_error_info; // relevant if compilation_success is false
		FunctionDefinitionList function_definition_list; // relevant if compilation_success is true
	};
}
ParseResult;

#endif // PARSER_H_INCLUDED
