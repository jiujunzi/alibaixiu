//当添加分类表单发生提交时
$('#addCategory').on('submit', function () {
    //获取用户输入的内容
    var formData = $(this).serialize();
    $.ajax({
        type: 'post', //get或post
        url: '/categories', //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function (result) { //成功的回调函数
            location.reload()
        }
    })


    //阻止默认表单提交
    return false;
})

//发生请求，向服务器端获取分类列表数据
$.ajax({
    type: 'get', //get或post
    url: '/categories', //请求的地址

    success: function (result) { //成功的回调函数
        //console.log(result)
        var html = template('categoryListTpl', {
            data: result
        });
        $('#categoryBox').html(html);
    }
})


//编辑分类，为按钮添加事件
$('#categoryBox').on('click', '.edit', function () {
    
    
    //获取id
    var id = $(this).attr('data-id')
    //根据id获取详细
    $.ajax({
        type: 'get', //get或post
        url: '/categories/' + id, //请求的地址

        success: function (result) { //成功的回调函数
             //console.log(result)
            var html = template('modifyCategoryTpl', result);
            $('#formBox').html(html);
        }
    })
})

//提交修改内容
$('#formBox').on('submit', '#modifyCategory', function () {
    //获取输入的内容
    var formData = $(this).serialize();
    //获取要修改的id
    var id = $(this).attr('data-id');

    $.ajax({
        type: 'put', //get或post
        url: '/categories/' + id, //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集

        success: function (result) { //成功的回调函数
            location.reload()
        }
    })
    //默认表单
    return false
})

//删除分类，点击按钮，委托
$('#categoryBox').on('click','.delete',function(){
    //询问是否删除
    if (confirm('确认删除此分类')) {
        var id = $(this).attr('data-id');
    }
})