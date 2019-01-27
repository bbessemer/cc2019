let addText = `
int add(int a, int b)
{
    int x = a + b;
    return x;
}`

function error(msg) {
    console.log(msg);
}

function runCode(text, funcName, args) {
    text = text.replace(/\/\/.*\n/g, "\n")
    text = text.replace(/\/\*.*\*\//g, "")
    var program = parser.parse(text);
    for (var i = 0; i < args.length; i++) {
        args[i] = { type: "Integer", val: args[i] };
    }
    var stackFrame = { _animObject: NewStackFrame(funcName) };
    interpretFunc(program[funcName], args, stackFrame);
    //runAnims();
}

function interpretFunc(func, args, stackFrame) {
    for (var i = 0; i < func.args.length; i++) {
        stackFrame[func.args[i].name.name] = args[i];
    }

    return interpretBlock(func.code, stackFrame);
}

function interpretBlock(code, stackFrame) {

    function interpretIf(code) {
        if (interpretExpr(statement.cond, stackFrame).val) {
            var rv = interpretBlock(statement.ifCode, stackFrame)
            if (rv != null) return rv;
        } else {
            if (Array.isArray(statement.elseCode)) {
                var rv = interpretBlock(statement.ifCode, stackFrame)
                if (rv != null) return rv;
            } else {
                var rv = interpretIf(statement.elseCode);
                if (rv != null) return rv;
            }
        }
    }

    function interpretStatement(statement) {
        if (statement.type == "VarDecl") {
            stackFrame[statement.name.name] = interpretExpr(statement.val);
        } else if (statement.type == "Assignment") {
            if (typeof(stackFrame[statement.name.name]) == "undefined") {
                error("Variable " + statement.name.name + " is not defined.");
            } else {
                stackFrame[statement.lhs.name] = interpretExpr(statement.rhs)
            }
        } else if (statement.type == "Expression") {
            interpretExpr(statement.val, stackFrame);
        } else if (statement.type == "IncDec") {
            if (statement.op == "++") { stackFrame[statement.name.name]++; }
            else if (statement.op == "--") { stackFrame[statement.name.name]--; }
        } else if (statement.type == "Return") {
            return interpretExpr(statement.val, stackFrame);
        } else if (statement.type == "IfElse") {
            var rv = interpretIf(statement);
            if (rv != null) return rv;
        } else if (statement.type == "While") {
            while (interpretExpr(statement.cond, stackFrame).val) {
                var rv = interpretBlock(statement.code);
                if (rv != null) return rv;
            }
        } else if (statement.type == "For") {
            for (interpretStatement(statement.init);
                 interpretExpr(statement.cond).val;
                 interpretStatement(statement.step))
            {
                var rv = interpretBlock(statement.code);
                if (rv != null) return rv;
            }
        }
    }

    for (var i = 0; i < code.length; i++) {
        interpretStatement(code[i]);
    }
}

function interpretExpr(expr, stackFrame) {
    if (expr == null) return null;
    else if (expr.type == "Integer") {
        return expr;
    } else if (expr.type == "Symbol") {
        return { type: "Integer", val: stackFrame[expr.name] }
    } else if (expr.type == "Add") {
        console.log(lhs, rhs);
        var lhs = interpretExpr(expr.lhs, stackFrame);
        var rhs = interpretExpr(expr.rhs, stackFrame);
        if (typeof(lhs.val) !== "number" || typeof(rhs.val) !== "number") {
            error("Cannot add a non-number.");
            return null;
        }

        if (expr.op == "+") return { type: "Integer", val: lhs + rhs }
        else return { type: "Integer", val: lhs - rhs }
    } else if (expr.type == "Mult") {
        var lhs = interpretExpr(expr.lhs, stackFrame);
        var rhs = interpretExpr(expr.rhs, stackFrame);
        if (typeof(lhs.val) !== "number" || typeof(rhs.val) !== "number") {
            error("Cannot multiply a non-number.");
            return null;
        }

        if (expr.op == "*") return { type: "Integer", val: lhs * rhs }
        else return { type: "Integer", val: lhs / rhs }
    } else if (expr.type == "Compare") {
        var lhs = interpretExpr(expr.lhs, stackFrame);
        var rhs = interpretExpr(expr.rhs, stackFrame);
        if (typeof(lhs.val) !== "number" || typeof(rhs.val) !== "number") {
            error("Cannot compare a non-number.");
            return null;
        }

        switch (expr.op) {}
    } else if (expr.type == "FnCall") {
        return interpretFunc(functions[expr.func.name.name], expr.args, stackFrame);
    }
}
