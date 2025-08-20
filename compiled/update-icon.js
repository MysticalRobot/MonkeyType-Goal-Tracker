console.log('update-icon loaded');
var body = document.body;
var action = 'updateIcon';
var callback = function (mutationList) {
    for (var _i = 0, mutationList_1 = mutationList; _i < mutationList_1.length; _i++) {
        var mutation = mutationList_1[_i];
        mutation.addedNodes.forEach(function (addedNode) {
            if (!(addedNode instanceof HTMLLinkElement))
                return;
            if (addedNode.getAttribute('id') !== 'nextTheme')
                return;
            var style = window.getComputedStyle(body, '::selection');
            var mainColor = style.backgroundColor.split(' ').join('');
            var backgroundColor = style.color.split(' ').join('');
            console.log(mainColor, backgroundColor);
            browser.runtime.sendMessage({ action: action, mainColor: mainColor, backgroundColor: backgroundColor })
                .catch(function (error) {
                console.error('failed to update icon', error);
            });
        });
    }
};
var mtObserver = new MutationObserver(callback);
var config = { childList: true };
mtObserver.observe(body, config);
