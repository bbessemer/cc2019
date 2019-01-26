Program = Function*

Function = nameType:Declaration _ "(" argList:ArgList ")" _ Block {
    return {
       	retType: nameType.type,
        name: nameType.name,
        args: argList
    }
}
    
ArgList = first:Declaration rest:((_ "," _ Declaration)*) {
	for (var i = 0; i < rest.length; i++) {
    	rest[i] = rest[i][3];
    }
	return [first].concat(rest);
}

Block = "{" _ Statement* _ "}"

Statement = (Declaration

Declaration = type:Type _ name:Symbol { return { type, name } }

Type = "int" / "char"

Symbol = [A-Za-z_][A-Za-z0-9_]* { return text(); }

Integer = "0x"? [0-9]+ { return parseInt(text()); }

_ = [ \n\t\r]*
