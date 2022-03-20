$(function() { //入口函数
    // 1、全选：点击全选按钮，所有的按钮都应该被勾选上
    // 1.1这种不用添加点击事件，用change事件就可以了
    $('.checkall').on('change', function(e) {
        // 1.2得到全选按钮的状态this.checked;,将这个状态复制给另外的按钮
        // 1.2.1获得其他按钮标签$('.j-checkbox')
        $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'));
    })

    // 2.当小复选框被选中的个数等于3 就应该把全选按钮选上
    // 关键是得到每个小复选框中的checked状态
    var num = 0;
    $('.j-checkbox').on('click', function() {
        $('.j-checkbox').each(function(i, domEle) {
            if ($(domEle).prop('checked')) {
                num++;
                // 9、选中商品添加背景check-cart-item
                $(domEle).parent().parent().addClass('check-cart-item');
            } else {
                //没选中就删掉背景
                $(domEle).parent().parent().removeClass('check-cart-item');
            }

        })
        if (num == 3) {
            $('.checkall').prop('checked', true);
        } else {
            $('.checkall').prop('checked', false);
        }
        num = 0;
    })

    amount(); // 已选n件商品

    amountPrice() // 计算总价


    // 2、购物车案例模块-增减商品数量
    // 核心思路：首先声明一个变量，当我们点击+号（increment），就让这个值++，然后赋值给文本框。
    // 注意1： 只能增加本商品的数量， 就是当前+号的兄弟文本框（itxt）的值。 
    // 修改表单的值是val() 方法
    // 注意2： 这个变量初始值应该是这个文本框的值，在这个值的基础上++。要获取表单的值
    // 减号（decrement）思路同理，但是如果文本框的值是1，就不能再减了。

    // 点击加号，商品数量能够增加
    // 首先要监听到加号有点击事件
    $('.increment').on('click', function() {
        // 先获取数量:$(this).siblings('.itxt').val();
        // 将数量写入
        $(this).siblings('.itxt').val(parseInt($(this).siblings('.itxt').val()) + 1);

        // 3、小计
        // 当商品数量变化的时候，小计应该跟随着一起变化
        // 获取单价($(this).parent().parent().siblings('.p-price').html())+获取数量(parseInt($(this).siblings('.itxt').val()))
        // 单价要进行改造,可以用字符串的截取
        var priceStr = $(this).parent().parent().siblings('.p-price').html(); //单价字符串
        // parseFloat(priceStr.split('￥')[1]);去掉￥后的数字型单价
        // 单价*数量
        var totalPrice = parseFloat(priceStr.split('￥')[1]) * parseInt($(this).siblings('.itxt').val());
        // 将小计写入
        $(this).parent().parent().siblings('.p-sum').html('￥' + totalPrice.toFixed(2));

        amount(); // 已选n件商品

        amountPrice() // 计算总价
    })

    // 点击减号，商品数量能够减少
    $('.decrement').on('click', function() {
        // 先获取数量:$(this).siblings('.itxt').val();
        // 将数量写入
        if ($(this).siblings('.itxt').val() <= 1) {
            return;
        } else {
            $(this).siblings('.itxt').val(parseInt($(this).siblings('.itxt').val()) - 1);
        }

        // 3、小计
        // 当商品数量变化的时候，小计应该跟随着一起变化
        // 获取单价($(this).parent().parent().siblings('.p-price').html())+获取数量(parseInt($(this).siblings('.itxt').val()))
        // 单价要进行改造,可以用字符串的截取
        var priceStr = $(this).parent().parent().siblings('.p-price').html(); //单价字符串
        // parseFloat(priceStr.split('￥')[1]);去掉￥后的数字型单价
        // 单价*数量
        var totalPrice = parseFloat(priceStr.split('￥')[1]) * parseInt($(this).siblings('.itxt').val());
        // 将小计写入
        $(this).parent().parent().siblings('.p-sum').html('￥' + totalPrice.toFixed(2));

        amount(); // 已选n件商品

        amountPrice() // 计算总价
    })


    function amount() {
        // 4、已选n件商品
        // 得到每个商品的数量然后相加
        // 遍历得到每个商品数量的盒子得到商品的数量
        var amountSum = 0;
        $.each($('.itxt'), function(i, item) {
                amountSum += parseInt($(item).val());
            })
            // 将总件数写入
        $('.amount-sum em').html(amountSum);
    }

    function amountPrice() {
        // 5、计算总价
        // 总价=所有小计相加
        // 遍历得到每个小计
        var priceSum = 0
        $('.p-sum').each(function(i, domEle) {
                $(domEle).html();
                priceSum += parseFloat($(domEle).html().split('￥')[1]); //数字型小计

            })
            //将总价写入
        $('.price-sum em').html(priceSum.toFixed(2));
    }

    // 6、删除按钮
    $('.p-action a').on('click', function() {
        // 点击删除，该行都没
        $(this).parent().parent().remove();

        amount(); // 已选n件商品

        amountPrice() // 计算总价
    })

    // 7、清理购物车
    $('.clear-all').on('click', function() {
        $('.cart-item-list').remove();

        amount(); // 已选n件商品

        amountPrice() // 计算总价
    })

    // 8、 删除选中的商品
    $('.remove-batch').on('click', function() {
        // 要把是选中的商品给删除
        // 遍历所有商品，把选中状态的给挑出来
        $.each($('.j-checkbox'), function(i, item) {
            // 检查它的固有属性$(item).prop('checked')
            if ($(item).prop('checked')) {
                // 删
                $(this).parent().parent().remove();
            }
        })

        amount(); // 已选n件商品

        amountPrice() // 计算总价
    })
})