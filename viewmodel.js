var anims = [];

function animateVarDecl(name, value, stackFrame) {
    console.log(name, value, stackFrame)
    var frameItem = NewFrameItem(stackFrame._animObject, name);
    stackFrame[name] = value;
    stackFrame[name].frameItem = frameItem;
}

function animateAssign(lhs, rhs, stackFrame) {
    if (rhs.type == "Symbol") {
        var newThing = CloneStackItem(rhs.frameItem);
        var {x, y} = GetStackItemXY(lhs.frameItem.valuetext_element);
        ClonedStackItemGoesTo(newThing, x, y);
    } else {
        lhs.frameItem.valuetext_element.innerHTML = rhs.val;
    }
}

function animateSelect(expr, stackFrame) {
    return expr;
}

function animateAdd(lhs, rhs, stackFrame) {

}

function animateSubtract(lhs, rhs, stackFrame) {}

function animateMultiply(lhs, rhs, stackFrame) {}

function animateDivide(lhs, rhs, stackFrame) {}

function animateCompare(op, lhs, rhs, stackFrame) {}

function animateFnCall(fnName, args, stackFrame) {}

function animateReturn(expr, stackFrame) {}

function runAnims() {
    var i = 0;
    setInterval(() => anims[i++](), 500)
}
