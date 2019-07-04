$.ajax({
    type:'get',//get或post
    url:'/categories',//请求的地址
   
    success:function(result){//成功的回调函数
        //console.log(result)
        var html = template('categoryTpl',{data:result})
        $('#category').html(html)
    }
})

//文章封面上传
$('#feature').on('change',function(){
    
    
    //获取文件
    var file  = this.files[0];
    //创建formdata对象。实现二进制文件上传
    var formData = new FormData();
    //追加到formdata对象中
    formData.append('cover',file);
    //实现图片上传
    $.ajax({
        type:'post',//get或post
        url:'/upload',//请求的地址
        data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        //告诉ajax不要处理data属性对应的参数
        processData:false,
        //不要设置参数类型
        contentType:false,

        success:function(result){//成功的回调函数
            console.log(result)
            //图片预览
            $('#thumbnail').val(result[0].cover)
           
           $('.thumbnail').attr('src',result[0].cover).show()
            
        }
    })
})

//提交
$('#addForm').on('submit',function(){
    //获取表单内容
    var formData = $(this).serialize();
    
    //发送请求
    $.ajax({
        type:'post',//get或post
        url:'/posts',//请求的地址
        data:formData,//如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType:'json',
        success:function(result){//成功的回调函数
           console.log(result);
           
            location.href = '/admin/posts.html'
        }
    })
    return false;
})   