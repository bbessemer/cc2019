(function () {

this.anims = [];

var currentOperands = [];
var currentResult;
var frameItems = {}

this.animateSelect = (elem, stackFrame) => {
    var selected;
    if (elem.type == "Symbol") {
        selected = CloneStackItem(frameItems[elem.name]);
    } else if (elem.type == "Integer") {
        selected = NewFrameItem(stackFrame._animObject, "");
        selected.valuetext_element.innerHTML = elem.val;
    }
    var {x, y} = GetStackItemXY(selected.valuetext_element)
    ClonedStackItemGoesTo(selected, x, y - 100);
    currentOperands.push(selected);
    currentResult = selected;
}

function getRectCenter (elemId) {
    var rect = document.getElementById(elemId).getBoundingClientRect();
    return {
        x: rect.left + rect.width * 0.5,
        y: rect.top + rect.height * 0.5
    }
}

this.animateOp = (op, result, stackFrame) => {
    var signCoords;
    switch (op) {
        case "+": signCoords = getRectCenter("PlusOp"); break;
        case "-": signCoords = getRectCenter("MinusOp"); break;
        case "*": signCoords = getRectCenter("MultOp"); break;
        case "/": signCoords = getRectCenter("DivOp"); break;
    }
    ClonedStackItemGoesTo(currentOperands[0], signCoords.x, signCoords.y);
    ClonedStackItemGoesTo(currentOperands[1], signCoords.x, signCoords.y);
    setTimeout(() => {
        currentResult = CloneStackItem(currentOperands[1]);
        currentResult.valuetext_element.innerHTML = result.val;
        currentOperands[0].valuetext_element.removeNode();
        currentOperands[1].valuetext_element.removeNode();
    }, 500)
}

this.animateArgDecl = (symbol, value, stackFrame) => {
    var frameItem = NewFrameItem(stackFrame._animObject, symbol.name);
    frameItem.valuetext_element.innerHTML = value.val;
    frameItems[symbol.name] = frameItem;
}

var animator;

this.runAnims = () => {
    var len = anims.length;
    var i = 0;
    var interval = setInterval(() => {
        if (i >= len) clearInterval(interval);
        anims[i++]();
    }, 500)
    //animator = setInterval(function () {
    //}, 500);
}

})();
