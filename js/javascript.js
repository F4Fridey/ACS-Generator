// Global vaiables:
onlyShowObjectClass = false;

// Load list of hidden elements.
firstTimes = JSON.parse(localStorage.getItem('firstTimes'));
// Create new one if does not exist.
if (firstTimes == null)
    firstTimes = [];
// Hide all elements on the list.
for (let i = 0; i < firstTimes.length; i++){
    document.getElementById(firstTimes[i]).classList.add("hidden");
}

// Previous obj, disrup, risk class selections
previous_selections = [0,0,0,0]

function updateInput(){
    // Updates all UI elements.
    checkOnlyMainClass();
    updateAccessLvl();
    updateItemTitle(document.getElementById("inputItemTitle").value, document.getElementById("inputItemSubtitle").value);
    updateOnjectClass();
    updteDisrupionClass();
    updteRiskClass();
    updateOpionalOptions();
    updateClassTitles()
}

function updateClassTitles(){
    // Update all the class titles with the ones from the input fields.

    // primary.
    if (document.getElementById("acsObjectPrimaryTextSubtitle").innerHTML != document.getElementById("inputPrimaryObjectClassTitle").value)
    document.getElementById("acsObjectPrimaryTextSubtitle").innerHTML = document.getElementById("inputPrimaryObjectClassTitle").value;

    // secondary.
    if (document.getElementById("acsObjectSecondaryTextSubtitle").innerHTML != document.getElementById("inputSecondaryObjectClassTitle").value)
    document.getElementById("acsObjectSecondaryTextSubtitle").innerHTML = document.getElementById("inputSecondaryObjectClassTitle").value;

    // disruption.
    if (document.getElementById("acsDisruptionTextTitleTitle").innerHTML != document.getElementById("inputDisruptionClassTitle").value)
    document.getElementById("acsDisruptionTextTitleTitle").innerHTML = document.getElementById("inputDisruptionClassTitle").value;

    // risk.
    if (document.getElementById("acsRiskTextTitleTitle").innerHTML != document.getElementById("inputRiskClassTitle").value)
    document.getElementById("acsRiskTextTitleTitle").innerHTML = document.getElementById("inputRiskClassTitle").value;
}

function checkOnlyMainClass(){
    // Handles when risk and disruption classes are set to None.

    // If obj class is pending, or disruption and risk class are none, disable disruption and risk class elements.
    if (document.getElementById("inputPrimaryObjectClass").value == "0" || (
        document.getElementById("inputDisruptionClass").value == "0" &&
        document.getElementById("inputRiskClass").value == "0"
    )){
        onlyShowObjectClass = true;
        if (!document.getElementById("acsDisRisk").classList.contains("disabled")){
            document.getElementById("acsDisRisk").classList.remove("grid");
            document.getElementById("acsDisRisk").classList.add("disabled");
            document.getElementById("acsObjDisRisk").style.setProperty("grid-template-columns", "auto")
        }
        updateTextScale()
    }
    else{
        onlyShowObjectClass = false;
        if (document.getElementById("acsDisRisk").classList.contains("disabled")){
            document.getElementById("acsDisRisk").classList.add("grid");
            document.getElementById("acsDisRisk").classList.remove("disabled");
            document.getElementById("acsObjDisRisk").style.setProperty("grid-template-columns", "auto auto")
        }
        updateTextScale()
    }
}

function updateItemTitle(title, subtitle){
    // Update the Item title and number.

    // Item Number eg "173".
    if (document.getElementById("acsItemTitleText").innerHTML != title)
        document.getElementById("acsItemTitleText").innerHTML = title;

    // item subtitle, eg "ITEM#:".
    if (document.getElementById("acsItemSubtitleText").innerHTML != subtitle)
        document.getElementById("acsItemSubtitleText").innerHTML = subtitle;
}

function updateAccessLvl(){
    let access_lvl_val = parseInt(document.getElementById("inputAccessLevel").value);

    // if not custom, set the access level titles.
    if (access_lvl_val >= 0){
        setAccessLvlText("LEVEL"+access_lvl_val,accessLvl.subtitle[access_lvl_val].toUpperCase(),access_lvl_val,"var("+accessLvl.color[access_lvl_val]+")")
        if (!document.getElementById("accessLevelCustom").classList.contains("disabled"))
            document.getElementById("accessLevelCustom").classList.add("disabled");
        return;
    }

    // enable customization elements.
    document.getElementById("accessLevelCustom").classList.remove("disabled");

    // access level bars customization.
    switch (document.getElementById("inputAccessLevelLineAppearance").value){
        // color.
        default:
            if (document.getElementById("inputAccessLevelLineColorCont").classList.contains("disabled"))
                document.getElementById("inputAccessLevelLineColorCont").classList.remove("disabled")
            if (!document.getElementById("inputAccessLevelLineBGImageCont").classList.contains("disabled"))
                document.getElementById("inputAccessLevelLineBGImageCont").classList.add("disabled")
            break;
        case "image":
            if (document.getElementById("inputAccessLevelLineBGImageCont").classList.contains("disabled"))
                document.getElementById("inputAccessLevelLineBGImageCont").classList.remove("disabled")
            if (!document.getElementById("inputAccessLevelLineColorCont").classList.contains("disabled"))
                document.getElementById("inputAccessLevelLineColorCont").classList.add("disabled")
            break;
    }

    setAccessLvlText(document.getElementById("inputAccessLevelTitle").value, 
        document.getElementById("inputAccessLevelSubtitle").value, 
        document.getElementById("inputAccessLevelLines").value, 
        document.getElementById("inputAccessLevelLineColor").value)
}

