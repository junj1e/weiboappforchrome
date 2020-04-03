
let windId;
let screenWidth;
let screenHeight;
const URL = 'https://m.weibo.cn/beta/'

chrome.system.display.getInfo(screenInfo => {
    // chrome.extension.getBackgroundPage().console.log("screenInfo",screenInfo)
    screenWidth = screenInfo[0].bounds.width;
    screenHeight = screenInfo[0].bounds.height;
})

chrome.browserAction.onClicked.addListener(function () {
    chrome.windows.getAll((windowsList) => {
        const app = windowsList.find(item => item.id === windId)
        // chrome.extension.getBackgroundPage().console.log("app",app)
        if (app) {
            if (app.state === 'minimized') {
                chrome.windows.update(windId, {
                    state: "normal"
                })
            } else if (app.state === 'normal') {
                chrome.windows.update(windId, {
                    state: "minimized"
                })
            }
        } else {
            chrome.windows.create({
                url: URL,
                type: 'popup',
                left:screenWidth,
                top:Number((screenHeight-900)/2),
                width: 400,
                height: 900,
                focused: true,
            }, function (window) {
                windId = window.id;
                // chrome.extension.getBackgroundPage().console.log("window",window)
            });
        }
    })


});