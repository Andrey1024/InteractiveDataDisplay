﻿/// <reference path="../../typings/jquery/jquery.d.ts" />
/// <reference path="PlotRegistry.ts" />
/// <reference path="Utils.ts" />
declare var InteractiveDataDisplay: any;
declare var Microsoft: any;

module ChartViewer {
    PlotRegistry["heatmap"] = {
        initialize(plotDefinition: PlotInfo, viewState, chart: IDDPlot) {
            var div = $("<div></div>")
                .attr("data-idd-name", plotDefinition.displayName)
                .appendTo(chart.host);
            var heatmap = new InteractiveDataDisplay.Heatmap(div, chart.master);
            chart.addChild(heatmap);

            var plots = [heatmap];
            return plots;
        },

        draw(plots: IDDPlot[], plotDefinition: PlotInfo) {
            var heatmap = <Plot.HeatmapDefinition><any>plotDefinition;
            plots[0].draw(heatmap, heatmap.titles);
        }
    }
}