function setAccessLvlText(title, subtitle, lines, color){
    // set the custom text of the access level titles.

    // eg "LEVEL1".
    if (document.getElementById("acsLevelTitleText").innerHTML != title)
        document.getElementById("acsLevelTitleText").innerHTML = title;

    // eg "RESTRICTED".
    if (document.getElementById("acsLevelSubtitleText").innerHTML != subtitle)
        document.getElementById("acsLevelSubtitleText").innerHTML = subtitle;

    // lines setup.
    if (lines < 1){
        document.getElementById("acsLevelBarsCont").innerHTML = "";
        return;
    }
    if (document.getElementById("acsLevelBarsCont").children.length != lines || 
        document.getElementById("acsLevelBarsCont").getElementsByTagName("div")[0].style.getPropertyValue("background-color") != color)
    {
        // reset lines.
        document.getElementById("acsLevelBarsCont").innerHTML = "";

        // instantiate lines.
        for (let i = 0; i < lines; i++){
            document.getElementById("acsLevelBarsCont").innerHTML += "<div class='acsLevelBar' style='background-color: "+color+"'></div>"
        }
    }
}

function updateOnjectClass(){
    let obj_class_subtitle_txt = "";

    let main_color = "";
    let bg_color = "";
    let img_bg_color = "";

    let image_path = "";
    let image_path_secondary = "";
    
    let obj_class_val = parseInt(document.getElementById("inputPrimaryObjectClass").value);
    let sec_obj_class_val = parseInt(document.getElementById("inputSecondaryObjectClass").value);

    if (obj_class_val == -1){// custom obj class.
        // show customization elements.
        if (document.getElementById("inputPrimaryObjectClassCustomCont").classList.contains("disabled"))
            document.getElementById("inputPrimaryObjectClassCustomCont").classList.remove("disabled");

        obj_class_subtitle_txt = document.getElementById("inputPrimaryObjectClassSubtitle").value;
        main_color = "black black black "+document.getElementById("inputPrimaryObjectClassColor").value+"";
        bg_color = ""+hexToRgbA(document.getElementById("inputPrimaryObjectClassColor").value, .25)+"";
        img_bg_color = ""+document.getElementById("inputPrimaryObjectClassColor").value+"";

        if (sec_obj_class_val != -1 && sec_obj_class_val != 0){ // preset seconday obj classes.
            image_path = objSecondaryClass.path[sec_obj_class_val];
        }
    }
    else {// preset obj classs.
        // hide customization.
        if (!document.getElementById("inputPrimaryObjectClassCustomCont").classList.contains("disabled"))
            document.getElementById("inputPrimaryObjectClassCustomCont").classList.add("disabled");

        // ???
        if (previous_selections[0] != obj_class_val){
            document.getElementById("inputPrimaryObjectClassSubtitle").value = objClass.class[obj_class_val].toUpperCase();
        }

        obj_class_subtitle_txt = document.getElementById("inputPrimaryObjectClassSubtitle").value;
        main_color = "black black black var("+objClass.color[obj_class_val]+")";
        bg_color = "var("+objClass.colorSecondary[obj_class_val]+")";
        img_bg_color = "var("+objClass.colorTertiary[obj_class_val]+")";

        if (sec_obj_class_val == 0){// 2nd obj class = None.
            image_path = objClass.path[obj_class_val];
        }
        else {
            image_path_secondary = objClass.path[obj_class_val];
            if (sec_obj_class_val != -1){
                image_path = objSecondaryClass.path[sec_obj_class_val];}
        }
    }

    // ### Update images.

    //  preset obj class w/ preset 2nd obj class.
    if (document.getElementById("acsObjectImg").src != image_path && obj_class_val != -1 && sec_obj_class_val != -1){
        document.getElementById("acsObjectImg").src = image_path;
        document.getElementById("acsSecondaryObjectImg").style.filter = "";
    }
    // custom obj class w/ preset 2nd obj class.
    else if (document.getElementById("acsObjectImg").src != image_path && obj_class_val == -1 && sec_obj_class_val != -1){
        //console.log(image_path.toString())
        changeObjectImage(document.getElementById("inputPrimaryObjectClassImage"), 'acsSmallObjectImg', 'acsSecondaryObjectImg', '');
        if (sec_obj_class_val == 0)
            changeObjectImage(document.getElementById("inputPrimaryObjectClassImage"), 'acsObjectImg', '', '');
    }

    // enable color inversion.
    if (document.getElementById("acsSecondaryObjectImg").src != image_path_secondary && obj_class_val != -1){
        document.getElementById("acsSecondaryObjectImg").src = image_path_secondary;
    }
    if (document.getElementById("invertCheckbox").checked){
        if (!document.getElementById("acsSecondaryObjectImg").classList.contains("invert")){
        document.getElementById("acsSecondaryObjectImg").classList.add("invert")}}
    else if (document.getElementById("acsSecondaryObjectImg").classList.contains("invert")){
            document.getElementById("acsSecondaryObjectImg").classList.remove("invert")
    }

    // set object class image background colors.
    if (document.getElementById("acsObjectImageWrapper").style.getPropertyValue("background-color") != img_bg_color && sec_obj_class_val == 0){
        document.getElementById("acsObjectImageWrapper").style.setProperty("background-color", img_bg_color);
        if (previous_selections[0] != 4 && obj_class_val == 4)
            document.getElementById("invertCheckbox").checked = "true";
    }
    else if (document.getElementById("acsSecondaryObjectImageWrapper").style.getPropertyValue("background-color") != "var(--bgblack)" && obj_class_val == 4 && sec_obj_class_val != 0){
        if (previous_selections[0] != 4)
            document.getElementById("invertCheckbox").checked = "true";
        document.getElementById("acsSecondaryObjectImageWrapper").style.setProperty("background-color", "var(--bgblack)");
        document.getElementById("acsObjectImageWrapper").style.setProperty("background-color", "var(--white)");
    }
    else if (document.getElementById("acsSecondaryObjectImageWrapper").style.getPropertyValue("background-color") != img_bg_color && sec_obj_class_val != 0 && obj_class_val != 4){
        document.getElementById("acsSecondaryObjectImageWrapper").style.setProperty("background-color", img_bg_color);
        document.getElementById("acsObjectImageWrapper").style.setProperty("background-color", "var(--white)");
    }
    if (previous_selections[0] == 4 && obj_class_val != 4 && obj_class_val != -1){
        document.getElementById("invertCheckbox").checked = false;
    }
    
    // disable secondary obj class elements.
    if (sec_obj_class_val == 0){
        // set preset obj class images.
        if (document.getElementById("acsSmallObjectImg").src != image_path && obj_class_val != -1)
            document.getElementById("acsSmallObjectImg").src = image_path;
            if (document.getElementById("acsBigObjectImg").src != image_path && obj_class_val != -1)
                document.getElementById("acsBigObjectImg").src = image_path;

        // disable secondary elements.
        if (!document.getElementById("acsSmallObjectSecondaryImageCont").classList.contains("disabled"))
            document.getElementById("acsSmallObjectSecondaryImageCont").classList.add("disabled");

        // whether to show obj class on diamond or not.
        if (onlyShowObjectClass){
            if (!document.getElementById("acsSmallObjectImageCont").classList.contains("disabled"))
                document.getElementById("acsSmallObjectImageCont").classList.add("disabled");
            if (!document.getElementById("acsObjectImageCont").classList.contains("disabled"))
                document.getElementById("acsObjectImageCont").classList.add("disabled");
            if (document.getElementById("acsBigObjectImageCont").classList.contains("disabled"))
                document.getElementById("acsBigObjectImageCont").classList.remove("disabled");
        }
        else{
            if (document.getElementById("acsSmallObjectImageCont").classList.contains("disabled"))
                document.getElementById("acsSmallObjectImageCont").classList.remove("disabled");
            if (document.getElementById("acsObjectImageCont").classList.contains("disabled"))
                document.getElementById("acsObjectImageCont").classList.remove("disabled");
            if (!document.getElementById("acsBigObjectImageCont").classList.contains("disabled"))
                document.getElementById("acsBigObjectImageCont").classList.add("disabled");
        }
    }
    else{ // enable secodary obj class elements.
        // set preset images.
        if (document.getElementById("acsSmallObjectImg").src != image_path_secondary && obj_class_val != -1)
            document.getElementById("acsSmallObjectImg").src = image_path_secondary;
        if (document.getElementById("acsBigObjectImg").src != image_path_secondary && obj_class_val != -1)
            document.getElementById("acsBigObjectImg").src = image_path_secondary;

        // show the secondary obj class on diamond.
        if (document.getElementById("acsSmallObjectSecondaryImageCont").classList.contains("disabled"))
            document.getElementById("acsSmallObjectSecondaryImageCont").classList.remove("disabled");
        if (document.getElementById("acsSmallObjectSecondaryImg").src != image_path && sec_obj_class_val != -1)
            document.getElementById("acsSmallObjectSecondaryImg").src = image_path;
        if (document.getElementById("acsSmallObjectImageCont").classList.contains("disabled"))
            document.getElementById("acsSmallObjectImageCont").classList.remove("disabled");
        if (!document.getElementById("acsBigObjectImageCont").classList.contains("disabled"))
            document.getElementById("acsBigObjectImageCont").classList.add("disabled");
        if (document.getElementById("acsObjectImageCont").classList.contains("disabled"))
            document.getElementById("acsObjectImageCont").classList.remove("disabled");
    }

    // set image background colors.
    if (document.getElementById("acsSmallObjectImageWrapper").style.getPropertyValue("background-color") != img_bg_color)
        document.getElementById("acsSmallObjectImageWrapper").style.setProperty("background-color", img_bg_color);
    if (document.getElementById("acsBigObjectImageWrapper").style.getPropertyValue("background-color") != img_bg_color)
        document.getElementById("acsBigObjectImageWrapper").style.setProperty("background-color", img_bg_color);

    // change title.
    if (document.getElementById("acsObjectPrimaryTextTitle").innerHTML != obj_class_subtitle_txt)
        document.getElementById("acsObjectPrimaryTextTitle").innerHTML = obj_class_subtitle_txt;

    // change colors.
    if (document.getElementById("acsObject").style.getPropertyValue("border-color") != main_color)
        document.getElementById("acsObject").style.setProperty("border-color", main_color);
    if (document.getElementById("acsObject").style.getPropertyValue("background-color") != bg_color)
        document.getElementById("acsObject").style.setProperty("background-color", bg_color);
    if (!onlyShowObjectClass){
        if (document.getElementById("top-quad").style.getPropertyValue("background-color") != bg_color)
            document.getElementById("top-quad").style.setProperty("background-color", bg_color);
    }
    else{
        if (document.getElementById("top-quad").style.getPropertyValue("background-color") != "transparent")
            document.getElementById("top-quad").style.setProperty("background-color", "transparent");
    }

    // change font size and make seconday title apear or not.    
    if (sec_obj_class_val == 0 && !document.getElementById("acsObjectSecondaryText").classList.contains("disabled")){
        document.getElementById("acsObjectSecondaryText").classList.add("disabled");
        document.getElementById("acsObjectPrimaryTextSubtitle").classList.remove("em075");
        document.getElementById("acsObjectPrimaryTextTitle").classList.add("em2");
        document.getElementById("acsSecondaryObjectImageWrapper").classList.add("disabled");
        document.getElementById("acsObjectImageBGWrapper").classList.remove("bgblack");
    }
    else if (sec_obj_class_val != 0 && document.getElementById("acsObjectSecondaryText").classList.contains("disabled")){
        document.getElementById("acsObjectSecondaryText").classList.remove("disabled");
        document.getElementById("acsObjectPrimaryTextSubtitle").classList.add("em075");
        document.getElementById("acsObjectPrimaryTextTitle").classList.remove("em2");
        document.getElementById("acsSecondaryObjectImageWrapper").classList.remove("disabled");
        document.getElementById("acsObjectImageBGWrapper").classList.add("bgblack");
    }

    // show/hide 2nd obj class customizations.
    if (sec_obj_class_val == -1){
        if (document.getElementById("inputSecondaryObjectClassCustomCont").classList.contains("disabled"))
            document.getElementById("inputSecondaryObjectClassCustomCont").classList.remove("disabled");
        obj_class_subtitle_txt = document.getElementById("inputSecondaryObjectClassSubtitle").value;
    }
    else {
        if (!document.getElementById("inputSecondaryObjectClassCustomCont").classList.contains("disabled"))
            document.getElementById("inputSecondaryObjectClassCustomCont").classList.add("disabled");

        // ???
        if (previous_selections[1] != sec_obj_class_val){
            document.getElementById("inputSecondaryObjectClassSubtitle").value = objSecondaryClass.class[sec_obj_class_val].toUpperCase();
            previous_selections[1] = sec_obj_class_val;
        }

        obj_class_subtitle_txt = document.getElementById("inputSecondaryObjectClassSubtitle").value;
    }

    // set secondary obj class title.
    if (document.getElementById("acsObjectSecondaryTextTitle").innerHTML != obj_class_subtitle_txt)
        document.getElementById("acsObjectSecondaryTextTitle").innerHTML = obj_class_subtitle_txt;

    previous_selections[0] = obj_class_val
    previous_selections[1] = sec_obj_class_val
}

