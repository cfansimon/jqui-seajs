seajs.config({
    alias: {
        
        'jqui.calendar': 'jqui/1.3.6/calendar',
        'jqui.combo': 'jqui/1.3.6/combo',
        'jqui.combobox': 'jqui/1.3.6/combobox',
        'jqui.combotree': 'jqui/1.3.6/combotree',
        'jqui.datagrid': 'jqui/1.3.6/datagrid',
        'jqui.datebox': 'jqui/1.3.6/datebox',
        'jqui.datetimebox': 'jqui/1.3.6/datetimebox',
        'jqui.dialog': 'jqui/1.3.6/dialog',
        'jqui.draggable': 'jqui/1.3.6/draggable',
        'jqui.droppable': 'jqui/1.3.6/droppable',
        'jqui.messager': 'jqui/1.3.6/messager',
        'jqui.numberbox': 'jqui/1.3.6/numberbox',
        'jqui.numberspinner': 'jqui/1.3.6/numberspinner',
        'jqui.pagination': 'jqui/1.3.6/pagination',
        'jqui.panel': 'jqui/1.3.6/panel',
        'jqui.resizable': 'jqui/1.3.6/resizable',
        'jqui.slider': 'jqui/1.3.6/slider',
        'jqui.spinner': 'jqui/1.3.6/spinner',
        'jqui.timespinner': 'jqui/1.3.6/timespinner',
        'jqui.tree': 'jqui/1.3.6/tree',
        'jqui.window': 'jqui/1.3.6/window',
        'jqui.css': 'jqui/1.3.6/all.css'
    },

    // 预加载项
    preload: [
        'jqui.css',
        this.JSON ? '' : 'json'
    ],

    charset: 'utf-8',

    debug: true,

    base: '../../dist'
    
});