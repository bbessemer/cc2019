(function () {

let addText = `
int add(int a, int b)
{
    int x = a + b;
    return x;
}`

function error(msg) {
    console.log(msg);
}

this.runCode = (text, funcName, args) => {
    text = text.replace(/\/\/.*\n/g, "\n")
    text = text.replace(/\/\*.*\*\//g, "")
    var program = parser.parse(text);
    for (var i = 0; i < args.length; i++) {
        args[i] = { type: "Integer", val: args[i] };
    }
    var stackFrame = { _animObject: NewStackFrame(funcName) };
    interpretFunc(program[funcName], args, stackFrame);
    runAnims();
}

this.interpretFunc = (func, args, stackFrame) => {
    for (var i = 0; i < func.args.length; i++) {
        stackFrame[func.args[i].name.name] = args[i];
        let funcArg = func.args[i];
        let arg = args[i];
        anims.push(() => {
            animateArgDecl(funcArg.name, arg, stackFrame)
        })
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
            var val = interpretExpr(statement.val, stackFrame);
            stackFrame[statement.name.name] = val;
            anims.push(() => animateVarDecl(statement.name, val, stackFrame));
        } else if (statement.type == "Assignment") {
            if (typeof(stackFrame[statement.lhs.name]) == "undefined") {
                error("Variable " + statement.lhs.name + " is not defined.");
            } else {
                stackFrame[statement.lhs.name] = interpretExpr(statement.rhs, stackFrame)
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
                 interpretExpr(statement.cond, stackFrame).val;
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
        anims.push(() => animateSelect(expr, stackFrame))
        return expr;
    } else if (expr.type == "Symbol") {
        anims.push(() => animateSelect(expr, stackFrame))
        return { type: "Integer", val: stackFrame[expr.name].val }
    } else if (expr.type == "Add") {
        var lhs = interpretExpr(expr.lhs, stackFrame);
        var rhs = interpretExpr(expr.rhs, stackFrame);
        if (typeof(lhs.val) !== "number" || typeof(rhs.val) !== "number") {
            console.log(lhs, rhs);
            error("Cannot add a non-number.");
            return null;
        }
        var result;
        if (expr.op == "+") result = { type: "Integer", val: lhs.val + rhs.val }
        else result = { type: "Integer", val: lhs.val - rhs.val }
        anims.push(() => animateOp(expr.op, result, stackFrame))
        return result
    } else if (expr.type == "Mult") {
        var lhs = interpretExpr(expr.lhs, stackFrame);
        var rhs = interpretExpr(expr.rhs, stackFrame);
        if (typeof(lhs.val) !== "number" || typeof(rhs.val) !== "number") {
            error("Cannot multiply a non-number.");
            return null;
        }
        var result;
        if (expr.op == "*") result = { type: "Integer", val: lhs.val * rhs.val }
        else result = { type: "Integer", val: lhs.val / rhs.val }
        anims.push(() => animateOp(expr.op, result, stackFrame))
        return result;
    } else if (expr.type == "Compare") {
        var lhs = interpretExpr(expr.lhs, stackFrame);
        var rhs = interpretExpr(expr.rhs, stackFrame);
        if (typeof(lhs.val) !== "number" || typeof(rhs.val) !== "number") {
            error("Cannot compare a non-number.");
            return null;
        }
        var resultVal;
        switch (expr.op) {
            case "==": resultVal = (lhs.val == rhs.val); break;
            case "!=": resultVal = (lhs.val != rhs.val); break;
            case ">": resultVal = (lhs.val > rhs.val); break;
            case "<": resultVal = (lhs.val < rhs.val); break;
            case ">=": resultVal = (lhs.val >= rhs.val); break;
            case "<=": resultVal = (lhs.val <= rhs.val); break;
        }
        var result = { type: "Integer", val: (resultVal ? 1 : 0)}
        anims.push(() => animateOp(expr.op, result, stackFrame));
    } else if (expr.type == "FnCall") {
        return interpretFunc(functions[expr.func.name.name], expr.args, stackFrame);
    }
}

})();