function updteDisrupionClass(){
    // Handles the disrution class.
    let obj_class_subtitle_txt = "";
    let level_txt = "";// the level of the class 0-5 or custom.

    let main_color = "";
    let bg_color = "";
    let img_bg_color = "";
    let image_path = "";

    let dis_cls_val = parseInt(document.getElementById("inputDisruptionClass").value);

    if (dis_cls_val == -1){// custom disruption class. WIP
        if (document.getElementById("inputDisruptionClassCustomCont").classList.contains("disabled"))
            document.getElementById("inputDisruptionClassCustomCont").classList.remove("disabled");

        main_color = "black black black "+document.getElementById("inputDisruptionClassColor").value+"";
        bg_color = ""+hexToRgbA(document.getElementById("inputDisruptionClassColor").value, .25)+"";
        img_bg_color = ""+document.getElementById("inputDisruptionClassColor").value+"";

        level_txt = document.getElementById("inputDisruptionClassLevel").value;

        if (level_txt == ""){
            if (!document.getElementById("acsSecondaryDisImageBG").classList.contains("hidden")){
                document.getElementById("acsSecondaryDisImageBG").classList.add("hidden")
            }
            if (!document.getElementById("acsDisImageBGWrapper").classList.contains("leftBorderRadius")){
                document.getElementById("acsDisImageBGWrapper").classList.add("leftBorderRadius")
            }
        }else{
            if (document.getElementById("acsSecondaryDisImageBG").classList.contains("hidden")){
                document.getElementById("acsSecondaryDisImageBG").classList.remove("hidden")
            }
            if (document.getElementById("acsDisImageBGWrapper").classList.contains("leftBorderRadius")){
                document.getElementById("acsDisImageBGWrapper").classList.remove("leftBorderRadius")
            }
        }
    }
    else {// preset dis class.
        // hide custom.
        if (!document.getElementById("inputDisruptionClassCustomCont").classList.contains("disabled"))
            document.getElementById("inputDisruptionClassCustomCont").classList.add("disabled");

        // ???
        if (previous_selections[2] != dis_cls_val){
            document.getElementById("inputDisruptionClassSubtitle").value = disruptionClass.class[dis_cls_val].toUpperCase();
            previous_selections[2] = dis_cls_val;
        }

        main_color = "var("+disruptionClass.color[dis_cls_val]+")";
        bg_color = "var("+disruptionClass.colorSecondary[dis_cls_val]+")";
        img_bg_color = "var("+disruptionClass.colorTertiary[dis_cls_val]+")";

        image_path = disruptionClass.path[dis_cls_val];

        level_txt = dis_cls_val;
    }

    obj_class_subtitle_txt = document.getElementById("inputDisruptionClassSubtitle").value;

    if (document.getElementById("acsDisImg").src != image_path && dis_cls_val != -1)
        document.getElementById("acsDisImg").src = image_path;

    if (document.getElementById("acsDisrupionTextTitle").innerHTML != obj_class_subtitle_txt)
        document.getElementById("acsDisrupionTextTitle").innerHTML = obj_class_subtitle_txt;

    if (document.getElementById("acsDis").style.getPropertyValue("border-color") != main_color)
        document.getElementById("acsDis").style.setProperty("border-color", main_color);
    if (document.getElementById("acsDis").style.getPropertyValue("background-color") != bg_color)
        document.getElementById("acsDis").style.setProperty("background-color", bg_color);
    if (document.getElementById("acsDisImageWrapper").style.getPropertyValue("background-color") != img_bg_color)
        document.getElementById("acsDisImageWrapper").style.setProperty("background-color", img_bg_color);

    if (document.getElementById("acsDisPText").innerHTML != level_txt)
        document.getElementById("acsDisPText").innerHTML = level_txt;

    // in diamond.
    if (document.getElementById("acsSmallDisImg").src != image_path && dis_cls_val != -1)
        document.getElementById("acsSmallDisImg").src = image_path;

    if (dis_cls_val == 0 || onlyShowObjectClass){// should disable in diamond?
        if (!document.getElementById("acsSmallDisImageCont").classList.contains("disabled"))
            document.getElementById("acsSmallDisImageCont").classList.add("disabled");
    }else{
        if (document.getElementById("acsSmallDisImageCont").classList.contains("disabled"))
            document.getElementById("acsSmallDisImageCont").classList.remove("disabled");
    }

    if (document.getElementById("acsSmallDisImageWrapper").style.getPropertyValue("background-color") != img_bg_color)
        document.getElementById("acsSmallDisImageWrapper").style.setProperty("background-color", img_bg_color);

    if (!onlyShowObjectClass && dis_cls_val != 0){ // diamond background.
        if (document.getElementById("left-quad").style.getPropertyValue("background-color") != bg_color)
            document.getElementById("left-quad").style.setProperty("background-color", bg_color);}
    else{
        if (document.getElementById("left-quad").style.getPropertyValue("background-color") != "transparent")
            document.getElementById("left-quad").style.setProperty("background-color", "transparent");}
}

