var Ossn = Ossn || {};
Ossn.Startups = new Array();
Ossn.RegisterStartupFunction = function($func) {
    Ossn.Startups.push($func);
};
Ossn.ajaxRequest = function($data) {
    $(function() {
        var $form_name = $data['form'];
        var url = $data['url'];
        var callback = $data['callback'];
        var error = $data['error'];
        var befsend = $data['beforeSend'];
        var action = $data['action'];
        var containMedia = $data['containMedia'];
        var $xhr = $data['xhr'];
        if (url == true) {
            url = $($form_name).attr('action');
        }
        $('body').on("submit", $form_name, function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            if (!callback) {
                return false;
            }
            if (!befsend) {
                befsend = function() {}
            }
            if (!action) {
                action = false;
            }
            if (action == true) {
                url = Ossn.AddTokenToUrl(url);
            }
            if (!error) {
                error = function(xhr, status, error) {
                    if (error == 'Internal Server Error' || error !== '') {
                        Ossn.MessageBox('syserror/unknown');
                    }
                };
            }
            if (!$xhr) {
                $xhr = function() {
                    var xhr = new window.XMLHttpRequest();
                    return xhr;
                };
            }
            var $form = $(this);
            if (containMedia == true) {
                $requestData = new FormData($form[0]);
                $removeNullFile = function(formData) {
                    if (formData.keys) {
                        for (var key of formData.keys()) {
                            var fileName = null || formData.get(key)['name'];
                            var fileSize = null || formData.get(key)['size'];
                            if (fileName != null && fileSize != null && fileName == '' && fileSize == 0) {
                                formData.delete(key);
                            }
                        }
                    }
                };
                $removeNullFile($requestData);
                $vars = {
                    xhr: $xhr,
                    async: true,
                    cache: false,
                    contentType: false,
                    type: 'post',
                    beforeSend: befsend,
                    url: url,
                    error: error,
                    data: $requestData,
                    processData: false,
                    success: callback,
                };
            } else {
                $vars = {
                    xhr: $xhr,
                    async: true,
                    type: 'post',
                    beforeSend: befsend,
                    url: url,
                    error: error,
                    data: $form.serialize(),
                    success: callback,
                };
            }
            $.ajax($vars);
        });
    });
};
Ossn.PostRequest = function($data) {
    var url = $data['url'];
    var callback = $data['callback'];
    var error = $data['error'];
    var befsend = $data['beforeSend'];
    var $fdata = $data['params'];
    var action = $data['action'];
    var $xhr = $data['xhr'];
    if (!callback) {
        return false;
    }
    if (!befsend) {
        befsend = function() {}
    }
    if (!action) {
        action = true;
    }
    if (action == true) {
        url = Ossn.AddTokenToUrl(url);
    }
    if (!error) {
        error = function() {};
    }
    if (!$xhr) {
        $xhr = function() {
            var xhr = new window.XMLHttpRequest();
            return xhr;
        };
    }
    /*$.ajax({
        xhr: $xhr,
        async: true,
        type: 'post',
        beforeSend: befsend,
        url: url,
        error: error,
        data: $fdata,
        success: callback,
    });*/
};
Ossn.MessageDone = function($message) {
    return "<div class='ossn-message-done'>" + $message + "</div>";
};
Ossn.redirect = function($url) {
    window.location = Ossn.site_url + $url;
};
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        $('.profile-cover').hover(function() {
            $('.profile-cover-controls').find('a').show();
        }, function() {
            $('.profile-cover-controls').find('a').hide();
        });
    });
});
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        $('.profile-photo').hover(function() {
            $('.upload-photo').slideDown();
        }, function() {
            $('.upload-photo').slideUp();
        });
    });
});
Ossn.RegisterStartupFunction(function() {
    Ossn.ajaxRequest({
        url: Ossn.site_url + "action/user/register",
        form: '#ossn-home-signup',
        beforeSend: function(request) {
            var failedValidate = false;
            $('#ossn-submit-button').show();
            $('#ossn-home-signup .ossn-loading').addClass("ossn-hidden");
            $('#ossn-home-signup').find('#ossn-signup-errors').hide();
            $('#ossn-home-signup input').filter(function() {
                $(this).closest('span').removeClass('ossn-required');
                if (this.type == 'radio') {
                    if (!$("input[name='gender']:checked").val()) {
                        $(this).closest('span').addClass('ossn-required');
                        failedValidate = true;
                    }
                }
                if (this.value == "") {
                    $(this).addClass('ossn-red-borders');
                    failedValidate = true;
                    request.abort();
                    return false;
                }
            });
            if (failedValidate == false) {
                $('#ossn-submit-button').hide();
                $('#ossn-home-signup .ossn-loading').removeClass("ossn-hidden");
            }
        },
        callback: function(callback) {
            if (callback['dataerr']) {
                $('#ossn-home-signup').find('#ossn-signup-errors').html(callback['dataerr']).fadeIn();
                $('#ossn-submit-button').show();
                $('#ossn-home-signup .ossn-loading').addClass("ossn-hidden");
            } else if (callback['success'] == 1) {
                $('#ossn-home-signup').html(Ossn.MessageDone(callback['datasuccess']));
            } else {
                $('#ossn-home-signup .ossn-loading').addClass("ossn-hidden");
                $('#ossn-submit-button').attr('type', 'submit')
                $('#ossn-submit-button').attr('style', 'opacity:1;');
            }
        }
    });
});
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        if ($('.ossn-system-messages').find('a').length) {
            $('.ossn-system-messages').find('.ossn-system-messages-inner').show();
            $('.ossn-system-messages').find('.ossn-system-messages-inner').animate({
                opacity: 0.9
            }, 10000, function() {
                $('.ossn-system-messages').find('.ossn-system-messages-inner').empty();
            }).slideUp('slow');
        }
    });
});
Ossn.trigger_message = function($message, $type) {
    $type = $type || 'success';
    if ($type == 'error') {
        $type = 'danger';
    }
    if ($message == '') {
        return false;
    }
    $html = "<div class='alert alert-" + $type + "'><a href=\"#\" class=\"close\" data-dismiss=\"alert\">&times;</a>" + $message + "</div>";
    $('.ossn-system-messages').find('.ossn-system-messages-inner').append($html);
    if ($('.ossn-system-messages').find('.ossn-system-messages-inner').is(":not(:visible)")) {
        $('.ossn-system-messages').find('.ossn-system-messages-inner').slideDown('slow');
    }
    $('.ossn-system-messages').find('.ossn-system-messages-inner').animate({
        opacity: 0.9
    }, 10000, function() {
        $('.ossn-system-messages').find('.ossn-system-messages-inner').empty();
    }).slideUp('slow');
};
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        $('.ossn-topbar-dropdown-menu-button').click(function() {
            if ($('.ossn-topbar-dropdown-menu-content').is(":not(:visible)")) {
                $('.ossn-topbar-dropdown-menu-content').show();
            } else {
                $('.ossn-topbar-dropdown-menu-content').hide();
            }
        });
    });
});
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        $('.ossn-com-delete-button').click(function(e) {
            e.preventDefault();
            var del = confirm(Ossn.Print('ossn:component:delete:exception'));
            if (del == true) {
                var actionurl = $(this).attr('href');
                window.location = actionurl;
            }
        });
    });
});
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        $('.ossn-make-sure').click(function(e) {
            e.preventDefault();
            var del = confirm(Ossn.Print('ossn:exception:make:sure'));
            if (del == true) {
                var actionurl = $(this).attr('href');
                window.location = actionurl;
            }
        });
    });
});
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        $('.userdelete').click(function(e) {
            e.preventDefault();
            var del = confirm(Ossn.Print('ossn:user:delete:exception'));
            if (del == true) {
                var actionurl = $(this).attr('href');
                window.location = actionurl;
            }
        });
    });
});
Ossn.MessageBoxClose = function() {
    $('.ossn-message-box').hide();
    $('.ossn-halt').removeClass('ossn-light').hide();
    $('.ossn-halt').attr('style', '');
};
Ossn.MessageBox = function($url) {
    Ossn.PostRequest({
        url: Ossn.site_url + $url,
        beforeSend: function() {
            $('.ossn-halt').addClass('ossn-light');
            $('.ossn-halt').attr('style', 'height:' + $(document).height() + 'px;');
            $('.ossn-halt').show();
            $('.ossn-message-box').fadeIn('slow');
        },
        callback: function(callback) {
            $('.ossn-message-box').html(callback).fadeIn();
        },
    });
};
Ossn.Viewer = function($url) {
    Ossn.PostRequest({
        url: Ossn.site_url + $url,
        beforeSend: function() {
            $('.ossn-halt').removeClass('ossn-light');
            $('.ossn-halt').show();
            $('.ossn-viewer').html('<table class="ossn-container"><tr><td class="image-block" style="text-align: center;width:100%;"><div class="ossn-viewer-loding">Loading...</div></td></tr></table>');
            $('.ossn-viewer').show();
        },
        callback: function(callback) {
            $('.ossn-viewer').html(callback).show();
        },
    });
};
Ossn.ViewerClose = function($url) {
    $('.ossn-halt').addClass('ossn-light');
    $('.ossn-halt').hide();
    $('.ossn-viewer').html('');
    $('.ossn-viewer').hide();
};
Ossn.Clk = function($elem) {
    $($elem).click();
};
Ossn.UrlParams = function(name, url) {
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
    if (!results) {
        return 0;
    }
    return results[1] || 0;
};
Ossn.ParseStr = function(string) {
    var params = {},
        result, key, value, re = /([^&=]+)=?([^&]*)/g,
        re2 = /\[\]$/;
    while (result = re.exec(string)) {
        key = decodeURIComponent(result[1].replace(/\+/g, ' '));
        value = decodeURIComponent(result[2].replace(/\+/g, ' '));
        if (re2.test(key)) {
            key = key.replace(re2, '');
            if (!params[key]) {
                params[key] = [];
            }
            params[key].push(value);
        } else {
            params[key] = value;
        }
    }
    return params;
};
Ossn.ParseUrl = function(url, component, expand) {
    expand = expand || false;
    component = component || false;
    var re_str = '^(?:(?![^:@]+:[^:@/]*@)([^:/?#.]+):)?(?://)?' +
        '((?:(([^:@]*)(?::([^:@]*))?)?@)?' +
        '([^:/?#]*)(?::(\\d*))?)' +
        '(((/(?:[^?#](?![^?#/]*\\.[^?#/.]+(?:[?#]|$)))*/?)?([^?#/]*))' +
        '(?:\\?([^#]*))?' +
        '(?:#(.*))?)',
        keys = {
            1: "scheme",
            4: "user",
            5: "pass",
            6: "host",
            7: "port",
            9: "path",
            12: "query",
            13: "fragment"
        },
        results = {};
    if (url.indexOf('mailto:') === 0) {
        results['scheme'] = 'mailto';
        results['path'] = url.replace('mailto:', '');
        return results;
    }
    if (url.indexOf('javascript:') === 0) {
        results['scheme'] = 'javascript';
        results['path'] = url.replace('javascript:', '');
        return results;
    }
    var re = new RegExp(re_str);
    var matches = re.exec(url);
    for (var i in keys) {
        if (matches[i]) {
            results[keys[i]] = matches[i];
        }
    }
    if (expand && typeof(results['query']) != 'undefined') {
        results['query'] = ParseStr(results['query']);
    }
    if (component) {
        if (typeof(results[component]) != 'undefined') {
            return results[component];
        } else {
            return false;
        }
    }
    return results;
};
Ossn.AddTokenToUrl = function(data) {
    if (typeof data === 'string') {
        var parts = Ossn.ParseUrl(data),
            args = {},
            base = '';
        if (parts['host'] === undefined) {
            if (data.indexOf('?') === 0) {
                base = '?';
                args = Ossn.ParseStr(parts['query']);
            }
        } else {
            if (parts['query'] !== undefined) {
                args = Ossn.ParseStr(parts['query']);
            }
            var split = data.split('?');
            base = split[0] + '?';
        }
        args["ossn_ts"] = Ossn.Config.token.ossn_ts;
        args["ossn_token"] = Ossn.Config.token.ossn_token;
        return base + jQuery.param(args);
    }
};
var sprintf = (function() {
    function get_type(variable) {
        return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }

    function str_repeat(input, multiplier) {
        for (var output = []; multiplier > 0; output[--multiplier] = input) {}
        return output.join('');
    }
    var str_format = function() {
        if (!str_format.cache.hasOwnProperty(arguments[0])) {
            str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
        }
        return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
    };
    str_format.format = function(parse_tree, argv) {
        var cursor = 1,
            tree_length = parse_tree.length,
            node_type = '',
            arg, output = [],
            i, k, match, pad, pad_character, pad_length;
        for (i = 0; i < tree_length; i++) {
            node_type = get_type(parse_tree[i]);
            if (node_type === 'string') {
                output.push(parse_tree[i]);
            } else if (node_type === 'array') {
                match = parse_tree[i];
                if (match[2]) {
                    arg = argv[cursor];
                    for (k = 0; k < match[2].length; k++) {
                        if (!arg.hasOwnProperty(match[2][k])) {
                            throw (sprintf('[sprintf] property "%s" does not exist', match[2][k]));
                        }
                        arg = arg[match[2][k]];
                    }
                } else if (match[1]) {
                    arg = argv[match[1]];
                } else {
                    arg = argv[cursor++];
                }
                if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
                    throw (sprintf('[sprintf] expecting number but found %s', get_type(arg)));
                }
                switch (match[8]) {
                    case 'b':
                        arg = arg.toString(2);
                        break;
                    case 'c':
                        arg = String.fromCharCode(arg);
                        break;
                    case 'd':
                        arg = parseInt(arg, 10);
                        break;
                    case 'e':
                        arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential();
                        break;
                    case 'f':
                        arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg);
                        break;
                    case 'o':
                        arg = arg.toString(8);
                        break;
                    case 's':
                        arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg);
                        break;
                    case 'u':
                        arg = Math.abs(arg);
                        break;
                    case 'x':
                        arg = arg.toString(16);
                        break;
                    case 'X':
                        arg = arg.toString(16).toUpperCase();
                        break;
                }
                arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+' + arg : arg);
                pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
                pad_length = match[6] - String(arg).length;
                pad = match[6] ? str_repeat(pad_character, pad_length) : '';
                output.push(match[5] ? arg + pad : pad + arg);
            }
        }
        return output.join('');
    };
    str_format.cache = {};
    str_format.parse = function(fmt) {
        var _fmt = fmt,
            match = [],
            parse_tree = [],
            arg_names = 0;
        while (_fmt) {
            if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
                parse_tree.push(match[0]);
            } else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
                parse_tree.push('%');
            } else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1;
                    var field_list = [],
                        replacement_field = match[2],
                        field_match = [];
                    if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                        field_list.push(field_match[1]);
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                            if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1]);
                            } else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1]);
                            } else {
                                throw ('[sprintf] huh?');
                            }
                        }
                    } else {
                        throw ('[sprintf] huh?');
                    }
                    match[2] = field_list;
                } else {
                    arg_names |= 2;
                }
                if (arg_names === 3) {
                    throw ('[sprintf] mixing positional and named placeholders is not (yet) supported');
                }
                parse_tree.push(match);
            } else {
                throw ('[sprintf] huh?');
            }
            _fmt = _fmt.substring(match[0].length);
        }
        return parse_tree;
    };
    return str_format;
})();
var vsprintf = function(fmt, argv) {
    argv.unshift(fmt);
    return sprintf.apply(null, argv);
};
Ossn.Print = function(str, args) {
    if (OssnLocale[str]) {
        if (!args) {
            return OssnLocale[str];
        } else {
            return vsprintf(OssnLocale[str], args);
        }
    }
    return str;
};
Ossn.isLangString = function(str, args) {
    if (OssnLocale[str]) {
        return true;
    }
    return false;
};
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        if ($('.avaiable-updates').length) {
            Ossn.PostRequest({
                url: Ossn.site_url + "administrator/version",
                action: false,
                callback: function(callback) {
                    if (callback['version']) {
                        $('.avaiable-updates').html(callback['version']);
                    }
                }
            });
        }
    });
});
Ossn.Init = function() {
    for (var i = 0; i <= Ossn.Startups.length; i++) {
        if (typeof Ossn.Startups[i] !== "undefined") {
            Ossn.Startups[i]();
        }
    }
};
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip({
        placement: 'left',
    });
    $(document).on('click', '#sidebar-toggle', function() {
        var $toggle = $(this).attr('data-toggle');
        if ($toggle == 0) {
            $(this).attr('data-toggle', 1);
            if ($(document).innerWidth() >= 1700 /*&& $('.ossn-page-loading-annimation').is(':visible')*/) {
                $('.sidebar').addClass('sidebar-open-no-annimation');
                $('.ossn-page-container').addClass('sidebar-open-page-container-no-annimation');
            } else {
                $('.sidebar').addClass('sidebar-open');
                $('.ossn-page-container').addClass('sidebar-open-page-container');
            }
            $('.topbar .right-side').addClass('right-side-space');
            $('.topbar .right-side').addClass('sidebar-hide-contents-xs');
            $('.ossn-inner-page').addClass('sidebar-hide-contents-xs');
            /*181207 승민추가
            $('#topbar-search-area').hide();*/
        }
        if ($toggle == 1) {
            $(this).attr('data-toggle', 0);
            $('.sidebar').removeClass('sidebar-open');
            $('.sidebar').removeClass('sidebar-open-no-annimation');
            $('.ossn-page-container').removeClass('sidebar-open-page-container');
            $('.ossn-page-container').removeClass('sidebar-open-page-container-no-annimation');
            $('.topbar .right-side').removeClass('right-side-space');
            $('.topbar .right-side').removeClass('sidebar-hide-contents-xs');
            $('.ossn-inner-page').removeClass('sidebar-hide-contents-xs');
            $('.topbar .right-side').addClass('right-side-nospace');
            $('.sidebar').addClass('sidebar-close');
            $('.ossn-page-container').addClass('sidebar-close-page-container');
            /*181207 승민추가
            $('#topbar-search-area').show();*/
        }
        var document_height = $(document).height();
        $(".sidebar").height(document_height);
    });
    var $chatsidebar = $('.ossn-chat-windows-long .inner');
    if ($chatsidebar.length) {
        $chatsidebar.css('height', $(window).height() - 45);
    }
    $(document).scroll(function() {
        $document_height = $(document).height();
        $(".sidebar").height($document_height);
        if ($chatsidebar.length) {
            if ($(document).scrollTop() >= 50) {
                $chatsidebar.addClass('ossnchat-scroll-top');
                $chatsidebar.css('height', $(window).height());
            } else if ($(document).scrollTop() == 0) {
                $chatsidebar.removeClass('ossnchat-scroll-top');
                $chatsidebar.css('height', $(window).height() - 45);
            }
        }
    });
    if ($(document).innerWidth() >= 1300) {
        $('#sidebar-toggle').click();
    }
});
$(window).load(function() {
    $(".ossn-page-loading-annimation").fadeOut("slow");
});
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        var cYear = (new Date).getFullYear();
        var alldays = Ossn.Print('datepicker:days');
        var shortdays = alldays.split(",");
        var allmonths = Ossn.Print('datepicker:months');
        var shortmonths = allmonths.split(",");
        var datepick_args = {
            changeMonth: true,
            changeYear: true,
            dateFormat: 'dd/mm/yy',
            yearRange: '1950:' + cYear,
        };
        if (Ossn.isLangString('datepicker:days')) {
            datepick_args['dayNamesMin'] = shortdays;
        }
        if (Ossn.isLangString('datepicker:months')) {
            datepick_args['monthNamesShort'] = shortmonths;
        }
        $("input[name='birthdate']").datepicker(datepick_args);
        $('#reposition-cover').click(function() {
            $('#profile-menu').hide();
            $('#cover-menu').show();
            $(function() {
                $.globalVars = {
                    originalTop: 0,
                    originalLeft: 0,
                    maxHeight: $("#draggable").height() - $("#container").height(),
                    maxWidth: $("#draggable").width() - $("#container").width()
                };
                $("#draggable").draggable({
                    start: function(event, ui) {
                        if (ui.position != undefined) {
                            $.globalVars.originalTop = ui.position.top;
                            $.globalVars.originalLeft = ui.position.left;
                        }
                    },
                    drag: function(event, ui) {
                        var newTop = ui.position.top;
                        var newLeft = ui.position.left;
                        if (ui.position.top < 0 && ui.position.top * -1 > $.globalVars.maxHeight) {
                            newTop = $.globalVars.maxHeight * -1;
                        }
                        if (ui.position.top > 0) {
                            newTop = 0;
                        }
                        if (ui.position.left < 0 && ui.position.left * -1 > $.globalVars.maxWidth) {
                            newLeft = $.globalVars.maxWidth * -1;
                        }
                        if (ui.position.left > 0) {
                            newLeft = 0;
                        }
                        ui.position.top = newTop;
                        ui.position.left = newLeft;
                        Ossn.ProfileCover_top = newTop;
                        Ossn.ProfileCover_left = newLeft;
                    }
                });
            });
        });
        $("#upload-photo").submit(function(event) {
            event.preventDefault();
            var formData = new FormData($(this)[0]);
            var $url = Ossn.site_url + 'action/profile/photo/upload';
            $.ajax({
                url: Ossn.AddTokenToUrl($url),
                type: 'POST',
                data: formData,
                async: true,
                beforeSend: function() {
                    $('.upload-photo').attr('class', 'user-photo-uploading');
                },
                error: function(xhr, status, error) {
                    if (error == 'Internal Server Error' || error !== '') {
                        Ossn.MessageBox('syserror/unknown');
                    }
                },
                cache: false,
                contentType: false,
                processData: false,
                success: function(callback) {
                    $time = $.now();
                    $('.user-photo-uploading').attr('class', 'upload-photo').hide();
                    $imageurl = $('.profile-photo').find('img').attr('src') + '?' + $time;
                    $('.profile-photo').find('img').attr('src', $imageurl);
                    $topbar_icon_url = $('.ossn-topbar-menu').find('img').attr('src') + '?' + $time;
                    $('.ossn-topbar-menu').find('img').attr('src', $topbar_icon_url);
                }
            });
            return false;
        });
        $("#upload-cover").submit(function(event) {
            event.preventDefault();
            var formData = new FormData($(this)[0]);
            var $url = Ossn.site_url + 'action/profile/cover/upload';
            $.ajax({
                url: Ossn.AddTokenToUrl($url),
                type: 'POST',
                data: formData,
                async: true,
                cache: false,
                contentType: false,
                processData: false,
                beforeSend: function(xhr, obj) {
                    $('.profile-cover-img').attr('class', 'user-cover-uploading');
                    var fileInput = $('#upload-cover').find("input[type=file]")[0],
                        file = fileInput.files && fileInput.files[0];
                    if (file) {
                        var img = new Image();
                        img.src = window.URL.createObjectURL(file);
                        img.onload = function() {
                            var width = img.naturalWidth,
                                height = img.naturalHeight;
                            window.URL.revokeObjectURL(img.src);
                            if (width < 850 || height < 300) {
                                xhr.abort();
                                Ossn.trigger_message(Ossn.Print('profile:cover:err1:detail'), 'error');
                                return false;
                            }
                        };
                    }
                },
                success: function(callback) {
                    $time = $.now();
                    $('.profile-cover').find('img').removeClass('user-cover-uploading');
                    $imageurl = $('.profile-cover').find('img').attr('src') + '?' + $time;
                    $('.profile-cover').find('img').attr('src', $imageurl);
                    $('.profile-cover').find('img').attr('style', '');
                },
            });
            return false;
        });
        $('#profile-extra-menu').on('click', function() {
            $div = $('.ossn-profile-extra-menu').find('div');
            if ($div.is(":not(:visible)")) {
                $div.show();
            } else {
                $div.hide();
            }
        });
    });
});
Ossn.repositionCOVER = function() {
    var $pcover_top = $('.profile-cover-img').css('top');
    var $pcover_left = $('.profile-cover-img').css('left');
    $url = Ossn.site_url + "action/profile/cover/reposition";
    $.ajax({
        async: true,
        type: 'post',
        data: '&top=' + $pcover_top + '&left=' + $pcover_left,
        url: Ossn.AddTokenToUrl($url),
        success: function(callback) {
            $('#profile-menu').show();
            $('#cover-menu').hide();
            $("#draggable").draggable({
                drag: function() {
                    return false;
                }
            });
        },
    });
};
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        $('.ossn-wall-container').find('.ossn-wall-photo').click(function() {
        	console.log("눌렸다!");
        	if($('#ossn-wall-photo').css("display")=="block") {
        		$('#ossn-wall-photo').hide();
        	} else {
        		$('#ossn-wall-photo').show();
                $('#ossn-wall-video').hide();
        	}
        });
        $('.ossn-wall-container').find('.ossn-wall-video').click(function() {
            if($('#ossn-wall-video').css("display")=="block") {
            	$('#ossn-wall-video').hide();
            } else {
            	$('#ossn-wall-photo').hide();
                $('#ossn-wall-video').show();
            }
        });
        $('body').on('click', '.ossn-wall-container-menu-post', function(e) {
            e.preventDefault();
            $('.ossn-wall-container-data-post').hide();
            $('.ossn-wall-container-data-post').show();
        });
        /*$('body').delegate('.ossn-wall-post-edit', 'click', function() {
            var $dataguid = $(this).attr('data-guid');
            Ossn.MessageBox('post/edit/' + $dataguid);
        });*/
    });
});
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        if ($.isFunction($.fn.tokenInput)) {
            $("#ossn-wall-friend-input").tokenInput(Ossn.site_url + "friendpicker", {
                placeholder: Ossn.Print('tag:friends'),
                hintText: false,
                propertyToSearch: "first_name",
                resultsFormatter: function(item) {
                    return "<li>" + "<img src='" + item.imageurl + "' title='" + item.first_name + " " + item.last_name + "' height='25px' width='25px' />" + "<div style='display: inline-block; padding-left: 10px;'><div class='full_name' style='font-weight:bold;color:#2B5470;'>" + item.first_name + " " + item.last_name + "</div></div></li>"
                },
                tokenFormatter: function(item) {
                    return "<li><p>" + item.first_name + " " + item.last_name + "</p></li>"
                },
            });
        }
    });
});
Ossn.PostMenu = function($id) {
    $element = $($id).find('.menu-links');
    if ($element.is(":not(:visible)")) {
        $element.show();
    } else {
        $element.hide();
    }
};
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        
        $('#ossn-wall-privacy').on('click', function(e) {
            var wallprivacy = $('#ossn-wall-privacy-container').find('input[name="privacy"]:checked').val();
            $('#ossn-wall-privacy').val(wallprivacy);
            Ossn.MessageBoxClose();
        });
        var $url = $('#ossn-wall-form').attr('action');
        Ossn.ajaxRequest({
            url: $url,
            containMedia: true,
            form: '#ossn-wall-form',
            beforeSend: function(request) {
                $('#ossn-wall-form').find('input[type=submit]').hide();
                $('#ossn-wall-form').find('.ossn-loading').removeClass('ossn-hidden');
                console.log(JSON.stringify(request, null, 4));
            },
            callback: function(callback) {
                console.log(JSON.stringify(callback, null, 4));
                if (callback['success']) {
                    Ossn.trigger_message(callback['success']);
                    if (callback['data']['post']) {
                        $('.user-activity').prepend(callback['data']['post']).fadeIn();
                    }
                }
                if (callback['error']) {
                    Ossn.trigger_message(callback['error'], 'error');
                }
                var $file = $("#ossn-wall-form").find("input[type='file']");
                $file.replaceWith($file.val('').clone(true));
                $('#ossn-wall-photo').hide();
                $('#ossn-wall-video').hide();
                $("#ossn-wall-location-input").val('');
                $('#ossn-wall-location').hide();
                $('#ossn-wall-friend-input').val('');
                if ($('#ossn-wall-friend-input').length) {
                    $("#ossn-wall-friend-input").tokenInput("clear");
                    $('#ossn-wall-friend').hide();
                }
                $('#ossn-wall-form').find('input[type=submit]').show();
                $('#ossn-wall-form').find('.ossn-loading').addClass('ossn-hidden');
                $('#ossn-wall-form').find('textarea').val("");
            }
        });
    });
});
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        if ($('#ossn-wall-location-input').length) {
            var placesAutocomplete = places({
                container: document.querySelector('#ossn-wall-location-input')
            });
        }
    });
});
Ossn.PostComment = function($container) {
    $('#comment-box-' + $container).keypress(function(e) {
        if (e.which == 13) {
            if (e.shiftKey === false) {
                $replace_tags = function(input, allowed) {
                    allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('')
                    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
                    var commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi
                    return input.replace(commentsAndPhpTags, '').replace(tags, function($0, $1) {
                        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''
                    })
                };
                $text = $('#comment-box-' + $container).html();
                $text = $replace_tags($text, '<br>').replace(/\<br\\?>/g, "\n");
                $('#comment-container-' + $container).append("<textarea name='comment' class='hidden'>" + $text + "</textarea>");
                $('#comment-container-' + $container).submit();
            }
        }
    });
    $('#comment-box-' + $container).on('paste', function(e) {
        e.preventDefault();
        var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something..');
        window.document.execCommand('insertText', false, text);
    });
    Ossn.ajaxRequest({
        url: Ossn.site_url + 'action/post/comment',
        form: '#comment-container-' + $container,
        beforeSend: function(request) {
            $('#comment-box-' + $container).attr('readonly', 'readonly');
            $('#comment-box-' + $container).attr('contenteditable', false);
        },
        callback: function(callback) {
            if (callback['process'] == 1) {
                $('#comment-box-' + $container).removeAttr('readonly');
                $('#comment-box-' + $container).val('');
                $('.ossn-comments-list-' + $container).append(callback['comment']);
                $('#comment-attachment-container-' + $container).hide();
                $('#ossn-comment-attachment-' + $container).find('.image-data').html('');
                $('#comment-container-' + $container).find('input[name="comment-attachment"]').val('');
            }
            if (callback['process'] == 0) {
                $('#comment-box-' + $container).removeAttr('readonly');
                Ossn.MessageBox('syserror/unknown');
            }
            $('#comment-box-' + $container).attr('contenteditable', true);
            $('#comment-box-' + $container).html("");
        }
    });
};
Ossn.EntityComment = function($container) {
    $('#comment-box-' + $container).keypress(function(e) {
        if (e.which == 13) {
            if (e.shiftKey === false) {
                $replace_tags = function(input, allowed) {
                    allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('')
                    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
                    var commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi
                    return input.replace(commentsAndPhpTags, '').replace(tags, function($0, $1) {
                        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''
                    })
                };
                $text = $('#comment-box-' + $container).html();
                $text = $replace_tags($text, '<br>').replace(/\<br\\?>/g, "\n");
                $('#comment-container-' + $container).append("<textarea name='comment' class='hidden'>" + $text + "</textarea>");
                $('#comment-container-' + $container).submit();
            }
        }
    });
    $('#comment-box-' + $container).on('paste', function(e) {
        e.preventDefault();
        var text = (e.originalEvent || e).clipboardData.getData('text/plain') || prompt('Paste something..');
        window.document.execCommand('insertText', false, text);
    });
    Ossn.ajaxRequest({
        url: Ossn.site_url + 'action/post/entity/comment',
        form: '#comment-container-' + $container,
        beforeSend: function(request) {
            $('#comment-box-' + $container).attr('readonly', 'readonly');
            $('#comment-box-' + $container).attr('contenteditable', false);
        },
        callback: function(callback) {
            if (callback['process'] == 1) {
                $('#comment-box-' + $container).removeAttr('readonly');
                $('#comment-box-' + $container).val('');
                $('.ossn-comments-list-' + $container).append(callback['comment']);
                $('#comment-attachment-container-' + $container).hide();
                $('#ossn-comment-attachment-' + $container).find('.image-data').html('');
                $('#comment-container-' + $container).find('input[name="comment-attachment"]').val('');
            }
            if (callback['process'] == 0) {
                $('#comment-box-' + $container).removeAttr('readonly');
                Ossn.MessageBox('syserror/unknown');
            }
            $('#comment-box-' + $container).attr('contenteditable', true);
            $('#comment-box-' + $container).html("");
        }
    });
};
Ossn.CommentMenu = function($id) {
    $element = $($id).find('.menu-links');
    if ($element.is(":not(:visible)")) {
        $element.show();
        $($id).find('.drop-down-arrow').attr('style', 'display:block;');
    } else {
        $element.hide();
        $($id).find('.drop-down-arrow').attr('style', '');
    }
};
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        /*$(document).delegate('.ossn-delete-comment', 'click', function(e) {
            e.preventDefault();
            $comment = $(this);
            $url = $comment.attr('href');
            $comment_id = Ossn.UrlParams('comment', $url);
            Ossn.PostRequest({
                url: $url,
                action: false,
                beforeSend: function() {
                    $('#comments-item-' + $comment_id).attr('style', 'opacity:0.6;');
                },
                callback: function(callback) {
                    if (callback == 1) {
                        $('#comments-item-' + $comment_id).fadeOut().remove();
                    }
                    if (callback == 0) {
                        $('#comments-item-' + $comment_id).attr('style', 'opacity:0.6;');
                    }
                }
            });
        });*/
    });
});
Ossn.CommentImage = function($container) {
    $(document).ready(function() {
        $("#ossn-comment-image-file-" + $container).on('change', function(event) {
            event.preventDefault();
            var formData = new FormData($('#ossn-comment-attachment-' + $container)[0]);
            $.ajax({
                url: Ossn.site_url + 'comment/attachment',
                type: 'POST',
                data: formData,
                async: true,
                beforeSend: function() {
                    $('#ossn-comment-attachment-' + $container).find('.image-data').html('<img src="' + Ossn.site_url + 'components/OssnComments/images/loading.gif" style="width:30px;border:none;height: initial;" />');
                    $('#comment-attachment-container-' + $container).show();
                },
                cache: false,
                contentType: false,
                processData: false,
                success: function(callback) {
                    if (callback['type'] == 1) {
                        $('#comment-container-' + $container).find('input[name="comment-attachment"]').val(callback['file']);
                        $('#ossn-comment-attachment-' + $container).find('.image-data').html('<img src="' + Ossn.site_url + 'comment/staticimage?image=' + callback['file'] + '" />');
                    }
                    if (callback['type'] == 0) {
                        $('#comment-container-' + $container).find('input[name="comment-attachment"]').val('');
                        $('#comment-attachment-container-' + $container).hide();
                        Ossn.MessageBox('syserror/unknown');
                    }
                },
            });
        });
    });
};
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        $('body').delegate('.comment-post', 'click', function() {
            var $guid = $(this).attr('data-guid');
            if ($guid) {
                $("#comment-box-" + $guid).focus();
            }
        });
        $('body').delegate('.ossn-edit-comment', 'click', function() {
            var $dataguid = $(this).attr('data-guid');
            Ossn.MessageBox('comment/edit/' + $dataguid);
        });
    });
});
Ossn.ViewLikes = function($post, $type) {
    if (!$type) {
        $type = 'post';
    }
    Ossn.MessageBox('likes/view?guid=' + $post + '&type=' + $type);
};
/*Ossn.PostUnlike = function(post) {
    Ossn.PostRequest({
        url: Ossn.site_url + 'action/post/unlike',
        beforeSend: function() {
            $('#ossn-like-' + post).html('<img src="' + Ossn.site_url + 'components/OssnComments/images/loading.gif" />');
        },
        params: '&post=' + post,
        callback: function(callback) {
            if (callback['done'] !== 0) {
                $('#ossn-like-' + post).html(callback['button']);
                $('#ossn-like-' + post).attr('onclick', 'Ossn.PostLike(' + post + ');');
            } else {
                $('#ossn-like-' + post).html(Ossn.Print('unlike'));
            }
        },
    });
};
Ossn.PostLike = function(post) {
    Ossn.PostRequest({
        url: Ossn.site_url + 'action/post/like',
        beforeSend: function() {
            $('#ossn-like-' + post).html('<img src="' + Ossn.site_url + 'components/OssnComments/images/loading.gif" />');
        },
        params: '&post=' + post,
        callback: function(callback) {
            if (callback['done'] !== 0) {
                $('#ossn-like-' + post).html(callback['button']);
                $('#ossn-like-' + post).attr('onClick', 'Ossn.PostUnlike(' + post + ');');
            } else {
                $('#ossn-like-' + post).html(Ossn.Print('like'));
            }
        },
    });
};*/
Ossn.EntityUnlike = function(entity) {
    Ossn.PostRequest({
        url: Ossn.site_url + 'action/post/unlike',
        beforeSend: function() {
            $('#ossn-like-' + entity).html('<img src="' + Ossn.site_url + 'components/OssnComments/images/loading.gif" />');
        },
        params: '&entity=' + entity,
        callback: function(callback) {
            if (callback['done'] !== 0) {
                $('#ossn-like-' + entity).html(callback['button']);
                $('#ossn-like-' + entity).attr('onclick', 'Ossn.EntityLike(' + entity + ');');
            } else {
                $('#ossn-like-' + entity).html(Ossn.Print('unlike'));
            }
        },
    });
};
Ossn.EntityLike = function(entity) {
    Ossn.PostRequest({
        url: Ossn.site_url + 'action/post/like',
        beforeSend: function() {
            $('#ossn-like-' + entity).html('<img src="' + Ossn.site_url + 'components/OssnComments/images/loading.gif" />');
        },
        params: '&entity=' + entity,
        callback: function(callback) {
            if (callback['done'] !== 0) {
                $('#ossn-like-' + entity).html(callback['button']);
                $('#ossn-like-' + entity).attr('onClick', 'Ossn.EntityUnlike(' + entity + ');');
            } else {
                $('#ossn-like-' + post).html(Ossn.Print('like'));
            }
        },
    });
};
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        $(document).delegate('.ossn-like-comment', 'click', function(e) {
            e.preventDefault();
            var $item = $(this);
            var $type = $.trim($item.attr('data-type'));
            var $url = $item.attr('href');
            Ossn.PostRequest({
                url: $url,
                action: false,
                beforeSend: function() {
                    $item.html('<img src="' + Ossn.site_url + 'components/OssnComments/images/loading.gif" />');
                },
                callback: function(callback) {
                    if (callback['done'] == 1) {
                        $total_guid = Ossn.UrlParams('annotation', $url);
                        $total = $('.ossn-total-likes-' + $total_guid).attr('data-likes');
                        if ($type == 'Like') {
                            $item.html(Ossn.Print('unlike'));
                            $item.attr('data-type', 'Unlike');
                            var unlike = $url.replace("like", "unlike");
                            $item.attr('href', unlike);
                            $total_likes = $total;
                            $total_likes++;
                            $('.ossn-total-likes-' + $total_guid).attr('data-likes', $total_likes);
                            $('.ossn-total-likes-' + $total_guid).html('<i class="fa fa-thumbs-up"></i>' + $total_likes);
                        }
                        if ($type == 'Unlike') {
                            $item.html(Ossn.Print('like'));
                            $item.attr('data-type', 'Like');
                            var like = $url.replace("unlike", "like");
                            $item.attr('href', like);
                            if ($total > 1) {
                                $like_remove = $total;
                                0
                                $like_remove--;
                                $('.ossn-total-likes-' + $total_guid).attr('data-likes', $like_remove);
                                $('.ossn-total-likes-' + $total_guid).html('<i class="fa fa-thumbs-up"></i>' + $like_remove);
                            }
                            if ($total == 1) {
                                $('.ossn-total-likes-' + $total_guid).attr('data-likes', 0);
                                $('.ossn-total-likes-' + $total_guid).html('');
                            }
                        }
                    }
                    if (callback['done'] == 0) {
                        if ($type == 'Like') {
                            $item.html(Ossn.Print('like'));
                            $item.attr('data-type', 'Like');
                            Ossn.MessageBox('syserror/unknown');
                        }
                        if ($type == 'Unlike') {
                            $item.html(Ossn.Print('unlike'));
                            $item.attr('data-type', 'Unlike');
                            Ossn.MessageBox('syserror/unknown');
                        }
                    }
                },
            });
        });
    });
});
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        $('#ossn-add-album').click(function() {
            Ossn.MessageBox('album/add');
        });
        $('#album-add').click(function() {
            Ossn.MessageBox('album/add');
        });
        $('#ossn-add-photos').click(function() {
            $dataurl = $(this).attr('data-url');
            Ossn.MessageBox('photos/add' + $dataurl);
        });
        $("#ossn-photos-show-gallery").click(function(e) {
            e.preventDefault();
            $(".ossn-gallery").eq(0).trigger("click");
        })
        if ($('.ossn-gallery').length) {
            $(".ossn-gallery").fancybox();
        }
    });
});
Ossn.NotificationBox = function($title, $meta, $type, height, $extra) {
    Ossn.NotificationsCheck();
    $extra = $extra || '';
    if (height == '') {}
    if ($type) {
        $('.selected').addClass($type);
    }
    if ($title) {
        $('.ossn-notifications-box').show()
        $('.ossn-notifications-box').find('.type-name').html($title + $extra);
    }
    if ($meta) {
        $('.ossn-notifications-box').find('.metadata').html($meta);
        $('.ossn-notifications-box').css('height', height);
    }
};
Ossn.NotificationBoxClose = function() {
    $('.ossn-notifications-box').hide()
    $('.ossn-notifications-box').find('.type-name').html('');
    $('.ossn-notifications-box').find('.metadata').html('<div><div class="ossn-loading ossn-notification-box-loading"></div></div><div class="bottom-all"><a href="#">' + Ossn.Print('see:all') + '</a></div>');
    $('.selected').attr('class', 'selected');
};
Ossn.NotificationShow = function($div) {
    $($div).attr('onClick', 'Ossn.NotificationClose(this)');
    Ossn.PostRequest({
        url: Ossn.site_url + "notification/notification",
        action: false,
        beforeSend: function(request) {
            Ossn.NotificationBoxClose();
            $('.ossn-notifications-friends').attr('onClick', 'Ossn.NotificationFriendsShow(this)');
            $('.ossn-notifications-messages').attr('onClick', 'Ossn.NotificationMessagesShow(this)');
            Ossn.NotificationBox(Ossn.Print('notifications'), false, 'notifications');
        },
        callback: function(callback) {
            var data = '';
            var height = '';
            if (callback['type'] == 1) {
                data = callback['data'];
            }
            if (callback['type'] == 0) {
                data = callback['data'];
            }
            Ossn.NotificationBox(Ossn.Print('notifications'), data, 'notifications', height, callback['extra']);
        }
    });
};
Ossn.NotificationClose = function($div) {
    Ossn.NotificationBoxClose();
    $($div).attr('onClick', 'Ossn.NotificationShow(this)');
};
Ossn.NotificationFriendsShow = function($div) {
    $($div).attr('onClick', 'Ossn.NotificationFriendsClose(this)');
    Ossn.PostRequest({
        url: Ossn.site_url + "notification/friends",
        action: false,
        beforeSend: function(request) {
            Ossn.NotificationBoxClose();
            $('.ossn-notifications-notification').attr('onClick', 'Ossn.NotificationShow(this)');
            $('.ossn-notifications-messages').attr('onClick', 'Ossn.NotificationMessagesShow(this)');
            Ossn.NotificationBox(Ossn.Print('friend:requests'), false, 'firends');
        },
        callback: function(callback) {
            var data = '';
            var height = '';
            if (callback['type'] == 1) {
                data = callback['data'];
            }
            if (callback['type'] == 0) {
                data = callback['data'];
            }
            Ossn.NotificationBox(Ossn.Print('friend:requests'), data, 'firends', height);
        }
    });
};
Ossn.NotificationFriendsClose = function($div) {
    Ossn.NotificationBoxClose();
    $($div).attr('onClick', 'Ossn.NotificationFriendsShow(this)');
};
Ossn.AddFriend = function($guid) {
    action = Ossn.site_url + "action/friend/add?user=" + $guid;
    Ossn.ajaxRequest({
        url: action,
        form: '#add-friend-' + $guid,
        action: true,
        beforeSend: function(request) {
            $('#notification-friend-item-' + $guid).find('form').hide();
            $('#ossn-nfriends-' + $guid).append('<div class="ossn-loading"></div>');
        },
        callback: function(callback) {
            if (callback['type'] == 1) {
                $('#notification-friend-item-' + $guid).addClass("ossn-notification-friend-submit");
                $('#ossn-nfriends-' + $guid).addClass('friends-added-text').html(callback['text']);
            }
            if (callback['type'] == 0) {
                $('#notification-friend-item-' + $guid).find('form').show();
                $('#ossn-nfriends-' + $guid).find('.ossn-loading').remove();
            }
            Ossn.NotificationsCheck();
        }
    });
};
Ossn.removeFriendRequset = function($guid) {
    action = Ossn.site_url + "action/friend/remove?user=" + $guid;
    Ossn.ajaxRequest({
        url: action,
        form: '#remove-friend-' + $guid,
        action: true,
        beforeSend: function(request) {
            $('#notification-friend-item-' + $guid).find('form').hide();
            $('#ossn-nfriends-' + $guid).append('<div class="ossn-loading"></div>');
        },
        callback: function(callback) {
            if (callback['type'] == 1) {
                $('#notification-friend-item-' + $guid).addClass("ossn-notification-friend-submit");
                $('#ossn-nfriends-' + $guid).addClass('friends-added-text').html(callback['text']);
            }
            if (callback['type'] == 0) {
                $('#notification-friend-item-' + $guid).find('form').show();
                $('#ossn-nfriends-' + $guid).find('.ossn-loading').remove();
            }
            Ossn.NotificationsCheck();
        }
    });
};
Ossn.NotificationMessagesShow = function($div) {
    $($div).attr('onClick', 'Ossn.NotificationMessagesClose(this)');
    Ossn.PostRequest({
        url: Ossn.site_url + "notification/messages",
        action: false,
        beforeSend: function(request) {
            Ossn.NotificationBoxClose();
            $('.ossn-notifications-notification').attr('onClick', 'Ossn.NotificationShow(this)');
            $('.ossn-notifications-friends').attr('onClick', 'Ossn.NotificationFriendsShow(this)');
        },
        callback: function(callback) {
            var data = '';
            var height = '';
            if (callback['type'] == 1) {
                data = callback['data'];
                height = '';
            }
            if (callback['type'] == 0) {
                data = callback['data'];
            }
            Ossn.NotificationBox(Ossn.Print('messages'), data, 'messages', height);
        }
    });
};
Ossn.NotificationMessagesClose = function($div) {
    Ossn.NotificationBoxClose();
    $($div).attr('onClick', 'Ossn.NotificationMessagesShow(this)');
};
Ossn.NotificationsCheck = function() {
    Ossn.PostRequest({
        url: Ossn.site_url + "notification/count",
        action: false,
        callback: function(callback) {
            $notification = $('#ossn-notif-notification');
            $notification_count = $notification.find('.ossn-notification-container');
            $friends = $('#ossn-notif-friends');
            $friends_count = $friends.find('.ossn-notification-container');
            $messages = $('#ossn-notif-messages');
            $messages_count = $messages.find('.ossn-notification-container');
            if (callback['notifications'] > 0) {
                $notification_count.html(callback['notifications']);
                $notification.find('.ossn-icon').addClass('ossn-icons-topbar-notifications-new');
                $notification_count.attr('style', 'display:inline-block !important;');
            }
            if (callback['notifications'] <= 0) {
                $notification_count.html('');
                $notification.find('.ossn-icon').removeClass('ossn-icons-topbar-notifications-new');
                $notification.find('.ossn-icon').addClass('ossn-icons-topbar-notification');
                $notification_count.hide();
            }
            if (callback['messages'] > 0) {
                $messages_count.html(callback['messages']);
                $messages.find('.ossn-icon').addClass('ossn-icons-topbar-messages-new');
                $messages_count.attr('style', 'display:inline-block !important;');
            }
            if (callback['messages'] <= 0) {
                $messages_count.html('');
                $messages.find('.ossn-icon').removeClass('ossn-icons-topbar-messages-new');
                $messages.find('.ossn-icon').addClass('ossn-icons-topbar-messages');
                $messages_count.hide();
            }
            if (callback['friends'] > 0) {
                $friends_count.html(callback['friends']);
                $friends.find('.ossn-icon').addClass('ossn-icons-topbar-friends-new');
                $friends_count.attr('style', 'display:inline-block !important;');
            }
            if (callback['friends'] <= 0) {
                $friends_count.html('');
                $friends.find('.ossn-icon').removeClass('ossn-icons-topbar-friends-new');
                $friends.find('.ossn-icon').addClass('ossn-icons-topbar-friends');
                $friends_count.hide();
            }
        }
    });
};
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        $('.ossn-topbar-dropdown-menu').click(function() {
            Ossn.NotificationBoxClose();
        });
        $(document).on('click', '.ossn-notification-mark-read', function(e) {
            e.preventDefault();
            Ossn.PostRequest({
                url: Ossn.site_url + "action/notification/mark/allread",
                action: false,
                beforeSend: function(request) {
                    $('.ossn-notification-mark-read').attr('style', 'opacity:0.5;');
                },
                callback: function(callback) {
                    if (callback['success']) {
                        Ossn.trigger_message(callback['success']);
                    }
                    if (callback['error']) {
                        Ossn.trigger_message(callback['error']);
                    }
                    $('.ossn-notification-mark-read').attr('style', '1;');
                }
            });
        });
    });
});
Ossn.SendMessage = function($user) {
    Ossn.ajaxRequest({
        url: Ossn.site_url + "action/message/send",
        form: '#message-send-' + $user,
        action: true,
        beforeSend: function(request) {
            $('#message-send-' + $user).find('input[type=submit]').hide();
            $('#message-send-' + $user).find('.ossn-loading').removeClass('ossn-hidden');
        },
        callback: function(callback) {
            $('#message-append-' + $user).append(callback);
            $('#message-send-' + $user).find('textarea').val('');
            $('#message-send-' + $user).find('input[type=submit]').show();
            $('#message-send-' + $user).find('.ossn-loading').addClass('ossn-hidden');
            Ossn.message_scrollMove($user);
        }
    });
};
Ossn.getMessages = function($user, $guid) {
    Ossn.PostRequest({
        url: Ossn.site_url + "messages/getnew/" + $user,
        action: false,
        callback: function(callback) {
            $('#message-append-' + $guid).append(callback);
            if (callback) {
                Ossn.message_scrollMove($guid);
            }
        }
    });
};
Ossn.getRecent = function($user) {
    Ossn.PostRequest({
        url: Ossn.site_url + "messages/getrecent/" + $user,
        action: false,
        callback: function(callback) {
            $('#get-recent').html(callback);
            $('#get-recent').addClass('inner');
            $('.messages-from').find('.inner').remove();
            $('#get-recent').appendTo('.messages-from');
            $('#get-recent').show();
        }
    });
};
Ossn.playSound = function() {
    document.getElementById('ossn-chat-sound').play();
};
Ossn.message_scrollMove = function(fid) {
    var message = document.getElementById('message-append-' + fid);
    if (message) {
        message.scrollTop = message.scrollHeight;
        return message.scrollTop;
    }
};
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        $('#ossn-group-add').click(function() {
            Ossn.MessageBox('groups/add');
        });
    });
});
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        $("#group-upload-cover").submit(function(event) {
            event.preventDefault();
            var formData = new FormData($(this)[0]);
            var $url = Ossn.site_url + 'action/group/cover/upload';
            $.ajax({
                url: Ossn.AddTokenToUrl($url),
                type: 'POST',
                data: formData,
                async: true,
                beforeSend: function(xhr, obj) {
                    if ($('.ossn-group-cover').length == 0) {
                        $('.header-users').attr('style', 'opacity:0.7;');
                    } else {
                        $('.ossn-group-cover').attr('style', 'opacity:0.7;');
                    }
                    var fileInput = $('#group-upload-cover').find("input[type='file']")[0],
                        file = fileInput.files && fileInput.files[0];
                    if (file) {
                        var img = new Image();
                        img.src = window.URL.createObjectURL(file);
                        img.onload = function() {
                            var width = img.naturalWidth,
                                height = img.naturalHeight;
                            window.URL.revokeObjectURL(img.src);
                            if (width < 850 || height < 300) {
                                xhr.abort();
                                Ossn.trigger_message(Ossn.Print('profile:cover:err1:detail'), 'error');
                                return false;
                            }
                        };
                    }
                },
                cache: false,
                contentType: false,
                processData: false,
                success: function(callback) {
                    if (callback['type'] == 1) {
                        if ($('.ossn-group-cover').length == 0) {
                            location.reload();
                        } else {
                            $('.ossn-group-cover').attr('style', '');
                            $('.ossn-group-cover').find('img').attr('style', '');
                            $('.ossn-group-cover').find('img').attr('src', callback['url']);
                        }
                    }
                    if (callback['type'] == 0) {
                        Ossn.MessageBox('syserror/unknown');
                    }
                }
            });
            return false;
        });
        $('#add-cover-group').click(function(e) {
            e.preventDefault();
            $('#group-upload-cover').find('.coverfile').click();
        });
    });
});
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        $('#reposition-cover').click(function() {
            $('.group-c-position').attr('style', 'display:inline-block !important;');
            $(function() {
                $.globalVars = {
                    originalTop: 0,
                    originalLeft: 0,
                    maxHeight: $("#draggable").height() - $("#container").height(),
                    maxWidth: $("#draggable").width() - $("#container").width()
                };
                $("#draggable").draggable({
                    start: function(event, ui) {
                        if (ui.position != undefined) {
                            $.globalVars.originalTop = ui.position.top;
                            $.globalVars.originalLeft = ui.position.left;
                        }
                    },
                    drag: function(event, ui) {
                        var newTop = ui.position.top;
                        var newLeft = ui.position.left;
                        if (ui.position.top < 0 && ui.position.top * -1 > $.globalVars.maxHeight) {
                            newTop = $.globalVars.maxHeight * -1;
                        }
                        if (ui.position.top > 0) {
                            newTop = 0;
                        }
                        if (ui.position.left < 0 && ui.position.left * -1 > $.globalVars.maxWidth) {
                            newLeft = $.globalVars.maxWidth * -1;
                        }
                        if (ui.position.left > 0) {
                            newLeft = 0;
                        }
                        ui.position.top = newTop;
                        ui.position.left = newLeft;
                        Ossn.GroupCover_top = newTop;
                        Ossn.GroupCover_left = newLeft;
                    }
                });
            });
        });
    });
});
Ossn.RegisterStartupFunction(function() {
    $(document).ready(function() {
        $('.ossn-group-cover').hover(function() {
            $('.ossn-group-cover-button').show();
        }, function() {
            $('.ossn-group-cover-button').hide();
        });
    });
});
Ossn.repositionGroupCOVER = function($group) {
    var $url = Ossn.site_url + "action/group/cover/reposition";
    $.ajax({
        async: true,
        type: 'post',
        data: '&top=' + Ossn.GroupCover_top + '&left=' + Ossn.GroupCover_left + '&group=' + $group,
        url: Ossn.AddTokenToUrl($url),
        success: function(callback) {
            $('.group-c-position').attr('style', 'display:none !important;');
            $("#draggable").draggable({
                drag: function() {
                    return false;
                }
            });
        },
    });
};
$(document).ready(function() {
    var EmojiiArray = {
        "emoticons": ["1f601", "1f602", "1f603", "1f604", "1f605", "1f606", "1f609", "1f60a", "1f60b", "1f60c", "1f60d", "1f60f", "1f612", "1f613", "1f614", "1f616", "1f618", "1f61a", "1f61c", "1f61d", "1f61e", "1f620", "1f621", "1f622", "1f623", "1f624", "1f625", "1f628", "1f629", "1f62a", "1f62b", "1f62d", "1f630", "1f631", "1f632", "1f633", "1f635", "1f637", "1f638", "1f639", "1f63a", "1f63b", "1f63c", "1f63d", "1f63e", "1f63f", "1f640", "1f645", "1f646", "1f647", "1f648", "1f649", "1f64a", "1f64b", "1f64c", "1f64d", "1f64e", "1f64f", "1f440", "1f442", "1f443", "1f444", "1f445", "1f446", "1f447", "1f448", "1f449", "1f44a", "1f44b", "1f44c", "1f44d", "1f44e", "1f44f", "1f450", "1f451", "1f452", "1f453", "1f454", "1f455", "1f456", "1f457", "1f458", "1f459", "1f45a", "1f45b", "1f45c", "1f45d", "1f45e", "1f45f", "1f460", "1f461", "1f462", "1f463", "1f464", "1f466", "1f467", "1f468", "1f469", "1f46a", "1f46b", "1f46e", "1f46f", "1f470", "1f471", "1f472", "1f473", "1f474", "1f475", "1f476", "1f477", "1f478", "1f479", "1f47a", "1f47b", "1f47c", "1f47d", "1f47e", "1f47f", "1f480", "1f481", "1f482", "1f483", "1f484", "1f485", "1f486", "1f487", "1f488", "1f489", "1f48a", "1f48b", "1f48c", "1f48d", "1f48e", "1f48f", "1f490", "1f491", "1f492", "1f493", "1f494", "1f495", "1f496", "1f497", "1f498", "1f499", "1f49a", "1f49b", "1f49c", "1f49d", "1f49e"],
        "animals": ["1f43b", "1f43c", "1f43d", "1f43e", "1f40c", "1f40d", "1f40e", "1f411", "1f412", "1f414", "1f417", "1f418", "1f419", "1f41a", "1f41b", "1f41c", "1f41d", "1f41e", "1f41f", "1f420", "1f421", "1f422", "1f423", "1f424", "1f425", "1f426", "1f427", "1f428", "1f429", "1f42b", "1f42c", "1f42d", "1f42e", "1f42f", "1f430", "1f431", "1f432", "1f433", "1f434", "1f435", "1f436", "1f437", "1f438", "1f439", "1f43a", "1f311", "1f313", "1f314", "1f315", "1f319", "1f31b", "1f40f", "1f410", "1f413", "1f415", "1f416", "1f42a"],
        "food": ["1f374", "1f330", "1f331", "1f334", "1f335", "1f337", "1f338", "1f339", "1f33a", "1f33b", "1f33c", "1f33d", "1f33e", "1f33f", "1f340", "1f341", "1f342", "1f343", "1f344", "1f345", "1f346", "1f347", "1f348", "1f349", "1f34a", "1f34c", "1f34d", "1f34e", "1f34f", "1f351", "1f352", "1f353", "1f354", "1f355", "1f356", "1f357", "1f358", "1f359", "1f35a", "1f35b", "1f35c", "1f35d", "1f35e", "1f35f", "1f360", "1f361", "1f362", "1f363", "1f364", "1f365", "1f366", "1f367", "1f368", "1f369", "1f36a", "1f36b", "1f36c", "1f36d", "1f36e", "1f36f", "1f370", "1f371", "1f372", "1f373", "1f375", "1f376", "1f377", "1f378", "1f379", "1f37a", "1f37b", "1f380", "1f381", "1f382", "1f383", "1f384", "1f385", "1f386", "1f387", "1f388", "1f389", "1f38a", "1f38b", "1f38c", "1f38d", "1f38e", "1f38f", "1f390"],
        "uncategorized": ["00a9", "00ae", "203c", "2049", "2122", "2139", "2194", "2195", "2196", "2197", "2198", "2199", "21a9", "21aa", "231a", "231b", "23e9", "23ea", "23eb", "23ec", "23f0", "23f3", "25aa", "25ab", "25b6", "25c0", "25fb", "25fc", "25fd", "25fe", "2600", "2601", "260e", "2611", "2614", "2615", "261d", "263a", "2648", "2649", "264a", "264b", "264c", "264d", "264e", "264f", "2650", "2651", "2652", "2653", "2660", "2663", "2665", "2666", "2668", "267b", "267f", "2693", "26a0", "26a1", "26aa", "26ab", "26bd", "26be", "26c4", "26c5", "26ce", "26d4", "26ea", "26f2", "26f3", "26f5", "26fa", "26fd", "2934", "2935", "2b05", "2b06", "2b07", "2b1b", "2b1c", "2b50", "2b55", "3030", "303d", "3297", "3299", "1f004", "1f0cf", "1f300", "1f301", "1f302", "1f303", "1f304", "1f305", "1f306", "1f307", "1f308", "1f309", "1f30a", "1f30b", "1f30c", "1f30f", "1f31f", "1f320", "1f391", "1f392", "1f393", "1f3a0", "1f3a1", "1f3a2", "1f3a3", "1f3a4", "1f3a5", "1f3a6", "1f3a7", "1f3a8", "1f3a9", "1f3aa", "1f3ab", "1f3ac", "1f3ad", "1f3ae", "1f3af", "1f3b0", "1f3b1", "1f3b2", "1f3b3", "1f3b4", "1f3b5", "1f3b6", "1f3b7", "1f3b8", "1f3b9", "1f3ba", "1f3bb", "1f3bc", "1f3bd", "1f3be", "1f3bf", "1f3c0", "1f3c1", "1f3c2", "1f3c3", "1f3c4", "1f3c6", "1f3c8", "1f3ca", "1f3e0", "1f3e1", "1f3e2", "1f3e3", "1f3e5", "1f3e6", "1f3e7", "1f3e8", "1f3e9", "1f3ea", "1f3eb", "1f3ec", "1f3ed", "1f3ee", "1f3ef", "1f3f0", "1f49f", "1f4a0", "1f4a1", "1f4a2", "1f4a3", "1f4a4", "1f4a5", "1f4a6", "1f4a7", "1f4a8", "1f4a9", "1f4aa", "1f4ab", "1f4ac", "1f4ae", "1f4af", "1f4b0", "1f4b1", "1f4b2", "1f4b3", "1f4b4", "1f4b5", "1f4b8", "1f4b9", "1f4ba", "1f4bb", "1f4bc", "1f4bd", "1f4be", "1f4bf", "1f4c0", "1f4c1", "1f4c2", "1f4c3", "1f4c4", "1f4c5", "1f4c6", "1f4c7", "1f4c8", "1f4c9", "1f4ca", "1f4cb", "1f4cc", "1f4cd", "1f4ce", "1f4cf", "1f4d0", "1f4d1", "1f4d2", "1f4d3", "1f4d4", "1f4d5", "1f4d6", "1f4d7", "1f4d8", "1f4d9", "1f4da", "1f4db", "1f4dc", "1f4dd", "1f4de", "1f4df", "1f4e0", "1f4e1", "1f4e2", "1f4e3", "1f4e4", "1f4e5", "1f4e6", "1f4e7", "1f4e8", "1f4e9", "1f4ea", "1f4eb", "1f4ee", "1f4f0", "1f4f1", "1f4f2", "1f4f3", "1f4f4", "1f4f6", "1f4f7", "1f4f9", "1f4fa", "1f4fb", "1f4fc", "1f503", "1f50a", "1f50b", "1f50c", "1f50d", "1f50e", "1f50f", "1f510", "1f511", "1f512", "1f513", "1f514", "1f516", "1f517", "1f518", "1f519", "1f51a", "1f51b", "1f51c", "1f51d", "1f51e", "1f51f", "1f520", "1f521", "1f522", "1f523", "1f524", "1f525", "1f526", "1f527", "1f528", "1f529", "1f52a", "1f52b", "1f52e", "1f52f", "1f530", "1f531", "1f532", "1f533", "1f534", "1f535", "1f536", "1f537", "1f538", "1f539", "1f53a", "1f53b", "1f53c", "1f53d", "1f550", "1f551", "1f552", "1f553", "1f554", "1f555", "1f556", "1f557", "1f558", "1f559", "1f55a", "1f55b", "1f5fb", "1f5fc", "1f5fd", "1f5fe", "1f5ff", "2702", "2705", "2708", "2709", "270a", "270b", "270c", "270f", "2712", "2714", "2716", "2728", "2733", "2734", "2744", "2747", "274c", "274e", "2753", "2754", "2755", "2757", "2764", "2795", "2796", "2797", "27a1", "27b0"],
        "transport": ["1f683", "1f680", "1f684", "1f685", "1f687", "1f689", "1f68c", "1f68f", "1f691", "1f692", "1f693", "1f695", "1f697", "1f699", "1f69a", "1f6a2", "1f6a4", "1f6a5", "1f6a7", "1f6a8", "1f6a9", "1f6aa", "1f6ab", "1f6ac", "1f6ad", "1f6b2", "1f6b6", "1f6b9", "1f6ba", "1f6bb", "1f6bc", "1f6bd", "1f6be", "1f6c0"],
        "enclosed": ["1f170", "1f171", "1f17e", "1f17f", "1f18e", "1f191", "1f192", "1f193", "1f194", "1f195", "1f196", "1f197", "1f198", "1f199", "1f19a", "1f201", "1f202", "1f21a", "1f22f", "1f232", "1f233", "1f234", "1f235", "1f236", "1f237", "1f238", "1f239", "1f23a", "1f250", "1f251", "24c2"],
    };
    if ($('.ossn-comment-attach-photo').length) {
        $('<div class="ossn-comment-attach-photo"><i class="fa fa-smile-o"></i></div>').insertAfter('.ossn-comment-attach-photo');
        $('.comment-container').append('<div class="dropdown emojii-container-main"> <div class="emojii-container" data-active="emoticons"> <ul class="nav nav-tabs"></ul> </div> </div>');
    }
    if ($('.ossn-wall-container-data').length) {
        $('.ossn-wall-container-data').append('<div class="dropdown emojii-container-main"> <div class="emojii-container" data-active="emoticons"> <ul class="nav nav-tabs"></ul> </div> </div>');
    }
    $.each(EmojiiArray, function(key, data) {
        firstele = data[0];
        $('.emojii-container').find('.nav-tabs').append("<li class='ossn-emojii-tab' data-type='" + key + "'><a href='javascript:void(0);'>&#x" + firstele + ";</a></li>");
        $('.emojii-container').append("<div class='emojii-list emojii-list-" + key + "'></div>");
        $.each(data, function(k, d) {
            $('.emojii-list-' + key).append("<li data-val='" + d + "'>&#x" + d + ";</li>");
        });
    });
    $('body').on('click', '.ossn-emojii-tab', function(e) {
        e.preventDefault();
        $type = $(this).attr('data-type');
        $('.emojii-list').hide();
        $('.emojii-list-' + $type).show();
    });
    $('body').on('click', '#ossn-wall-form .emojii-list li', function(e) {
        e.preventDefault();
        var $type = $(this).html();
        var $element = '.ossn-wall-container-data textarea';
        var tmp1 = $($element).val();
        var tmp2 = tmp1 + " " + $type;
        $($element).val(tmp2);
    });
    $('body').on('click', '.comment-container .emojii-list li', function(e) {
        e.preventDefault();
        var $type = $(this).html();
        var $element = $(this).parent().parent().parent().parent().find('.comment-box');
        var tmp1 = $element.html();
        var tmp2 = tmp1 + " " + $type;
        $element.html(tmp2);
    });
    $('body').on('click', '.ossn-wall-container-control-menu-emojii-selector', function(e) {
        if ($('#ossn-wall-form .emojii-container-main').is(":hidden")) {
            $('#ossn-wall-form .emojii-container-main').show();
        } else {
            $('#ossn-wall-form .emojii-container-main').hide();
        }
    });
    $('body').on('click', '.ossn-comment-attach-photo .fa-smile-o', function(e) {
        $parent = $(this).parent().parent().parent();
        $display = $parent.find('.emojii-container-main').css('display');
        if ($display == 'none') {
            $parent.find('.emojii-container-main').show();
        }
        if ($display == 'block') {
            $parent.find('.emojii-container-main').hide();
        }
    });
});
Ossn.isInViewPort = function($params) {
    var params = $params['params'];
    var callback = $params['callback'];
    if (!params) {
        params = {};
    }
    if (!callback) {
        callback = function() {};
    }
    $($params['element']).scrolling(params);
    $($params['element']).on('scrollin', callback);
};
Ossn.AutoPaginationURLparam = function(name, url) {
    if (!name || !url) {
        return false;
    }
    console.log(' url: ' + url);
    var results = new RegExp('[\?&]' + name + '=([0-9]*)').exec(url);
    if (results == null) {
        return null;
    } else {
        console.log('RESULTS' + JSON.stringify(results));
        return results[1] || false;
    }
};
$(document).ready(function() {
    $calledOnce = [];
    $('.newsfeed-middle .user-activity .ossn-pagination li').css({
        "visibility": "hidden"
    });
    Ossn.isInViewPort({
        element: '.newsfeed-middle .user-activity .ossn-pagination',
        callback: function(event, $all_elements) {
            $next = $(this).find('.active').next();
            var selfElement = $(this);
            if ($next) {
                $url = $next.find('a').attr('href');
                $offset = Ossn.AutoPaginationURLparam('offset', $url);
                $url = '?offset=' + $offset;
                console.log('OFFSET: ' + $offset);
                console.log('A R R A Y ' + JSON.stringify($calledOnce));
                if ($.inArray($url, $calledOnce) == -1 && $offset > 0) {
                    console.log('NEXT');
                    $calledOnce.push($url);
                    Ossn.PostRequest({
                        url: Ossn.site_url + 'home' + $url,
                        beforeSend: function() {
                            $('.newsfeed-middle .user-activity .ossn-pagination').append('<div class="ossn-loading"></div>');
                        },
                        callback: function(callback) {
                            $element = $(callback).find('.user-activity');
                            if ($element.length) {
                                $clone = $element.find('.ossn-pagination').html();
                                $element.find('.ossn-pagination').remove();
                                $('.user-activity').append($element.html());
                                selfElement.html($clone);
                                selfElement.appendTo('.user-activity');
                                $('.newsfeed-middle .user-activity .ossn-pagination li').css({
                                    "visibility": "hidden"
                                });
                            }
                            return;
                        },
                    });
                }
            }
        },
    });
});