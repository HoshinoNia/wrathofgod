#target 'photoshop'

function AAA(){
    // PANEL
    // =====
    var panel = new Window("dialog"); 
        panel.text = "すべてのレイヤーを破壊する。それらは再生できない。"; 
        panel.orientation = "column"; 
        panel.alignChildren = ["center","top"]; 
        panel.spacing = 10; 
        panel.margins = 16; 

    var statictext1 = panel.add("statictext", undefined, undefined, {name: "statictext1"}); 
        statictext1.text = "(2)(W)(W)を支払う"; 
        
    // GROUP1
    // ======
    var group1 = panel.add("group", undefined, {name: "group1"}); 
        group1.orientation = "row"; 
        group1.alignChildren = ["left","center"]; 
        group1.spacing = 10; 
        group1.margins = 0; 

    var button1 = group1.add("button", undefined, undefined, {name: "button1"}); 
        button1.text = "（1）"; 
        button1.preferredSize.width = 64; 
        button1.onClick = function(){button1.enabled = false; btnAction();};
        button1.enabled = true;

    var button2 = group1.add("button", undefined, undefined, {name: "button2"}); 
        button2.text = "（1）"; 
        button2.preferredSize.width = 64; 
        button2.onClick = function(){button2.enabled = false; btnAction();};
        button2.enabled = true;

    var button3 = group1.add("button", undefined, undefined, {name: "button3"}); 
        button3.text = "（W）"; 
        button3.preferredSize.width = 64; 
        button3.onClick = function(){button3.enabled = false; btnAction();};
        button3.enabled = true;

    var button4 = group1.add("button", undefined, undefined, {name: "button4"}); 
        button4.text = "（W）"; 
        button4.preferredSize.width = 64; 
        button4.onClick = function(){button4.enabled = false; btnAction();};
        button4.enabled = true;

    var act = group1.add("button", undefined, undefined, {name: "act"}); 
        act.enabled = false; 
        act.text = "唱える"; 

    var divider1 = group1.add("panel", undefined, undefined, {name: "divider1"}); 
        divider1.alignment = "fill"; 

    var close = group1.add("button", undefined, undefined, {name: "close"}); 
        close.text = "close"; 
    
    var mana = 0;

    function btnAction(){
        mana++;
        if(mana >= 4){
            act.enabled = true;
        }
    }


    act.onClick = function(){
        mana = 0;
        deleteLayer();
        panel.close();
    }
    close.onClick = function(){
        panel.close();
    }


    function deleteLayer(){
        var doc = app.activeDocument;
        var layers = doc.layers;
        for(var i=0;i<layers.length; i++){
            var el = layers[i];
            el.isBackgroundLayer = false;
            // el.allLocked = false;
            el.visible = true;
        }

        //全レイヤー結合
        doc.mergeVisibleLayers();

        //背景生成
        var nlay = doc.artLayers.add();
        nlay.name= 'null';
        nlay.move(doc.layers[doc.layers.length-1], ElementPlacement.PLACEAFTER);
        nlay.isBackgroundLayer=true;
        //統合レイヤー削除
        doc.layers[0].allLocked = false;
        doc.layers[0].remove();


        //保存
        app.activeDocument.save();

        //履歴削除のためブリンク
        var _path = doc.fullName.fullName;
        doc.close();
        app.open(new File(_path), OpenDocumentType.PHOTOSHOP);
    }


    panel.show();
}

AAA();