function updteRiskClass(){
    // Handles the risk class.
    let obj_class_subtitle_txt = "";
    let level_txt = "";// the level of the class 0-5 or custom.

    let main_color = "";
    let bg_color = "";
    let img_bg_color = "";

    let image_path = "";

    let risk_cls_val = parseInt(document.getElementById("inputRiskClass").value);

    if (risk_cls_val == -1){// cutom risk class. WIP
        // show customization elements
        if (document.getElementById("inputRiskClassCustomCont").classList.contains("disabled"))
            document.getElementById("inputRiskClassCustomCont").classList.remove("disabled");

        main_color = "black black black "+document.getElementById("inputRiskClassColor").value+"";
        bg_color = ""+hexToRgbA(document.getElementById("inputRiskClassColor").value, .25)+"";
        img_bg_color = ""+document.getElementById("inputRiskClassColor").value+"";

        level_txt = document.getElementById("inputRiskClassLevel").value;

        if (level_txt == ""){
            if (!document.getElementById("acsSecondaryRiskImageBG").classList.contains("hidden")){
                document.getElementById("acsSecondaryRiskImageBG").classList.add("hidden")
            }
            if (!document.getElementById("acsRiskImageBGWrapper").classList.contains("leftBorderRadius")){
                document.getElementById("acsRiskImageBGWrapper").classList.add("leftBorderRadius")
            }
        }else{
            if (document.getElementById("acsSecondaryRiskImageBG").classList.contains("hidden")){
                document.getElementById("acsSecondaryRiskImageBG").classList.remove("hidden")
            }
            if (document.getElementById("acsRiskImageBGWrapper").classList.contains("leftBorderRadius")){
                document.getElementById("acsRiskImageBGWrapper").classList.remove("leftBorderRadius")
            }
        }
    }
    else {
        // hide customization elements
        if (!document.getElementById("inputRiskClassCustomCont").classList.contains("disabled"))
            document.getElementById("inputRiskClassCustomCont").classList.add("disabled");

        // ???
        if (previous_selections[3] != risk_cls_val){
            document.getElementById("inputRiskClassSubtitle").value = riskClass.class[risk_cls_val].toUpperCase();
            previous_selections[3] = risk_cls_val;
        }

        main_color = "var("+riskClass.color[risk_cls_val]+")";
        bg_color = "var("+riskClass.colorSecondary[risk_cls_val]+")";
        img_bg_color = "var("+riskClass.colorTertiary[risk_cls_val]+")";

        image_path = riskClass.path[risk_cls_val];

        level_txt = risk_cls_val;
    }
    
    obj_class_subtitle_txt = document.getElementById("inputRiskClassSubtitle").value;

    if (document.getElementById("acsRiskImg").src != image_path && risk_cls_val != -1)
        document.getElementById("acsRiskImg").src = image_path;
    
    if (document.getElementById("acsRiskTextTitle").innerHTML != obj_class_subtitle_txt)
        document.getElementById("acsRiskTextTitle").innerHTML = obj_class_subtitle_txt;

    if (document.getElementById("acsRisk").style.getPropertyValue("border-color") != main_color)
        document.getElementById("acsRisk").style.setProperty("border-color", main_color);
    if (document.getElementById("acsRisk").style.getPropertyValue("background-color") != bg_color)
        document.getElementById("acsRisk").style.setProperty("background-color", bg_color);
    if (document.getElementById("acsRiskImageWrapper").style.getPropertyValue("background-color") != img_bg_color)
        document.getElementById("acsRiskImageWrapper").style.setProperty("background-color", img_bg_color);

    if (document.getElementById("acsRiskPText").innerHTML != level_txt)
        document.getElementById("acsRiskPText").innerHTML = level_txt;

    // diamond elemets.
    if (document.getElementById("acsSmallRiskImg").src != image_path && risk_cls_val != -1)
        document.getElementById("acsSmallRiskImg").src = image_path;
    if (risk_cls_val == 0 || onlyShowObjectClass){// should disable in diamond?
        if (!document.getElementById("acsSmallRiskImageCont").classList.contains("disabled"))
            document.getElementById("acsSmallRiskImageCont").classList.add("disabled");
    }else{
        if (document.getElementById("acsSmallRiskImageCont").classList.contains("disabled"))
            document.getElementById("acsSmallRiskImageCont").classList.remove("disabled");
    }

    if (document.getElementById("acsSmallRiskImageWrapper").style.getPropertyValue("background-color") != img_bg_color)
        document.getElementById("acsSmallRiskImageWrapper").style.setProperty("background-color", img_bg_color);
    if (!onlyShowObjectClass && risk_cls_val != 0){ // diamond background.
        if (document.getElementById("right-quad").style.getPropertyValue("background-color") != bg_color)
            document.getElementById("right-quad").style.setProperty("background-color", bg_color);}
    else{
        if (document.getElementById("right-quad").style.getPropertyValue("background-color") != "transparent")
            document.getElementById("right-quad").style.setProperty("background-color", "transparent");}
}

