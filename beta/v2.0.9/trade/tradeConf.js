define(["lodash","jquery","moment","websockets/binary_websockets","common/rivetsExtra","text!trade/tradeConf.html","css!trade/tradeConf.css"],function(a,b,c,d,e,f){function g(a,b){var e=1*b.tick_count,f=b.symbol,g=1*a.buy.purchase_time,h=d.events.on("tick",function(b){if(0!==e&&b.tick&&b.tick.symbol===f&&!(1*b.tick.epoch<g)){var i=b.tick;a.ticks.array.push({quote:i.quote,epoch:i.epoch,number:a.ticks.array.length+1,tooltip:c.utc(1e3*i.epoch).format("dddd, MMM D, HH:mm:ss")}),--e,0===e&&(a.ticks.update_status(),a.buy.update(),a.back.visible=!0,d.events.off("tick",h)),"Digits"!==a.ticks.category&&a.ticks.update_status()}})}function h(c,d,h){var i=b(f),k=c.buy,l=c.echo_req.passthrough,m={title:{text:"Contract Confirmation"},buy:{message:k.longcode,balance_after:k.balance_after,buy_price:k.buy_price,purchase_time:k.purchase_time,start_time:k.start_time,transaction_id:k.transaction_id,payout:k.payout,currency:l.currency,potential_profit:k.payout-k.buy_price,potential_profit_text:"Profit",show_result:!1},spreads:{amount_per_point:k.amount_per_point||"0",stop_loss_level:k.stop_loss_level||"0",stop_profit_level:k.stop_profit_level||"0"},ticks:{array:[],average:function(){for(var a=this.array,b=0,c=0;c<a.length;++c)b+=1*a[c].quote;var d=b/(a.length||1);return d},getPlotX:function(){var a=this.array.length;return 1===a?{value:a,label:"Entry Spot"}:a===this.tick_count?{value:a,label:"Exit Spot"}:null},getPlotY:function(){var a=this.array.length,b=this.array[a-1];if("Up/Down"===this.category&&1===a)return{value:1*b.quote,label:"Barrier ("+b.quote+")",id:"plot-barrier-y"};if("Asians"===this.category){var c=this.average().toFixed(5);return{value:c,label:"Average ("+c+")",id:"plot-barrier-y"}}return null},tick_count:l.tick_count,value:(l.digits_value||"0")+"",category:l.category,category_display:l.category_display,status:"waiting",chart_visible:a(["Up/Down","Asians"]).contains(l.category)&&"ticks"===l.duration_unit},arrow:{visible:!(a(["Digits","Up/Down","Asians"]).contains(l.category)&&"ticks"===l.duration_unit)},back:{visible:!1}};m.buy.update=function(){var a=m.ticks.status;m.title.text={waiting:"Contract Confirmation",won:"This contract won",lost:"This contract lost"}[a],"lost"===a&&(m.buy.potential_profit=-m.buy.buy_price,m.buy.payout=0,m.buy.potential_profit_text="Lost"),"won"===a&&(m.buy.balance_after=1*k.balance_after+1*m.buy.payout),m.buy.show_result=!0,j(2e3,"close",k,a)},m.ticks.update_status=function(){var b=a.first(m.ticks.array).quote+"",c=a.last(m.ticks.array).quote+"",d=m.ticks.value+"",e=m.ticks.average().toFixed(5),f=m.ticks.category,g=m.ticks.category_display,h={Digits:{matches:a.last(c)===d,differs:a.last(c)!==d,over:1*a.last(c)>1*d,under:1*a.last(c)<1*d,odd:1*a.last(c)%2===1,even:1*a.last(c)%2===0},"Up/Down":{rise:1*c>1*b,fall:1*b>1*c},Asians:{"asian up":1*c>e,"asian down":e>1*c}};m.ticks.status=h[f][g]?"won":"lost"},m.back.onclick=function(){h(i)},m.arrow.onclick=function(){b.growl.error({message:"Work in progress, check back soon!!!!"})},j("open",k),m.arrow.visible?m.back.visible=!0:g(m,l);e.bind(i[0],m);d(i)}e.binders["tick-chart"]={priority:65,bind:function(a){var b=this.model;a.chart=new Highcharts.Chart({title:"",credits:{enabled:!1},chart:{type:"line",renderTo:a,backgroundColor:null,width:1*(a.getAttribute("width")||350),height:1*(a.getAttribute("height")||120)},tooltip:{formatter:function(){var a=b.array[this.x-1];return a&&a.tooltip||!1}},xAxis:{type:"linear",min:1,max:1*a.getAttribute("tick-count")+1,labels:{enabled:!1}},yAxis:{labels:{align:"left",x:0},title:"",gridLineWidth:0},series:[{data:[]}],exporting:{enabled:!1,enableImages:!1},legend:{enabled:!1}})},routine:function(b,c){var d=this.model,e=function(a,b){a.xAxis[0].addPlotLine({value:b.value,id:b.id||b.value,label:{text:b.label||"label"},color:b.color||"#e98024",width:b.width||2})},f=function(a,b){a.yAxis[0].addPlotLine({id:b.id||b.label,value:b.value,label:{text:b.label,align:"center"},color:"green",width:2})},g=c.length;if(0!=g){var h=a.last(c);b.chart.series[0].addPoint([g,1*h.quote]);var i=d.getPlotX();i&&e(b.chart,i);var j=d.getPlotY();j&&b.chart.yAxis[0].removePlotLine(j.id),j&&f(b.chart,j)}}};var i={},j=function(a,b){var c=[].slice.call(arguments,1);"number"==typeof a?c.splice(1):(b=a,a=0);var d=i[b]||[];d.forEach(function(b){setTimeout(function(){b.apply(void 0,c)},a)})};return{events:{on:function(a,b){return(i[a]=i[a]||[]).push(b),b},off:function(a){if(i[name]){var b=i[name].indexOf(a);-1!==b&&i[name].splice(b,1)}}},init:h}});