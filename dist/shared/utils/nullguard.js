const getErrorDetails = (error) => {
    var _a;
    const stack = (_a = error.stack) === null || _a === void 0 ? void 0 : _a.split("\n");
    if (!stack) {
        return {
            message: error.message,
            type: error.name,
            fileName: '',
            functionName: '',
            lineNumber: -1,
        };
    }
    const lineNumberMatch = stack[1].match(/:(\d+):\d+/);
    const lineNumber = lineNumberMatch ? parseInt(lineNumberMatch[1], 10) : -1;
    const functionNameMatch = stack[1].match(/^(\w+)/);
    const functionName = functionNameMatch ? functionNameMatch[1] : '';
    const fileNameMatch = stack[1].match(/\/([^\/]+\.js)/);
    const fileName = fileNameMatch ? fileNameMatch[1] : '';
    return {
        message: error.message,
        type: error.name,
        fileName,
        functionName,
        lineNumber,
    };
};
const checkNull = (element, elementName) => {
    const error = Error();
    const response = getErrorDetails(error);
    if (element === null || element === undefined) {
        response.message = `${elementName} not found`;
        console.log(response);
        return false;
    }
    if (element instanceof HTMLElement) {
        return true;
    }
    if (element instanceof NodeList || Array.isArray(element)) {
        if (element.length === 0) {
            response.message = `${elementName} is empty`;
            console.log(response);
            return false;
        }
        return true;
    }
    if (typeof element === 'string' || typeof element === 'number' || typeof element === 'boolean') {
        return element !== '';
    }
    response.message = `${elementName} is of an unsupported type`;
    console.log(response);
    return false;
};
export default checkNull;