function updateOpionalOptions(){
    // Handles the extra options

    // whether to grid or stack the obj, disruption, and risk classes
    if (document.getElementById("gridCheckbox").checked == true &&
        document.getElementById("acsObjDisRisk").style.getPropertyValue("grid-template-columns") != "auto auto"){
            if (document.getElementById("acsObjDisRisk").style.getPropertyValue("grid-template-columns") == ""){
                document.getElementById("acsObjDisRisk").style.setProperty("grid-template-columns", "auto auto");}
            toggleThickBorder("acsSmallObjectImageWrapper", false);
            toggleThickBorder("acsSmallRiskImageWrapper", false);
            toggleThickBorder("acsSmallDisImageWrapper", false);
            toggleThickBorder("acsSmallObjectSecondaryImageWrapper", false);
            toggleThickBorder("acsBigObjectImageWrapper", false);
            document.getElementById("acsDiamondImg").style.setProperty("width", "");
            if (!document.getElementById("acsbar").classList.contains("min715")){
                document.getElementById("acsbar").classList.remove("min560");
                document.getElementById("acsbar").classList.add("min715");
            }
            updateTextScale()
    }
    else if (document.getElementById("gridCheckbox").checked == false &&
        document.getElementById("acsObjDisRisk").style.getPropertyValue("grid-template-columns") != ""){
            if (document.getElementById("acsObjDisRisk").style.getPropertyValue("grid-template-columns") == "auto auto"){
                document.getElementById("acsObjDisRisk").style.setProperty("grid-template-columns", "");}
            toggleThickBorder("acsSmallObjectImageWrapper", true);
            toggleThickBorder("acsSmallRiskImageWrapper", true);
            toggleThickBorder("acsSmallDisImageWrapper", true);
            toggleThickBorder("acsSmallObjectSecondaryImageWrapper", true);
            toggleThickBorder("acsBigObjectImageWrapper", true);
            document.getElementById("acsDiamondImg").style.setProperty("width", "235px");
            if (!document.getElementById("acsbar").classList.contains("min560")){
                document.getElementById("acsbar").classList.remove("min715");
                document.getElementById("acsbar").classList.add("min560");
            }
            updateTextScale()
    }
    
}

