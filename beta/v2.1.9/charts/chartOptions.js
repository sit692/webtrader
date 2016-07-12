define(["jquery","common/rivetsExtra","charts/chartWindow","charts/charts","moment","charts/chartingRequestMap","common/util"],function(a,b,c,d,e,f){function g(a){a.showTimePeriodSelector=!1,a.showChartTypeSelector=!1,a.showDrawingToolSelector=!1,a.showExportSelector=!1}function h(b){switch(b){case n:a(".chartOptions .chartTypeOverlay > .chartoptions-horizontal-line:first-child").css({width:"60px",left:"34px"});break;case o:a(".chartOptions .chartTypeOverlay > .chartoptions-horizontal-line:first-child").css({width:"58px",left:"36px"});break;case p:a(".chartOptions .chartTypeOverlay > .chartoptions-horizontal-line:first-child").css({width:"52px",left:"41px"});break;case q:case r:a(".chartOptions .chartTypeOverlay > .chartoptions-horizontal-line:first-child").css({width:"53px",left:"40px"});break;case s:a(".chartOptions .chartTypeOverlay > .chartoptions-horizontal-line:first-child").css({width:"53px",left:"41px"})}}function i(b,c){c==t?b.tableViewCallback&&b.tableViewCallback():(b.chartType=c,d.refresh("#"+b.newTabId+"_chart",null,b.chartType),a("#"+b.newTabId).trigger("chart-type-changed",b.chartType),h(c)),g(b)}function j(b){var c=!1,d=a(b).highcharts();return d&&d.series.forEach(function(a){"percent"===a.options.compare&&(c=!0)}),c}function k(b){switch(b){case"1t":a(".chartOptions .timePeriodOverlay > .chartoptions-horizontal-line:first-child").css({width:"85%",left:"40px"});break;case"1m":case"2m":case"3m":case"5m":a(".chartOptions .timePeriodOverlay > .chartoptions-horizontal-line:first-child").css({width:"82%",left:"47px"});break;case"10m":case"15m":case"30m":a(".chartOptions .timePeriodOverlay > .chartoptions-horizontal-line:first-child").css({width:"80%",left:"54px"});break;case"1h":case"2h":case"4h":case"8h":case"1d":a(".chartOptions .timePeriodOverlay > .chartoptions-horizontal-line:first-child").css({width:"84%",left:"43px"})}}var l=[],m=[],n="candlestick",o="ohlc",p="line",q="dot",r="linedot",s="spline",t="table",u=(local_storage.get("i18n")||{value:"en"}).value,v="https://webtrader.binary.com?affiliates=true&instrument={0}&timePeriod={1}&gtm=true&lang="+u,w='<iframe src="'+v+'" width="350" height="400" style="overflow-y : hidden;" scrolling="no" />',x="https://twitter.com/share?url={0}&text={1}",y="https://facebook.com/sharer/sharer.php?u={0}",z="https://plus.google.com/share?url={0}",A="https://www.blogger.com/blog-this.g?u={0}&n={1}",B="http://vk.com/share.php?url={0}&title={1}";return{init:function(e,n,o,p,q,r){require(["text!charts/chartOptions.html","css!charts/chartOptions.css"],function(s){m[e]&&m[e].unbind(),l[e]={newTabId:e,timePeriod:n,chartType:o,tableViewCallback:p,instrumentName:q,instrumentCode:r,indicatorsCount:0,showTimePeriodSelector:!1,showChartTypeSelector:!1,showCandlestickAndOHLC:!j("#"+e+"_chart"),showTableOption:!0,enableCrosshair:!0,showDrawingToolSelector:!1,showExportSelector:!1,exportChartURLShare:v.format(r,n),exportChartIframeShare:w.format(r,n),fbShareLink:y.format(encodeURIComponent(v.format(r,n))),twitterShareLink:x.format(encodeURIComponent(v.format(r,n)),q+"("+n+")"),gPlusShareLink:z.format(encodeURIComponent(v.format(r,n))),bloggerShareLink:A.format(v.format(r,n),q+"("+n+")"),vkShareLink:B.format(v.format(r,n),q+"("+n+")")},m[e]=null,l[e].toggleTimerPeriodSelector=function(a,b){var c=!b.showTimePeriodSelector;g(b),b.showTimePeriodSelector=c},l[e].toggleChartTypeSelector=function(a,b){var c=!b.showChartTypeSelector;g(b),b.showChartTypeSelector=c},l[e].addRemoveIndicator=function(a,b){require(["charts/indicators/indicatorManagement"],function(a){var c=b.instrumentName+" ("+b.timePeriod+")";a.openDialog("#"+b.newTabId+"_chart",c)}),g(b)},l[e].addRemoveOverlay=function(a,b){require(["charts/overlay/overlayManagement"],function(a){var c=b.instrumentName+" ("+b.timePeriod+")";a.openDialog("#"+b.newTabId+"_chart",c)}),g(b)},l[e].changeChartType=function(a,b){var c=a.target.dataset.charttype;c&&i(b,c)},l[e].changeTimePeriod=function(a,b){var e=a.target.dataset.timeperiod;if(e){f.unregister(f.keyFor(b.instrumentCode,b.timePeriod),"#"+b.newTabId+"_chart"),b.timePeriod=e;var h=isTick(e);b.showCandlestickAndOHLC=h?!1:!j("#"+b.newTabId+"_chart"),b.chartType=h?"line":b.chartType,d.refresh("#"+b.newTabId+"_chart",e,b.chartType),"true"===getParameterByName("affiliates")?d.changeTitle("#"+b.newTabId+"_chart",b.instrumentName+" ("+e+")"):c.changeChartWindowTitle(b.newTabId,b.instrumentName,e),g(b),b.exportChartURLShare=v.format(b.instrumentCode,e),b.exportChartIframeShare=w.format(b.instrumentCode,e),b.fbShareLink=y.format(encodeURIComponent(v.format(r,n))),b.twitterShareLink=x.format(encodeURIComponent(v.format(r,n)),q+"("+n+")"),b.gPlusShareLink=z.format(encodeURIComponent(v.format(r,n))),b.bloggerShareLink=A.format(encodeURIComponent(v.format(r,n)),q+"("+n+")"),b.vkShareLink=B.format(encodeURIComponent(v.format(r,n)),q+"("+n+")"),k(e)}},isTick(n)&&(l[e].showCandlestickAndOHLC=!1),p||(l[e].showTableOption=!1),l[e].toggleCrosshair=function(a,b){b.enableCrosshair=!b.enableCrosshair,require(["charts/crosshair"],function(a){a.toggleCrossHair("#"+b.newTabId+"_chart")}),g(b)},l[e].toggleDrawingToolSelector=function(a,b){var c=!b.showDrawingToolSelector;g(b),b.showDrawingToolSelector=c},l[e].addDrawingTool=function(b,c){var d=b.target.dataset.drawingtool;d&&(require(["charts/draw/highcharts_custom/"+d],function(b){var d="#"+c.newTabId+"_chart";a(d).highcharts().annotate=!0,b.init(d)}),g(c))},l[e].toggleExportSelector=function(a,b){var c=!b.showExportSelector;g(b),b.showExportSelector=c},l[e]["export"]=function(b,c){var e=b.target.dataset.exporttype;if(e){var f="#"+c.newTabId+"_chart",h=a(f).highcharts();switch(e){case"png":h.exportChartLocal();break;case"pdf":h.exportChart({type:"application/pdf"});break;case"csv":d.generate_csv(h,a(f).data());break;case"svg":h.exportChartLocal({type:"image/svg+xml"})}g(c)}};var t=a(s);a("#"+e+"_header").prepend(t),k(n),h(o),m[e]=b.bind(t[0],l[e])})},disableEnableCandlestickAndOHLC:function(a,b){l[a]&&(l[a].showCandlestickAndOHLC=b)},selectChartType:function(a,b,c){c?l[a].changeChartType(l[a],b):l[a].chartType=b},cleanBinding:function(a){m[a]&&(m[a].unbind(),delete m[a],delete l[a])},setIndicatorsCount:function(a,b){l[b].indicatorsCount=a}}});