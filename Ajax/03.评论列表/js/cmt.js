$(function() {
    // 获取评论列表
    function getCmtList() {
        $.get('http://www.liulongbin.top:3006/api/cmtlist', function(res) {
            if (res.status == 200) {
                // res是获取成功之后返回的对象
                // 要遍历res对象中的data属性：res.data
                // data属性本身是一个数组
                // 数组又由多个对象所组成
                // 实际上就是遍历整个数组，得到数组中每个对象属性的属性值
                var rows = [];
                $.each(res.data, function(i, item) {
                        rows.push('<li class="list-group-item">' + item.content + '<span class="badge" style="background-color: #F0AD4E;">评论时间：' +
                            item.time + '</span><span class="badge" style="background-color: #5BC0DE;">评论人：' + item.username + '</span></li>')
                    })
                    // 将数组中的数据进行拼接成字符串：rows.join('')
                    // 将字符串追加到外层盒子中
                $('#cmt-list').empty().append(rows.join(''))
                console.log('获取成功');
            } else {
                console.log('获取失败');
            }
        })
    }

    getCmtList();

    // 发表评论
    // 为表单添加submit事件
    $('#formAddCmt').submit(function(e) {
        e.preventDefault(); //阻止表单默认提交事件
        //快速得到表单中的数据
        var data = $(this).serialize();
        console.log(data);

        // 将得到的数据发送给服务器
        $.post('http://www.liulongbin.top:3006/api/addcmt', data, function(res) {
            if (res.status !== 201) {
                return alert('发送失败');
            } else {
                console.log('发送成功');
                getCmtList();
            }
        })

    })
})