function updateTextScale(){
    let dis_cls_val = parseInt(document.getElementById("inputDisruptionClass").value);
    let risk_cls_val = parseInt(document.getElementById("inputRiskClass").value);
    if (document.getElementById("gridCheckbox").checked == false && dis_cls_val == 0 && risk_cls_val == 0)
        document.documentElement.style.setProperty('--textScale', '1.6');
    else if (document.getElementById("gridCheckbox").checked == true || dis_cls_val != 0 || risk_cls_val != 0)
        document.documentElement.style.setProperty('--textScale', '1');
}

function toggleThickBorder(imgWrapper, thick){
    let addclass = "thinborder";
    let remclass = "thickborder";
    if (thick) {
        addclass = "thickborder";
        remclass = "thinborder";}
    if (document.getElementById(imgWrapper).classList.contains(remclass)){
        document.getElementById(imgWrapper).classList.remove(remclass);
        document.getElementById(imgWrapper).classList.add(addclass);
    }
}

function updateUI(){
    // Update the UI.
    updateInput();
}

// Update the UI every 100ms.
setInterval(updateUI, 100);


// ???
var display = {
    setWidth: function(width){
        if (width < 0)
            width = document.getElementById("acsBarWidthInput").value;
        document.getElementById("acsbar").style.setProperty("width", width);
    }
}

