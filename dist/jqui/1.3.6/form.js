define("jqui/1.3.6/form",[],function(){!function(t){function e(e,n){function a(){var e=t("#"+f);if(e.length)try{var n=e.contents()[0].readyState;n&&"uninitialized"==n.toLowerCase()&&setTimeout(a,100)}catch(i){o()}}function o(){var e=t("#"+f);if(e.length){e.unbind();var a="";try{var i=e.contents().find("body");if(a=i.html(),""==a&&--v)return void setTimeout(o,100);var r=i.find(">textarea");if(r.length)a=r.val();else{var c=i.find(">pre");c.length&&(a=c.html())}}catch(u){}n.success&&n.success(a),setTimeout(function(){e.unbind(),e.remove()},100)}}n=n||{};var i={};if(!n.onSubmit||0!=n.onSubmit.call(e,i)){var r=t(e);n.url&&r.attr("action",n.url);var f="easyui_frame_"+(new Date).getTime(),c=t("<iframe id="+f+" name="+f+"></iframe>").attr("src",window.ActiveXObject?"javascript:false":"about:blank").css({position:"absolute",top:-1e3,left:-1e3}),u=r.attr("target"),s=r.attr("action");r.attr("target",f);var d=t();try{c.appendTo("body"),c.bind("load",o);for(var l in i){var m=t('<input type="hidden" name="'+l+'">').val(i[l]).appendTo(r);d=d.add(m)}a(),r[0].submit()}finally{r.attr("action",s),u?r.attr("target",u):r.removeAttr("target"),d.remove()}var v=10}}function n(e,n){function a(n){var a=t(e);for(var u in n){var s=n[u],d=o(u,s);if(!d.length){var l=i(u,s);l||(t('input[name="'+u+'"]',a).val(s),t('textarea[name="'+u+'"]',a).val(s),t('select[name="'+u+'"]',a).val(s))}f(u,s)}c.onLoadSuccess.call(e,n),r(e)}function o(n,a){var o=t(e).find('input[name="'+n+'"][type=radio], input[name="'+n+'"][type=checkbox]');return o._propAttr("checked",!1),o.each(function(){var e=t(this);(e.val()==String(a)||t.inArray(e.val(),t.isArray(a)?a:[a])>=0)&&e._propAttr("checked",!0)}),o}function i(n,a){for(var o=0,i=["numberbox","slider"],r=0;r<i.length;r++){var f=i[r],c=t(e).find("input["+f+'Name="'+n+'"]');c.length&&(c[f]("setValue",a),o+=c.length)}return o}function f(n,a){var o=t(e),i=["combobox","combotree","combogrid","datetimebox","datebox","combo"],r=o.find('[comboName="'+n+'"]');if(r.length)for(var f=0;f<i.length;f++){var c=i[f];if(r.hasClass(c+"-f"))return void(r[c]("options").multiple?r[c]("setValues",a):r[c]("setValue",a))}}t.data(e,"form")||t.data(e,"form",{options:t.extend({},t.fn.form.defaults)});var c=t.data(e,"form").options;if("string"==typeof n){var u={};if(0==c.onBeforeLoad.call(e,u))return;t.ajax({url:n,data:u,dataType:"json",success:function(t){a(t)},error:function(){c.onLoadError.apply(e,arguments)}})}else a(n)}function a(e){t("input,select,textarea",e).each(function(){var e=this.type,n=this.tagName.toLowerCase();if("text"==e||"hidden"==e||"password"==e||"textarea"==n)this.value="";else if("file"==e){var a=t(this),o=a.clone().val("");o.insertAfter(a),a.data("validatebox")?(a.validatebox("destroy"),o.validatebox()):a.remove()}else"checkbox"==e||"radio"==e?this.checked=!1:"select"==n&&(this.selectedIndex=-1)});for(var n=t(e),a=["combo","combobox","combotree","combogrid","slider"],o=0;o<a.length;o++){var i=a[o],f=n.find("."+i+"-f");f.length&&f[i]&&f[i]("clear")}r(e)}function o(e){e.reset();for(var n=t(e),a=["combo","combobox","combotree","combogrid","datebox","datetimebox","spinner","timespinner","numberbox","numberspinner","slider"],o=0;o<a.length;o++){var i=a[o],f=n.find("."+i+"-f");f.length&&f[i]&&f[i]("reset")}r(e)}function i(n){var a=t.data(n,"form").options,o=t(n);o.unbind(".form").bind("submit.form",function(){return setTimeout(function(){e(n,a)},0),!1})}function r(e){if(t.fn.validatebox){var n=t(e);n.find(".validatebox-text:not(:disabled)").validatebox("validate");var a=n.find(".validatebox-invalid");return a.filter(":not(:disabled):first").focus(),0==a.length}return!0}function f(e,n){t(e).find(".validatebox-text:not(:disabled)").validatebox(n?"disableValidation":"enableValidation")}t.fn.form=function(e,n){return"string"==typeof e?t.fn.form.methods[e](this,n):(e=e||{},this.each(function(){t.data(this,"form")||t.data(this,"form",{options:t.extend({},t.fn.form.defaults,e)}),i(this)}))},t.fn.form.methods={submit:function(n,a){return n.each(function(){var n=t.extend({},t.fn.form.defaults,t.data(this,"form")?t.data(this,"form").options:{},a||{});e(this,n)})},load:function(t,e){return t.each(function(){n(this,e)})},clear:function(t){return t.each(function(){a(this)})},reset:function(t){return t.each(function(){o(this)})},validate:function(t){return r(t[0])},disableValidation:function(t){return t.each(function(){f(this,!0)})},enableValidation:function(t){return t.each(function(){f(this,!1)})}},t.fn.form.defaults={url:null,onSubmit:function(){return t(this).form("validate")},success:function(){},onBeforeLoad:function(){},onLoadSuccess:function(){},onLoadError:function(){}}}(jQuery)});