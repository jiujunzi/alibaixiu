//当表单发生提交行为时
$('#userForm').on('submit', function () {

    //获取用户在表单输入发内容，并格式化成参数字符串
    //serialize 第一点保证form表单每一个input要有一个name属性
    var formData = $(this).serialize()
    console.log(formData);

    //向服务器发送添加用户的请求
    $.ajax({
        type: 'post', //get或post
        url: '/users', //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function () { //成功的回调函数
            //成功就刷新页面
            location.reload();
        },
        error: function () {
            alert('用户添加失败')
        },

    })

    //阻止表单默认行为
    return false;
})


//上传用户头像
$('#modifyBox').on('change', '#avatar', function () {
    //ajax在上传图片时必须使用formdata  文件上传，进度
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post', //get或post
        url: '/upload', //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集


        //告诉ajax不要转换数据参数
        processData: false,

        //告诉ajax不要默认设置请求头为application/x-www-form-urlencoded
        contentType: false,
        success: function (result) { //成功的回调函数

            //实现头像预览
            $('#preview').attr('src', result[0].avatar);

            //这一行的作用是后面我们提交表单的时候，保证上传头像的地址也能够作为一项提交给后台服务器
            $('#hiddenAvatar').val(result[0].avatar)

        }
    })
})


//向服务端发送请求  索要用户列表数据
$.ajax({
    type: 'get', //get或post
    url: '/users', //请求的地址

    success: function (result) { //成功的回调函数
        //console.log(result)
        var html = template('userTpl', {
            data: result
        });
        $('#userBox').html(html);
    }
})



//通过事件委托为编辑按钮添加修改事件
$('#userBox').on('click', '.edit', function () {
    //获取用户id
    var id = $(this).attr('data-id');
    //根据id获取用户详细信息
    $.ajax({
        type: 'get', //get或post
        url: '/users/' + id, //请求的地址
        data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function (result) { //成功的回调函数
            console.log(result)
            var html = template('modifyTpl', result)
            $('#modifyBox').html(html)
        }
    })
})

$('#modifyBox').on('submit', '#userForm', function () {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put', //get或post
        url: '/users/' + id, //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function (result) { //成功的回调函数
            //console.log(result)
            location.reload();
        }
    })
    return false;
})

//删除用户
$('#userBox').on('click', '.delete', function () {
    console.log(123);

    //弹出确认框
    if (confirm('是否删除此用户')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete', //get或post
            url: '/users/' + id, //请求的地址

            success: function (result) { //成功的回调函数
                location.reload()
            }
        })
    }
})


//当全选按钮的状态发生改变时
var selectAll = $('#selectAll');
selectAll.on('change', function () {
    //获取全选按钮当前状态
    var status = $(this).prop('checked')

    //获取所有的用户，并将用户的状态和全选按钮保持一致
    $('#userBox').find('input').prop('checked', status);

    //全选中显示全部删除按钮
    if (status) {
        $('#deleteMany').show();

    } else {
        $('#deleteMany').hide();
    }
})

var deleteMany = $('#deleteMany')
//当复选框发生改变时
$('#userBox').on('change', '.userStatus', function () {

    //获取所有的用户，过滤出选中的用户
    var inputs = $('#userBox').find('input');

    //判断选中的用户数量和所有的数量是否一致
    if (inputs.length == inputs.filter(':checked').length) {
        //如果一致，就说明所有用户被选中
        selectAll.prop('checked', true);


    } else {
        //否则就有用户未被选中
        selectAll.prop('checked', false)

    }

    //判断选中2个及以上时出现多删按钮
    if (inputs.filter(':checked').length > 1) {
        $('#deleteMany').show()
    } else {
        $('#deleteMany').hide();
    }
})


$('#deleteMany').on('click', function () {
    var ids = [];
    //获取选中的id
    var checkedUser = $('#userBox').find('input').filter(':checked');

    //循环复选框  从复选框元素的身上获取data-id属性的值
    checkedUser.each(function (index, element) {
        ids.push($(element).attr('data-id'));
    });

    if (confirm('是否删除？')) {
        $.ajax({
            type: 'delete', //get或post
            url: '/users/' + ids.join('-'), //请求的地址
            data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function (result) { //成功的回调函数
                location.reload()
            }
        })
    }
})