function setWidth(width){
    // set the width of the acs bar depending on parameter. if negative, get width from acsBarWidthInput.
    if (width < 0)
        width = document.getElementById("acsBarWidthInput").value
    width = width + "px";
    document.getElementById("acsbar").style.width = width;
}

function hexToRgbA(hex, alpha){
    // Convert HEX to RGBA.
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
    }
    throw new Error('Bad Hex');
}

async function imageToDataURL(url) {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

function changeImage(input, imgID){
    if (typeof input === "string"){
        data = imageToDataURL(input)
        if (document.getElementById(imgID).src != data){
            document.getElementById(imgID).src = data
        }
        return
    }
    readImage(input, imgID)
}

function readImage(input, imgID) {
    // Read image uploaded to <input> and set it to the src of a <img>.
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      if (document.getElementById(imgID).src != event.target.result){
      document.getElementById(imgID).src = event.target.result;}
    });
    if (input.files.length > 0)
        reader.readAsDataURL(input.files[0]);
}

function changeObjectImage(input, imgID, secImgID, bigImg) {
    // Handles setting uploaded Object Class image to the various <img> elements.

    let obj_clss_val = parseInt(document.getElementById("inputPrimaryObjectClass").value);
    let sec_obj_clss_val = parseInt(document.getElementById("inputSecondaryObjectClass").value);

    // If both object classes are custom, and your changing the obj class image, change the seconday obj class image instead.
    // Eg. If you choose Primary=Esoteric, Sec=Thaumial, Esoteric will go into seconday image, and thaumial into primary.
    if (obj_clss_val == -1 && sec_obj_clss_val == -1 && imgID == "acsObjectImg") {
        changeImage(input, "acsSecondaryObjectImg");
    }
    // If the seconday obj class is custom, and you changing the diamond obj class image, changing the diamond seconday image element instead.
    else if (sec_obj_clss_val == -1 && imgID == 'acsSmallObjectImg'){
        changeImage(input, 'acsSmallObjectSecondaryImg');
    }
    // Otherwise change obj class image.
    else if (imgID != ""){
        changeImage(input, imgID);
    }

    // Change the secondary obj class image.
    if (secImgID != "")
        changeImage(input, secImgID);

    // Change the diamond obj class image when theres no disruption or risk class.
    if (bigImg != "")
        changeImage(input, bigImg);
}

function changeDisRiskImage(input, imgID, secImgID){
    // Handles setting uploaded Disruption Class image to the various <img> elements.

    if (imgID != ""){
        changeImage(input, imgID);
    }
    // Change the secondary obj class image.
    if (secImgID != "")
        changeImage(input, secImgID);
}

