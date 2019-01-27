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
        animateVarDecl(func.args[i].name.name, args[i], stackFrame);
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
            animateVarDecl(statement.name.name,
                interpretExpr(statement.val, stackFrame), stackFrame)
            stackFrame[statement.name.name] = animateAssign(stackFrame[statement.name.name],
                interpretExpr(statement.val, stackFrame), stackFrame);
        } else if (statement.type == "Assignment") {
            if (typeof(stackFrame[statement.name.name]) == "undefined") {
                error("Variable " + statement.name.name + " is not defined.");
            } else {
                stackFrame[statement.name.name] = animateAssign(statement.name.name,
                    interpretExpr(statement.val, stackFrame), stackFrame);
            }
        } else if (statement.type == "Expression") {
            interpretExpr(statement.val, stackFrame);
        } else if (statement.type == "IncDec") {
            if (statement.op == "++") { animateInc(statement.name.name, 1, stackFrame); }
            else if (statement.op == "--") { animateInc(statement.name.name, -1, stackFrame); }
        } else if (statement.type == "Return") {
            return animateReturn(interpretExpr(statement.val, stackFrame));
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
        return animateSelect(expr, stackFrame);
    } else if (expr.type == "Symbol") {
        return animateSelect(expr, stackFrame);
    } else if (expr.type == "Add") {
        console.log(lhs, rhs);
        var lhs = interpretExpr(expr.lhs, stackFrame);
        var rhs = interpretExpr(expr.rhs, stackFrame);
        if (typeof(lhs.val) !== "number" || typeof(rhs.val) !== "number") {
            error("Cannot add a non-number.");
            return null;
        }

        if (expr.op == "+") return animateAdd(lhs, rhs, stackFrame);
        else return animateSubtract(lhs, rhs, stackFrame);
    } else if (expr.type == "Mult") {
        var lhs = interpretExpr(expr.lhs, stackFrame);
        var rhs = interpretExpr(expr.rhs, stackFrame);
        if (typeof(lhs.val) !== "number" || typeof(rhs.val) !== "number") {
            error("Cannot multiply a non-number.");
            return null;
        }

        if (expr.op == "*") return animateMultiply(lhs, rhs, stackFrame);
        else return animateDivide(lhs, rhs, stackFrame);
    } else if (expr.type == "Compare") {
        var lhs = interpretExpr(expr.lhs, stackFrame);
        var rhs = interpretExpr(expr.rhs, stackFrame);
        if (typeof(lhs.val) !== "number" || typeof(rhs.val) !== "number") {
            error("Cannot compare a non-number.");
            return null;
        }

        return animateCompare(expr.op, lhs, rhs, stackFrame);
    } else if (expr.type == "FnCall") {
        var stackFrame = { _animObject: NewStackFrame(expr.func) }
        return interpretFunc(functions[expr.func.name.name], expr.args, stackFrame);
    }
}
