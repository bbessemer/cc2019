function animateVarDecl(name, value, stackFrame) {
    var frameItem = NewFrameItem(stackFrame._animObject, name);
    if (value !== null) {
        frameItem.innerHTML = value.val;
    }
}
