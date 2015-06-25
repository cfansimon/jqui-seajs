# jqui [![spm version](http://spmjs.io/badge/jqui)](http://spmjs.io/package/jqui)

---

extend from jquery easyui

## Build

第一步: spm build ，把css中引用的图片变成base64;
第二步: 把dist的css复制回根目录;
第三步: spm-sea ,生成seajs可以引用的版本;
第四步: 复制dist下的所有文件到自己项目的seajs模块目录

## Usage

若不需要修改图标或源码，直接第四步即可
