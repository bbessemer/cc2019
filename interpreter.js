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

function interpretFunction(func, args) {
    var stackFrame = {}
    for (var i = 0; i < func.args.length; i++) {
        stackFrame[func.args[i].name] = args[i];
    }

    for (var i = 0; i < func.code.length; i++) {
        let statement = func.code[i];
        switch (statement.type) {
            case "VarDecl":
                if (arrLen != null) {
                    // Array stuff
                } else {
                    stackFrame[statement.name] = interpretExpr(statement.val, stackFrame);
                } break;
            case "Assignment":
                break;
            default:
                break;
        }
    }
}

function interpretExpr(expr, stackFrame) {
    if (typeof(expr) == "string") {
        return stackFrame[expr];
    } else {
        switch (expr.type) {
            case "Integer":
                return expr.value;
            case "Add":
                if (expr.op == "+") {
                    return interpretExpr(expr.lhs) + interpretExpr(expr.rhs);
                } else {
                    return interpretExpr(expr.lhs) - interpretExpr(expr.rhs);
                }
            case "Mult":
                if (expr.op == "*") {
                    return interpretExpr(expr.lhs) * interpretExpr(expr.rhs);
                } else {
                    return (interpretExpr(expr.lhs) / interpretExpr(expr.rhs)) | 0;
                }
            default:
                return null;
        }
    }
}
