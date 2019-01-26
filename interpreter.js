var testAddFunc = {
    "retType": "int",
    "name": "add",
    "args": [
        {
            "type": "int",
            "name": "a"
        },
        {
            "type": "int",
            "name": "b"
        }
    ],
    "code": [
        {
            "type": "VarDecl",
            "varType": "int",
            "name": "x",
            "arrLen": undefined,
            "val": {
                "type": "Add",
                "op": "+",
                "lhs": "a",
                "rhs": "b"
            }
        }
    ]
}

function interpretFunc(func, args) {
    var stackFrame = {};
    for (var i = 0; i < func.args.length; i++) {
        stackFrame[func.args[i].name] = args[i];
        animateVarDecl(func.args[i].name, args[i]);
    }

    for (var i = 0; i < func.code.length; i++) {
        let statement = func.code[i];

        if (statement.type == "VarDecl") {
            stackFrame[statement.name] = animateVarDecl(statement.name, interpretExpr(statement.val, stackFrame))
        } else if (statement.type == "Assignment") {
            if (typeof(stackFrame[statement.name]) == "undefined") {
                error("Variable " + statement.name + " is not defined.");
            } else {
                stackFrame[statement.name] = animateAssign(statement.name, interpretExpr(statement.val, stackFrame));
            }
        }
    }
}

function interpretExpr(expr, stackFrame) {
    if (expr.type == "Integer") {
        return animateSelect(expr);
    } else if (expr.type == "Add") {
        var lhs = interpretExpr(expr.lhs, stackFrame);
        var rhs = interpretExpr(expr.rhs, stackFrame);
        if (typeof(lhs.val) !== "number" || typeof(rhs.val) !== "number) {
            error("Cannot add a non-number.");
            return null;
        }

        if (expr.op == "+") return animateAdd(lhs, rhs);
        else return animateSubtract(lhs, rhs);
    } else if (expr.type == "Mult") {
        var lhs = interpretExpr(expr.lhs, stackFrame);
        var rhs = interpretExpr(expr.rhs, stackFrame);
        if (typeof(lhs.val) !== "number" || typeof(rhs.val) !== "number) {
            error("Cannot add a non-number.");
            return null;
        }

        if (expr.op == "*") return animateMultiply(lhs, rhs);
        else return animateDivide(lhs, rhs);
    }
}
