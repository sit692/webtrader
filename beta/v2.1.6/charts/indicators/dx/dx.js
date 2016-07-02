define(["jquery","common/rivetsExtra","jquery-ui","color-picker","ddslick"],function(a,b){function c(){a(this).dialog("close"),a(this).find("*").removeClass("ui-state-error")}function d(d,e){require(["css!charts/indicators/dx/dx.css"]);var f=function(a,b,c,d){this.level=a,this.stroke=b,this.strokeWidth=c,this.dashStyle=d},g=[new f(.3,"red",1,"Dash"),new f(.7,"red",1,"Dash")];require(["text!charts/indicators/dx/dx.html","text!charts/indicators/indicators.json"],function(f,h){var i="#0026ff",j="#00ff21",k="#ff0000";f=a(f),f.appendTo("body"),h=JSON.parse(h);var l=h.dx,m={title:l.long_display_name,description:l.description};b.bind(f[0],m),f.find("input[type='button']").button(),a(".dx_stroke").each(function(){a(this).colorpicker({part:{map:{size:128},bar:{size:128}},select:function(b,c){a(this).css({background:"#"+c.formatted}).val(""),"adx"===a(this).attr("id")?i="#"+c.formatted:"plus"===a(this).attr("id")?j="#"+c.formatted:"minus"===a(this).attr("id")&&(k="#"+c.formatted)},ok:function(b,c){a(this).css({background:"#"+c.formatted}).val(""),"adx"===a(this).attr("id")?i="#"+c.formatted:"plus"===a(this).attr("id")?j="#"+c.formatted:"minus"===a(this).attr("id")&&(k="#"+c.formatted)}})});var n="Solid";a("#dx_dashStyle").ddslick({imagePosition:"left",width:158,background:"white",onSelected:function(b){a("#dx_dashStyle .dd-selected-image").css("max-width","125px"),n=b.selectedData.value}}),a("#dx_dashStyle .dd-option-image").css("max-width","125px");var o=f.find("#dx_levels").DataTable({paging:!1,scrollY:100,autoWidth:!0,searching:!1,info:!1,columnDefs:[{className:"dt-center",targets:[0,1,2,3]}],aoColumnDefs:[{bSortable:!1,aTargets:[1,3]}]});a.each(g,function(b,c){a(o.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,'<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/'+c.dashStyle+'.svg" /></div>']).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})}),f.find("#dx_level_delete").click(function(){o.rows(".selected").indexes().length<=0?require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Select level(s) to delete!"})}):o.rows(".selected").remove().draw()}),f.find("#dx_level_add").click(function(){require(["indicator_levels"],function(b){b.open(d,function(b){a.each(b,function(b,c){a(o.row.add([c.level,'<div style="background-color: '+c.stroke+';width:100%;height:20px;"></div>',c.strokeWidth,'<div style="width:50px;overflow:hidden;"><img src="images/dashstyle/'+c.dashStyle+'.svg" /></div>']).draw().node()).data("level",c).on("click",function(){a(this).toggleClass("selected")})})})})}),f.dialog({autoOpen:!1,resizable:!1,width:450,modal:!0,my:"center",at:"center",of:window,dialogClass:"dx-ui-dialog",buttons:[{text:"OK",click:function(){var b=a(".dx_input_width_for_period");if(!_.isInteger(_.toNumber(b.val()))||!_.inRange(b.val(),parseInt(b.attr("min")),parseInt(b.attr("max"))+1))return require(["jquery","jquery-growl"],function(a){a.growl.error({message:"Only numbers between "+b.attr("min")+" to "+b.attr("max")+" is allowed for "+b.closest("tr").find("td:first").text()+"!"})}),void b.val(b.prop("defaultValue"));var d=[];a.each(o.rows().nodes(),function(){var b=a(this).data("level");b&&d.push({color:b.stroke,dashStyle:b.dashStyle,width:b.strokeWidth,value:b.level,label:{text:b.level}})});var e={period:parseInt(f.find(".dx_input_width_for_period").val()),maType:f.find("#dx_ma_type").val(),dxStroke:i,plusDIStroke:j,minusDIStroke:k,strokeWidth:parseInt(f.find("#dx_strokeWidth").val()),dashStyle:n,appliedTo:parseInt(f.find("#dx_appliedTo").val()),levels:d};a(a(".dx").data("refererChartID")).highcharts().series[0].addIndicator("dx",e),c.call(f)}},{text:"Cancel",click:function(){c.call(this)}}]}),f.find("select").selectmenu({width:160}),"function"==typeof e&&e(d)})}return{open:function(b){return 0==a(".dx").length?void d(b,this.open):void a(".dx").data("refererChartID",b).dialog("open")}}});