InteractiveDataDisplay = InteractiveDataDisplay || {};

(function() {
    if (!ko) {
        console.log("Knockout was no found, please load Knockout first");
    } else {
        
        InteractiveDataDisplay.KnockoutBindings = new (function() {
            var that = this;
            var plotBinding = function(element, valueAccessor, allBindings, viewModel, bindingContext) {	
                var plotAttr = element.getAttribute("data-idd-plot") || element.parentElement.getAttribute("data-idd-plot");
                if (that.hasOwnProperty(plotAttr)) {
                    that[plotAttr](element, valueAccessor, allBindings, viewModel, bindingContext);
                } else {
                    throw new Error("There is no bindings registered for " + plotAttr + " plot");
                }
            }
            this.registerPlotBinding = function(plotName, binding, array) {
                this[plotName] = binding;
                array.forEach(function(val) {
                    ko.bindingHandlers[val] = {update: plotBinding};
                });

            }
        })();

        
        ko.bindingHandlers.iddPlotName = {
            update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
                var value = valueAccessor();
                var unwrappedName = ko.unwrap(value);

                var plotAttr = element.getAttribute("data-idd-plot");
                if (plotAttr != null) {
                    if (typeof element.plot != 'undefined') {
                        element.plot.name = unwrappedName;
                    }
                    else { //the case when the element was not yet initialized and not yet bound to the logical entity (plot)
                        //storing the data in the DOM. it will be used by IDD during IDD-initializing of the dom element

                        //saving plot name in  attribute: will be picked up by initialization
                        element.setAttribute("data-idd-name", unwrappedName);

                    }
                }
            }
        };
    }
})()

if (ko) { //add Knockout bindings. Requires that IDD loaded after Knockout
    ko.bindingHandlers.iddBarNamesOnAxis = {
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var value = valueAccessor();
            var unwrappedNames = ko.unwrap(value);

            var plotAttr = element.getAttribute("data-idd-plot");
            if (plotAttr != null) {
                if (typeof element.plot != 'undefined') {
                    var ticks = [];
                    var len = unwrappedNames.length;
                    for (var i = 0; i < len; i++)
                        ticks.push(i);
                    var plot = element.plot.master
                    var currentAxes = plot.getAxes("bottom");
                    if (typeof currentAxes !== 'undefined' && currentAxes.length > 0)
                        currentAxes[0].remove();
                    if (len > 0)
                        plot.addAxis("bottom", "labels", { labels: unwrappedNames, ticks: ticks });
                }
            }
        }
    };

}