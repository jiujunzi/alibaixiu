//当修改密码表单发生变化事
$('#modifyForm').on('submit',function(){
    var formData = $(this).serialize();

    //调用接口，实现密码修改功能
    $.ajax({
        type:'put',//get或post
        url:'/users/password',//请求的地址
        data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
       
        success:function(result){//成功的回调函数
            location.href = '/admin/login.html'
        }
    })
    //阻止表单默认提交行为
    return false;
})