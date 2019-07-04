//当表单发生提交行为时
$('#userForm').on('submit',function(){
    
    //获取用户在表单输入发内容，并格式化成参数字符串
    //serialize 第一点保证form表单每一个input要有一个name属性
    var formData = $(this).serialize()
    console.log(formData);
    
    //向服务器发送添加用户的请求
    $.ajax({
        type:'post',//get或post
        url:'/users',//请求的地址
        data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType:'json',
        success:function(){//成功的回调函数
            //成功就刷新页面
            location.reload();
        },
        error:function(){
            alert('用户添加失败')
        },
        
    })

    //阻止表单默认行为
    return false;
})


//上传用户头像
$('#avatar').on('change',function(){
    //ajax在上传图片时必须使用formdata  文件上传，进度
    var formData = new FormData();
    formData.append('avatar',this.files[0]);
    $.ajax({
        type:'post',//get或post
        url:'/upload',//请求的地址
        data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        
        
        //告诉ajax不要转换数据参数
        processData:false,

        //告诉ajax不要默认设置请求头为application/x-www-form-urlencoded
        contentType:false,
        success:function(result){//成功的回调函数
           
            //实现头像预览
            $('#preview').attr('src',result[0].avatar);

            //这一行的作用是后面我们提交表单的时候，保证上传头像的地址也能够作为一项提交给后台服务器
            $('#hiddenAvatar').val(result[0].avatar)

        }
    })
})


//向服务端发送请求  索要用户列表数据
$.ajax({
    type:'get',//get或post
    url:'/users',//请求的地址
    
    success:function(result){//成功的回调函数
        console.log(result)
        var html = template('userTpl',{data:result});
        $('#userBox').html(html);
    }
})