function updateCustomImages(is_file){
    // Update all the images.
    if (is_file){
        changeObjectImage(document.getElementById("inputSecondaryObjectClassImage"), 'acsSmallObjectImg', 'acsObjectImg', 'acsBigObjectImg');
    }
    else{
        changeObjectImage(document.getElementById("inputSecondaryObjectClassImageURL").value, 'acsSmallObjectImg', 'acsObjectImg', 'acsBigObjectImg');
    }
    changeObjectImage(document.getElementById("inputPrimaryObjectClassImage"), 'acsObjectImg', 'acsSmallObjectImg', 'acsBigObjectImg');
    changeDisRiskImage(document.getElementById("inputDisruptionClassImage"), "acsDisImg", "acsSmallDisImg")
    changeDisRiskImage(document.getElementById("inputRiskClassImage"), "acsRiskImg", "acsSmallRiskImg")
}

function removeInfoBox(id){
    // Remove info box and add it to the "do not show up again list".
    if (!document.getElementById(id).classList.contains("hidden")){
        document.getElementById(id).classList.add("hidden");

        // the "do not show up again list":
        firstTimes.push(id);
        localStorage.setItem('firstTimes', JSON.stringify(firstTimes));
    }
}

function copyText(id) {
    // Copy text of given element id.
    // Get the text from the paragraph.
    let text = document.getElementById(id).innerText;

    // Use Clipboard API to copy text.
    navigator.clipboard.writeText(text)
        .then(() => {
            alert("Text copied!");
        })
        .catch(err => {
            console.error("Failed to copy text: ", err);
        });
}

function getSecondaryClassURL(){
    // if url exists return it plus icon syntax. else nothing.
    let sec_obj_cls_val = parseInt(document.getElementById("inputSecondaryObjectClass").value)
    if (sec_obj_cls_val == 0) return ""
    if (sec_obj_cls_val == -1){
        return "<br>|secondary-icon= " + document.getElementById("inputSecondaryObjectClassImageURL").value
    }
    return "<br>|secondary-icon= " + objSecondaryClass.url[sec_obj_cls_val]
}

function getPrimaryClassText(){
    // return container class.
    let obj_cls_val = parseInt(document.getElementById("inputPrimaryObjectClass").value)
    if (obj_cls_val != -1){
        return objClass.class[obj_cls_val].toLowerCase()
    }
    else return document.getElementById("inputPrimaryObjectClassSubtitle").value.toLowerCase()
}

function generateWikiSyntax(){
    // Generate wiki syntax codeblock.
    let output = ("[[include :scp-wiki:component:anomaly-class-bar-source" +
    "<br>|item-number= " + document.getElementById("inputItemTitle").value +
    "<br>|clearance= " + document.getElementById("inputAccessLevel").value +
    "<br>|container-class= " + getPrimaryClassText() +
    "<br>|secondary-class= " + document.getElementById("inputSecondaryObjectClassSubtitle").value.toLowerCase() +
    getSecondaryClassURL() +
    "<br>|disruption-class= " + disruptionClass.class[parseInt(document.getElementById("inputDisruptionClass").value)].toLowerCase() +
    "<br>|risk-class= " + riskClass.class[parseInt(document.getElementById("inputRiskClass").value)].toLowerCase() +
    "<br>]]")

    document.getElementById("outputSyntaxText").innerHTML = output
}

// Theme stuff

var theme = localStorage.getItem("theme");
if (theme != null) {
    document.documentElement.style.setProperty('--theme', theme);
    if (theme == "dark") document.getElementById("themeToggle").checked = true;
}

var tabs = document.getElementsByClassName("default-tab");
if (tabs.length != 0){
    for (let i = 0; i < tabs.length; i++){
        tabs[i].click();
    }
}

function toggleTheme() {
    if (document.getElementById("themeToggle").checked == true)
        goDark()
    else
        goLight()
    
}

function goDark(){
    document.documentElement.style.setProperty('--theme', 'dark');
    localStorage.setItem("theme", "dark");
    document.documentElement.style.setProperty('--black', '#fff');

    // document.getElementById("invertCheckbox").checked = false;

    if (document.getElementById("invertRingsCheckbox").checked){
        document.documentElement.style.setProperty('--ringblack', '#fff');
        document.documentElement.style.setProperty('--textWhite', '#000');
    }

    if (document.getElementById("invertBordersCheckbox").checked)
        document.documentElement.style.setProperty('--borderblack', '#fff');

    if (document.getElementById("invertDiamondCheckbox").checked)
        document.getElementById("acsDiamondImg").classList.add("invert")
}

function goLight(){
    document.documentElement.style.setProperty('--theme', 'light');
    localStorage.setItem("theme", "light");

    document.documentElement.style.setProperty('--black', '#000');

    // document.getElementById("invertCheckbox").checked = true;

    if (document.getElementById("invertRingsCheckbox").checked){
        document.documentElement.style.setProperty('--ringblack', '#000');
        document.documentElement.style.setProperty('--textWhite', '#fff');
    }

    if (document.getElementById("invertBordersCheckbox").checked)
        document.documentElement.style.setProperty('--borderblack', '#000');

    if (document.getElementById("invertDiamondCheckbox").checked)
        document.getElementById("acsDiamondImg").classList.remove("invert")
}

function clearInputs(pasteParent, fileParent){
    document.getElementById(fileParent).value = "";
    deleteChildren(pasteParent);
}

function deleteChildren(parent){
    document.getElementById(parent).innerHTML = "";
}