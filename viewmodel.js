function animateVarDecl(name, value, stackFrame) {
    var frameItem = NewFrameItem(stackFrame._animObject, name);
    if (value !== null) {
        frameItem.innerHTML = value.val;
    }
}

function animateAssign(lhs, rhs, stackFrame) {}

function animateSelect(expr, stackFrame) {}

function animateAdd(lhs, rhs, stackFrame) {}

function animateSubtract(lhs, rhs, stackFrame) {}

function animateMultiply(lhs, rhs, stackFrame) {}

function animateDivide(lhs, rhs, stackFrame) {}

function animateCompare(op, lhs, rhs, stackFrame) {}

function animateFnCall(fnName, args, stackFrame) {}

function animateReturn(expr, stackFrame) {}
