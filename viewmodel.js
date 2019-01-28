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
        selected = MakeDummyFrameItem("", elem.val, 0, 0);
    }
    console.log(selected)
    var {x, y} = GetStackItemXY(selected)
    ClonedStackItemGoesTo(selected, x, y - 20);
    currentOperands.push(selected);
    currentResult = selected;
}

function getRectCenter (elemId) {
    var rect = document.getElementById(elemId).getBoundingClientRect();
    rect.x -= VisualizerMainElement.getBoundingClientRect().left;
    rect.y -= VisualizerMainElement.getBoundingClientRect().top;
    return {
        x: rect.left + rect.width * 0.25,
        y: rect.top + rect.height * 0.25
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
    console.log(currentOperands, signCoords);
    ClonedStackItemGoesTo(currentOperands[0], signCoords.x, signCoords.y);
    ClonedStackItemGoesTo(currentOperands[1], signCoords.x, signCoords.y);
    setTimeout(() => {
        currentResult = MakeDummyFrameItem("", result.val, signCoords.x, signCoords.y)
        console.log(currentResult)
        currentOperands[0].remove();
        currentOperands[1].remove();
    }, 400)
}

this.animateVarDecl = (symbol, value, stackFrame) => {
    var frameItem = NewFrameItem(stackFrame._animObject, symbol.name);
    frameItem.valuetext_element.innerHTML = "";
    frameItems[symbol.name] = frameItem;
    if (value != null) {
        animateAssign(symbol);
    }
}

this.animateAssign = (symbol) => {
    var dest = frameItems[symbol.name].container_element;
    console.log(frameItems)
    console.log(dest)
    console.log(symbol)
    var {x, y} = GetStackItemXY(dest);
    console.log(currentResult)
    ClonedStackItemGoesTo(currentResult, x, y);
}

this.animateArgDecl = (symbol, value, stackFrame) => {
    var frameItem = NewFrameItem(stackFrame._animObject, symbol.name);
    frameItem.valuetext_element.innerHTML = value.val;
    frameItems[symbol.name] = frameItem;
}

var animator;

this.runAnims = () => {
    var len = anims.length;
    console.log(anims)
    var i = 0;
    var interval = setInterval(() => {
        if (i >= len) clearInterval(interval);
        anims[i++]();
    }, 500)

	// a way to do this without counting
    /*var interval = setInterval(() => {
		try
		{
			var anim = anims.shift();
			anim();
		}
		catch (whocares)
		{
			clearInterval(interval);
		}
    }, 500)*/
}

})();
