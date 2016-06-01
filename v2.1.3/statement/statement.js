define(["module","jquery","windows/windows","websockets/binary_websockets","lodash","datatables","jquery-growl"],function(a,b,c,d,e){function f(a){require(["css!statement/statement.css"]),require(["text!statement/statement.html"]),a.click(function(){i?i.moveToTop():d.cached.authorize().then(h)["catch"](function(a){})})}function g(a){var c=b("#"+j.attr("id")+"_processing").css("top","200px").show();l=!0;var f={statement:1,description:1};if("string"==typeof a){f.date_from=yyyy_mm_dd_to_epoch(a,{utc:!0});var g=Date.UTC(1970,0,1,23,59,59)/1e3;f.date_to=f.date_from+g,j.api().rows().remove(),m=!0}else f.limit=50,(m||a.clear)&&(j.api().rows().remove(),m=!1),f.offset=j.api().column(0).data().length;var h=function(a){var b=a.statement&&a.statement.transactions||[],d=b.map(function(a){1*a.amount;return[epoch_to_string(a.transaction_time,{utc:!0}),a.transaction_id,e.capitalize(a.action_type),a.longcode,(1*a.amount).toFixed(2),"<b>"+formatPrice(a.balance_after)+"</b>",'<button class="green-button shine">View</button>',a]});j.api().rows.add(d),j.api().draw(),l=!1,c.hide()};d.send(f).then(h)["catch"](function(a){h({}),b.growl.error({message:a.message})})}function h(){i=c.createBlankWindow(b("<div/>"),{title:"Statement",width:700,minHeight:100,destroy:function(){j&&j.DataTable().destroy(!0),i=null},refresh:function(){k.clear(),g({clear:!0})},"data-authorized":"true"}),i.track({module_id:"statement",is_unique:!0,data:null}),require(["text!statement/statement.html"],function(a){j=b(a),j.appendTo(i),j=j.dataTable({data:[],columnDefs:[{targets:4,createdCell:function(a,c){var d=0>c?"red":c>0?"green":"bold";d&&b(a).addClass(d)}}],paging:!1,ordering:!1,searching:!0,processing:!0}),j.parent().addClass("hide-search-input"),j.api().columns().every(function(){var a=this;b("input",this.header()).on("keyup change",function(){a.search()!==this.value&&a.search(this.value).draw()})}),k=i.addDateToHeader({title:"Jump to: ",date:null,changed:g,cleared:g}),i.on("click",n),i.dialog("open"),g({clear:!0}),i.scroll(function(){var a=i.scrollTop(),b=i.innerHeight(),c=i[0].scrollHeight,d=(a+b)/c;d>.75&&!l&&!m&&g({clear:!1})})})}var i=null,j=null,k=null,l=!1,m=!1,n=function(a){var c=a.target,d=b(c);if("BUTTON"===c.tagName&&!d.hasClass("disabled")){var f=c.parentElement.parentElement,g=j.api().row(f).data();g=e.last(g),d.addClass("disabled"),require(["viewtransaction/viewTransaction"],function(a){a.init(g.contract_id,g.transaction_id).then(function(){d.removeClass("disabled")})})}};return{init:f}});