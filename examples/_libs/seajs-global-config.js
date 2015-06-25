seajs.config({
	alias: {
		
		'jqui.accordion': 'jqui/1.3.6/accordion-debug',
		'jqui.calendar': 'jqui/1.3.6/calendar-debug',
		'jqui.combo': 'jqui/1.3.6/combo-debug',
		'jqui.combobox': 'jqui/1.3.6/combobox-debug',
		'jqui.combogrid': 'jqui/1.3.6/combogrid-debug',
		'jqui.combotree': 'jqui/1.3.6/combotree-debug',
		'jqui.datagrid': 'jqui/1.3.6/datagrid-debug',
		'jqui.datebox': 'jqui/1.3.6/datebox-debug',
		'jqui.datetimebox': 'jqui/1.3.6/datetimebox-debug',
		'jqui.dialog': 'jqui/1.3.6/dialog-debug',
		'jqui.draggable': 'jqui/1.3.6/draggable-debug',
		'jqui.droppable': 'jqui/1.3.6/droppable-debug',
		'jqui.form': 'jqui/1.3.6/form-debug',
		'jqui.layout': 'jqui/1.3.6/layout-debug',
		'jqui.linkbutton': 'jqui/1.3.6/linkbutton-debug',
		'jqui.menu': 'jqui/1.3.6/menu-debug',
		'jqui.menubutton': 'jqui/1.3.6/menubutton-debug',
		'jqui.messager': 'jqui/1.3.6/messager-debug',
		'jqui.numberbox': 'jqui/1.3.6/numberbox-debug',
		'jqui.numberspinner': 'jqui/1.3.6/numberspinner-debug',
		'jqui.pagination': 'jqui/1.3.6/pagination-debug',
		'jqui.panel': 'jqui/1.3.6/panel-debug',
		'jqui.parser': 'jqui/1.3.6/parser-debug',
		'jqui.progressbar': 'jqui/1.3.6/progressbar-debug',
		'jqui.propertygrid': 'jqui/1.3.6/propertygrid-debug',
		'jqui.resizable': 'jqui/1.3.6/resizable-debug',
		'jqui.searchbox': 'jqui/1.3.6/searchbox-debug',
		'jqui.slider': 'jqui/1.3.6/slider-debug',
		'jqui.spinner': 'jqui/1.3.6/spinner-debug',
		'jqui.splitbutton': 'jqui/1.3.6/splitbutton-debug',
		'jqui.tabs': 'jqui/1.3.6/tabs-debug',
		'jqui.timespinner': 'jqui/1.3.6/timespinner-debug',
		'jqui.tooltip': 'jqui/1.3.6/tooltip-debug',
		'jqui.tree': 'jqui/1.3.6/tree-debug',
		'jqui.treegrid': 'jqui/1.3.6/treegrid-debug',
		'jqui.validatebox': 'jqui/1.3.6/validatebox-debug',
		'jqui.window': 'jqui/1.3.6/window-debug'
		
	},

	// 预加载项
	preload: [this.JSON ? '' : 'json'],

	// 变量配置
	vars: {
		'locale': 'zh-cn'
	},

	charset: 'utf-8',

	debug: true,

	base: '../../dist'
	
});