Program = Function*

Function
	= nameType:Declaration _ "(" argList:ArgList ")" _ code:Block _ {
    	return {
        	retType: nameType.type,
            name: nameType.name,
            args: argList,
            code
        }
    }
    
ArgList = first:Declaration rest:((_ "," _ Declaration)*) {
	for (var i = 0; i < rest.length; i++) {
    	rest[i] = rest[i][3];
    }
	return [first].concat(rest);
}

Block = "{" _ statements:(ControlBlock / Statement)* _ "}" { return statements; }

Statement = statement:CoreStatement _ ";" _ { return statement; }

CoreStatement = statement:(VarDecl / Return / IncDec / Assignment
	/ Expression / "")
{
	return statement;
}

Return = "return" _ expr:Expression {
	return { type: "Return", expr };
}

ControlBlock = IfElse / While / For

IfElse = "if" _ "(" _ cond:Expression _ ")" _ ifCode:Block
    elseCode:(_ "else" _ (ControlBlock / Block))? _
{
    return { type: "IfElse", cond, ifCode, elseCode: elseCode[3] };
}

While = "while" _ "(" _ cond:Expression _ ")" _ code:Block _ {
    return { type: "While", cond, code }
}

For = "for" _ "(" _ init:Statement _ cond:Expression _ ";" _
    step:CoreStatement _ ")" _ code:Block _
{
    return { type: "For", init, cond, step, code };
}


VarDecl = decl:Declaration val:(_ "=" _ Expression)? {
	if (val) { val = val[3]; }
    return {
        type: "VarDecl",
    	varType: decl.type,
        name: decl.name,
        arrLen: decl.arr,
        val
    }
}
    

Assignment = lhs:Indexed _ "=" _ rhs:Expression {
	return {
    	type: "Assignment",
    	lhs, rhs
    }
}

IncDec = lhs:Indexed op:("++" / "--") { return { type: "IncDec", op, lhs } }

Declaration = type:Type _ name:Symbol _ arr:("[" _ Integer? _ "]")? {
	if (arr) { return { type, name, arr: arr[2] } }
    else return { type, name }
}

Type = "int" / "char"

Expression = Compare

Compare = lhs:Add _ rhs:(_ CompOp  _ rhs:Add)? {
    if (rhs) { return { type: "Compare", op: rhs[1], lhs, rhs: rhs[3] } }
    else return lhs;
}
CompOp = "==" / "!=" / ">" / "<" / ">=" / "<="

Add = lhs:Mult rhs:(_ AddOp  _ rhs:Add)? {
    if (rhs) { return { type: "Add", op: rhs[1], lhs, rhs: rhs[3] } }
    else return lhs;
}

Mult = lhs:Primary rhs:(_ MultOp _ rhs:Mult)? {
	if (rhs) { return { type: "Mult", op: rhs[1], lhs, rhs: rhs[3] } }
    else return lhs;
}

AddOp = "+" / "-"
MultOp = "*" / "/"

Primary = FnCall / Factor

FnCall
	= func:Symbol _ "(" _ firstArg:Expression _ restArgs:(_ "," _ Expression)*")" {
	for (var i = 0; i < restArgs.length; i++) {
    	restArgs[i] = restArgs[i][3];
    }
    return {
    	type: "FnCall",
    	func,
        args: [firstArg].concat(restArgs)
    }
}

Factor = expr:(("(" _ Expression _ ")") / Indexed / Literal) {
	if (expr[0] === "(") { return expr[2]; }
    else return expr;
}

Indexed = name:Symbol _ rhs:("[" _ Expression _ "]")? {
	if (rhs) return { type: "Indexed", name, index: rhs[2] }
    else return name;
}

Symbol = [A-Za-z_][A-Za-z0-9_]* { return text(); }

Literal = Integer / String / Char

Integer = [0-9]+ { return { type: "Integer", value: parseInt(text()) } }

String = "\"" str:([^\n"]*) "\"" { return { type: "String", value: str.join('') } }

Char = "'" char:[^\n] "'" { return { type: "Char", value: char }; }

_ = [ \n\t\r]*

