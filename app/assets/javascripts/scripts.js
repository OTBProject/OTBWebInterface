$(document).ready(function () {

    $('table').stickyTableHeaders({fixedOffset: $('#header')});
    if (location.href.containsIgnoreCase("commands/show")) {
        scrollToCommand(command);
        $('#user_levels').val(user_level);
        getUserLevels();
        $("[name='below']").bootstrapSwitch();
    } else if (location.href.containsIgnoreCase('commands')) {
        getUserLevels();
        $("[name='below']").bootstrapSwitch();
        on_userLevelChange();
    }

    if (location.href.containsIgnoreCase('aliases')) {
        $('#tableBodyAliases').load((location.href + "").replace(/\/show.*/i, "") + "/show");
    }else
    if (location.href.containsIgnoreCase("aliases/show")) {
        scrollToAlias(alias);
    }
    if (location.href.containsIgnoreCase('quotes')) {
        $('#tableBodyQuotes').load((location.href + "").replace(/\/show.*/i, "") + "/show");
    }else
    if (location.href.containsIgnoreCase("quotes/show")) {
        scrollToQuote(quote);
    }

    $('#dropdownMenuNavBar').parent('.dropdown').on('show.bs.dropdown',function(){alert('12312')})
});

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

String.prototype.capitalizeWords = function () {
    var words = this.split(" ");
    var newString = "";
    words.forEach(function (word) {
        newString += " " + word.capitalize();
    });
    return newString;
};

String.prototype.containsIgnoreCase = function (str1) {
    return ~this.toLowerCase().indexOf(str1.toLowerCase())
};

String.prototype.contains = function (str1) {
    return ~this.indexOf(str1)
};

function getUserLevels() {
    var select = $('#user_levels');
    $.getJSON('/dashboard/user_levels', {}, function (data) {
        data.forEach(function (user_level) {
            select.append($('<option/>').val(user_level).text(user_level.replace('_', ' ').capitalizeWords()));
        })
    })
}

function on_userLevelChange() {
    var userLevelsSelect = $('#user_levels');
    var div = $('#andBelow');
    if (userLevelsSelect.val() == 'ALL' || userLevelsSelect.val() == "DEFAULT" || userLevelsSelect.val() == "") {
        div.addClass('hidden');
    } else {
        div.removeClass('hidden');
    }
    $('#tableBodyCommands').load((location.href + "").replace(/\/show.*/i, "") + "/show", $('#commandsForm').serialize());
}

function editCommand(command) {

}
function toggleCommand(command) {

}
function deleteCommand(command) {

}

function newCommand() {

}

function scrollToCommand(commandstr) {
    var element = $("th:contains(" + commandstr + ")");
    console.log(element.html());
    $('html, body').animate({
            scrollTop: (element.offset().top - $('nav').height() - $('thead').height())
        }
        // uncomment when fixed rendering in non-FF
        /*,{
         duration: 500,
         done: function(){
         element.parent().addClass('animated shake');
         element.parent().css('border-top-style','none')
         }
         }*/);
    //element.parent().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', element.parent().removeClass('animated flash-blue'));
}
function scrollToAlias(aliasstr) {
    var element = $("th:contains(" + aliasstr + ")");
    console.log(element.html());
    $('html, body').animate({
            scrollTop: (element.offset().top - $('nav').height() - $('thead').height())
        }
        // uncomment when fixed rendering in non-FF
        /*,{
         duration: 500,
         done: function(){
         element.parent().addClass('animated shake');
         element.parent().css('border-top-style','none')
         }
         }*/);
    //element.parent().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', element.parent().removeClass('animated flash-blue'));
}

function scrollToQuote(quotestr) {
    var element = $("th:contains(" + quotestr + ")");
    console.log(element.html());
    $('html, body').animate({
            scrollTop: (element.offset().top - $('nav').height() - $('thead').height())
        }
        // uncomment when fixed rendering in non-FF
        /*,{
         duration: 500,
         done: function(){
         element.parent().addClass('animated shake');
         element.parent().css('border-top-style','none')
         }
         }*/);
    //element.parent().one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', element.parent().removeClass('animated flash-blue'));
}

function copyPermaLink(event) {
    var url;
    if (location.href.containsIgnoreCase('commands')) {
        //show?user_level= ALL &command=!command
        var ul = $('#user_levels').val();
        var command = $(event.target).closest('tr').find('th').text();
        url = location.href.substring(location.href.length -1) === '/' ?location.href.substring(0,location.href.length -1)  :location.href;
        url = url.replace(/\/show.*/i, "") + '/show?user_level=' + ul + "&command=" + encodeURIComponent(command);
    } else if (location.href.containsIgnoreCase('aliases')) {
        event.preventDefault();
        var alias = $(event.target).closest('tr').find('th').text();
        url = location.href.substring(location.href.length -1) === '/' ?location.href.substring(0,location.href.length -1)  :location.href;
        url = url.replace(/\/show.*/i, "") + '/show?alias=' + encodeURIComponent(alias);
    } else if (location.href.containsIgnoreCase('quotes')) {
        var quote = $(event.target).closest('tr').find('th').text();
        url = location.href.substring(location.href.length -1) === '/' ?location.href.substring(0,location.href.length -1)  :location.href;
        url = url.replace(/\/show.*/i, "") + '/show?quote=' + encodeURIComponent(quote);
    }
    event.preventDefault();
    var copied = copyText(url);
    if(copied){
        $(event.target).text('Copied');
        setTimeout(function(){ $(event.target).text('Permalink'); }, 1000);
    }
}

function copyText(text) {
    var textArea = document.createElement("textarea");

    //
    // *** This styling is an extra step which is likely not required. ***
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a flash,
    // so some of these are just precautions. However in IE the element
    // is visible whilst the popup box asking the user for permission for
    // the web page to copy to the clipboard.
    //

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';


    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.select();
    var copied
    copied  = document.execCommand('copy');
    document.body.removeChild(textArea);
    return copied
}